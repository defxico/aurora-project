# Aurora — Landing Page B2B

Projeto desenvolvido para o **People First Cup — Enterprise Challenge — Etapa 2**, com o objetivo de publicar online uma landing page para a marca fictícia **Aurora**, voltada ao público B2B, com formulário de captação de lead funcionando.

A proposta da Aurora é apresentar uma plataforma de **People Analytics** capaz de transformar dados de RH em decisões estratégicas, ajudando empresas a reduzir turnover, acompanhar engajamento, prever riscos e demonstrar o impacto financeiro das iniciativas de pessoas.

## Informações do projeto

**Curso:** Web Design
**Turma:** 1TWDOA
**Challenge:** People First Cup — Enterprise Challenge
**Etapa:** 2
**Tema:** Landing page B2B para Aurora

## Deploy

- **Landing page publicada:** `https://aurora-people-analytics.netlify.app/` *(ajustar para a URL real após publicar na Netlify)*
- **Hospedagem:** Netlify, com deploy automático a cada push na branch `main`.
- **Formulário:** Netlify Forms — os leads chegam no painel do site em **Forms** e podem
  notificar por e-mail.

## Integrantes

> Preencher em ordem alfabética, conforme solicitado na entrega.

Amanda Ayumi Guedes Ueno - RM573609

Francisco Caetano Bernardes - RM 571399

Giovanna Camargo Budin - RM571861

Mariana Costa Cruz Maciel - RM570455 


## Objetivo da landing page

A landing page foi criada para comunicar a solução da Aurora de forma clara, visual e convincente para empresas que precisam tomar decisões mais estratégicas sobre pessoas.

O projeto busca apresentar:

- os principais problemas enfrentados por áreas de RH;
- o funcionamento da solução Aurora;
- funcionalidades centrais da plataforma;
- indicadores de impacto esperado;
- formulário de captação de lead;
- navegação fluida entre as seções;
- recursos básicos de acessibilidade.

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

5. **Solução**
   - "Pergunte à Aurora": cinco perguntas de negócio abrem um cartão com gráfico, achado
     e ação recomendada.

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

A direção visual atual, **"Campo de risco"**, usa fundo claro, tipografia forte e o
magenta da marca como acento principal. Cada seção é um instrumento operável, não só um
bloco de texto — a página "faz algo".

### Principais cores

- Fundo claro: `#F6F5F8`
- Texto: `#17141D` (secundário `#5C5967`)
- Magenta (acento principal): `#A81F62`
- Teal (apoio): `#12796C`
- Roxo (apoio): `#574587`

### Tipografia

- **Archivo** (Google Fonts), pesos 400 a 800 — títulos e texto.

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

- uso de HTML semântico e skip-link para o conteúdo principal;
- navegação e seções com `aria-label` / `aria-labelledby`;
- regiões `aria-live` nos medidores (hero, diagnóstico), no razonete e no erro do formulário;
- sliders e abas ("Pergunte à Aurora", com `role="tab"`) operáveis por teclado;
- foco sempre visível (`:focus-visible`) sobre o fundo claro;
- `label` associado a cada campo do formulário;
- contraste de texto validado em nível AA;
- `prefers-reduced-motion`: pulsos desligados e contadores instantâneos;
- layout sem rolagem horizontal de 360 px a 1280 px e até 200% de zoom.

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
├── netlify.toml
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   └── styles.css          # design system "Campo de risco"
├── js/
│   ├── main.js             # comportamento da página (IIFE)
│   └── roi.js              # módulo calcularRoi (com testes)
├── tests/
│   └── roi.test.js         # node:test — 4 casos
├── assets/
│   ├── favicon.svg
│   └── og-cover.svg
└── docs/
    ├── entrega-etapa-2.md
    ├── proposta-visual/     # protótipo aprovado (referência)
    └── superpowers/         # specs e planos
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
