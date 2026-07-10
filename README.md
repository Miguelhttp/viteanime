# ViteAnime - Plataforma de Streaming de Anime

Aplicação web moderna para descoberta, navegação e organização de animes e mangas, com foco em experiência visual premium, performance e navegação fluida.

## Leitura do projeto

### Visão geral
O projeto é um front-end moderno, voltado para a experiência de usuário em uma interface inspirada em plataformas de streaming. A proposta principal é facilitar a descoberta de conteúdos, apresentar listas organizadas e oferecer uma navegação intuitiva entre páginas de catálogo, detalhes e autenticação.

### O que a aplicação oferece
- Página inicial com carrossel e seções de conteúdo destacadas.
- Catálogo de animes e mangas com páginas específicas para exploração.
- Detalhes de cada item, incluindo recomendações e informações adicionais.
- Fluxo de autenticação com login, cadastro e área protegida para watchlist.
- SEO básico e carregamento sob demanda para melhorar a performance.

### Arquitetura e organização
O projeto segue uma estrutura modular baseada em features, o que facilita a manutenção e a expansão.

- src/app: rotas, layout principal e páginas globais.
- src/features: módulos de negócio separados por domínio.
  - animes: catálogo, serviços, hooks, componentes e páginas.
  - mangas: estrutura semelhante para o universo de mangás.
  - home: tela inicial.
  - auth: autenticação.
- src/shared: componentes, hooks e elementos reutilizáveis compartilhados.
- src/styles: estilos globais da aplicação.

### Tecnologias principais
- React 19 com TypeScript
- Vite para desenvolvimento e build rápido
- Tailwind CSS para estilização moderna
- TanStack Query para gerenciamento de dados e cache
- Axios para integração com APIs
- Lucide React, GSAP e Motion para UI e animações

### Fluxo de funcionamento
1. A aplicação inicia no ponto principal de renderização em src/main.tsx.
2. O componente de rotas em src/app.tsx define a navegação entre páginas.
3. As páginas consomem dados por meio de hooks e serviços específicos.
4. A home reúne diferentes listas de conteúdo e monta a experiência inicial.

### Pontos de atenção para averiguação
- O projeto tem uma boa separação entre camadas e features.
- A arquitetura é adequada para crescimento incremental.
- Há uma preocupação clara com interface responsiva e carregamento otimizado.
- O uso de hooks e serviços deixa o fluxo de dados relativamente organizado.
- O projeto ainda pode evoluir com mais consistência em testes, tipagem de dados e padronização de estados de erro.

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Gere uma build de produção:

```bash
npm run build
```

## Scripts disponíveis
- npm run dev: inicia o ambiente de desenvolvimento
- npm run build: gera a build de produção
- npm run lint: executa a análise estática do projeto
- npm run preview: visualiza a build localmente

---

Desenvolvido com foco em performance, estética premium e uma experiência moderna para o usuário.
