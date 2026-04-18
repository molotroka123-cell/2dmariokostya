# VreahVibes

Приложение для записи клиентов студии **VreahVibes**.

## Стек

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS
- Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- NextAuth v5 (Credentials provider, JWT-сессии)
- Zod для валидации

## Структура

```
prisma/
  schema.prisma      — модели User, Client, Service, Booking
  seed.ts            — первичный администратор и услуга
src/
  app/               — страницы App Router
    (auth)/login/    — страница входа
    dashboard/       — защищённый кабинет
    bookings/        — записи
    clients/         — клиенты
    api/auth/        — маршрут NextAuth
  components/        — UI-компоненты
  lib/
    auth.ts          — конфигурация NextAuth
    prisma.ts        — singleton Prisma
  middleware.ts      — защита приватных маршрутов
```

## Быстрый старт

```bash
# 1. Зависимости
npm install

# 2. Переменные окружения
cp .env.example .env
# отредактируйте AUTH_SECRET: openssl rand -base64 32

# 3. База данных
npm run db:push
npx tsx prisma/seed.ts    # создаст администратора из ADMIN_EMAIL/ADMIN_PASSWORD

# 4. Dev-сервер
npm run dev
```

Откройте http://localhost:3000 и войдите под учёткой из `.env`.

## Скрипты

| Команда | Описание |
| --- | --- |
| `npm run dev` | Dev-сервер на 3000 |
| `npm run build` | Продакшен-сборка |
| `npm run start` | Запуск продакшен-сборки |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка типов |
| `npm run db:push` | Синхронизировать схему Prisma с БД |
| `npm run db:migrate` | Создать миграцию |
| `npm run db:studio` | Prisma Studio |

## Дальнейшее развитие

- [ ] Форма создания и редактирования записи
- [ ] Календарь/расписание
- [ ] Карточка клиента с историей
- [ ] Уведомления (email/SMS/Telegram)
- [ ] Публичная страница записи без авторизации
- [ ] Роли и права доступа
