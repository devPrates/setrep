
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldSet, FieldGroup, Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const form = e.currentTarget;
    const emailInput = form.querySelector<HTMLInputElement>("#email");
    const email = emailInput?.value?.trim().toLowerCase() || "";

    // Regra temporária: admin vai para dashboard, demais para app
    const isPersonal = email === "admin@example.com" || email === "admin@setrep.dev";
    const target = isPersonal ? "/dashboard" : "/app";
    router.push(target);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-sm px-6">
        <header className="mb-6 text-center">
          <div className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">SetRep</div>
          <h1 className="text-2xl font-semibold">Acessar conta</h1>
          <p className="mt-1 text-sm text-muted-foreground">Entre com seu e-mail e senha para continuar.</p>
        </header>
        <form noValidate onSubmit={onSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <Input id="email" name="email" type="email" placeholder="voce@dominio.com" autoComplete="email" />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <FieldContent>
                  <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">Usamos cookies seguros para manter sua sessão.</p>
        </form>

        <Separator className="my-8" />
        <footer className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} • Desenvolvido por Gabriel Prates
        </footer>
      </div>
    </main>
  );
}
