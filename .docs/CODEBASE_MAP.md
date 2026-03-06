# CODEBASE MAP – VITEANIME

## 🧠 VISÃO GERAL

ViteAnime é uma plataforma web construída com **React + TypeScript** que consome dados de animes e mangás através da **Jikan API**.

A arquitetura segue **Feature-Based Architecture**, onde cada domínio da aplicação possui sua própria organização interna.

O projeto prioriza:

* organização por domínio
* separação de responsabilidades
* escalabilidade
* reutilização de código

---

# 🏗 ESTRUTURA PRINCIPAL

```
src/
  app/
  features/
  shared/
  providers/
  lib/
  styles/
```

Cada diretório possui responsabilidades específicas.

---

# 📦 app/

Responsável pela **estrutura principal da aplicação**.

Contém:

* layout principal
* composição da aplicação
* inicialização de providers
* estrutura global

Exemplo:

```
app/layout/main-layout.tsx
```

---

# 🎯 features/

Contém **as funcionalidades principais da aplicação**, organizadas por domínio.

Cada feature é autocontida.

Exemplo:

```
features/
  animes/
  home/
```

Dentro de cada feature:

```
feature-name/
  components/
  hooks/
  services/
  types/
  pages/
```

---

# 🎨 components (dentro da feature)

Responsável pela **interface visual da feature**.

Exemplo:

```
features/animes/components/
```

Regra:

* Apenas UI
* Sem chamadas diretas de API

---

# 🧩 hooks (dentro da feature)

Responsável por **orquestrar lógica da feature**.

Exemplo:

```
features/animes/hooks/
```

Responsabilidades:

* consumir services
* usar TanStack Query
* preparar dados para UI

---

# 🌐 services (dentro da feature)

Responsável pela **comunicação com APIs externas**.

Exemplo:

```
features/animes/services/anime-service.ts
```

Regras:

* apenas chamadas HTTP
* nunca conter lógica de UI
* retornar dados tipados

---

# 🧾 types (dentro da feature)

Responsável pelas **tipagens TypeScript da feature**.

Exemplo:

```
features/animes/types/anime.ts
```

---

# 📄 pages (dentro da feature)

Representam **páginas da aplicação relacionadas à feature**.

Exemplo:

```
features/animes/pages/animes-page.tsx
```

---

# 🔁 shared/

Contém código reutilizável globalmente.

Exemplos:

```
shared/components/
shared/hooks/
shared/lib/
```

Pode conter:

* componentes genéricos
* hooks reutilizáveis
* utilitários

Nunca deve conter lógica específica de uma feature.

---

# 🔌 providers/

Responsável por **configuração de providers globais**.

Exemplo:

```
providers/query-provider.tsx
```

Aqui são configuradas bibliotecas como **TanStack Query**.

---

# ⚙️ lib/

Contém configurações técnicas da aplicação.

Exemplo:

```
lib/axios.ts
```

Responsável por:

* instância de axios
* interceptors
* configuração de HTTP client

---

# 🎨 styles/

Contém estilos globais da aplicação.

Exemplo:

```
styles/globals.css
```

---

# 🔄 FLUXO DE DADOS

O fluxo padrão da aplicação é:

```
Component
   ↓
Hook
   ↓
Service
   ↓
API
```

Exemplo real:

```
AnimeCarousel (component)
   ↓
useCurrentSeasonAnimes (hook)
   ↓
anime-service (service)
   ↓
Jikan API
```

---

# 📡 API UTILIZADA

O projeto consome dados da **Jikan API**, que fornece acesso aos dados públicos do MyAnimeList.

Principais dados utilizados:

* animes da temporada
* detalhes de anime
* rankings
* busca de animes

---

# 🧠 COMO CONTRIBUIR NO PROJETO

Antes de criar qualquer código:

1. Analisar a feature relacionada.
2. Verificar se já existe lógica semelhante.
3. Seguir as regras do `RULES.md`.
4. Manter consistência com a arquitetura existente.

Nunca criar estruturas novas sem necessidade.
