## Objetivo
- Parar de depender de import estático e buscar dados do JSON via fetch.
- Viabilizar futura troca para Prisma sem alterar páginas.

## Implementação
- Criar rota API `app/api/workouts/route.ts` que lê `data/mock.json` e retorna JSON; aceita `?slug=` para item único e normaliza `a..d` e `treino-a..d`.
- Atualizar `lib/workouts.ts` com helpers assíncronos: `fetchWorkouts()` e `fetchWorkoutBySlug(slug)` usando `fetch('/api/workouts')` com `no-store`.
- Atualizar `app/app/treinos/[slug]/page.tsx` para usar `fetchWorkoutBySlug` e renderizar; manter fallback ao `notFound()` se não vier.
- Opcional: atualizar páginas de exercícios para usar os mesmos helpers (mantêm import atual como fallback).

## Validação
- Acessar `/app/treinos/treino-a` e `/app/treinos/a` para confirmar renderização com dados do mock via fetch.
- Conferir carregamento dos GIFs nas listas e detalhe.

## Riscos
- Cache: usar `cache: 'no-store'` no fetch das páginas para obter sempre os dados.

Confirmado, vou aplicar as mudanças.