import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getWorkoutBySlug } from "@/lib/workouts"

type PageProps = {
  params: { slug: string }
}

export default function TreinoDetailPage({ params }: PageProps) {
  const workout = getWorkoutBySlug(params.slug)
  if (!workout) return notFound()

  return (
    <div className="mx-auto max-w-md px-6 py-6 space-y-5">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary-foreground/20 text-xs font-medium">
            {workout.groupId}
          </span>
          <h1 className="text-xl font-semibold">{workout.title}</h1>
        </div>
        <p className="text-sm text-muted-foreground">Treino do dia com exercícios e detalhes.</p>
      </header>

      <section>
        <Separator className="my-3" />
        <ul className="space-y-2">
          {workout.exercises.map((ex) => (
            <li key={ex.slug} className="rounded-md border bg-background px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <div className="grid min-w-0 gap-0.5">
                  <Link href={`/app/exercicios/${ex.slug}`} className="truncate font-medium underline-offset-2 hover:underline">
                    {ex.name}
                  </Link>
                  <span className="text-xs text-muted-foreground">{ex.sets} séries · {ex.reps}</span>
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
        <Button size="sm" className="font-medium">Iniciar treino {workout.groupId}</Button>
      </footer>
    </div>
  )
}