import { LoginForm } from "@/components/login-form";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const redirectTo = typeof searchParams?.redirect === "string" ? searchParams.redirect : "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <LoginForm redirectTo={redirectTo} />
    </main>
  );
}
