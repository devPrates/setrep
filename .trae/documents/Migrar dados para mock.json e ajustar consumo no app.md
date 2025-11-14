## Objetivos
- Remover arquivos não utilizados.
- Criar `data/mock.json` com treinos A..D e exercícios, incluindo `gifUrl` 180x180.
- Autorizar GIFs do domínio `static.exercisedb.dev`.
- Ajustar app para consumir dados do `mock.json` (futuro Prisma).
- Padronizar slugs de treinos para `treino-a`, `treino-b`, etc. (compatível com rotas atuais).

## Limpeza
- Remover `components/ui/input-group.tsx` (sem usos).
- Manter `lib/workouts.ts` como fachada e migrar para ler `mock.json`.

## Mock
- Criar `data/mock.json` com estrutura:
  - `workouts`: `[ { slug: "treino-a", title: "Treino A", groupId: "A", exercises: [ { slug, name, equipment, sets, reps, observation, gifUrl } ] }, ... ]`
  - Usar `gifUrl: "https://static.exercisedb.dev/media/7aolH9D.gif"` para todos.

## GIFs
- Criar `next.config.mjs` com `images.remotePatterns` para `https://static.exercisedb.dev/media/*`.
- (Opcional) CSP `img-src` para endurecer políticas.

## Código
- `lib/workouts.ts`: importar `mock.json`, exportar tipos e helpers (`getWorkoutBySlug`, `getExerciseBySlug`).
- Compatibilidade de rotas:
  - Aceitar slugs antigos `a|b|c|d` e mapear para `treino-a|...` até atualização completa (fallback interno em helpers).
- Páginas:
  - `/app/treinos` e `/app/treinos/[slug]`: usar helpers; exibir `gifUrl` no detalhe.
  - `/app/exercicios` e `/app/exercicios/[slug]`: usar helpers; exibir `gifUrl` com `next/image` (ou `<img>` se houver problemas com GIF).

## Validação
- Build e dev; verificar carregamento dos GIFs e navegação com novos slugs.
- Testar compatibilidade: acessar `/app/treinos/a` e `/app/treinos/treino-a`.

## Riscos
- GIF animado via `next/image`: se não animar, usar `<img>`.
- Migração de slugs: manter fallback para evitar 404.

Posso executar essas alterações e padronizar os slugs para `treino-*` com fallback temporário?