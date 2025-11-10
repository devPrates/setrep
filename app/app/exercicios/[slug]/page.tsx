import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { getExerciseBySlug } from "@/lib/workouts"

type PageProps = {
  params: { slug: string }
}

export default function ExercicioDetailPage({ params }: PageProps) {
  const exercise = getExerciseBySlug(params.slug)
  if (!exercise) return notFound()

  return (
    <div className="mx-auto max-w-md px-6 py-6 space-y-5">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">{exercise.name}</h1>
        <p className="text-sm text-muted-foreground">{exercise.equipment}</p>
      </header>

      <section className="grid gap-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md border bg-background p-3">
            <p className="text-muted-foreground">Séries</p>
            <p className="text-base font-medium">{exercise.sets}</p>
          </div>
          <div className="rounded-md border bg-background p-3">
            <p className="text-muted-foreground">Repetições</p>
            <p className="text-base font-medium">{exercise.reps}</p>
          </div>
        </div>

        {exercise.observation ? (
          <div className="rounded-md border bg-background p-3 text-sm">
            <p className="text-muted-foreground">Observação</p>
            <p className="mt-1 leading-relaxed">{exercise.observation}</p>
          </div>
        ) : null}

        <Separator />

        {exercise.videoUrl ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Vídeo de execução</p>
            <div className="aspect-video overflow-hidden rounded-md border bg-background">
              <iframe
                title={`Vídeo - ${exercise.name}`}
                src={exercise.videoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Sem vídeo cadastrado para este exercício.</p>
        )}
      </section>

      <footer className="flex justify-end">
        <Button size="sm" variant="secondary">Marcar concluído</Button>
      </footer>
    </div>
  )
}