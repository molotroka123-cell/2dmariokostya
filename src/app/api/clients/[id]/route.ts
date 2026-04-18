import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ApiError, handleError, parseJson, requireAdmin, requireAuth } from "@/lib/api";
import { clientUpdateSchema } from "@/lib/validations/client";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        bookings: {
          orderBy: { startsAt: "desc" },
          take: 20,
          include: { service: true, staff: { select: { id: true, name: true, email: true } } },
        },
      },
    });
    if (!client) throw new ApiError(404, "Клиент не найден");

    return NextResponse.json({ client });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAuth();
    const { id } = await params;
    const data = await parseJson(request, clientUpdateSchema);

    try {
      const client = await prisma.client.update({ where: { id }, data });
      return NextResponse.json({ client });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new ApiError(404, "Клиент не найден");
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
      await prisma.client.delete({ where: { id } });
      return new NextResponse(null, { status: 204 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        throw new ApiError(404, "Клиент не найден");
      }
      throw e;
    }
  } catch (error) {
    return handleError(error);
  }
}
