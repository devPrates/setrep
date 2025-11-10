export type ExerciseDetail = {
  slug: string
  name: string
  equipment: string
  sets: number
  reps: string
  observation?: string
  videoUrl?: string | null
}

export type Workout = {
  slug: string // "a" | "b" | "c" | "d"
  title: string
  groupId: "A" | "B" | "C" | "D"
  exercises: ExerciseDetail[]
}

export const workouts: Workout[] = [
  {
    slug: "a",
    title: "Treino A",
    groupId: "A",
    exercises: [
      {
        slug: "agachamento-livre",
        name: "Agachamento livre",
        equipment: "Barra e suporte",
        sets: 4,
        reps: "8–12",
        observation: "Mantenha a coluna neutra e o core ativo.",
        videoUrl: "https://www.youtube.com/embed/1fQUZAnO7w8",
      },
      {
        slug: "supino-reto",
        name: "Supino reto",
        equipment: "Banco e barra",
        sets: 4,
        reps: "8–10",
        observation: "Pés firmes no chão; controle a descida.",
        videoUrl: "https://www.youtube.com/embed/VW2nBkgC4C8",
      },
      {
        slug: "remada-curvada",
        name: "Remada curvada",
        equipment: "Barra",
        sets: 4,
        reps: "10–12",
        observation: "Evite balanço; mantenha as escápulas ativas.",
        videoUrl: "https://www.youtube.com/embed/GZbfZ033f74",
      },
    ],
  },
  {
    slug: "b",
    title: "Treino B",
    groupId: "B",
    exercises: [
      {
        slug: "levantamento-terra",
        name: "Levantamento terra",
        equipment: "Barra",
        sets: 4,
        reps: "6–8",
        observation: "Barriga contraída e barra próxima às pernas.",
        videoUrl: "https://www.youtube.com/embed/Vy8bZ1zK_EA",
      },
      {
        slug: "barra-fixa",
        name: "Barra fixa",
        equipment: "Barra",
        sets: 4,
        reps: "6–10",
        observation: "Queixo acima da barra; evite impulso excessivo.",
        videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
      },
      {
        slug: "desenvolvimento-militar",
        name: "Desenvolvimento militar",
        equipment: "Barra ou halteres",
        sets: 3,
        reps: "8–10",
        observation: "Glúteos contraídos e costelas para baixo.",
        videoUrl: "https://www.youtube.com/embed/B-aVuyhvLHU",
      },
    ],
  },
  {
    slug: "c",
    title: "Treino C",
    groupId: "C",
    exercises: [
      {
        slug: "afundo",
        name: "Afundo (split squat)",
        equipment: "Halteres (opcional)",
        sets: 3,
        reps: "10–12",
        observation: "Joelho acompanha a ponta do pé; tronco ereto.",
        videoUrl: "https://www.youtube.com/embed/2x8o9I1GmKk",
      },
      {
        slug: "crucifixo-inclinado",
        name: "Crucifixo inclinado",
        equipment: "Banco inclinado e halteres",
        sets: 3,
        reps: "10–12",
        observation: "Cotovelos levemente flexionados durante o movimento.",
        videoUrl: "https://www.youtube.com/embed/eozdVDA78K0",
      },
      {
        slug: "remada-baixa",
        name: "Remada baixa",
        equipment: "Cabo",
        sets: 3,
        reps: "10–12",
        observation: "Puxe com as costas; mantenha a lombar neutra.",
        videoUrl: "https://www.youtube.com/embed/pYcpY20QaE8",
      },
    ],
  },
  {
    slug: "d",
    title: "Treino D",
    groupId: "D",
    exercises: [
      {
        slug: "agachamento-frontal",
        name: "Agachamento frontal",
        equipment: "Barra",
        sets: 3,
        reps: "8–10",
        observation: "Cotovelos altos e tronco ereto.",
        videoUrl: "https://www.youtube.com/embed/sEl5iZzD9sI",
      },
      {
        slug: "paralelas",
        name: "Paralelas",
        equipment: "Barras paralelas",
        sets: 3,
        reps: "6–10",
        observation: "Incline levemente para ativar peitoral.",
        videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As",
      },
      {
        slug: "remada-unilateral",
        name: "Remada unilateral",
        equipment: "Halter",
        sets: 3,
        reps: "10–12",
        observation: "Apoie bem o tronco; puxe com dorsais.",
        videoUrl: "https://www.youtube.com/embed/6TSP1TRMUzs",
      },
    ],
  },
]

export function getWorkoutBySlug(slug: string): Workout | undefined {
  return workouts.find((w) => w.slug === slug)
}

export function getExerciseBySlug(slug: string): ExerciseDetail | undefined {
  for (const w of workouts) {
    const found = w.exercises.find((e) => e.slug === slug)
    if (found) return found
  }
  return undefined
}