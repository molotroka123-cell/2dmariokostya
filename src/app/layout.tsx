import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VreahVibes — запись клиентов",
  description: "Приложение для управления записью клиентов VreahVibes",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
