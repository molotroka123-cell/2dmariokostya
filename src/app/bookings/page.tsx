import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { ChevronLeft } from "@/components/icons";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Ожидает",
  CONFIRMED: "Подтверждена",
  COMPLETED: "Завершена",
  CANCELLED: "Отменена",
  NO_SHOW: "Не пришёл",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-beige-hi text-gold-deep",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  COMPLETED: "bg-neutral-100 text-neutral-600",
  CANCELLED: "bg-rose-50 text-rose-700",
  NO_SHOW: "bg-rose-50 text-rose-700",
};

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { startsAt: "desc" },
    take: 100,
    include: { client: true, service: true },
  });

  return (
    <main className="mx-auto max-w-md px-5 pb-10 pt-4">
      <header className="flex items-center py-3">
        <Link
          href="/dashboard"
          aria-label="Назад"
          className="flex h-9 w-9 items-center justify-center text-gold"
        >
          <ChevronLeft size={18} />
        </Link>
      </header>

      <div className="au-eyebrow mt-2 px-1">История</div>
      <h1 className="au-serif-title mt-2 px-1 text-[30px]">Записи</h1>
      <p className="mt-2 px-1 text-[13px] text-muted">Всего {bookings.length}</p>

      {bookings.length === 0 ? (
        <p className="mt-6 px-1 text-sm text-muted">Пока записей нет.</p>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {bookings.map((b) => (
            <li key={b.id} className="au-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink">
                    {b.client.name}
                  </p>
                  <p className="truncate text-[12.5px] text-muted">
                    {b.service.title}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    STATUS_STYLES[b.status] ?? "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {STATUS_LABELS[b.status] ?? b.status}
                </span>
              </div>
              <div className="mt-2 text-[13px] text-body">
                {b.startsAt.toLocaleString("ru-RU", {
                  weekday: "short",
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              {b.client.phone && (
                <div className="mt-1 text-[12px] text-muted">{b.client.phone}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
