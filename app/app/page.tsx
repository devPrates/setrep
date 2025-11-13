import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dumbbell, ListChecks, Clock, CheckCircle2, History, User as UserIcon } from "lucide-react";

export default function AppHome() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-xl px-6 pt-8 md:max-w-2xl">
        <div className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar name="Aluna" size="lg" className="bg-white/20 text-white" />
            <div>
              <p className="text-sm/5 opacity-90">Fernanda Personal</p>
              <h1 className="mt-0.5 text-3xl font-semibold tracking-tight md:text-4xl font-secondary">Olá, aluna 👋</h1>
            </div>
          </div>
          <p className="mt-2 text-base/6 opacity-90">
            Seu treino está pronto. Mantenha o foco e registre seu progresso.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30">
              <span className="inline-flex items-center gap-1"><Dumbbell className="size-4" /> Hoje: Treino A</span>
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              <span className="inline-flex items-center gap-1"><ListChecks className="size-4" /> 6 exercícios</span>
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              <span className="inline-flex items-center gap-1"><Clock className="size-4" /> 45–60 min</span>
            </Badge>
          </div>
        </div>

        <Card className="mt-6 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium md:text-lg font-secondary">Treino do dia</h2>
            <span className="text-sm text-muted-foreground">estimado: 45–60 min</span>
          </div>
          <Separator className="my-4" />
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="inline-flex items-center gap-3 text-base md:text-lg font-medium">
                <span className="inline-flex items-center justify-center size-8 rounded-md bg-muted text-foreground/70">
                  <CheckCircle2 className="size-5" />
                </span>
                Agachamento livre
              </span>
              <span className="text-sm text-muted-foreground">3 x 12</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="inline-flex items-center gap-3 text-base md:text-lg font-medium">
                <span className="inline-flex items-center justify-center size-8 rounded-md bg-muted text-foreground/70">
                  <CheckCircle2 className="size-5" />
                </span>
                Supino reto
              </span>
              <span className="text-sm text-muted-foreground">3 x 10</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="inline-flex items-center gap-3 text-base md:text-lg font-medium">
                <span className="inline-flex items-center justify-center size-8 rounded-md bg-muted text-foreground/70">
                  <CheckCircle2 className="size-5" />
                </span>
                Remada curvada
              </span>
              <span className="text-sm text-muted-foreground">3 x 10</span>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <Button asChild size="lg" className="flex-1 min-h-[44px]">
              <a href="/app/treinos">Iniciar treino</a>
            </Button>
            <Button variant="outline" asChild size="lg" className="flex-1 min-h-[44px]">
              <a href="/app/registros">Registrar conclusão</a>
            </Button>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href="/app/exercicios"
            className="rounded-lg border bg-card p-4 text-base shadow-sm hover:bg-muted min-h-[44px]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center size-9 rounded-lg bg-muted text-foreground/80">
                <Dumbbell className="size-5" />
              </span>
              <div className="flex flex-col">
                <div className="font-medium">Exercícios</div>
                <div className="text-sm text-muted-foreground">Catálogo e instruções</div>
              </div>
            </div>
          </a>
          <a
            href="/app/registros"
            className="rounded-lg border bg-card p-4 text-base shadow-sm hover:bg-muted min-h-[44px]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center size-9 rounded-lg bg-muted text-foreground/80">
                <History className="size-5" />
              </span>
              <div className="flex flex-col">
                <div className="font-medium">Registros</div>
                <div className="text-sm text-muted-foreground">Histórico e progresso</div>
              </div>
            </div>
          </a>
          <a
            href="/app/treinos"
            className="rounded-lg border bg-card p-4 text-base shadow-sm hover:bg-muted min-h-[44px]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center size-9 rounded-lg bg-muted text-foreground/80">
                <ListChecks className="size-5" />
              </span>
              <div className="flex flex-col">
                <div className="font-medium">Meus treinos</div>
                <div className="text-sm text-muted-foreground">A/B/… e versões</div>
              </div>
            </div>
          </a>
          <a
            href="/app/perfil"
            className="rounded-lg border bg-card p-4 text-base shadow-sm hover:bg-muted min-h-[44px]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center size-9 rounded-lg bg-muted text-foreground/80">
                <UserIcon className="size-5" />
              </span>
              <div className="flex flex-col">
                <div className="font-medium">Perfil</div>
                <div className="text-sm text-muted-foreground">Dados e preferências</div>
              </div>
            </div>
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Dica: você pode usar o app mesmo offline. As alterações serão sincronizadas.
        </p>
      </section>
    </main>
  );
}
