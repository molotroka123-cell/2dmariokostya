import Link from "next/link";

import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { IconBadge } from "@/components/icon-badge";
import { Calendar, CalendarCheck, ChevronRight, User } from "@/components/icons";
import { Logo } from "@/components/logo";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Ожидает",
  CONFIRMED: "Подтверждена",
  COMPLETED: "Завершена",
  CANCELLED: "Отменена",
  NO_SHOW: "Не пришёл",
};

export default async function DashboardPage() {
  const session = await auth();

  const [clientsCount, bookingsCount, pendingCount, upcoming] = await Promise.all([
    prisma.client.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.findMany({
      where: { startsAt: { gte: new Date() } },
      orderBy: { startsAt: "asc" },
      take: 5,
      include: { client: true, service: true },
    }),
  ]);

  return (
    <main className="mx-auto max-w-md px-5 pb-10 pt-4">
      <header className="flex items-center justify-between py-3">
        <Logo size={26} showTagline={false} />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded-xl border border-divider px-3 py-1.5 text-[12px] font-medium text-body transition hover:border-gold hover:text-gold"
          >
            Выйти
          </button>
        </form>
      </header>

      <section className="mt-3 px-1">
        <div className="au-eyebrow mb-2">Кабинет</div>
        <h1 className="au-serif-title text-[30px]">
          Добрый день
        </h1>
        <p className="mt-2 text-[13px] text-muted">
          {session?.user?.name ?? session?.user?.email}
        </p>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <StatCard
          title="Клиенты"
          value={clientsCount}
          icon={<User size={22} />}
          href="/clients"
        />
        <StatCard
          title="Записи"
          value={bookingsCount}
          icon={<CalendarCheck size={22} />}
          href="/bookings"
        />
      </section>

      {pendingCount > 0 && (
        <Link
          href="/bookings?status=PENDING"
          className="mt-3 flex items-center gap-3 rounded-3xl bg-beige-hi p-4 shadow-sm"
        >
          <IconBadge size={46} className="bg-white">
            <Calendar size={22} />
          </IconBadge>
          <div className="flex-1">
            <div className="text-[15px] font-bold tracking-tight text-ink">
              Ожидают подтверждения
            </div>
            <div className="mt-0.5 text-[13px] text-body">
              {pendingCount} {pendingWord(pendingCount)}
            </div>
          </div>
          <span className="text-gold">
            <ChevronRight size={16} />
          </span>
        </Link>
      )}

      <section className="mt-6">
        <h2 className="mb-3 px-1 text-[17px] font-bold tracking-tight text-ink">
          Ближайшие записи
        </h2>
        {upcoming.length === 0 ? (
          <p className="px-1 text-sm text-muted">Пока записей нет.</p>
        ) : (
          <div className="au-card !p-0 overflow-hidden">
            {upcoming.map((b, i) => (
              <div
                key={b.id}
                className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
                  i === upcoming.length - 1 ? "" : "border-b border-divider"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-ink">
                    {b.client.name}
                  </p>
                  <p className="truncate text-[12px] text-muted">{b.service.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-medium text-ink">
                    {b.startsAt.toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-[11px] text-muted">{STATUS_LABELS[b.status] ?? b.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  href,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="au-card flex flex-col gap-3 transition hover:shadow-md"
    >
      <IconBadge size={42}>{icon}</IconBadge>
      <div>
        <p className="text-[12px] uppercase tracking-wider text-muted">{title}</p>
        <p className="mt-1 text-[28px] font-bold tracking-tight text-ink">{value}</p>
      </div>
    </Link>
  );
}

function pendingWord(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "запись ждёт";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "записи ждут";
  return "записей ждут";
}
