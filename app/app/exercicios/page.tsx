import Link from "next/link"
import { workouts } from "@/lib/workouts"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dumbbell, CheckCircle2, Clock } from "lucide-react"
import Image from "next/image"

const dayOfWeekByGroup: Record<"A" | "B" | "C" | "D", string> = {
  A: "segunda-feira",
  B: "terça-feira",
  C: "quinta-feira",
  D: "sexta-feira",
}

function getTodayWorkout() {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(new Date())
    .toLowerCase()
  const match = workouts.find((w) => dayOfWeekByGroup[w.groupId] === weekday)
  return match ?? workouts[0]
}

export default function ExerciciosPage() {
  const today = getTodayWorkout()
  return (
    <div className="mx-auto max-w-xl px-6 py-6 space-y-6 md:max-w-2xl">
      <header className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center size-9 rounded-lg bg-white/20">
            <Dumbbell className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-secondary">Treino do dia</h1>
            <span className="text-xs opacity-90">{today.title} · {dayOfWeekByGroup[today.groupId]}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Badge className="bg-white/20 text-white border-white/30">Grupo {today.groupId}</Badge>
          <Badge className="bg-white/20 text-white border-white/30">
            <span className="inline-flex items-center gap-1"><Clock className="size-4" /> ~45–60 min</span>
          </Badge>
          <Badge className="bg-white/20 text-white border-white/30">{today.exercises.length} exercício(s)</Badge>
        </div>
      </header>

      <section>
        <Separator className="my-2" />
        <ul className="space-y-2">
          {today.exercises.map((ex) => (
            <li key={ex.slug} className="rounded-lg border bg-card px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {ex.gifUrl ? (
                    <Image src={ex.gifUrl} alt={ex.name} width={48} height={48} className="rounded-md" />
                  ) : (
                    <span className="inline-flex items-center justify-center size-8 rounded-md bg-muted text-foreground/70">
                      <CheckCircle2 className="size-5" />
                    </span>
                  )}
                  <div className="grid min-w-0">
                    <Link href={`/app/exercicios/${ex.slug}`} className="truncate font-medium">
                      {ex.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{ex.sets} séries · {ex.reps}</span>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  {ex.sets}×{ex.reps}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
