"use client"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import type { ExerciseDetail } from "@/lib/workouts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type Props = {
  exercise: ExerciseDetail
  workoutSlug: string
  loopMs?: number
}

export default function ExerciseCard({ exercise, workoutSlug, loopMs = 6000 }: Props) {
  const [tick, setTick] = useState(0)
  const imgSrc = useMemo(() => {
    const url = exercise.gifUrl || ""
    if (!url) return ""
    const sep = url.includes("?") ? "&" : "?"
    return `${url}${sep}t=${tick}`
  }, [exercise.gifUrl, tick])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!exercise.gifUrl) return
    intervalRef.current && clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setTick((v) => v + 1), loopMs)
    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [exercise.gifUrl, loopMs])

  return (
    <Card className="group overflow-hidden">
      <div className="relative">
        {exercise.gifUrl ? (
          <img src={imgSrc} alt={exercise.name} className="w-full h-28 object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-28 bg-muted" />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-transparent p-3">
          <Link href={`/app/treinos/${workoutSlug}/${exercise.slug}`} className="font-secondary text-white text-base font-semibold">
            {exercise.name}
          </Link>
        </div>
      </div>
      <div className="p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="px-2 py-0.5 text-[11px]">{exercise.equipment}</Badge>
          <Badge variant="outline" className="px-2 py-0.5 text-[11px]">{exercise.sets} séries</Badge>
          <Badge variant="outline" className="px-2 py-0.5 text-[11px]">{exercise.reps}</Badge>
        </div>
      </div>
      <div className="flex items-center justify-end p-3 pt-0">
        <Button size="sm" variant="ghost" asChild>
          <Link href={`/app/treinos/${workoutSlug}/${exercise.slug}`}>Detalhes</Link>
        </Button>
      </div>
    </Card>
  )
}