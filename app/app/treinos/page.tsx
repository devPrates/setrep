import Link from "next/link";
import { workouts } from "@/lib/workouts";
import { Dumbbell, CalendarDays, ListChecks, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dayOfWeekByGroup: Record<"A" | "B" | "C" | "D", string> = {
  A: "segunda-feira",
  B: "terça-feira",
  C: "quinta-feira",
  D: "sexta-feira",
};

export default function TreinosPage() {
  // Contagem de treinos registrados (placeholder até integrar com registros reais)
  const registeredWorkoutsCount = 0;
  return (
    <div className="mx-auto max-w-xl px-6 py-6 space-y-6 md:max-w-2xl">
      <header>
        <div className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center size-9 rounded-lg bg-white/20">
              <Dumbbell className="size-5" aria-hidden />
            </span>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-secondary">Meus treinos</h1>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30">
              <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" /> {registeredWorkoutsCount} registrado(s)</span>
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              <span className="inline-flex items-center gap-1"><Clock className="size-4" /> ~45–60 min</span>
            </Badge>
          </div>
          <p className="mt-3 text-sm opacity-90">Toque em um card para ver os exercícios</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {workouts.map((w) => (
              <Badge key={`legend-${w.slug}`} className="bg-white/15 text-white border-white/20">
                {w.groupId}: {dayOfWeekByGroup[w.groupId]}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {workouts.map((w) => (
          <Link
            key={w.slug}
            href={`/app/treinos/${w.slug}`}
            className="group overflow-hidden rounded-lg border bg-card shadow-xs transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <div className="bg-linear-to-br from-violet-600 to-violet-400 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-9 rounded-lg bg-white/20">
                    <ListChecks className="size-5" />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center size-7 rounded-md bg-white/20 text-xs font-semibold">
                      {w.groupId}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-base font-semibold font-secondary">{w.title}</span>
                      <span className="text-xs opacity-90">{dayOfWeekByGroup[w.groupId]}</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">{w.exercises.length} exercício(s)</Badge>
              </div>
            </div>

            <div className="px-4 py-3">
              <ul className="space-y-2">
                {w.exercises.slice(0, 3).map((ex) => (
                  <li key={ex.slug} className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-3 text-sm md:text-base">
                      <span className="inline-flex items-center justify-center size-7 rounded-md bg-muted text-foreground/70">
                        <CheckCircle2 className="size-4" />
                      </span>
                      {ex.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{ex.sets}×{ex.reps}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] text-muted-foreground">Toque para abrir e ver todos os exercícios</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
