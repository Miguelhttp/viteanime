# FRONTEND GUIDELINES – VITEANIME

## 🎯 OBJETIVO

Garantir que toda interface criada no projeto siga um **padrão moderno, consistente e escalável**, inspirado em aplicações SaaS e plataformas de streaming.

O design deve priorizar:

* clareza visual
* hierarquia de informação
* experiência do usuário
* responsividade
* consistência entre páginas

---

# 🧱 ESTRUTURA DE LAYOUT

A aplicação utiliza um **layout principal compartilhado** localizado em:

```
src/app/layout/main-layout.tsx
```

Este layout deve conter:

* Topbar
* Sidebar ou Drawer (dependendo do breakpoint)
* Área principal de conteúdo

Fluxo visual padrão:

```
Topbar
Sidebar | Conteúdo principal
Sidebar | Conteúdo principal
```

---

# 📱 RESPONSIVIDADE

O projeto deve ser **mobile-first**.

Regras:

* Mobile → Drawer ou Bottom Navigation
* Tablet → Sidebar colapsável
* Desktop → Sidebar fixa

Componentes responsáveis pela navegação:

```
shared/components/navigation/
```

Exemplos:

* sidebar.tsx
* drawer.tsx
* bottom-nav.tsx
* topbar.tsx

---

# 🎨 PRINCÍPIOS DE DESIGN

Toda UI deve seguir:

### 1️⃣ Hierarquia visual clara

Elementos mais importantes devem se destacar.

Exemplo:

* título grande
* subtítulo menor
* conteúdo organizado em seções

---

### 2️⃣ Espaçamento consistente

Utilizar espaçamentos padronizados:

```
4px
8px
16px
24px
32px
```

Evitar espaçamentos aleatórios.

---

### 3️⃣ Componentização

Interfaces devem ser quebradas em componentes pequenos.

Exemplo correto:

```
AnimeCarousel
AnimeCard
CarouselControls
CarouselPagination
```

Evitar componentes gigantes.

---

# 🎬 PADRÃO VISUAL PARA ANIMES

Cards de anime devem conter:

* capa do anime
* título
* score
* ano ou temporada

Exemplo de estrutura:

```
AnimeCard
 ├ Cover
 ├ Title
 ├ Score
 └ Year
```

---

# 🧭 PADRÃO DE PÁGINA

Toda página deve seguir a estrutura:

```
PageHeader
PageContent
PageSections
```

Exemplo:

```
AnimesPage
 ├ PageHeader
 ├ CurrentSeasonSection
 ├ PopularAnimesSection
 └ TopRatedSection
```

---

# ⚡ PERFORMANCE DE UI

Regras obrigatórias:

* listas grandes devem ser virtualizadas quando necessário
* evitar re-renderizações desnecessárias
* utilizar memoização quando justificável
* componentes pesados devem ser isolados

---

# 🎨 CONSISTÊNCIA VISUAL

Evitar:

* estilos duplicados
* CSS espalhado
* componentes visuais inconsistentes

Preferir:

* reutilização de componentes
* estilos centralizados
* UI previsível

---

# 🎬 EXPERIÊNCIA DO USUÁRIO

A interface deve sempre considerar:

* carregamento de dados
* estados de erro
* estados vazios

Componentes de estado:

```
LoadingState
ErrorState
EmptyState
```

Nunca deixar a tela vazia enquanto dados estão sendo carregados.

---

# 🧠 BOAS PRÁTICAS DE UI

Antes de criar um novo componente:

1. Verificar se já existe algo semelhante.
2. Avaliar possibilidade de reutilização.
3. Manter consistência visual.

Interfaces devem ser:

* simples
* previsíveis
* fáceis de navegar
* visualmente equilibradas.

---

# 📖 PADRÃO DE QUALIDADE

Toda interface criada deve:

* parecer profissional
* seguir o padrão visual existente
* manter consistência entre páginas
* priorizar experiência do usuário
