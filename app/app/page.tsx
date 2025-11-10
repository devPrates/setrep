import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function AppHome() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-md px-6 pt-8">
        <div className="rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 p-4 text-white shadow-sm">
          <p className="text-xs/4 opacity-90">Fernanda Personal</p>
          <h1 className="mt-1 text-2xl font-semibold">Olá, aluna 👋</h1>
          <p className="mt-1 text-sm opacity-90">
            Seu treino está pronto. Mantenha o foco e registre seu progresso.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs">
              Hoje: Treino A
            </span>
            <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs">
              6 exercícios
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Treino do dia</h2>
            <span className="text-xs text-muted-foreground">estimado: 45–60 min</span>
          </div>
          <Separator className="my-3" />
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Agachamento livre</span>
              <span className="text-muted-foreground">3 x 12</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Supino reto</span>
              <span className="text-muted-foreground">3 x 10</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Remada curvada</span>
              <span className="text-muted-foreground">3 x 10</span>
            </li>
          </ul>
          <div className="mt-4 flex gap-2">
            <Button asChild className="flex-1">
              <a href="/app/treinos">Iniciar treino</a>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <a href="/app/registros">Registrar conclusão</a>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href="/app/exercicios"
            className="rounded-lg border bg-card p-3 text-sm shadow-sm hover:bg-muted"
          >
            <div className="font-medium">Exercícios</div>
            <div className="text-xs text-muted-foreground">Catálogo e instruções</div>
          </a>
          <a
            href="/app/registros"
            className="rounded-lg border bg-card p-3 text-sm shadow-sm hover:bg-muted"
          >
            <div className="font-medium">Registros</div>
            <div className="text-xs text-muted-foreground">Histórico e progresso</div>
          </a>
          <a
            href="/app/treinos"
            className="rounded-lg border bg-card p-3 text-sm shadow-sm hover:bg-muted"
          >
            <div className="font-medium">Meus treinos</div>
            <div className="text-xs text-muted-foreground">A/B/… e versões</div>
          </a>
          <a
            href="/app/perfil"
            className="rounded-lg border bg-card p-3 text-sm shadow-sm hover:bg-muted"
          >
            <div className="font-medium">Perfil</div>
            <div className="text-xs text-muted-foreground">Dados e preferências</div>
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Dica: você pode usar o app mesmo offline. As alterações serão sincronizadas.
        </p>
      </section>
    </main>
  );
}