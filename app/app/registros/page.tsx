"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, CheckCircle2, Clock } from "lucide-react"
import { MonthCalendar } from "@/components/ui/month-calendar"
import { useMemo, useState } from "react"

type Registro = {
  date: string
  status: "iniciado" | "concluido"
  time: string
  note?: string
}

const mockRegistros: Registro[] = [
  { date: new Date().toISOString().slice(0, 10), status: "iniciado", time: "07:45", note: "Aquecimento" },
  { date: new Date().toISOString().slice(0, 10), status: "concluido", time: "08:50", note: "Treino A" },
]

function startOfWeek(d: Date) {
  const date = new Date(d)
  const day = date.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  date.setDate(date.getDate() + diff)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function getWeekDays(base: Date) {
  const s = startOfWeek(base)
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(s)
    d.setDate(s.getDate() + i)
    return d
  })
}

const weekdayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

export default function RegistrosPage() {
  const byDate = useMemo(() => {
    const m = new Map<string, Registro[]>()
    for (const r of mockRegistros) {
      const arr = m.get(r.date) ?? []
      arr.push(r)
      m.set(r.date, arr)
    }
    return m
  }, [])
  const entriesByDate = useMemo(() => {
    const obj: Record<string, { status: "iniciado" | "concluido"; time: string }[]> = {}
    for (const [k, v] of byDate.entries()) obj[k] = v.map(({ status, time }) => ({ status, time }))
    return obj
  }, [byDate])
  const [selected, setSelected] = useState<string>(new Date().toISOString().slice(0, 10))
  const selectedEntries = byDate.get(selected) ?? []

  return (
    <div className="mx-auto max-w-xl px-6 py-6 space-y-6 md:max-w-2xl">
      <header className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center size-9 rounded-lg bg-white/20">
            <CalendarDays className="size-5" aria-hidden />
          </span>
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-secondary">Registros</h1>
            <span className="text-xs opacity-90">Calendário mensal</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Badge className="bg-white/20 text-white border-white/30">Semana atual</Badge>
        </div>
      </header>

      <section>
        <Separator className="my-3" />
        <MonthCalendar
          entriesByDate={entriesByDate}
          onSelectDate={(d) => setSelected(d.toISOString().slice(0, 10))}
        />
      </section>

      <section>
        <h2 className="mt-4 text-base font-medium">Registros do dia</h2>
        <Separator className="my-2" />
        <div className="space-y-2">
          {selectedEntries.length === 0 ? (
            <span className="text-sm text-muted-foreground">Sem registros</span>
          ) : (
            selectedEntries.map((e, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
                <span className="inline-flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center justify-center size-7 rounded-md bg-muted text-foreground/70">
                    {e.status === "concluido" ? <CheckCircle2 className="size-4" /> : <Clock className="size-4" />}
                  </span>
                  {e.status}
                </span>
                <span className="text-sm text-muted-foreground">{e.time}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="flex justify-end">
        <Link href="/app/registros" className="text-xs text-muted-foreground">Ver histórico completo</Link>
      </footer>
    </div>
  )
}
