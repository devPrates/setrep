import data from "@/data/mock.json"

export type ExerciseDetail = {
  slug: string
  name: string
  equipment: string
  sets: number
  reps: string
  observation?: string
  videoUrl?: string | null
  gifUrl?: string
}

export type Workout = {
  slug: string
  title: string
  groupId: "A" | "B" | "C" | "D"
  exercises: ExerciseDetail[]
}

export const workouts: Workout[] = (data as { workouts: Workout[] }).workouts

export function getWorkoutBySlug(slug?: string): Workout | undefined {
  const normalized = normalizeWorkoutSlug(slug)
  if (!normalized) return undefined
  return workouts.find((w) => w.slug === normalized)
}

export function getExerciseBySlug(slug: string): ExerciseDetail | undefined {
  for (const w of workouts) {
    const found = w.exercises.find((e) => e.slug === slug)
    if (found) return found
  }
  return undefined
}

function normalizeWorkoutSlug(slug?: string): string {
  const s = typeof slug === "string" ? slug.trim().toLowerCase() : ""
  if (/^treino-[a-d]$/.test(s)) return s
  if (/^[a-d]$/.test(s)) return `treino-${s}`
  return s
}

if (process.env.NODE_ENV !== "production" && (!workouts || workouts.length === 0)) {
  throw new Error("workouts mock data not loaded: check data/mock.json path and tsconfig resolveJsonModule")
}

// fetch helpers removidos para evitar código não utilizado; páginas usam mock local