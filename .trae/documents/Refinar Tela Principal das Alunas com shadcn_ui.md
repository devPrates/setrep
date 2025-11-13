## Objetivos
- Tornar a tela mais profissional, legível e focada em ação.
- Aumentar tipografia e áreas clicáveis sem perder hierarquia visual.
- Usar componentes e tokens do shadcn/ui para consistência.

## Diretrizes de Tipografia e Espaçamento
- Container: alterar `max-w-md` → `max-w-xl` (mobile) e `max-w-2xl` (md+).
- Títulos: H1 `text-3xl md:text-4xl` com `font-semibold` e `tracking-tight`.
- Parágrafos: `text-base` (antes `text-sm`) e meta `text-sm` (antes `text-xs`).
- Espaçamentos: aumentar `p-4` → `p-5/6` em cards e `gap-2` → `gap-3` em grupos.

## Hero (saudação e status)
- Card com gradiente existente, ampliar padding e tipografia.
- Adicionar `Avatar` da aluna (iniciais) à esquerda do H1.
- Substituir chips por `Badge` com ícones Lucide (`Dumbbell` para treino, `ListChecks` para exercícios).
- Informar duração estimada com `Clock` e `text-sm`.

## Treino do Dia
- Cabeçalho: `text-base md:text-lg` com peso médio.
- Lista de exercícios: cada item com ícone discreto (`CheckCircle2`), nome `text-base` e série em `text-sm text-muted-foreground`.
- Botões: `Button` com `size="lg"`; primário “Iniciar treino” ocupa largura total em mobile, secundário “Registrar conclusão” mantém `variant="outline"`.
- Separador: manter `Separator` e aumentar `my-3` → `my-4`.

## Atalhos (grid)
- Cards: `rounded-lg border bg-card p-4 md:p-5 shadow-sm`.
- Títulos: `text-base font-medium`; subtítulos `text-sm text-muted-foreground`.
- Ícones Lucide nos quatro cards (Exercícios, Registros, Meus treinos, Perfil) para reforçar affordance.

## Acessibilidade e Feedback
- Área de toque mínima `min-h-[44px]` em botões e cards.
- Foco visível: já suportado pelo shadcn; manter `focus-visible` padrão.
- Microinterações: hover com `shadow-md` e leve `scale-[0.99→1]` usando `tw-animate-css`.

## Componentes e Dependências
- Já presentes: `Button`, `Separator`, `lucide-react`.
- Adicionar via shadcn (quando aprovado): `badge`, `card`, `avatar`, `progress` (opcional), `tabs` (opcional).

## Arquivos Alvo
- `app/app/page.tsx`: aplicar todas as alterações de layout, tipografia e ícones.
- Opcional: `components/ui/*`: adicionar novos componentes shadcn (badge, card, avatar).
- Não alterar backend; apenas UI.

## Entrega e Validação
- Implementar alterações em um único PR com preview.
- Validar responsividade (mobile-first), contraste e estados de foco.
- Verificar que Lighthouse/Accessibilidade permanece ≥ AA.

## Riscos e Mitigações
- Aumento de fonte pode quebrar layout: usar `max-w` e `overflow-wrap`.
- Novos componentes exigem tree-shaking: importar apenas o necessário.

Confirma que posso executar essas alterações e adicionar os componentes shadcn necessários?