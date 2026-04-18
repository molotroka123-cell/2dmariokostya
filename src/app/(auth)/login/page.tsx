import { Suspense } from "react";

import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex justify-center pb-6">
          <Logo size={30} />
        </div>
        <div className="au-card !p-6">
          <div className="mb-5 space-y-1 text-center">
            <h1 className="font-serif text-[26px] font-medium tracking-wide text-ink">
              Вход
            </h1>
            <p className="text-[13px] text-muted">
              Кабинет администратора и мастеров
            </p>
          </div>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
