import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { getExerciseBySlug } from "@/lib/workouts"
import { Dumbbell } from "lucide-react"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ExercicioDetailPage({ params }: PageProps) {
  const p = await params
  const exercise = getExerciseBySlug(p.slug)
  if (!exercise) return notFound()

  return (
    <div className="mx-auto max-w-xl px-6 py-6 space-y-6 md:max-w-2xl">
      <header className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center size-9 rounded-lg bg-white/20">
            <Dumbbell className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-secondary">{exercise.name}</h1>
            <span className="text-xs opacity-90">{exercise.equipment}</span>
          </div>
        </div>
      </header>

      <section className="grid gap-3">
        {exercise.gifUrl ? (
          <div className="flex justify-center">
            <img src={exercise.gifUrl} alt={exercise.name} className="size-[180px] rounded-md object-cover" loading="lazy" />
          </div>
        ) : null}
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
        <Button size="lg" className="font-medium">Marcar concluído</Button>
      </footer>
    </div>
  )
}
