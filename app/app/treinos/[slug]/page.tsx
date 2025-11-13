import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getWorkoutBySlug } from "@/lib/workouts"
import { CheckCircle2, Dumbbell } from "lucide-react"

type PageProps = {
  params: { slug: string }
}

export default function TreinoDetailPage({ params }: PageProps) {
  const workout = getWorkoutBySlug(params.slug)
  if (!workout) return notFound()

  return (
    <div className="mx-auto max-w-xl px-6 py-6 space-y-6 md:max-w-2xl">
      <header className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center size-9 rounded-lg bg-white/20">
            <Dumbbell className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-secondary">{workout.title}</h1>
            <span className="text-xs opacity-90">Treino {workout.groupId}</span>
          </div>
        </div>
      </header>

      <section>
        <Separator className="my-4" />
        <ul className="space-y-2">
          {workout.exercises.map((ex) => (
            <li key={ex.slug} className="rounded-lg border bg-card px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex items-center justify-center size-8 rounded-md bg-muted text-foreground/70">
                    <CheckCircle2 className="size-5" />
                  </span>
                  <div className="grid min-w-0">
                    <Link href={`/app/exercicios/${ex.slug}`} className="truncate font-medium">
                      {ex.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{ex.sets} séries · {ex.reps}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {ex.sets}×{ex.reps}
                  </span>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/app/exercicios/${ex.slug}`}>Detalhes</Link>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex justify-end">
        <Button size="lg" className="font-medium">Iniciar treino {workout.groupId}</Button>
      </footer>
    </div>
  )
}
