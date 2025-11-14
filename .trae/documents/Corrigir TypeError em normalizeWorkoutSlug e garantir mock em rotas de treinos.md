## Causa
- `normalizeWorkoutSlug` ainda recebe `slug` não-string em algum fluxo e chama `trim`, gerando TypeError.
- Possível cache/hot-reload não aplicou a versão tolerante; ou `getWorkoutBySlug` mantém assinatura rígida.

## Ajustes Propostos
1. Tornar `getWorkoutBySlug` tolerante a ausência de slug:
   - Assinatura: `getWorkoutBySlug(slug?: string)`.
   - Se `slug` vazio após normalização, retornar `undefined`.
2. Fortalecer `normalizeWorkoutSlug` (case-insensitive e seguro para `undefined`) — se ainda não estiver assim no build atual.
3. Adicionar guard no page server component:
   - Em `app/app/treinos/[slug]/page.tsx`, antes de buscar: `if (!params?.slug) return notFound()`.
4. Validar import do `mock.json`:
   - Manter `import data from '@/data/mock.json'` (tsconfig `resolveJsonModule` já ativo). Confirmar que `workouts.length > 0` em dev.
5. Reiniciar o dev server para garantir aplicação das mudanças e do `next.config.mjs`.

## Testes
- Acessar `/app/treinos/treino-a` e `/app/treinos/a`.
- Confirmar renderização e carregamento dos GIFs.

Confirma que posso aplicar os ajustes acima e reiniciar o servidor de desenvolvimento?