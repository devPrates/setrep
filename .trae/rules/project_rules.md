# SetRep - Regras do Projeto

> Documento de governança técnica e funcional do produto.
> Foco: Next.js + Prisma (PostgreSQL) + PWA, sem seção de testes e deploy neste momento.

---

## 1. Visão e Objetivos
- Entregar um PWA para personal trainer gerenciar alunas, exercícios, treinos (A/B/...) e biografia.
- Permitir que alunas façam login, visualizem e registrem treinos (início, conclusão, observação), inclusive offline.
- Priorizar simplicidade, segurança e experiência mobile-first.

## 2. Stack e Arquitetura
- Frontend: Next.js (App Router), TypeScript, componentes server-first quando possível.
- Backend: rotas `api/` do Next.js com regras de negócio e autorização por papel.
- ORM: Prisma com PostgreSQL.
- Autenticação/Sessão: sessões persistentes em cookies seguros; papel `personal` e `aluna`.
- PWA: Manifest, Service Worker, cache de treinos/exercícios e fila de sincronização (IndexedDB) para registros.
 - Observabilidade: logs estruturados e métricas de uso/erros (sem PII em logs).
 - UI: biblioteca de componentes `shadcn/ui` com Tailwind; inclusão via CLI e registro em `components.json`; privilegiar componentes server-first quando aplicável.

## 3. Padrões de Código
- TypeScript estrito; evitar `any` e casts desnecessários.
- Nomes descritivos e consistentes; inglês em código e português em cópia/UX.
- Estrutura sugerida:
  - `app/` (rotas, páginas e layouts)
  - `app/api/` (rotas HTTP)
  - `components/` (UI reutilizável)
  - `lib/` (utilidades, autenticação, autorização, pwa helpers)
  - `db/` (cliente Prisma e queries específicas)
  - `types/` (tipos e contratos)
- Separar responsabilidade: validação de entrada no servidor; UI sem lógica de negócio.
- ASCII em documentos de regras/PRD para evitar parsing problemático.
 - UI (shadcn/ui): utilizar componentes da biblioteca como base; estilização via Tailwind e variantes do próprio componente; acessibilidade embutida; componentes residem em `components/` com customizações mínimas e consistentes; evitar CSS custom fora da biblioteca nesta fase.

## 4. Segurança e Privacidade
- Autorização por papel e escopo: `personal` só acessa suas alunas; `aluna` só acessa seus recursos.
- Senhas (se houver credenciais): hash forte (bcrypt/argon2) e nunca em logs.
- Cookies de sessão com `Secure`, `HttpOnly`, `SameSite` apropriado; expiração padrão 14 dias.
- Dados pessoais mínimos; consentimento explícito; retenção de registros conforme PRD.
- Nunca expor segredos no código; usar variáveis de ambiente e `.env.example` sem valores reais.

## 5. Banco de Dados (PostgreSQL + Prisma)
- Convenções: nomes snake_case nas tabelas/colunas do DB; modelos Prisma com nomes PascalCase.
- Integridade referencial: `restrict` onde histórico é crítico; `cascade` apenas em associações derivadas (ex.: treino_exercicios).
- Exclusão lógica (`ativo`/`deleted_at`) quando houver histórico vinculado.
- Índices: por chave de relacionamento (`aluna_id`, `treino_id`) e buscas frequentes.
- Unicidade: email único global em `users`; ordem única por treino em `treino_exercicios`.
- Versionamento de treinos: campo `versao` incrementado em alterações significativas.
- Campos principais conforme DBML:
  - `exercicios.video_url` opcional para link de execução.

## 6. APIs e Contratos
- Padrão REST simples; rotas sob `/api/*`.
- Recursos principais:
  - Alunas: `POST /api/alunas`, `GET /api/alunas`, `PATCH /api/alunas/:id`, `DELETE /api/alunas/:id`.
  - Exercícios: `POST /api/exercicios`, `GET /api/exercicios`, `PATCH /api/exercicios/:id`, `DELETE /api/exercicios/:id` (campo opcional `video_url`).
  - Treinos: `POST /api/treinos`, `GET /api/treinos?alunaId=...`, `PATCH /api/treinos/:id`, `DELETE /api/treinos/:id`.
  - Registros: `POST /api/registros` (início/conclusão), `GET /api/registros?alunaId=&periodo=`, `PATCH /api/registros/:id`.
- Respostas: JSON com envelope de erro padronizado (`code`, `message`, `details`).
- Validação: toda entrada validada no servidor; recusar payloads inválidos.
- Autorização: middleware/verificações por papel e escopo em cada rota.

## 7. PWA e Offline
- Cache: manifest + SW para assets estáticos, treinos e exercícios do usuário logado.
- Fila Offline: registros de treino salvos em IndexedDB; sincronização automática ao reconectar.
- Reconciliação: em conflito, prevalece o registro mais recente do cliente com marcação de origem; log de conflito.
- Indicadores: UI deve sinalizar status `online/offline` e `sync pendente`.

## 8. Logs e Observabilidade
- Logs estruturados com níveis (`info`, `warn`, `error`); sem PII.
- Correlação: incluir `request_id`/`user_id` quando aplicável.
- Métricas: contagem de `workout_start`, `workout_complete`, sucesso/erro de sync.

## 9. Acessibilidade e UX
- Mobile-first; navegação clara e foco visível.
- Texto legível e contrastes conforme WCAG AA.
- Fluxos: criar treino simples (≤5 minutos), registro de treino com poucos toques.
- Offline: UI sempre indica modo offline e progresso de sincronização.

## 10. Internacionalização
- Idioma padrão: PT-BR.
- Preparar strings em arquivo único para futura i18n; evitar hardcode em componentes.

## 11. Variáveis de Ambiente
- Documentar em `.env.example` (sem valores reais):
  - `DATABASE_URL` (PostgreSQL)
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`
  - `AUTH_EMAIL_SERVER` (opcional)
  - `AUTH_EMAIL_FROM` (opcional)
  - `NODE_ENV`
  - `NEXT_PUBLIC_APP_URL`
  - `NEXT_PUBLIC_APP_NAME` (ex.: SetRep)
- Nunca commitar `.env` com valores reais; verificar variáveis antes de executar.

## 13. Branding e Nomenclatura
- Nome do app: SetRep.
- Padrão de nomenclatura consistente em UI (Treino, Exercício, Aluna, Personal).
- Ícone PWA e paleta coerentes com marca (definir em etapa de UX).

---

## Anexos
- `prd.md` (escopo e requisitos).
- `schema.dbml.txt` (modelagem do banco em DBML).

> Observação: não incluir segredos, senhas, chaves de API ou tokens em nenhum arquivo. Somente documentar variáveis no `.env.example`.