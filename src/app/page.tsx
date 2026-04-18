import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-8 text-center">
        <div className="inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1 text-sm text-brand-500">
          VreahVibes
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Запись клиентов без лишней суеты
        </h1>
        <p className="mx-auto max-w-xl text-lg text-neutral-400">
          Управляйте расписанием, клиентами и услугами в одном месте. Быстрая
          запись, напоминания и история посещений.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-700"
          >
            Войти в кабинет
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-neutral-500"
          >
            Открыть дашборд
          </Link>
        </div>
      </div>
    </main>
  );
}
