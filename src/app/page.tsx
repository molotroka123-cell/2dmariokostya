import Link from "next/link";

import { IconBadge } from "@/components/icon-badge";
import {
  CalendarCheck,
  ChevronRight,
  Clock,
  Diamond,
  Heart,
  Phone,
  Scissors,
  Sparkle,
} from "@/components/icons";
import { Logo } from "@/components/logo";

const SERVICES = [
  { Icon: Sparkle, label: "Красота" },
  { Icon: Diamond, label: "Премиум" },
  { Icon: Heart, label: "Велнес" },
  { Icon: Scissors, label: "Стиль" },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-md px-5 pb-20 pt-4">
      <header className="relative flex items-center justify-center py-3">
        <Logo size={28} />
      </header>

      <section className="mt-4 flex items-stretch gap-1">
        <div className="flex-1 pt-2">
          <div className="au-eyebrow mb-2.5">Премиальный сервис</div>
          <h1 className="au-serif-title text-[32px]">
            Добро
            <br />
            пожаловать
            <br />в VreahVibes
          </h1>
          <p className="mt-2.5 text-[13.5px] leading-snug text-muted">
            Профессиональная забота
            <br />о вашем комфорте
          </p>
        </div>
        <div className="relative ml-2 h-[220px] w-[150px] shrink-0 overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 30%, rgba(255,245,225,0.9), transparent 55%),
                radial-gradient(ellipse at 70% 80%, rgba(217,177,119,0.35), transparent 55%),
                radial-gradient(ellipse at 85% 20%, rgba(250,235,215,0.9), transparent 50%),
                linear-gradient(160deg, #F5EBD7 0%, #E9D5B3 45%, #CFAE7A 100%)
              `,
            }}
          />
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 260"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 opacity-40"
          >
            <path
              d="M0 80 Q 50 40 100 90 T 200 70"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M0 140 Q 60 110 110 160 T 200 140"
              stroke="rgba(184,135,60,0.25)"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
        </div>
      </section>

      <Link
        href="/book"
        className="mt-6 flex items-center gap-3.5 rounded-3xl bg-beige-hi p-4 shadow-sm transition active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-card text-gold shadow-sm">
          <CalendarCheck size={24} />
        </div>
        <div className="flex-1">
          <div className="text-base font-bold tracking-tight text-ink">
            Записаться на приём
          </div>
          <div className="mt-0.5 text-xs text-body">
            Выберите удобную дату и время
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-cta"
             style={{ color: "var(--cta-ink)" }}>
          <ChevronRight size={14} />
        </div>
      </Link>

      <section className="mt-8">
        <h2 className="mb-3 px-1 text-[17px] font-bold tracking-tight text-ink">
          Наши услуги
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {SERVICES.map(({ Icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 overflow-hidden rounded-3xl bg-card p-3 shadow-sm"
            >
              <Icon size={28} className="text-gold" />
              <div className="w-full truncate text-center text-[11px] font-semibold tracking-tight text-ink">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-sm">
          <IconBadge size={46}>
            <Clock size={22} />
          </IconBadge>
          <div className="flex-1">
            <div className="text-[15px] font-bold tracking-tight text-ink">
              Часы работы
            </div>
            <div className="mt-0.5 text-[13px] text-body">Пн – Вс: 9:00 – 21:00</div>
            <div className="mt-0.5 text-xs text-muted">Без выходных</div>
          </div>
        </div>
      </section>

      <section className="mt-3">
        <a
          href="tel:+79991234567"
          className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-sm"
        >
          <IconBadge size={46}>
            <Phone size={22} />
          </IconBadge>
          <div className="flex-1">
            <div className="text-[15px] font-bold tracking-tight text-ink">
              Связаться с нами
            </div>
            <div className="mt-0.5 text-[13px] text-body">+7 (999) 123-45-67</div>
            <div className="mt-0.5 text-xs text-muted">VreahVibes заботится о вас</div>
          </div>
          <span className="text-gold">
            <ChevronRight size={16} />
          </span>
        </a>
      </section>

      <footer className="mt-10 text-center text-xs text-muted">
        <Link href="/login" className="text-gold">
          Вход для сотрудников
        </Link>
      </footer>
    </main>
  );
}
