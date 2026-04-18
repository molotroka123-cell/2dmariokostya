import Link from "next/link";

import { Calendar, Check } from "@/components/icons";
import { Logo } from "@/components/logo";

export default function ConfirmedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-4">
      <header className="flex items-center justify-center py-3">
        <Logo size={26} showTagline={false} />
      </header>

      <section className="mt-6 flex flex-col items-center px-5">
        <div
          className="mb-5 flex h-24 w-24 items-center justify-center rounded-full text-white shadow-cta"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #F5E0BB, #D9B177)",
          }}
        >
          <Check size={48} />
        </div>
        <h1 className="whitespace-nowrap font-serif text-[28px] font-medium leading-tight tracking-wide text-ink">
          Запись подтверждена
        </h1>
        <p className="mt-3 text-center text-sm leading-snug text-muted">
          Мы свяжемся с вами для уточнения деталей.
          <br />
          Ждём вас в VreahVibes.
        </p>
      </section>

      <section className="mt-8 px-1">
        <div className="au-card !p-0 overflow-hidden">
          <Row label="Услуга" value="Подробности в смс" />
          <Row label="Статус" value="Ожидает подтверждения" last />
        </div>
      </section>

      <section className="mt-4 px-1">
        <div className="flex items-center gap-3 rounded-2xl bg-beige-hi px-4 py-3 text-[12.5px] leading-snug text-body">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-gold">
            <Calendar size={18} />
          </div>
          Мы отправим напоминание за день до приёма
        </div>
      </section>

      <div className="mt-auto space-y-2 pt-10">
        <Link href="/" className="au-cta flex items-center justify-center">
          На главную
        </Link>
        <Link
          href="/book"
          className="block py-2.5 text-center text-[13px] font-medium text-gold"
        >
          Записаться ещё раз
        </Link>
      </div>
    </main>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3.5 ${
        last ? "" : "border-b border-divider"
      }`}
    >
      <div className="text-[12px] uppercase tracking-wider text-muted">{label}</div>
      <div className="text-right text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}
