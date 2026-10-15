# Portfólio — Keven Lino

Site pessoal de portfólio para apresentar projetos, experiências, habilidades, currículo e formas de contato. A navegação é organizada como um baralho de cartas, com conteúdo disponível em português e inglês.

Acesse o site: kevenlino.me.

## Funcionalidades

- Navegação por cartas e páginas responsivas.
- Conteúdo em português e inglês.
- Apresentação pessoal com foto.
- Projetos com imagens/GIFs, links para os repositórios e demonstração do Astro Runner em uma sobreposição.
- Experiências profissionais e formação.
- Currículos em português e inglês, com visualização, zoom e download de PDF.
- Formulário de contato via EmailJS e links de contato alternativos.

## Tecnologias

- **JavaScript (ES modules) e JSX** — linguagem e componentes da interface.
- **React 19** — biblioteca de interface.
- **Vite 8** — servidor de desenvolvimento e ferramenta de build.
- **CSS** — estilos e responsividade.
- **React Router 7** — rotas da aplicação.
- **Framer Motion 14** — transições e animações.
- **React-PDF 10** — visualização dos currículos PDF.
- **EmailJS Browser 5** — envio opcional do formulário de contato pelo navegador.
- **Vercel** — plataforma prevista para hospedagem estática; a publicação ainda está pendente.

As versões declaradas das dependências estão em [`package.json`](./package.json), e as versões resolvidas estão registradas em [`package-lock.json`](./package-lock.json).

### Dependências diretas

| Pacote | Versão declarada | Uso |
| :--- | :--- | :--- |
| `react` | `^19.3.0` | Interface React |
| `react-dom` | `^19.3.0` | Renderização no navegador |
| `react-router-dom` | `^7.18.4` | Navegação e rotas |
| `framer-motion` | `^14.1.0` | Animações |
| `react-pdf` | `^10.5.0` | Visualização de PDF |
| `@emailjs/browser` | `^5.0.3` | Integração do formulário com EmailJS |

### Dependências de desenvolvimento

| Pacote | Versão declarada | Uso |
| :--- | :--- | :--- |
| `vite` | `^8.3.4` | Desenvolvimento e build |
| `@vitejs/plugin-react` | `^6.1.2` | Integração do React com Vite |

## Estrutura do projeto

```text
.
├── archive/
│   └── legacy-static-prototype/  # Protótipo estático anterior, mantido como referência
├── docs/
│   ├── assets/                   # Recursos da documentação
│   └── prototipos/               # Wireframes e protótipos
├── game/
│   └── astro-runner-survival/    # Arquivos da distribuição web do jogo
├── public/                       # Arquivos estáticos publicados pelo Vite
│   ├── curriculos/               # Currículos em português e inglês
│   ├── fonts/                    # Fontes locais e licença
│   ├── game/                     # Jogo carregado na demonstração
│   └── images/                   # Foto e imagens/GIFs dos projetos
├── src/
│   ├── app/                      # Composição da aplicação e rotas
│   ├── components/
│   │   ├── deck/                 # Cartas, baralho e distribuição
│   │   └── shared/               # Componentes compartilhados
│   ├── context/                  # Contexto do idioma
│   ├── data/                     # Conteúdo e traduções
│   ├── pages/                    # Páginas do site
│   ├── services/                 # Configuração das integrações
│   ├── styles/                   # Estilos globais
│   └── main.jsx                  # Entrada React
├── .env.example                  # Modelo das variáveis do EmailJS
├── index.html                    # Documento HTML de entrada
├── package.json                  # Scripts e dependências
├── package-lock.json             # Versões resolvidas das dependências
├── vercel.json                   # Reescrita de rotas da SPA na Vercel
└── vite.config.js                # Configuração do Vite
```

## Requisitos

- Node.js **20.19+** ou **22.12+**.
- npm (incluído com Node.js).
- Git.

## Instalação e execução local

Clone o repositório, instale as dependências e inicie o servidor de desenvolvimento:

```bash
git clone https://github.com/Tuzfi/Portfolio.git
cd Portfolio
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local, normalmente `http://localhost:5173`.

Para gerar e testar localmente a versão de produção:

```bash
npm run build
npm run preview
```

O build é gerado na pasta `dist/`. O projeto ainda não possui uma suíte automatizada de testes.

### Configuração opcional do formulário

O site pode ser executado sem configurar o EmailJS; nesse caso, o formulário informa que o envio não está disponível e os outros canais de contato continuam acessíveis.

Para habilitar o envio:

1. Crie um serviço e um template no [EmailJS](https://www.emailjs.com/).
2. Copie `.env.example` para `.env.local`.
3. Preencha as variáveis abaixo com os valores da sua conta:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

O template deve usar `{{from_name}}`, `{{reply_to}}` e `{{message}}`. Reinicie o servidor de desenvolvimento após alterar as variáveis. A Public Key é destinada ao cliente; não inclua senhas nem Secret Keys. Para o formulário funcionar em produção, cadastre as mesmas variáveis nas configurações de ambiente do provedor de hospedagem.

## Publicação na nuvem

A publicação foi realizada pelo [Vercel](https://vercel.com/), no plano gratuito disponível para projetos pessoais.

1. Importe o repositório `Tuzfi/Portfolio` na Vercel.
2. Selecione o framework **Vite** e confirme:
   - Comando de build: `npm run build`
   - Pasta de saída: `dist`
3. Se quiser habilitar o formulário em produção, configure as variáveis `VITE_EMAILJS_*` nas configurações do projeto.
4. Publique o projeto e abra a URL gerada pela Vercel para validar as rotas e os arquivos estáticos.
5. Após confirmar a publicação, substitua o aviso no início deste README pelo link público, por exemplo:

```markdown
> **Acesso ao site:** [https://seu-projeto.vercel.app](https://seu-projeto.vercel.app)
```

O arquivo [`vercel.json`](./vercel.json) encaminha as rotas da aplicação para `index.html`, permitindo o acesso direto às páginas da SPA.

## Scripts disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão compilada |

## Licenças de fontes

As fontes locais estão em `public/fonts/`. A licença OFL fornecida para a fonte Quintessential está junto aos arquivos de fonte.
