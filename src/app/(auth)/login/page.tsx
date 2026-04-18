import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Вход в VreahVibes</h1>
          <p className="text-sm text-neutral-400">
            Используйте учётную запись администратора или мастера.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
