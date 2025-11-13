"use client"
import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

type Entry = { status: "iniciado" | "concluido"; time: string }

type MonthCalendarProps = {
  entriesByDate?: Record<string, Entry[]>
  initialDate?: Date
  onSelectDate?: (date: Date) => void
}

function iso(d: Date) {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    .toISOString()
    .slice(0, 10)
}

function monthMatrix(base: Date) {
  const first = new Date(base.getFullYear(), base.getMonth(), 1)
  const last = new Date(base.getFullYear(), base.getMonth() + 1, 0)
  const startIdx = (first.getDay() + 6) % 7
  const daysInMonth = last.getDate()
  const cells = Array.from({ length: startIdx }, () => null as Date | null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => new Date(base.getFullYear(), base.getMonth(), i + 1)))
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

const weekday = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

export function MonthCalendar({ entriesByDate = {}, initialDate, onSelectDate }: MonthCalendarProps) {
  const [current, setCurrent] = useState<Date>(initialDate ?? new Date())
  const weeks = useMemo(() => monthMatrix(current), [current])
  const label = useMemo(() => {
    return current.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
  }, [current])
  const todayIso = iso(new Date())

  function prev() {
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))
  }
  function next() {
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))
  }

  return (
    <div className="">
      <div className="flex items-center justify-between p-3">
        <div className="font-secondary text-lg font-semibold tracking-tight">{label}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" aria-label="Mês anterior" onClick={prev}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Próximo mês" onClick={next}>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0 px-0 pb-3">
        {weekday.map((w) => (
          <div
            key={w}
            className="flex items-center justify-center bg-muted/40 py-2 text-sm font-semibold text-muted-foreground"
          >
            {w}
          </div>
        ))}
        {weeks.flatMap((week, wi) =>
          week.map((d, di) => {
            if (!d)
              return (
                <div
                  key={`empty-${wi}-${di}`}
                  className="h-24 rounded-none bg-background"
                />
              )
            const key = iso(d)
            const entries = entriesByDate[key] ?? []
            const isToday = key === todayIso
            return (
              <button
                key={key}
                className={`group flex h-24 w-full flex-col items-start justify-between rounded-none bg-background p-4 text-left transition hover:bg-muted overflow-hidden`}
                onClick={() => onSelectDate?.(d)}
              >
                {isToday ? (
                  <span className="rounded-sm bg-primary px-2 py-0.5 text-sm font-semibold text-primary-foreground">
                    {d.getDate().toString().padStart(2, "0")}
                  </span>
                ) : (
                  <span className="text-sm font-semibold">
                    {d.getDate().toString().padStart(2, "0")}
                  </span>
                )}
                <div className="mt-auto flex w-full items-center justify-center">
                  {entries.some((e) => e.status === "concluido") ? (
                    <span className="inline-flex items-center justify-center gap-1 rounded-sm bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                      <Check className="size-3" />
                    </span>
                  ) : null}
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
