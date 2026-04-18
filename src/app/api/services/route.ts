import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { handleError, parseJson, parseQuery, requireAdmin, requireAuth } from "@/lib/api";
import { serviceCreateSchema } from "@/lib/validations/service";

const listQuerySchema = z.object({
  active: z.enum(["true", "false"]).optional(),
});

export async function GET(request: Request) {
  try {
    await requireAuth();
    const { active } = parseQuery(new URL(request.url), listQuerySchema);

    const services = await prisma.service.findMany({
      where: active ? { active: active === "true" } : undefined,
      orderBy: { title: "asc" },
    });

    return NextResponse.json({ services });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const data = await parseJson(request, serviceCreateSchema);

    const service = await prisma.service.create({
      data: { ...data, createdById: session.user.id },
    });
    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
