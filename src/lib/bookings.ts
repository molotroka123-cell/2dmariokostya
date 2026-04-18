import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api";

export async function loadServiceOrThrow(serviceId: string) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new ApiError(404, "Услуга не найдена");
  if (!service.active) throw new ApiError(400, "Услуга деактивирована");
  return service;
}

export async function assertNoOverlap(params: {
  staffId?: string | null;
  startsAt: Date;
  endsAt: Date;
  excludeBookingId?: string;
}) {
  const { staffId, startsAt, endsAt, excludeBookingId } = params;
  if (!staffId) return;

  const overlap = await prisma.booking.findFirst({
    where: {
      staffId,
      id: excludeBookingId ? { not: excludeBookingId } : undefined,
      status: { notIn: ["CANCELLED", "NO_SHOW"] },
      startsAt: { lt: endsAt },
      endsAt: { gt: startsAt },
    },
    select: { id: true, startsAt: true, endsAt: true },
  });

  if (overlap) {
    throw new ApiError(409, "В это время у мастера уже есть запись", overlap);
  }
}

export function computeEndsAt(startsAt: Date, durationMinutes: number): Date {
  return new Date(startsAt.getTime() + durationMinutes * 60_000);
}
