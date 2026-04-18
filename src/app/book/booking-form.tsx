"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Phone, Shield, User } from "@/components/icons";

function ChevronDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.57} viewBox="0 0 14 8" fill="none">
      <path
        d="M1 1l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Service = {
  id: string;
  title: string;
  description: string | null;
  durationMinutes: number;
  priceCents: number;
};

const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function formatPrice(cents: number) {
  if (cents === 0) return "Бесплатно";
  return `${(cents / 100).toLocaleString("ru-RU")} ₽`;
}

function buildDateOptions(count = 5): Array<{ label: string; date: Date; isToday: boolean }> {
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Array.from({ length: count }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      label: i === 0 ? "Сегодня" : days[d.getDay()],
      date: d,
      isToday: i === 0,
    };
  });
}

const MONTHS_SHORT = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

export function BookingForm({ services }: { services: Service[] }) {
  const router = useRouter();
  const dates = useMemo(() => buildDateOptions(5), []);
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [dateIndex, setDateIndex] = useState(0);
  const [time, setTime] = useState(TIMES[1]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedService = services.find((s) => s.id === serviceId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!serviceId) {
      setError("Выберите услугу");
      return;
    }

    const date = dates[dateIndex].date;
    const [h, m] = time.split(":").map(Number);
    const startsAt = new Date(date);
    startsAt.setHours(h, m, 0, 0);

    setSubmitting(true);
    const res = await fetch("/api/public/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId,
        startsAt: startsAt.toISOString(),
        name,
        phone,
      }),
    });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Не удалось создать запись. Попробуйте ещё раз.");
      return;
    }

    router.push("/book/confirmed");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
      <StepCard step={1} title="Выберите услугу">
        <div className="relative">
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="au-input appearance-none pr-10"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} · {formatPrice(s.priceCents)}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
            <ChevronDown />
          </span>
        </div>
        {selectedService?.description && (
          <p className="mt-2 text-xs text-muted">{selectedService.description}</p>
        )}
      </StepCard>

      <StepCard step={2} title="Выберите дату и время">
        <div className="flex gap-1.5">
          {dates.map((d, i) => {
            const sel = i === dateIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setDateIndex(i)}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-center transition ${
                  sel
                    ? "border-[1.5px] border-gold bg-beige-hi"
                    : "border border-divider bg-transparent"
                }`}
              >
                <span className="text-[9.5px] font-medium text-muted">{d.label}</span>
                <span className="text-[17px] font-bold tracking-tight text-ink">
                  {d.date.getDate()}
                </span>
                <span className="text-[9.5px] text-muted">
                  {MONTHS_SHORT[d.date.getMonth()]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {TIMES.map((t) => {
            const sel = t === time;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`h-9 rounded-lg text-[12px] font-semibold tracking-tight transition ${
                  sel
                    ? "border-[1.5px] border-gold bg-beige-hi text-ink"
                    : "border border-divider bg-transparent text-body"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </StepCard>

      <StepCard step={3} title="Данные для записи">
        <div className="space-y-2.5">
          <InputField
            icon={<User size={18} />}
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={name}
            onChange={setName}
            autoComplete="name"
            required
          />
          <InputField
            icon={<Phone size={18} />}
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
            required
            pattern="^[+\d][\d\s()-]{5,}$"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="au-cta mt-3.5 w-full">
          {submitting ? "Отправляем…" : "Записаться на приём"}
        </button>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-muted">
          <Shield size={12} />
          Ваши данные защищены и не будут переданы третьим лицам
        </div>
      </StepCard>
    </form>
  );
}

function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="au-card">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="au-step">{step}</span>
        <span className="text-[15px] font-bold tracking-tight text-ink">{title}</span>
      </div>
      {children}
    </div>
  );
}

function InputField({
  icon,
  value,
  onChange,
  ...rest
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className="flex h-12 items-center gap-2.5 rounded-xl border border-divider bg-[#FBF8F3] px-3.5 text-sm focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition">
      <span className="text-muted">{icon}</span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-muted outline-none"
      />
    </label>
  );
}
