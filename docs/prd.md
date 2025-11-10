# PRD - Documento de Requisitos do Produto

> Versão: 0.1 (rascunho)
> Status: Em elaboração
> Data: 2025-11-10
> Responsáveis: Product Owner, Tech Lead, Design, QA

---

## 1. Resumo Executivo
- Objetivo do produto: Plataforma PWA em Next.js + Prisma para personal trainer gerenciar alunas, exercícios e treinos (A, B, ...), e para alunas visualizarem e registrarem treinos com observações.
- Problema/ oportunidade: Profissionais precisam organizar planos de treino e acompanhamento de forma simples, offline e mobile-first, com persistência de sessão; alunas desejam registrar progresso sem fricção.
- Público-alvo: Personais autônomas e estúdios pequenos; alunas de musculação/funcionais.
- Resultado esperado: Redução de tempo na criação de treinos, aumento na adesão e conclusão de treinos, melhoria na comunicação e retenção.

## 2. Objetivos e Métricas de Sucesso (KPIs)
- Objetivos de negócio: aumentar retenção das alunas e eficiência do personal na gestão de treinos; facilitar registro de treinos.
- KPIs: taxa de conclusão de treinos por aluna/semana; tempo médio para criar um treino; MAU (alunas ativas mensais); % sessões persistidas; NPS.
- Metas (SMART):
  - 60% das alunas concluem >=2 treinos/semana após 4 semanas.
  - Criar um treino completo em <=5 minutos.
  - 90% dos logins mantêm sessão por >=14 dias.
- Critérios de sucesso: MVP com fluxo completo de gestão e registro operacional sem bugs críticos, uso contínuo por alunas e personais.

## 3. Escopo
- Incluído neste release (MVP):
  - Personal: gerenciar alunas; gerenciar exercícios; gerenciar treinos (A/B/… com exercícios); cadastrar biografia.
  - Aluna: login com sessão persistente; visualizar treinos; registrar treinos (início/conclusão/observação); visualizar histórico.
  - PWA: instalação, cache básico offline, fila de sincronização para registros.
- Fora de escopo (MVP): pagamentos; chat em tempo real; notificações push; periodização avançada; relatórios complexos.
- Assunções principais: um personal gerencia seu próprio conjunto de alunas; cada aluna pertence a um personal; uso predominantemente mobile.

## 4. Personas e Usuários-Alvo
- Personal Trainer: autônoma(o), atende 10–50 alunas; deseja organizar treinos rápidos, padronizar exercícios, comunicar biografia/abordagem.
- Aluna: 18–60 anos; quer seguir plano de treino claro, registrar progresso e notas; precisa funcionar offline/baixa conectividade.
- Cenários: criação de treino na academia; aluna inicia treino sem internet e conclui depois; consulta de histórico e observações.

## 5. Casos de Uso e Fluxos
- Personal: criar treino (A/B/…)
  - Fluxo: acessar lista de alunas → escolher aluna → criar treino → adicionar exercícios (nome, séries, repetições, carga, observações) → salvar → publicar para aluna.
- Personal: gerenciar exercícios
  - Fluxo: acessar catálogo → criar/editar/excluir exercício (categoria, equipamento, instruções) → salvar.
- Personal: cadastrar/editar biografia
  - Fluxo: acessar perfil → editar biografia → salvar → alunas visualizam no app.
- Aluna: visualizar treinos
  - Fluxo: login → acessar treinos atribuídos (A/B/…) → ver detalhes de exercícios.
- Aluna: registrar treino
  - Fluxo: abrir treino → marcar início → executar → adicionar observações → marcar concluído → sincronizar se offline.
- Aluna: visualizar histórico
  - Fluxo: acessar histórico → filtrar por período → ver status e observações.

## 6. Requisitos Funcionais
- RF-01: Personal cria/edita/exclui alunas.
- RF-02: Personal mantém catálogo de exercícios (CRUD).
- RF-03: Personal cria treinos (A/B/…) e associa exercícios com ordem e parâmetros.
- RF-04: Personal cadastra/edita biografia exibida às alunas.
- RF-05: Aluna realiza login e mantém sessão persistente por 14 dias (renovável).
- RF-06: Aluna visualiza treinos atribuídos com detalhes dos exercícios.
- RF-07: Aluna registra treino com início, conclusão e observação.
- RF-08: Aluna visualiza histórico de treinos registrados com filtros por período.
- RF-09: PWA funciona offline para visualizar treinos baixados e registrar treino em fila de sincronização.
- RF-10: Sincronização reconcilia registros offline quando voltar a conexão.

## 7. Requisitos Não Funcionais
- Desempenho: latência p95 < 300 ms para páginas críticas; sincronização de registros < 5 s pós reconexão.
- Disponibilidade: 99% uptime para API MVP.
- Segurança: autenticação com tokens/NextAuth; armazenamento de senha com bcrypt/argon2; RBAC básico (personal vs aluna); HTTPS; LGPD.
- Privacidade & Compliance: minimização de dados pessoais; consentimento explícito; retenção controlada de registros.
- Observabilidade: logs estruturados, métricas de uso, erros capturados; traces básicos.
- Escalabilidade: projeto stateless; DB relacional com índices; cache de leitura em PWA; possibilidade de horizontal scaling.
- Usabilidade & Acessibilidade: mobile-first; WCAG AA; foco e legibilidade.
- Compatibilidade: browsers modernos; iOS/Android via PWA; suportar tela pequena.

## 8. Regras de Negócio
- RN-01: Cada aluna pertence a um único personal; apenas o personal pode editar seus dados e treinos.
- RN-02: Email da aluna é único por personal; duplicidade deve ser bloqueada.
- RN-03: Treinos possuem versões; mudanças relevantes geram nova versão (auditável).
- RN-04: Exercícios não podem ser excluídos se referenciados por treinos ativos (usar inativação).
- RN-05: Registro de treino exige estado de início antes de conclusão.

## 9. Dados e Modelagem
- Entidades principais:
  - User: `id`, `email`, `password_hash` (se credenciais), `role` (`personal`|`aluna`), `createdAt`.
  - PersonalProfile: `userId`, `biografia`.
  - AlunaProfile: `userId`, `personalId`.
  - Exercício: `id`, `nome`, `categoria`, `equipamento`, `instruções`, `video_url` (opcional), `ativo`.
  - Treino: `id`, `alunaId`, `personalId`, `nome` (A/B/…), `versão`, `ativo`.
  - TreinoExercício (join): `treinoId`, `exercicioId`, `ordem`, `series`, `repetições`, `carga`, `observação`.
  - RegistroTreino: `id`, `treinoId`, `alunaId`, `status` (`iniciado`|`concluído`), `startedAt`, `completedAt`, `observação`, `synced`.
- Relacionamentos: 1 personal → N alunas; 1 aluna → N treinos; N treinos → N exercícios via join; 1 aluna → N registros.
- Identificação: IDs UUID; emails únicos por escopo; índices por `alunaId`, `treinoId`.
- Retenção: registros de treino por 24 meses (configurável); exclusão lógica para entidades com histórico.
- Backups: diários; RPO 24h; RTO 4h.
- Migrações: Prisma Migrate com versionamento e rollback controlado.

## 10. Integrações e APIs
- Stack: Next.js (App Router), Prisma (PostgreSQL), NextAuth (sessões persistentes). Email provider opcional para login magic-link.
- APIs (rotas HTTP):
  - `POST /api/alunas` (criar), `GET /api/alunas`, `PATCH /api/alunas/:id`, `DELETE /api/alunas/:id`.
  - `POST /api/exercicios`, `GET /api/exercicios`, `PATCH /api/exercicios/:id`, `DELETE /api/exercicios/:id`.
  - `POST /api/treinos`, `GET /api/treinos?alunaId=`, `PATCH /api/treinos/:id`, `DELETE /api/treinos/:id`.
  - `POST /api/registros` (iniciar/concluir), `GET /api/registros?alunaId=&periodo=`, `PATCH /api/registros/:id`.
- Autorização: middleware por `role`; personal só acessa dados das suas alunas; aluna acessa apenas seus dados.
- PWA Sync: fila local IndexedDB; endpoint de sincronização `POST /api/sync/registros`.
- Erros: códigos padronizados, retries exponenciais client-side para sync; timeouts 10s.

## 11. Ambiente, Deploy e Operação
- Ambientes: dev, staging, prod.
- Configuração por ambiente: variáveis em `ENV` documentadas em `.env.example` (sem valores reais).
- Feature flags: habilitar PWA e sync por flag em staging antes de GA.
- Deploy: CI/CD com lint, testes, migrações Prisma aplicadas; gate manual para prod.
- Monitoramento: logs e métricas de erros, latência e sucesso de sync.
- Variáveis de ambiente (documentar em `.env.example`):
  - `DATABASE_URL`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`
  - `AUTH_EMAIL_SERVER` (opcional)
  - `AUTH_EMAIL_FROM` (opcional)
  - `NODE_ENV`
  - `NEXT_PUBLIC_APP_URL`
  - `NEXT_PUBLIC_APP_NAME`

## 12. Critérios de Aceite
- CA-01: Personal cria uma aluna e atribui treinos com exercícios; aluna visualiza imediatamente.
- CA-02: Aluna inicia e conclui um treino, adiciona observação e vê no histórico.
- CA-03: PWA instalado funciona offline para visualizar treinos já baixados e registra treino em fila, sincronizando ao reconectar.
- CA-04: Sessão da aluna permanece ativa por 14 dias sem re-login (respeitando logout manual).
- CA-05: Segurança básica: aluna não acessa dados de outras alunas; personal não acessa dados de outro personal.

## 13. Riscos e Suposições
### Matriz de Riscos
| ID | Risco | Prob. | Impacto | Mitigação | Plano de Contingência |
|---|---|---|---|---|---|
| R1 | Falhas de sync offline | média | média | fila robusta, retries, reconciliação | modo somente leitura e aviso ao usuário |
| R2 | Vazamento de dados por autorização inadequada | baixa | alta | middleware por role e escopo, testes | desativar rotas afetadas, hotfix |
| R3 | Performance ruim em dispositivos modestos | média | média | otimização PWA, cache, lazy-loading | reduzir escopo de dados, telas simplificadas |

### Suposições
- S1: Uso mobile-majoritário com conectividade intermitente.
- S2: Personais operam sem necessidade de cobrança integrada no MVP.

## 14. Roadmap e Marcos
- M1 (Semana 1–2): Modelagem dados, auth e CRUD básicos (alunas, exercícios).
- M2 (Semana 3–4): Treinos A/B/… e associação de exercícios; visualização pela aluna.
- M3 (Semana 5): Registro de treinos e histórico; PWA básico (manifest, SW).
- M4 (Semana 6): Offline-first (cache treinos, fila sync); hardening segurança e critérios de aceite.
- Fases: MVP → Beta fechado com 2–3 personais → GA.

## 15. Plano de Testes e Qualidade
- Testes unitários: serviços e regras de negócio (alocação de treinos, validações), cobertura alvo 60%+ no MVP.
- Integração/E2E: login e persistência de sessão; criação de treino; registro e histórico; autorização por role.
- Performance: medir latência p95; carregar treinos em < 300 ms; avaliar dispositivos low-end.
- Segurança: SAST/DAST básico; verificação de RBAC; armazenamento seguro de senha.
- Homologação: checklist dos critérios de aceite operando em staging.

## 16. Métricas, Analytics e Instrumentação
- Eventos: `login_success`, `session_restored`, `workout_start`, `workout_complete`, `workout_sync_success`, `workout_sync_error`.
- Funis: ativação (primeiro login → primeiro treino concluído); retenção semanal por aluna.
- Dashboards: KPIs por personal e agregados.

## 17. Anexos e Referências
- Links: protótipos de telas, backlog, decisões arquiteturais (ADRs), política de privacidade.
- Compliance: LGPD (consentimento, minimização, retenção), segurança básica.

---

## Checklist de Validação Rápida
- [ ] Objetivos e KPIs definidos
- [ ] Escopo e exclusões claros
- [ ] RF/RNF verificáveis e mensuráveis
- [ ] Critérios de aceite completos
- [ ] Riscos mapeados e mitigação planejada
- [ ] Roadmap com marcos e dependências
- [ ] Plano de testes incluindo segurança e performance
- [ ] Variáveis de ambiente documentadas em `.env.example` (sem segredos)

> Observação: nunca incluir segredos, senhas, chaves de API ou tokens no PRD ou exemplos de código. Documente variáveis apenas no `.env.example` sem valores reais.