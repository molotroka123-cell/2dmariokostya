import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError, handleError, parseJson, requireAdmin, requireAuth } from "@/lib/api";
import { bookingUpdateSchema } from "@/lib/validations/booking";
import { assertNoOverlap, computeEndsAt, loadServiceOrThrow } from "@/lib/bookings";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        client: true,
        service: true,
        staff: { select: { id: true, name: true, email: true } },
      },
    });
    if (!booking) throw new ApiError(404, "Запись не найдена");

    return NextResponse.json({ booking });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await parseJson(request, bookingUpdateSchema);

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Запись не найдена");

    const serviceId = data.serviceId ?? existing.serviceId;
    const startsAt = data.startsAt ?? existing.startsAt;
    const staffId =
      data.staffId === undefined ? existing.staffId : data.staffId;

    const service = await loadServiceOrThrow(serviceId);
    const endsAt = computeEndsAt(startsAt, service.durationMinutes);

    await assertNoOverlap({
      staffId,
      startsAt,
      endsAt,
      excludeBookingId: id,
    });

    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: {
          clientId: data.clientId,
          serviceId,
          staffId,
          startsAt,
          endsAt,
          notes: data.notes,
          status: data.status,
        },
        include: { client: true, service: true },
      });
      return NextResponse.json({ booking });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new ApiError(404, "Запись не найдена");
      }
      throw e;
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;

    try {
      await prisma.booking.delete({ where: { id } });
      return new NextResponse(null, { status: 204 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new ApiError(404, "Запись не найдена");
      }
      throw e;
    }
  } catch (error) {
    return handleError(error);
  }
}
