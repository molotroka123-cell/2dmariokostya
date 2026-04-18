import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@vreahvibes.local";
  const password = process.env.ADMIN_PASSWORD ?? "change-me";

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Администратор",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.service.upsert({
    where: { id: "seed-service-1" },
    update: {},
    create: {
      id: "seed-service-1",
      title: "Базовая консультация",
      description: "Первичная встреча с клиентом",
      durationMinutes: 60,
      priceCents: 0,
      createdById: admin.id,
    },
  });

  console.log(`Seeded admin: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
