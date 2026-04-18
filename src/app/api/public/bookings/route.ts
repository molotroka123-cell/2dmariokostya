import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { handleError, parseJson } from "@/lib/api";
import { publicBookingSchema } from "@/lib/validations/booking";
import { assertNoOverlap, computeEndsAt, loadServiceOrThrow } from "@/lib/bookings";

export async function POST(request: Request) {
  try {
    const data = await parseJson(request, publicBookingSchema);
    const service = await loadServiceOrThrow(data.serviceId);
    const endsAt = computeEndsAt(data.startsAt, service.durationMinutes);

    await assertNoOverlap({
      staffId: null,
      startsAt: data.startsAt,
      endsAt,
    });

    const existing = await prisma.client.findFirst({
      where: {
        OR: [
          data.email ? { email: data.email } : undefined,
          { phone: data.phone },
        ].filter(Boolean) as Array<{ email?: string; phone?: string }>,
      },
    });

    const client = existing
      ? await prisma.client.update({
          where: { id: existing.id },
          data: { name: data.name, phone: data.phone, email: data.email ?? existing.email },
        })
      : await prisma.client.create({
          data: { name: data.name, phone: data.phone, email: data.email },
        });

    const booking = await prisma.booking.create({
      data: {
        clientId: client.id,
        serviceId: service.id,
        startsAt: data.startsAt,
        endsAt,
        notes: data.notes,
        status: "PENDING",
      },
      select: {
        id: true,
        startsAt: true,
        endsAt: true,
        status: true,
        service: { select: { title: true } },
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
