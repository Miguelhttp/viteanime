# Guia de CI/CD - ViteAnime

Este projeto utiliza **Integração Contínua (CI)** e **Implantação Contínua (CD)** para garantir a qualidade do código e automação de builds.

## 🛠️ Como funciona?

Nosso pipeline está dividido em duas partes principais:

### 1. GitHub Actions (CI - Integração Contínua)

Localizado em `.github/workflows/ci.yml`. Toda vez que você faz um `push` ou abre um `PR` para o branch `main`, o GitHub executa os seguintes passos:

- **Instalação**: Instala as dependências via `npm ci`.
- **Linting**: Verifica se o código segue os padrões do ESLint (`npm run lint`).
- **Build**: Tenta construir o projeto (`npm run build`).

> [!TIP]
> Se o build ou o lint falharem, o GitHub Actions mostrará um ❌ vermelho. Isso evita que códigos com erro cheguem à produção.

### 2. Vercel (CD - Implantação Contínua)

A Vercel está conectada ao repositório e:

- Detecta quando o CI no GitHub termina com sucesso.
- Gera uma nova versão de produção do site.
- Faz o deploy automático no seu domínio.

## 🚀 Boas Práticas

Para garantir que o CI não falhe no GitHub, você pode rodar as verificações localmente antes de comitar:

```bash
# Verificar linting
npm run lint

# Verificar build
npm run build
```

Seguindo este fluxo, o seu projeto estará sempre estável e atualizado!
