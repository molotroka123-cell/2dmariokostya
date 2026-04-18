import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { ChevronLeft } from "@/components/icons";
import { Logo } from "@/components/logo";

import { BookingForm } from "./booking-form";

export const dynamic = "force-dynamic";

export default async function BookPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      durationMinutes: true,
      priceCents: true,
    },
  });

  return (
    <main className="mx-auto max-w-md px-5 pb-16 pt-4">
      <header className="relative flex items-center justify-between py-3">
        <Link
          href="/"
          aria-label="Назад"
          className="flex h-9 w-9 items-center justify-center text-gold"
        >
          <ChevronLeft size={18} />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo size={26} showTagline={false} />
        </div>
        <div className="w-9" />
      </header>

      <section className="mt-3 px-1">
        <div className="au-eyebrow mb-2">Шаг за шагом</div>
        <h1 className="au-serif-title text-[30px]">Запись на приём</h1>
        <p className="mt-2 text-[13px] text-muted">
          Выберите услугу, удобное время и оставьте контакты
        </p>
      </section>

      {services.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-card p-6 text-center shadow-sm">
          <p className="text-sm text-muted">
            Пока нет доступных услуг. Пожалуйста, позвоните нам —
            +7 (999) 123-45-67.
          </p>
        </div>
      ) : (
        <BookingForm services={services} />
      )}
    </main>
  );
}
