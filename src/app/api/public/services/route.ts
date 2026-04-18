import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/api";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        durationMinutes: true,
        priceCents: true,
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    return handleError(error);
  }
}
