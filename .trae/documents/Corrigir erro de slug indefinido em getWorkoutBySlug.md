## Causa
- A função `normalizeWorkoutSlug` assume que `slug` é sempre string e chama `trim()`, gerando TypeError quando `slug` vem `undefined`.

## Ajuste
- Tornar `normalizeWorkoutSlug` tolerante: aceitar `slug?: string` e proteger com cast seguro.
- Em `getWorkoutBySlug`, retornar `undefined` quando a normalização resultar em string vazia.

## Validação
- Acessar `/app/treinos/treino-a` e `/app/treinos/a` para confirmar que renderiza sem 404.
- Conferir que dados do `mock.json` continuam carregando corretamente.

Posso aplicar o ajuste na função e validar no servidor em execução?