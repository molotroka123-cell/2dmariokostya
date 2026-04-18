import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { ZodError, type ZodSchema } from "zod";

import { auth } from "@/lib/auth";

export type ApiSession = Session;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export async function requireAuth(): Promise<ApiSession> {
  const session = (await auth()) as Session | null;
  if (!session?.user) {
    throw new ApiError(401, "Требуется авторизация");
  }
  return session;
}

export async function requireAdmin(): Promise<ApiSession> {
  const session = await requireAuth();
  if (session.user.role !== "ADMIN") {
    throw new ApiError(403, "Доступ только для администратора");
  }
  return session;
}

export async function parseJson<T>(request: Request, schema: ZodSchema<T>): Promise<T> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    throw new ApiError(400, "Некорректный JSON");
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new ApiError(422, "Ошибка валидации", result.error.flatten());
  }
  return result.data;
}

export function parseQuery<T>(url: URL, schema: ZodSchema<T>): T {
  const params = Object.fromEntries(url.searchParams.entries());
  const result = schema.safeParse(params);
  if (!result.success) {
    throw new ApiError(422, "Некорректные параметры запроса", result.error.flatten());
  }
  return result.data;
}

export function handleError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, details: error.details },
      { status: error.status },
    );
  }
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Ошибка валидации", details: error.flatten() },
      { status: 422 },
    );
  }
  console.error("[api] unexpected error:", error);
  return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
}
