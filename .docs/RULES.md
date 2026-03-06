# PROJECT RULES – VITEANIME 2.0

## 🧠 CONTEXTO

Projeto **React + TypeScript** utilizando **Feature-Based Architecture**.

Princípios principais:

* O código deve ser organizado por **domínio de negócio**.
* Cada **feature é autocontida**.
* Evitar centralização de lógica global.
* Sempre respeitar a arquitetura existente antes de criar novos arquivos.

Stack utilizada no projeto:

* React
* TypeScript
* Vite
* TanStack Query (data fetching)
* Axios (HTTP client)

---

# 🏗 ESTRUTURA DA FEATURE

Toda nova funcionalidade deve seguir o padrão:

```
features/
  nome-da-feature/
    components/
    hooks/
    services/
    types/
    pages/ (se necessário)
```

Cada feature deve conter **sua própria lógica e organização interna**.

Antes de criar novos arquivos, analisar a estrutura já existente dentro da feature.

---

# 📌 RESPONSABILIDADES

## components/

Responsável apenas pela **camada de UI**.

Regras:

* Apenas renderização e composição visual.
* Não conter chamadas diretas de API.
* Não conter lógica de negócio complexa.
* Receber dados via props ou hooks.

---

## hooks/

Responsável pela **orquestração da lógica da feature**.

Pode conter:

* Uso de TanStack Query
* Composição de lógica
* Transformação de dados vindos dos services
* Controle de estado da feature
* Intermediação entre services e components

Regras:

* Hooks podem consumir services.
* Hooks podem preparar dados para UI.
* Hooks não devem conter código de renderização.

---

## services/

Responsável pela **comunicação com APIs**.

Regras:

* Apenas chamadas HTTP.
* Nunca usar hooks.
* Nunca acessar estado React.
* Sempre retornar dados tipados.
* Não conter lógica de UI.
* Não transformar dados para apresentação.

---

## types/

Responsável por **tipagem da feature**.

Regras:

* Interfaces e tipos TypeScript.
* Nenhuma lógica.
* Tipos devem ser reutilizados sempre que possível.

---

## shared/

Contém código **reutilizável globalmente**.

Exemplos:

* componentes genéricos
* hooks reutilizáveis
* utilitários
* helpers

Regras:

* Não conter lógica específica de domínio.
* Deve ser reutilizável por múltiplas features.

---

# 🔒 FLUXO OBRIGATÓRIO

Antes de implementar qualquer funcionalidade:

1. Analisar a estrutura da feature relacionada.
2. Identificar padrões já existentes.
3. Explicar a estratégia de implementação.
4. Propor divisão de arquivos.
5. Aguardar confirmação.
6. Somente após confirmação gerar código.

**Nunca pular etapas.**

---

# 🔁 REUTILIZAÇÃO

Antes de criar novos:

* hooks
* services
* components
* types

Verificar se já existe implementação semelhante no projeto.

Evitar duplicação de código.

---

# 🚫 PROIBIÇÕES

* Não usar `any`.
* Não misturar regra de negócio com UI.
* Não acessar axios diretamente fora das camadas apropriadas.
* Não criar dependência cruzada entre features.
* Não duplicar tipos já existentes.
* Não criar novas bibliotecas sem necessidade.

---

# 🚀 PERFORMANCE

Regras obrigatórias:

* Data fetching via **TanStack Query**.
* Evitar refetch desnecessário.
* Utilizar cache quando apropriado.
* Componentes pesados devem ser isolados.
* Utilizar memoização quando justificável.

Sempre explicar decisões que impactem performance.

---

# 📦 IMPORTS

Preferir **imports organizados e consistentes**.

Evitar caminhos relativos excessivamente longos.

Exemplo ruim:

```
../../../../components
```

Preferir caminhos mais claros dentro da estrutura do projeto.

---

# 🏷 PADRÃO DE NOMES

Componentes:

```
AnimeCard.tsx
AnimeCarousel.tsx
```

Hooks:

```
useCurrentSeasonAnimes.ts
useCarousel.ts
```

Services:

```
anime-service.ts
```

Types:

```
anime.ts
```

---

# 📖 PADRÃO DE QUALIDADE

Todo código gerado deve ser:

* Legível
* Escalável
* Manutenível
* Consistente com o restante do projeto
* Alinhado com a arquitetura existente

O código deve **parecer escrito por um desenvolvedor experiente**.
