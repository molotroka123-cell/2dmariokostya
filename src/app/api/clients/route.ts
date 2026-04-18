import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { handleError, parseJson, parseQuery, requireAuth } from "@/lib/api";
import { clientCreateSchema } from "@/lib/validations/client";

const listQuerySchema = z.object({
  q: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export async function GET(request: Request) {
  try {
    await requireAuth();
    const { q, limit } = parseQuery(new URL(request.url), listQuerySchema);

    const clients = await prisma.client.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q } },
              { phone: { contains: q } },
              { email: { contains: q } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ clients });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const data = await parseJson(request, clientCreateSchema);

    const client = await prisma.client.create({ data });
    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
