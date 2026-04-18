import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  const [clientsCount, bookingsCount, upcoming] = await Promise.all([
    prisma.client.count(),
    prisma.booking.count(),
    prisma.booking.findMany({
      where: { startsAt: { gte: new Date() } },
      orderBy: { startsAt: "asc" },
      take: 5,
      include: { client: true, service: true },
    }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Дашборд</h1>
          <p className="text-sm text-neutral-400">
            Привет, {session?.user?.name ?? session?.user?.email}
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm transition hover:border-neutral-500"
          >
            Выйти
          </button>
        </form>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard title="Клиенты" value={clientsCount} href="/clients" />
        <StatCard title="Записи" value={bookingsCount} href="/bookings" />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-medium">Ближайшие записи</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-neutral-500">Пока записей нет.</p>
        ) : (
          <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800">
            {upcoming.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium">{b.client.name}</p>
                  <p className="text-sm text-neutral-400">{b.service.title}</p>
                </div>
                <time className="text-sm text-neutral-300">
                  {b.startsAt.toLocaleString("ru-RU")}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function StatCard({ title, value, href }: { title: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition hover:border-brand-500"
    >
      <p className="text-sm text-neutral-400">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </Link>
  );
}
