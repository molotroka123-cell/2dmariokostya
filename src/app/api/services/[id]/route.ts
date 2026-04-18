import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError, handleError, parseJson, requireAdmin, requireAuth } from "@/lib/api";
import { serviceUpdateSchema } from "@/lib/validations/service";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;

    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) throw new ApiError(404, "Услуга не найдена");

    return NextResponse.json({ service });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = await parseJson(request, serviceUpdateSchema);

    try {
      const service = await prisma.service.update({ where: { id }, data });
      return NextResponse.json({ service });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new ApiError(404, "Услуга не найдена");
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

    const bookingCount = await prisma.booking.count({ where: { serviceId: id } });
    if (bookingCount > 0) {
      await prisma.service.update({ where: { id }, data: { active: false } });
      return NextResponse.json(
        { message: "Услуга деактивирована — на неё есть записи" },
        { status: 200 },
      );
    }

    try {
      await prisma.service.delete({ where: { id } });
      return new NextResponse(null, { status: 204 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new ApiError(404, "Услуга не найдена");
      }
      throw e;
    }
  } catch (error) {
    return handleError(error);
  }
}
