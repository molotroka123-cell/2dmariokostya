import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError, handleError, parseJson, requireAuth } from "@/lib/api";
import { bookingStatusUpdateSchema } from "@/lib/validations/booking";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    const { status } = await parseJson(request, bookingStatusUpdateSchema);

    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: { status },
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
