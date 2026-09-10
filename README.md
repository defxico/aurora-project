# Aurora — Landing Page B2B

Projeto desenvolvido para o **People First Cup — Enterprise Challenge — Etapa 2**, com o objetivo de publicar online uma landing page para a marca fictícia **Aurora**, voltada ao público B2B, com formulário de captação de lead funcionando.

A proposta da Aurora é apresentar uma plataforma de **People Analytics** capaz de transformar dados de RH em decisões estratégicas, ajudando empresas a reduzir turnover, acompanhar engajamento, prever riscos e demonstrar o impacto financeiro das iniciativas de pessoas.

Na Etapa 2 a página ganhou deploy público, formulário com envio real, código reorganizado em `css/` e `js/` (com testes) e uma nova direção visual — **"Campo de risco"** —, em que **cada seção é um instrumento que o visitante opera**, não apenas texto.

- **Site publicado:** https://aurora-people-analytics.netlify.app/
- **Documentação da entrega:** [`docs/entrega-etapa-2.md`](docs/entrega-etapa-2.md) (dossiê formal) · [`docs/handoff-etapa-2.md`](docs/handoff-etapa-2.md) (detalhamento) · `docs/aurora-etapa-2-pdf.pdf`

## Informações do projeto

**Curso:** Web Design
**Turma:** 1TWDOA
**Challenge:** People First Cup — Enterprise Challenge
**Etapa:** 2
**Tema:** Landing page B2B para Aurora

## Deploy

- **Landing page publicada:** https://aurora-people-analytics.netlify.app/
- **Hospedagem:** Netlify, com deploy automático a cada push na branch `main`.
- **Formulário:** Netlify Forms — os leads chegam no painel do site em **Forms** e podem
  notificar por e-mail.

## Integrantes

- Amanda Ayumi Guedes Ueno — RM573609
- Ana Rubia de Oliveira Freire — RM573171
- Francisco Caetano Bernardes — RM571399
- Giovanna Camargo Budin — RM571861
- Mariana Costa Cruz Maciel — RM570455


## Objetivo da landing page

A landing page foi criada para comunicar a solução da Aurora de forma clara, visual e convincente para empresas que precisam tomar decisões mais estratégicas sobre pessoas.

O projeto busca apresentar:

- os principais problemas enfrentados por áreas de RH;
- o funcionamento da solução Aurora;
- funcionalidades centrais da plataforma;
- indicadores de impacto esperado;
- formulário de captação de lead;
- navegação fluida entre as seções;
- recursos de acessibilidade implementados e identificados na página.

## Estrutura da página

A landing page possui as seguintes seções principais:

1. **Hero — campo de risco**
   - Três sliders (engajamento, carga de trabalho, semanas sem 1:1) movem um medidor que
     projeta turnover e custo anual em tempo real, com veredito.

2. **Desafios**
   - Expõe seis pontos cegos comuns do RH: dados fragmentados, turnover invisível,
     dificuldade de comprovar ROI, entre outros.

3. **Como funciona**
   - Mostra o caminho dos dados (entradas → modelo Aurora → saídas), com linhas pulsando
     entre as etapas.

4. **Diagnóstico**
   - Quatro sliders de espectro alimentam um medidor de maturidade analítica e um perfil.
     O resultado acompanha o lead enviado pelo formulário.

5. **A plataforma**
   - "Pergunte à Aurora": cinco perguntas de negócio abrem um cartão com gráfico, achado,
     próxima ação e a linha "fonte:" (os dados cruzados para chegar ali).

6. **Funcionalidades**
   - Hexágono de seis recursos com pulsos percorrendo as arestas e os raios até o centro.

7. **Números**
   - Indicadores de impacto esperado (−32% de turnover, +47% de engajamento, 3× mais
     rápido).

8. **Calculadora**
   - Um razonete que se monta linha a linha a partir de colaboradores, turnover e
     salário. O cálculo vem de `js/roi.js` (com testes). O resultado acompanha o lead.

9. **Agendar demonstração**
   - Formulário de lead com envio real via Netlify Forms, validação no navegador e
     confirmação na própria página.

10. **Rodapé**
    - Navegação complementar, nota de acessibilidade e links institucionais.

## Identidade visual

A direção visual **"Campo de risco"** foi a resposta à crítica de "cara genérica de site
gerado por plataforma": fundo claro, tipografia forte, layout assimétrico e o magenta da
marca como acento principal, usado com intenção. Cada seção é um instrumento operável, não
só um bloco de texto — a página "faz algo".

### Principais cores

- Fundo claro: `#F6F5F8`
- Texto: `#17141D` (secundário `#5C5967`)
- Magenta (acento principal): `#A81F62`
- Teal (apoio): `#12796C`
- Roxo (apoio): `#574587`

### Tipografia

- **Archivo** (Google Fonts), pesos 400 a 800 — títulos em 800, texto em 400.

### Marca

- A marca "A" da Aurora (triângulo em gradiente teal → magenta → roxo com o corte
  diagonal) foi **vetorizada** em `assets/aurora-mark.svg` e aparece ao lado do wordmark
  "aurora" no topo e no rodapé. O favicon usa a mesma marca.

### Espaçamento

- Ritmo vertical uniforme entre seções, controlado por um único token que se adapta à
  largura da tela (`--sec`). Margem lateral também elástica (`--px`).

## Tecnologias utilizadas

- HTML5
- CSS3 (Custom Properties, `offset-path` para as animações de pulso)
- JavaScript (vanilla, ES2020) + Web Animations API
- SVG
- Google Fonts — **Archivo**
- Netlify (hospedagem) + Netlify Forms (captação de lead)
- Node.js apenas para rodar os testes da calculadora (`node --test`)

Não foram utilizados frameworks ou bibliotecas externas para a construção da interface principal.

## Recursos de acessibilidade

Os recursos abaixo estão implementados no próprio código da página (verificáveis por
inspeção). A identificação detalhada, com referências WCAG, está no dossiê de entrega
(`docs/entrega-etapa-2.md`, seção 4).

- `lang="pt-BR"`, HTML semântico, um único `<h1>` e hierarquia de títulos sem saltos;
- skip-link "Ir para o conteúdo principal" como primeiro elemento focável;
- marcos de navegação com nomes distintos ("Navegação principal", "Seções", "Aurora");
- sliders operáveis por teclado, com rótulo e `aria-valuetext`;
- abas de "Pergunte à Aurora" com padrão ARIA completo (`tablist`/`tab`/`tabpanel`,
  `aria-controls`, `aria-labelledby`) e navegação por setas;
- regiões `aria-live` nos medidores e no razonete; `role="alert"` no erro do formulário;
- foco sempre visível (`:focus-visible`) sobre o fundo claro;
- `label` associado a cada campo do formulário;
- contraste de texto validado em nível AA;
- `prefers-reduced-motion`: pulsos desligados e contadores instantâneos;
- layout sem rolagem horizontal de 360 px a 1280 px e até 200% de zoom;
- nota no rodapé identificando esses recursos para o visitante.

## Funcionalidades implementadas

- Navegação entre seções por âncoras, com destaque do link ativo ao rolar;
- Modelo de risco no hero: sliders → medidor de turnover e custo projetados;
- Diagnóstico de maturidade por sliders, com o perfil enviado junto do lead;
- "Pergunte à Aurora": cartões de resposta a perguntas de negócio;
- Calculadora de ROI com razonete animado (cálculo em `js/roi.js`, com testes);
- Hexágono de funcionalidades com pulsos percorrendo arestas e raios;
- Contadores animados nos números e na calculadora;
- Formulário de captação de lead com validação no navegador e **envio real** (Netlify Forms);
- Confirmação exibida na própria página;
- Layout responsivo e `prefers-reduced-motion` respeitado em todas as animações.

## Observação sobre o formulário

Na **Etapa 2** o formulário realiza **envio real**:

- validação local no navegador (campos obrigatórios + consentimento LGPD);
- envio via **Netlify Forms** (`fetch` no padrão AJAX), sem sair da página;
- proteção anti-spam por honeypot;
- campos ocultos enviados junto do lead: `perfil-diagnostico` (resultado do diagnóstico),
  `colaboradores` e `economia-estimada` (calculadora de ROI);
- os leads ficam disponíveis no painel da Netlify em **Forms**.

## Estrutura de arquivos

```txt
aurora-project/
├── index.html              # landing page (marcação + <head>)
├── 404.html
├── netlify.toml            # publish dir, cabeçalhos de cache e segurança
├── robots.txt
├── sitemap.xml
├── .gitignore
├── README.md
├── css/
│   └── styles.css          # design system "Campo de risco"
├── js/
│   ├── main.js             # comportamento da página (IIFE, um módulo por seção)
│   └── roi.js              # módulo calcularRoi (usado pela calculadora, com testes)
├── tests/
│   └── roi.test.js         # node:test — 4 casos
├── assets/
│   ├── aurora-mark.svg     # marca "A" vetorizada (usada com o wordmark)
│   ├── aurora-logo.png     # a mesma marca "A" em raster (arquivo de origem)
│   ├── favicon.svg
│   └── og-cover.svg
└── docs/
    ├── entrega-etapa-2.md      # dossiê formal (base do PDF)
    ├── handoff-etapa-2.md      # detalhamento: código, design e o que cada seção faz
    ├── aurora-etapa-2-pdf.pdf  # PDF de entrega
    ├── aurora-project.pdf      # entrega da Etapa 1
    ├── proposta-visual/        # protótipo aprovado da nova direção (referência)
    └── superpowers/            # registro das decisões de projeto (spec + plano)
```

## Como visualizar o projeto

Para visualizar a landing page localmente:

1. Baixe ou clone este repositório.
2. Rode um servidor estático na raiz: `npx --yes serve .`
3. Abra o endereço mostrado no terminal (ex.: `http://localhost:3000`) e navegue pelas seções.

Abrir `index.html` direto pelo `file://` não é recomendado — o formulário e o
carregamento dos scripts precisam de uma origem HTTP.

Testes da calculadora de ROI: `node --test tests/roi.test.js`

## Status do projeto

Projeto desenvolvido para a entrega acadêmica da **Etapa 2** do Enterprise Challenge.

Fazem parte desta etapa:

- deploy online em URL pública;
- formulário de lead com envio real;
- todas as seções da Etapa 1 refinadas;
- identidade visual aplicada;
- responsividade;
- recursos de acessibilidade implementados e identificados na página;
- organização dos arquivos.

Não faz parte desta etapa:

- vídeo-pitch.

## Repositório

Link do repositório público: https://github.com/defxico/aurora-project

## Licença

Projeto acadêmico desenvolvido exclusivamente para fins educacionais.
