import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { ChevronLeft, User } from "@/components/icons";
import { IconBadge } from "@/components/icon-badge";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { _count: { select: { bookings: true } } },
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

      <div className="au-eyebrow mt-2 px-1">База</div>
      <h1 className="au-serif-title mt-2 px-1 text-[30px]">Клиенты</h1>
      <p className="mt-2 px-1 text-[13px] text-muted">Всего {clients.length}</p>

      {clients.length === 0 ? (
        <p className="mt-6 px-1 text-sm text-muted">Клиентов пока нет.</p>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {clients.map((c) => (
            <li key={c.id} className="au-card flex items-center gap-3">
              <IconBadge size={44}>
                <User size={22} />
              </IconBadge>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-ink">
                  {c.name}
                </p>
                <p className="truncate text-[12.5px] text-muted">
                  {c.phone ?? c.email ?? "—"}
                </p>
              </div>
              <div className="text-right text-[12px] text-muted">
                {c._count.bookings} {bookingsWord(c._count.bookings)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function bookingsWord(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "запись";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "записи";
  return "записей";
}
