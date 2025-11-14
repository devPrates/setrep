## Hipóteses
- O slug não está normalizado (maiúsculas/espacos) e `getWorkoutBySlug` retorna `undefined`.
- O `mock.json` não foi carregado (import/resolução) e `workouts` está vazio.
- O dev server não reiniciou após `next.config.mjs`/novos arquivos.

## Verificações e Ajustes
1. Instrumentar `getWorkoutBySlug` para robustez:
   - `trim()` e `toLowerCase()` no slug.
   - Normalização aceita `a|b|c|d` e `treino-a|...` (já existe, ampliar para case-insensitive).
2. Garantir carregamento do `mock.json`:
   - Confirmar caminho `@/data/mock.json` (ok) e `resolveJsonModule` (ok no `tsconfig`).
   - Se `workouts.length === 0`, lançar erro visível para diagnosticar em dev.
3. Reiniciar o dev server para aplicar `next.config.mjs` e novos arquivos.

## Implementação
- Atualizar `lib/workouts.ts`:
  - Normalização: `slug.trim().toLowerCase()` antes de regex.
  - Guard de dados: lançar erro em dev se `workouts` estiver vazio.
- Sem efeitos colaterais nas páginas (todas dependem dos helpers).

## Validação
- Acessar `/app/treinos/treino-a` e verificar renderização.
- Acessar `a` (fallback) `/app/treinos/a` para confirmar compat.
- Verificar thumbnails dos exercícios (GIFs) carregam.

Confirma que posso aplicar essas mudanças e reiniciar o dev server para validar?