import Link from "next/link";
import { workouts } from "@/lib/workouts";
import { Dumbbell, CalendarDays, List, Clock } from "lucide-react";

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
    <div className="mx-auto max-w-md px-6 py-6 space-y-5">
      <header>
        <div className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-4 text-white shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Dumbbell className="size-5 opacity-90" aria-hidden />
              Meus treinos
            </h1>
        <div className="flex items-center justify-around gap-2">
              <div className="inline-flex items-center gap-2 rounded-md bg-white/20 px-2 py-1">
                <CalendarDays className="size-4" aria-hidden />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] uppercase tracking-wide">Treinos</span>
                  <span className="text-xs font-medium">{registeredWorkoutsCount} registrado(s)</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/20 px-2 py-1">
                <Clock className="size-4" aria-hidden />
                <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-wide">Duração (min)</span>
            <span className="text-xs font-medium">~45–60</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-2 text-sm opacity-90">Toque em um card para ver os exercícios</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {workouts.map((w) => (
              <span
                key={`legend-${w.slug}`}
                className="inline-flex items-center rounded-md bg-white/15 px-2 py-1 text-xs"
              >
                {w.groupId}: {dayOfWeekByGroup[w.groupId]}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {workouts.map((w) => (
          <Link
            key={w.slug}
            href={`/app/treinos/${w.slug}`}
            className="group overflow-hidden rounded-lg border bg-card shadow-xs transition hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {/* Banner superior, inspirado no "Iniciar" da home */}
            <div className="bg-linear-to-br from-gray-600 to-gray-400 p-4 text-white">
              <div className="flex items-center justify-between">
          <div className="flex items-center justify-around gap-2">
                  <span className="inline-flex size-7 items-center justify-center rounded-md bg-white/20 text-xs font-medium">
                    {w.groupId}
                  </span>
                  <span className="text-base font-semibold">
                    {w.title} ({dayOfWeekByGroup[w.groupId]})
                  </span>
                </div>
                <span className="text-xs opacity-90">
                  {w.exercises.length} exercício(s)
                </span>
              </div>
            </div>

            {/* Corpo do card */}
            <div className="px-4 py-3">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-foreground">
                    <th className="py-1 text-left font-semibold">Exercício</th>
                    <th className="py-1 text-center font-semibold">Séries</th>
                    <th className="py-1 text-center font-semibold">Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {w.exercises.slice(0, 3).map((ex) => (
                    <tr key={ex.slug} className="border-t">
                      <td className="py-1 pr-2 truncate text-muted-foreground">{ex.name}</td>
                      <td className="py-1 text-center text-muted-foreground">{ex.sets}</td>
                      <td className="py-1 text-center text-muted-foreground">{ex.reps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[11px] text-muted-foreground">Toque para abrir e ver todos os exercícios</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}