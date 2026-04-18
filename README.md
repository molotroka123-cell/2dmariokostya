# VreahVibes

Приложение для записи клиентов студии **VreahVibes**. Премиальный дизайн
в стиле Aurum Dent (тёплое золото/бежевый, serif-заголовки Cormorant),
светлая и тёмная темы.

## Стек

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS (CSS-переменные для светлой/тёмной темы)
- Prisma ORM + PostgreSQL
- NextAuth v5 (Credentials, JWT)
- Zod

## Структура

```
prisma/
  schema.prisma           — User, Client, Service, Booking
  migrations/             — SQL-миграции Postgres
  seed.ts                 — первый администратор
src/
  app/
    page.tsx              — лендинг
    book/                 — публичная запись (4 шага) + /confirmed
    (auth)/login/         — вход
    dashboard/            — кабинет
    bookings/, clients/   — админ-списки
    api/                  — REST: clients, services, bookings, public/*
  components/             — UI (Logo, IconBadge, icons, LoginForm)
  lib/
    auth.ts, auth.config.ts
    prisma.ts
    api.ts                — guards и обработка ошибок
    validations/          — Zod-схемы
    bookings.ts           — проверка пересечений, расчёт endsAt
  middleware.ts           — защита /dashboard, /bookings, /clients
```

## Локальная разработка

1. **Postgres** — поднимите локально или возьмите бесплатный:
   ```bash
   # локально через Docker
   docker run -d --name vreahvibes-pg -p 5432:5432 \
     -e POSTGRES_PASSWORD=pg -e POSTGRES_DB=vreahvibes postgres:16
   ```
   Альтернативы: [Neon](https://neon.tech), [Supabase](https://supabase.com).

2. **Зависимости и переменные**:
   ```bash
   npm install
   cp .env.example .env
   # задайте DATABASE_URL и AUTH_SECRET (openssl rand -base64 32)
   ```

3. **Миграции и сид**:
   ```bash
   npx prisma migrate deploy
   npx tsx prisma/seed.ts      # создаст администратора из ADMIN_EMAIL/ADMIN_PASSWORD
   ```

4. **Запуск**:
   ```bash
   npm run dev
   ```
   Открыть http://localhost:3000. Вход в `/login` под данными из `.env`.

## Деплой на Vercel

1. Зайдите на [vercel.com/new](https://vercel.com/new) и импортируйте репозиторий.
2. В разделе **Storage** создайте Postgres (Vercel Postgres / Neon) —
   Vercel автоматически пробросит `DATABASE_URL`.
3. Добавьте переменные окружения:
   - `AUTH_SECRET` — `openssl rand -base64 32`
   - `AUTH_URL` — публичный URL (`https://<project>.vercel.app`)
4. Нажмите **Deploy**. Скрипт `build` сам выполнит `prisma generate` и
   `prisma migrate deploy`.
5. После первого успешного деплоя создайте администратора:
   ```bash
   vercel env pull .env
   npx tsx prisma/seed.ts
   ```

## Скрипты

| Команда | Описание |
| --- | --- |
| `npm run dev` | Dev-сервер на 3000 |
| `npm run build` | Генерация Prisma, миграции, продакшен-сборка |
| `npm run start` | Запуск продакшен-сборки |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка типов |
| `npm run db:migrate` | Создать миграцию |
| `npm run db:push` | Синхронизировать схему без миграции |
| `npm run db:studio` | Prisma Studio |

## Дальнейшее развитие

- [ ] Форма создания и редактирования записи в админке
- [ ] Календарь/расписание мастера
- [ ] Карточка клиента с историей
- [ ] Уведомления (email/SMS/Telegram)
- [ ] Роли и права доступа
