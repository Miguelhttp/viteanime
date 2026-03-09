# ViteAnime - Plataforma de Streaming de Anime

Uma aplicação web moderna e premium para descoberta de animes, inspirada nas melhores plataformas de streaming do mercado.

## 🚀 Tecnologias

- **React 19** com **TypeScript**
- **Vite** para build ultra-rápido
- **Tailwind CSS 4** para estilização moderna
- **TanStack Query (React Query)** para gerenciamento de estado e cache de API
- **Lucide React** para ícones consistentes
- **GSAP & Framer Motion** para animações fluidas
- **Jikan API** (Wrapper não-oficial da MyAnimeList)

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura modular baseada em funcionalidades (features):

- `src/app/`: Configurações globais, rotas e layouts principais.
- `src/features/`: Módulos específicos da aplicação.
  - `animes/`: Componentes core (cards, rows, carousel), hooks de API e serviços.
  - `home/`: Páginas e componentes específicos da landing page.
- `src/shared/`: Componentes, hooks e componentes de navegação compartilhados (Sidebar, Topbar).
- `src/styles/`: Estilos globais e tokens do CSS.

## 🔑 Componentes Principais

### Navegação (Web Standard)

- **Sidebar**: Menu lateral único, responsivo (overlay no mobile, colapsável no desktop).
- **Topbar**: Cabeçalho inteligente com busca expansível no mobile e barra de busca fixa no desktop.

### UI de Streaming

- **AnimeCard**: Card otimizado com poster, nota, ano e overlay de hover premium.
- **AnimeRow**: Fileira horizontal com scroll suave, adaptada para alta densidade no mobile.
- **Carousel**: Banner principal dinâmico com transições suaves e tipografia adaptável.

## 📱 Responsividade e UX

A aplicação foi rigorosamente ajustada para uma experiência "Mobile-First":

- **Gaps Otimizados**: Espaçamentos reduzidos no mobile para melhor aproveitamento de tela.
- **Expandable Search**: Busca que ocupa todo o topo no mobile para facilitar a interação.
- **Zero Horizontal Bleed**: Layout travado verticalmente, permitindo scroll horizontal apenas nas listas de animes.

## 🛠️ Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   _Nota: O projeto está configurado para rodar na porta 3000._

3. Para build de produção:
   ```bash
   npm run build
   ```

---

Desenvolvido com foco em performance e estética premium.
