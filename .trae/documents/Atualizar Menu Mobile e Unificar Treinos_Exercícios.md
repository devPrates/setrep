## Objetivos
- Fixar o menu mobile ao rodapé ocupando toda a largura, sem aparência "flutuante".
- Unificar itens "Treinos" e "Exercícios" em um único item que leva à lista de treinos; ao clicar em um treino, abrir seus exercícios.

## Alterações de UI no Menu
- Contêiner: remover `max-w-*`, `mx-auto`, bordas arredondadas e `backdrop-blur` para barra sólida de largura total.
- Posição: manter `fixed bottom-0 left-0 right-0`, com `border-t` opcional e `paddingBottom: env(safe-area-inset-bottom)`.
- Layout interno: `w-full` com `px-4 py-2`, ícones e rótulos inalterados.

## Unificação de Itens
- Remover item "Exercícios" do menu.
- Manter item "Treinos" apontando para `/app/treinos`; dentro dessa página já abre `/app/treinos/[slug]` com exercícios ao clicar.
- Itens finais: Início, Treinos, Registros, Perfil.

## Arquivos Alvo
- `components/app/bottom-nav.tsx`:
  - Remover largura máxima e centralização.
  - Trocar container e lista para ocupar toda a largura.
  - Remover item "Exercícios" do array `items` e ajustar ícones/`isActive`.

## Validação
- Visual: menu ocupando toda a largura, sem borda arredondada/blur; respeitar safe area.
- Navegação: clicar em "Treinos" abre `/app/treinos`; clicar em um treino abre seus exercícios.
- Acessibilidade: labels e foco preservados.

## Riscos e Mitigações
- Possível sobreposição ao conteúdo: garantir `pb` nas páginas (já há `pb-20` no layout da aluna) ou ajustar se necessário.
- Em dispositivos com notch: manter `env(safe-area-inset-bottom)`.

Confirma que posso aplicar essas alterações no menu mobile e unificar os itens?