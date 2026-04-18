import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { ApiError, handleError, parseJson, parseQuery, requireAuth } from "@/lib/api";
import {
  bookingCreateSchema,
  bookingListQuerySchema,
} from "@/lib/validations/booking";
import { assertNoOverlap, computeEndsAt, loadServiceOrThrow } from "@/lib/bookings";

export async function GET(request: Request) {
  try {
    await requireAuth();
    const query = parseQuery(new URL(request.url), bookingListQuerySchema);

    const bookings = await prisma.booking.findMany({
      where: {
        status: query.status,
        clientId: query.clientId,
        staffId: query.staffId,
        startsAt: {
          gte: query.from,
          lte: query.to,
        },
      },
      orderBy: { startsAt: "asc" },
      take: query.limit,
      include: {
        client: true,
        service: true,
        staff: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const data = await parseJson(request, bookingCreateSchema);

    const service = await loadServiceOrThrow(data.serviceId);

    const client = await prisma.client.findUnique({ where: { id: data.clientId } });
    if (!client) throw new ApiError(404, "Клиент не найден");

    if (data.staffId) {
      const staff = await prisma.user.findUnique({ where: { id: data.staffId } });
      if (!staff) throw new ApiError(404, "Мастер не найден");
    }

    const endsAt = computeEndsAt(data.startsAt, service.durationMinutes);
    await assertNoOverlap({
      staffId: data.staffId ?? null,
      startsAt: data.startsAt,
      endsAt,
    });

    const booking = await prisma.booking.create({
      data: {
        clientId: data.clientId,
        serviceId: data.serviceId,
        staffId: data.staffId ?? null,
        startsAt: data.startsAt,
        endsAt,
        notes: data.notes,
      },
      include: { client: true, service: true },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
