# Guia de Contribuição e Boas Práticas de Commit

Para manter o histórico do projeto limpo e legível, seguimos o padrão de **Conventional Commits**.

## 📝 Padrão de Commit

O formato do commit deve seguir:
`<tipo>(escopo opcional): <descrição curta>`

### Tipos Comuns:

- **feat**: Uma nova funcionalidade.
- **fix**: Correção de um bug.
- **docs**: Alterações apenas na documentação.
- **style**: Alterações que não afetam o significado do código (espaço em branco, formatação, ponto e vírgula faltando, etc).
- **refactor**: Uma alteração de código que não corrige um bug nem adiciona uma funcionalidade.
- **perf**: Uma alteração de código que melhora o desempenho.
- **test**: Adição de testes ausentes ou correção de testes existentes.
- **chore**: Atualizações de tarefas de build, configurações de pacotes, etc.

### Exemplos:

- `feat(nav): adiciona busca expansível no mobile`
- `fix(home): corrige overflow horizontal em telas pequenas`
- `docs: adiciona guia de commits e reestrutura pastas`
- `refactor(ui): unifica sidebar para padrão web`

## 🚀 Fluxo de Trabalho Recomendado

1. **Antes de codar**: Certifique-se de estar com a última versão da `main`.
2. **Crie uma branch**: Use nomes descritivos, ex: `feat/search-bar` ou `fix/carousel-gap`.
3. **Commits pequenos**: Faça commits frequentes e focados em uma única alteração.
4. **Resumo das alterações**: Certifique-se de que a mensagem do commit descreve CLARAMENTE o que foi feito.

## 🛠️ Passos para Commitar

1. Adicione as mudanças:
   ```bash
   git add .
   ```
2. Realize o commit seguindo o padrão:
   ```bash
   git commit -m "feat(scope): descrição"
   ```
3. Envie para o repositório (após configurar o remoto):
   ```bash
   git push origin branch-name
   ```
