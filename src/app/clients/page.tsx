import { prisma } from "@/lib/prisma";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-semibold">Клиенты</h1>
      {clients.length === 0 ? (
        <p className="text-sm text-neutral-500">Клиентов пока нет.</p>
      ) : (
        <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800">
          {clients.map((c) => (
            <li key={c.id} className="px-4 py-3">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-neutral-400">{c.phone ?? c.email ?? "—"}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
