
import { FieldSet, FieldGroup, Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-sm px-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Entrar</h1>
          <p className="text-sm text-muted-foreground">Acesse sua conta para continuar</p>
        </header>
        <form noValidate>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <Input id="email" name="email" type="email" placeholder="seu@email.com" autoComplete="email" />
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
            <Button type="submit" className="w-full">Entrar</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
