import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field"
import { Settings, CloudOff, CloudCheck } from "lucide-react"

export default function PerfilPage() {
  const online = true
  return (
    <div className="mx-auto max-w-xl px-6 py-6 space-y-6 md:max-w-2xl">
      <header className="rounded-xl bg-linear-to-br from-violet-600 to-violet-400 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Avatar name="Aluna" size="lg" className="bg-white/20 text-white" />
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl font-secondary">Perfil</h1>
              <span className="text-xs opacity-90">Dados e preferências</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Badge className="bg-white/20 text-white border-white/30 inline-flex items-center gap-1">
            <Settings className="size-4" /> Preferências
          </Badge>
          <Badge className="bg-white/20 text-white border-white/30 inline-flex items-center gap-1">
            {online ? <CloudCheck className="size-4" /> : <CloudOff className="size-4" />} {online ? "online" : "offline"}
          </Badge>
        </div>
      </header>

      <section>
        <FieldSet>
          <FieldLegend>Informações básicas</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nome">Nome</FieldLabel>
              <FieldContent>
                <Input id="nome" placeholder="Seu nome" />
                <FieldDescription>Usado para personalizar a experiência.</FieldDescription>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input id="email" placeholder="email@exemplo.com" disabled />
                <FieldDescription>Email é gerenciado pelo sistema.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>

        <Separator className="my-4" />

        <FieldSet>
          <FieldLegend>Preferências</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="objetivo">Objetivo</FieldLabel>
              <FieldContent>
                <Input id="objetivo" placeholder="Ex.: hipertrofia, resistência" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="observacoes">Observações</FieldLabel>
              <FieldContent>
                <Textarea id="observacoes" rows={4} placeholder="Anote preferências, limitações ou instruções do personal" />
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="lg">Descartar</Button>
          <Button size="lg">Salvar</Button>
        </div>
      </section>
    </div>
  )
}
