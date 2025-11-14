import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dumbbell } from "lucide-react"
import type { Workout } from "@/lib/workouts"
import { getWorkoutBySlug } from "@/lib/workouts"
import { Badge } from "@/components/ui/badge"
import ExerciseCard from "@/components/app/exercise-card"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function TreinoDetailPage({ params }: PageProps) {
  const p = await params
  if (!p?.slug) return notFound()
  const workout: Workout | undefined = getWorkoutBySlug(p.slug)
  if (!workout) return notFound()

  return (
    <div className="mx-auto max-w-xl px-6 py-6 space-y-6 md:max-w-2xl">
      <header className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center size-9 rounded-lg bg-white/20">
              <Dumbbell className="size-5" aria-hidden />
            </span>
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-secondary">{workout.title}</h1>
              <span className="text-xs opacity-90">Treino {workout.groupId}</span>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">{workout.exercises.length} exercício(s)</Badge>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Badge className="bg-white/20 text-white border-white/30">Grupo {workout.groupId}</Badge>
        </div>
      </header>

      <section>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-2">
          {workout.exercises.map((ex) => (
            <ExerciseCard key={ex.slug} exercise={ex} workoutSlug={workout.slug} />
          ))}
        </div>
      </section>

      <footer className="flex justify-end">
        <Button size="lg" className="font-medium">Iniciar treino {workout.groupId}</Button>
      </footer>
    </div>
  )
}
