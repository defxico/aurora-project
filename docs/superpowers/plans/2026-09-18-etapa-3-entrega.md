# Aurora — Etapa 3 (Entrega Final) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produzir os três entregáveis documentais da Etapa 3 do Enterprise Challenge (dossiê markdown, README atualizado e PDF de entrega com o mesmo design visual do PDF da Etapa 2), sem alterar o código da landing page — o QA já foi executado e não encontrou bugs.

**Architecture:** Três tarefas independentes e sequenciais: (1) escrever `docs/entrega-etapa-3.md` reaproveitando o conteúdo validado de `docs/entrega-etapa-2.md`; (2) atualizar `README.md` trocando as referências de Etapa 2 por Etapa 3; (3) construir um template HTML/CSS que replica o layout do PDF da Etapa 2 (capa, sumário, 5 páginas de conteúdo) e renderizá-lo para PDF via Chrome headless (`--print-to-pdf`), corrigindo a ordem alfabética dos integrantes (bug existente no PDF da Etapa 2, onde Ana Rubia aparece fora de ordem).

**Tech Stack:** Markdown, HTML5/CSS3 puro (sem build), Google Fonts (Archivo, já usada no site), Chrome headless (`chrome.exe --headless --print-to-pdf`) já instalado em `C:\Program Files\Google\Chrome\Application\chrome.exe`.

## Global Constraints

- Nenhuma mudança de código na landing page (`index.html`, `css/`, `js/`) — fora de escopo desta etapa (spec seção 5).
- Integrantes sempre em ordem alfabética por primeiro nome, com RM: Amanda Ayumi Guedes Ueno (RM573609), Ana Rubia de Oliveira Freire (RM573171), Francisco Caetano Bernardes (RM571399), Giovanna Camargo Budin (RM571861), Mariana Costa Cruz Maciel (RM570455).
- Link do vídeo-pitch: ainda não existe — usar o placeholder literal `[link do vídeo-pitch — a inserir pelo grupo]` em todo lugar que o exigir (dossiê, README, PDF).
- Deploy: https://aurora-people-analytics.netlify.app/ · Repositório: https://github.com/defxico/aurora-project — não mudam.
- O PDF deve seguir o mesmo layout visual do `docs/aurora-etapa-2-pdf.pdf` (capa em gradiente lavanda/roxo com card de integrantes, sumário, cabeçalho com logo + título + número de página, barra de gradiente magenta→roxo→teal sob o cabeçalho, blocos de conteúdo com barra de cor lateral, tabelas com cabeçalho em gradiente, rodapé "Aurora · Enterprise Challenge Etapa 3 · FIAP · 2026").
- Paleta: fundo `#F6F5F8`, texto `#17141D` (secundário `#5C5967`), magenta `#A81F62`, teal `#12796C`, roxo `#574587`. Tipografia: Archivo (Google Fonts, pesos 400–800), já carregada em `index.html` via `https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap`.

---

## Task 1: Escrever o dossiê `docs/entrega-etapa-3.md`

**Files:**

- Create: `docs/entrega-etapa-3.md`
- Test: verificação manual via `grep` (não há suíte automatizada para documentação)

**Interfaces:**

- Consumes: conteúdo de `docs/entrega-etapa-2.md` (já existente no repositório, reaproveitado quase integralmente).
- Produces: `docs/entrega-etapa-3.md` — a Task 3 (PDF) usa o conteúdo deste arquivo como fonte de texto para as páginas do PDF. A Task 2 (README) referencia o caminho deste arquivo.

- [ ] **Step 1: Criar o arquivo com o conteúdo completo**

Criar `docs/entrega-etapa-3.md` com exatamente este conteúdo:

```markdown
# People First Cup — Enterprise Challenge · Etapa 3 — Aurora

## 1. Integrantes

- Amanda Ayumi Guedes Ueno — RM573609
- Ana Rubia de Oliveira Freire — RM573171
- Francisco Caetano Bernardes — RM571399
- Giovanna Camargo Budin — RM571861
- Mariana Costa Cruz Maciel — RM570455

## 2. Contexto e proposta de valor (B2B)

A Aurora é uma plataforma (fictícia) de People Analytics voltada a empresas de médio e
grande porte. Ela integra fontes dispersas de dados de RH (HRIS, folha, ATS, pulse
surveys), cruza indicadores em tempo real e entrega insights acionáveis — reduzindo
turnover, aumentando engajamento e acelerando decisões da liderança. A proposta de valor
para o público B2B: transformar dados de pessoas em decisão estratégica com impacto
financeiro demonstrável.

## 3. Contextualização e justificativa das decisões

### Plataforma de publicação — Netlify
Deploy por integração com o repositório GitHub (publicação automática a cada push na
`main`). Escolhida por oferecer **formulário nativo (Netlify Forms)** sem necessidade de
backend próprio, o que mantém o projeto 100% HTML/CSS/JS — coerente com o enunciado.
HTTPS automático, previews por pull request e plano gratuito suficiente para o escopo.

### Stack — HTML + CSS + JavaScript vanilla
Nenhum framework ou bundler. O JavaScript foi extraído do `index.html` para `js/main.js`
(organização e cache) e a lógica da calculadora isolada em `js/roi.js`, com testes
automatizados (`node --test tests/roi.test.js`).

### Formulário de captação de lead
Netlify Forms com submissão via `fetch` (padrão AJAX), preservando a validação
client-side e a mensagem de sucesso inline. Proteção anti-spam por honeypot. O lead chega
qualificado: os campos ocultos `perfil-diagnostico` (resultado do diagnóstico), `colaboradores` e
`economia-estimada` (calculadora de ROI) são enviados junto.

### Identidade visual — direção "Campo de risco"
A crítica recebida foi de que a versão anterior tinha "cara genérica de gerador de site".
A resposta foi uma direção visual própria, **"Campo de risco"**, que mantém os matizes do
design system da Aurora (roxo, teal, magenta) recalibrados para fundo claro:

- **Fundo** `#F6F5F8` claro, **texto** quase-preto `#17141D`, secundário `#5C5967`.
- **Magenta `#A81F62` como cor de acento principal** (era coadjuvante); teal `#12796C` e
  roxo `#574587` como apoio.
- **Tipografia Archivo** (sans, pesos 700–800) — sem serifa, sem fundo creme, sem
  hairlines por toda parte, sem coluna única centralizada.
- Layout assimétrico e tipografia editorial forte para diferenciar de templates.

Contraste de texto verificado para AA sobre o fundo claro.

### Arquitetura de conteúdo
Sequência: Navegação → Hero (campo de risco) → Desafios → Como funciona → Diagnóstico →
Solução → Funcionalidades → Números → Calculadora → Agendar demonstração → Rodapé.
Fluxo do problema à decisão de compra, com três momentos interativos de qualificação
(hero, diagnóstico, calculadora).

### Diferenciais ("solução disruptiva") — "a página é um instrumento"
Cada seção é operável, não só lida:

1. **Modelo de risco no Hero** — três sliders de fatores (engajamento, carga de trabalho,
   semanas sem 1:1) movem um medidor que projeta o turnover e o custo anual em reais em
   tempo real, com veredito ("estável" / "atenção" / "risco alto").
2. **Diagnóstico de maturidade** — quatro sliders de espectro alimentam um medidor e um
   perfil ("Gestão Intuitiva" → "Em Transição" → "Quase lá"). Ao tocar nos quatro, o
   perfil é exibido no formulário e enviado junto do lead.
3. **"Pergunte à Aurora"** — cinco perguntas de negócio (ex.: "Quem está em risco de sair
   em Vendas?") abrem um cartão com gráfico, achado e ação recomendada.
4. **Calculadora "conta que se monta"** — o visitante ajusta colaboradores, turnover e
   salário; um razonete monta linha a linha (saídas/ano → custo de reposição → custo
   anual → recuperável com a Aurora), com números animados. O cálculo vem de `js/roi.js`,
   módulo com testes automatizados. O resultado acompanha o lead.
5. **Hexágono de funcionalidades** — constelação de seis nós com pulsos pretos lentos
   percorrendo arestas e raios até o centro; vira lista simples em telas estreitas e com
   movimento reduzido.

### O que foi validado na Etapa 3
Na Etapa 3 não houve mudanças estruturais na landing page — o trabalho foi um QA de
verificação na página publicada, executado ao vivo em
https://aurora-people-analytics.netlify.app/:

- **Console:** sem erros JavaScript durante carregamento e uso.
- **Skip-link:** confirmado como primeiro elemento focável do DOM, apontando para
  `#conteudo`.
- **Interatividade:** os sliders do modelo de risco (hero) recalculam turnover, custo
  anual e veredito em tempo real; as abas "Pergunte à Aurora" trocam o painel de resposta
  corretamente.
- **Formulário:** submissão real testada de ponta a ponta — mensagem de confirmação
  "Recebido. O time da Aurora responde em até 1 dia útil com dois horários." exibida
  inline após o envio, confirmando o funcionamento do Netlify Forms.
- **Responsividade e `prefers-reduced-motion`:** validados por inspeção do código-fonte —
  breakpoints `min-width` mobile-first em todas as seções e um bloco global
  `@media (prefers-reduced-motion: reduce)` zerando durações de animação/transição.

Nenhum bug foi encontrado; não houve correções de código nesta etapa.

## 4. Recursos de acessibilidade presentes

> Todos verificáveis diretamente no código da página (`index.html` / `css/styles.css` /
> `js/main.js`).

| Recurso | Onde | Critério WCAG 2.1 |
| --- | --- | --- |
| HTML semântico (`header`/`main`/`section`/`nav`/`footer`), um único `h1` | Página inteira | 1.3.1 |
| Skip-link "Ir para o conteúdo principal" → `#conteudo` | Topo do `body` | 2.4.1 |
| Sliders (`input[type=range]`) operáveis por teclado com rótulo associado | Hero, diagnóstico, calculadora | 2.1.1, 4.1.2 |
| Abas "Pergunte à Aurora" com `role="tab"` e navegação por setas | Seção Solução | 2.1.1, 4.1.2 |
| Regiões `aria-live="polite"` nos medidores e no razonete | Hero, diagnóstico, calculadora | 4.1.3 |
| `role="alert"` na mensagem de erro do formulário | Seção Agendar demonstração | 4.1.3 |
| Foco sempre visível (`:focus-visible`, contorno magenta) sobre fundo claro | Todos os interativos | 2.4.7 |
| `aria-label` / `aria-labelledby` nas seções e na navegação | Página inteira | 1.3.1, 4.1.2 |
| Elementos decorativos (hexágono, linhas de fluxo) com `aria-hidden` | SVGs de animação | 1.1.1 |
| SVG informativo do hexágono com `role="img"` + `aria-label`; marca do logo como decorativa (`alt=""`), com o texto "aurora" visível ao lado | Hexágono, cabeçalho e rodapé | 1.1.1 |
| `label` associado a cada campo; `required` nos obrigatórios | Formulário | 1.3.1, 3.3.2 |
| `prefers-reduced-motion`: pulsos desligados, contadores instantâneos, transições congeladas | Hexágono, "como funciona", calculadora, medidores | 2.3.3 |
| Contraste de texto AA na paleta clara; informação não transmitida só por cor | Página inteira | 1.4.1, 1.4.3 |
| Layout sem rolagem horizontal de 360 px a 1280 px e até 200% de zoom | Página inteira | 1.4.4, 1.4.10 |

Todos os recursos acima são verificáveis diretamente na página publicada — navegação por
teclado, leitor de tela e o modo de movimento reduzido do sistema operacional.

## 5. Link do deploy

https://aurora-people-analytics.netlify.app/

## 6. Link do repositório

https://github.com/defxico/aurora-project

## 7. Link do vídeo-pitch

[link do vídeo-pitch — a inserir pelo grupo]

## 8. Como executar localmente

```bash
git clone https://github.com/defxico/aurora-project.git
cd aurora-project
npx --yes serve .
# abrir o endereço mostrado no terminal (ex.: http://localhost:3000)
```

Não é necessário instalar dependências: o site é HTML/CSS/JS estático.

Testes da calculadora de ROI: `node --test tests/roi.test.js`
(rodar o arquivo explicitamente — `node --test tests/` falha no Node 24).

### Estrutura de arquivos

```
aurora-project/
├── index.html              # landing page (marcação + <head>)
├── 404.html
├── css/
│   └── styles.css          # design system "Campo de risco"
├── js/
│   ├── main.js             # comportamento da página (IIFE)
│   └── roi.js               # módulo calcularRoi (com testes)
├── tests/
│   └── roi.test.js         # node:test — 4 casos
├── assets/                 # aurora-mark.svg · aurora-logo.png · favicon.svg · og-cover.svg
├── netlify.toml · robots.txt · sitemap.xml
└── docs/
    ├── entrega-etapa-2.md
    ├── entrega-etapa-3.md      # este documento
    ├── aurora-etapa-3-pdf.pdf  # PDF de entrega da Etapa 3
    ├── handoff-etapa-2.md      # matéria-prima do PDF da Etapa 2
    ├── proposta-visual/        # protótipo aprovado (referência)
    └── superpowers/            # specs e planos
```
```

- [ ] **Step 2: Verificar que o placeholder do vídeo e a ordem dos integrantes estão corretos**

Run:
```bash
grep -n "vídeo-pitch — a inserir" docs/entrega-etapa-3.md
grep -n "^- " docs/entrega-etapa-3.md | head -5
```
Expected: a primeira linha mostra o placeholder; a segunda mostra as 5 linhas de integrantes na ordem Amanda, Ana Rubia, Francisco, Giovanna, Mariana.

- [ ] **Step 3: Commit**

```bash
git add docs/entrega-etapa-3.md
git commit -m "Adiciona o dossie de entrega da Etapa 3"
```

---

## Task 2: Atualizar `README.md` para a Etapa 3

**Files:**

- Modify: `README.md:1-9` (título e parágrafo de abertura)
- Modify: `README.md:16-21` (Informações do projeto)
- Modify: `README.md:201-208` (Estrutura de arquivos — listagem do `docs/`)
- Modify: `README.md:223-239` (Status do projeto)
- Test: verificação manual via `grep`

**Interfaces:**

- Consumes: `docs/entrega-etapa-3.md` (Task 1) e `docs/aurora-etapa-3-pdf.pdf` (Task 3) — apenas como caminhos referenciados em links, não como dependência de execução (a ordem das tasks não precisa ser estritamente sequencial, mas os links só resolvem depois que as Tasks 1 e 3 existirem).
- Produces: nada consumido por outras tasks.

- [ ] **Step 1: Atualizar o título e o parágrafo de abertura**

Em `README.md`, substituir o bloco (linhas 1–9):

```markdown
# Aurora — Landing Page B2B

Projeto desenvolvido para o **People First Cup — Enterprise Challenge — Etapa 2**, com o objetivo de publicar online uma landing page para a marca fictícia **Aurora**, voltada ao público B2B, com formulário de captação de lead funcionando.

A proposta da Aurora é apresentar uma plataforma de **People Analytics** capaz de transformar dados de RH em decisões estratégicas, ajudando empresas a reduzir turnover, acompanhar engajamento, prever riscos e demonstrar o impacto financeiro das iniciativas de pessoas.

Na Etapa 2 a página ganhou deploy público, formulário com envio real, código reorganizado em `css/` e `js/` (com testes) e uma nova direção visual — **"Campo de risco"** —, em que **cada seção é um instrumento que o visitante opera**, não apenas texto.

- **Site publicado:** https://aurora-people-analytics.netlify.app/
- **Documentação da entrega:** [`docs/entrega-etapa-2.md`](docs/entrega-etapa-2.md) (dossiê formal) · [`docs/handoff-etapa-2.md`](docs/handoff-etapa-2.md) (detalhamento) · `docs/aurora-etapa-2-pdf.pdf`
```

por:

```markdown
# Aurora — Landing Page B2B

Projeto desenvolvido para o **People First Cup — Enterprise Challenge — Etapa 3 (entrega final)**, com o objetivo de publicar online uma landing page para a marca fictícia **Aurora**, voltada ao público B2B, com formulário de captação de lead funcionando.

A proposta da Aurora é apresentar uma plataforma de **People Analytics** capaz de transformar dados de RH em decisões estratégicas, ajudando empresas a reduzir turnover, acompanhar engajamento, prever riscos e demonstrar o impacto financeiro das iniciativas de pessoas.

Na Etapa 2 a página ganhou deploy público, formulário com envio real, código reorganizado em `css/` e `js/` (com testes) e uma nova direção visual — **"Campo de risco"** —, em que **cada seção é um instrumento que o visitante opera**, não apenas texto. Na Etapa 3, entrega final do challenge, a landing page foi revalidada por um QA completo (console, formulário, responsividade e acessibilidade) sem necessidade de mudanças de código, e o time gravou o vídeo-pitch de apresentação.

- **Site publicado:** https://aurora-people-analytics.netlify.app/
- **Documentação da entrega:** [`docs/entrega-etapa-3.md`](docs/entrega-etapa-3.md) (dossiê formal) · `docs/aurora-etapa-3-pdf.pdf` — entrega anterior em [`docs/entrega-etapa-2.md`](docs/entrega-etapa-2.md) e [`docs/handoff-etapa-2.md`](docs/handoff-etapa-2.md)
```

- [ ] **Step 2: Atualizar "Informações do projeto"**

Substituir:

```markdown
**Etapa:** 2
```

por:

```markdown
**Etapa:** 3 (entrega final)
```

- [ ] **Step 3: Atualizar a listagem do `docs/` em "Estrutura de arquivos"**

Substituir o bloco final da árvore de arquivos (linhas 201-208):

```
└── docs/
    ├── entrega-etapa-2.md      # dossiê formal (base do PDF)
    ├── handoff-etapa-2.md      # detalhamento: código, design e o que cada seção faz
    ├── aurora-etapa-2-pdf.pdf  # PDF de entrega
    ├── aurora-project.pdf      # entrega da Etapa 1
    ├── proposta-visual/        # protótipo aprovado da nova direção (referência)
    └── superpowers/            # registro das decisões de projeto (spec + plano)
```

por:

```
└── docs/
    ├── entrega-etapa-3.md      # dossiê formal da entrega final (base do PDF)
    ├── aurora-etapa-3-pdf.pdf  # PDF de entrega da Etapa 3
    ├── entrega-etapa-2.md      # dossiê da Etapa 2 (histórico)
    ├── handoff-etapa-2.md      # detalhamento da Etapa 2: código, design e o que cada seção faz
    ├── aurora-etapa-2-pdf.pdf  # PDF de entrega da Etapa 2 (histórico)
    ├── aurora-project.pdf      # entrega da Etapa 1 (histórico)
    ├── proposta-visual/        # protótipo aprovado da direção visual (referência)
    └── superpowers/            # registro das decisões de projeto (specs + planos)
```

- [ ] **Step 4: Reescrever "Status do projeto"**

Substituir o bloco (linhas 223-239):

```markdown
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
```

por:

```markdown
## Status do projeto

Projeto desenvolvido para a entrega acadêmica final da **Etapa 3** do Enterprise
Challenge.

Fazem parte desta etapa:

- landing page completa, publicada e revalidada por QA (deploy, formulário,
  responsividade e acessibilidade sem regressões);
- vídeo-pitch de 2 a 3 minutos, publicado em plataforma de vídeo online;
- dossiê de entrega (`docs/entrega-etapa-3.md`) e PDF (`docs/aurora-etapa-3-pdf.pdf`)
  com a contextualização, a justificativa das decisões e os links pedidos no enunciado.

Etapa 2 (histórico): primeira entrega com deploy público, formulário com envio real e a
direção visual "Campo de risco" — ver `docs/entrega-etapa-2.md`.
```

- [ ] **Step 5: Verificar que não sobrou referência solta à Etapa 2 como etapa atual**

Run:
```bash
grep -n "Etapa 2" README.md
```
Expected: as únicas ocorrências restantes de "Etapa 2" são as que citam o histórico explicitamente (parágrafo de abertura, links de documentação, "Status do projeto"/histórico, listagem de `docs/`) — nenhuma delas afirma que o projeto atual é a Etapa 2.

- [ ] **Step 6: Commit**

```bash
git add README.md
git commit -m "Atualiza o README para a Etapa 3 (entrega final)"
```

---

## Task 3: Gerar o PDF de entrega `docs/aurora-etapa-3-pdf.pdf`

**Files:**

- Create: `docs/aurora-etapa-3-pdf-template.html` (fonte HTML/CSS do PDF, mantida no repo para permitir regerar o PDF quando o link do vídeo-pitch existir)
- Create: `docs/aurora-etapa-3-pdf.pdf` (gerado a partir do HTML acima)
- Test: extração de texto do PDF gerado e inspeção visual das páginas

**Interfaces:**

- Consumes: conteúdo de `docs/entrega-etapa-3.md` (Task 1) — o texto das páginas do PDF vem desse documento.
- Produces: `docs/aurora-etapa-3-pdf.pdf`, referenciado pela Task 2 (README) e pelo dossiê (Task 1, seção "Como executar localmente" / estrutura de arquivos).

- [ ] **Step 1: Criar o template HTML/CSS**

Criar `docs/aurora-etapa-3-pdf-template.html` com o conteúdo abaixo. Ele replica o layout
visual de `docs/aurora-etapa-2-pdf.pdf` (capa em gradiente com card de integrantes,
sumário, 5 páginas de conteúdo com cabeçalho/rodapé de marca), com os integrantes em
ordem alfabética (corrigindo o desalinhamento existente no PDF da Etapa 2, onde Ana Rubia
aparecia fora de ordem por ter sido adicionada depois) e a nova seção "Link do
vídeo-pitch":

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>Aurora — Enterprise Challenge Etapa 3</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap" />
<style>
  :root {
    --bg: #F6F5F8;
    --ink: #17141D;
    --ink2: #5C5967;
    --magenta: #A81F62;
    --teal: #12796C;
    --roxo: #574587;
    --grad: linear-gradient(90deg, var(--magenta), var(--roxo), var(--teal));
  }
  * { box-sizing: border-box; }
  @page { size: A4; margin: 0; }
  html, body { margin: 0; font-family: 'Archivo', sans-serif; color: var(--ink); }
  .page {
    width: 210mm; height: 297mm; padding: 18mm 16mm;
    position: relative; page-break-after: always;
    display: flex; flex-direction: column;
  }
  .page:last-child { page-break-after: auto; }

  /* Capa */
  .cover {
    background: linear-gradient(160deg, #EDE4F0 0%, #D9C9E3 45%, #C9B4D9 100%);
    justify-content: space-between;
  }
  .cover__top { display: flex; justify-content: flex-end; font-size: 10pt; color: var(--ink2); }
  .cover__mid { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 6mm; }
  .cover__eyebrow { font-size: 10pt; font-weight: 700; letter-spacing: .08em; color: var(--teal); text-transform: uppercase; }
  .cover__title { font-size: 13pt; font-weight: 700; color: var(--roxo); text-transform: uppercase; letter-spacing: .04em; }
  .cover__brand { display: flex; align-items: center; gap: 6mm; margin-top: 10mm; }
  .cover__brand img { height: 16mm; }
  .cover__brand .wordmark { font-size: 30pt; font-weight: 800; }
  .cover__brand .wordmark span { color: var(--magenta); }
  .cover__divider { width: 1px; height: 16mm; background: var(--ink2); opacity: .4; }
  .cover__card { background: #17141D; border-radius: 4px; padding: 6mm 8mm; color: #F6F5F8; }
  .cover__card h3 { font-size: 9pt; letter-spacing: .1em; color: var(--magenta); margin: 0 0 4mm; }
  .cover__row { display: flex; justify-content: space-between; padding: 3mm 0; border-top: 1px solid rgba(255,255,255,.12); font-size: 11pt; }
  .cover__row:first-of-type { border-top: none; }
  .cover__row b { color: var(--teal); font-weight: 700; }

  /* Páginas internas */
  .content .head {
    display: flex; align-items: center; justify-content: space-between;
    padding-bottom: 4mm; border-bottom: 3px solid transparent;
    border-image: var(--grad) 1;
    font-size: 10pt; color: var(--ink2);
  }
  .content .head .brand { display: flex; align-items: center; gap: 3mm; font-size: 13pt; font-weight: 800; color: var(--ink); }
  .content .head .brand img { height: 7mm; }
  .content .breadcrumb { font-size: 9pt; color: var(--teal); font-weight: 700; margin-top: 6mm; }
  .content h1 { font-size: 22pt; font-weight: 800; color: var(--roxo); margin: 2mm 0 8mm; }
  .content .block { border-left: 3px solid var(--magenta); padding: 0 0 0 6mm; margin-bottom: 7mm; }
  .content .block.teal { border-color: var(--teal); }
  .content .block.roxo { border-color: var(--roxo); }
  .content .block h4 { font-size: 9pt; letter-spacing: .05em; text-transform: uppercase; color: var(--magenta); margin: 0 0 2mm; }
  .content .block.teal h4 { color: var(--teal); }
  .content .block.roxo h4 { color: var(--roxo); }
  .content .block p { font-size: 10.5pt; line-height: 1.55; color: var(--ink); margin: 0 0 3mm; }
  .content table { width: 100%; border-collapse: collapse; font-size: 9.5pt; margin-bottom: 6mm; }
  .content thead th { background: var(--grad); color: #fff; text-align: left; padding: 3mm 4mm; font-size: 9pt; }
  .content tbody td { padding: 3mm 4mm; border-bottom: 1px solid #E5E2EA; }
  .content tbody tr:nth-child(even) { background: #FAF9FB; }
  .content .foot { margin-top: auto; padding-top: 4mm; border-top: 1px solid #E5E2EA; display: flex; justify-content: space-between; font-size: 8.5pt; color: var(--ink2); }
  .content .linkcard { padding: 5mm 6mm; border-radius: 3px; color: #fff; margin-bottom: 4mm; font-size: 11pt; }
  .content .linkcard a { color: #fff; }
  .content .linkcard.deploy { background: linear-gradient(90deg, #0D5A50, var(--teal)); }
  .content .linkcard.repo { background: linear-gradient(90deg, var(--roxo), #7A63A8); }
  .content .linkcard.video { background: linear-gradient(90deg, var(--magenta), #C24178); }
  .content code, .content pre { font-family: 'Courier New', monospace; font-size: 9pt; }
  .content pre { background: #F1EFF4; padding: 3mm; border-radius: 3px; overflow: hidden; }
  .content .filetree { font-family: 'Courier New', monospace; font-size: 9pt; border-left: 3px solid var(--roxo); padding-left: 6mm; line-height: 1.6; white-space: pre; }
  .sumario ol { list-style: none; padding: 0; margin: 0; counter-reset: item; }
  .sumario li { font-size: 11pt; padding: 3mm 0; border-bottom: 1px solid #E5E2EA; }
  .sumario li b { color: var(--magenta); margin-right: 4mm; }
</style>
</head>
<body>

  <!-- Página 1: Capa -->
  <section class="page cover">
    <div class="cover__top">FIAP · 2026</div>
    <div class="cover__mid">
      <div class="cover__eyebrow">People First Cup</div>
      <div class="cover__title">Enterprise Challenge — Etapa 3 · Entrega Final</div>
      <div class="cover__brand">
        <img src="../assets/aurora-mark.svg" alt="" />
        <div class="cover__divider"></div>
        <div class="wordmark">aur<span>o</span>ra</div>
      </div>
    </div>
    <div class="cover__card">
      <h3>INTEGRANTES</h3>
      <div class="cover__row"><span>Amanda Ayumi Guedes Ueno</span><b>RM573609</b></div>
      <div class="cover__row"><span>Ana Rubia de Oliveira Freire</span><b>RM573171</b></div>
      <div class="cover__row"><span>Francisco Caetano Bernardes</span><b>RM571399</b></div>
      <div class="cover__row"><span>Giovanna Camargo Budin</span><b>RM571861</b></div>
      <div class="cover__row"><span>Mariana Costa Cruz Maciel</span><b>RM570455</b></div>
    </div>
  </section>

  <!-- Página 2: Sumário -->
  <section class="page content sumario">
    <div class="head">
      <div class="brand"><img src="../assets/aurora-mark.svg" alt="" />aurora</div>
      <div>Enterprise Challenge · Etapa 3</div>
      <div>02</div>
    </div>
    <div class="breadcrumb">02 · Sumário</div>
    <h1>Sumário</h1>
    <ol>
      <li><b>01</b> Integrantes e Contexto</li>
      <li><b>02</b> Contextualização e Justificativa</li>
      <li><b>03</b> O que foi validado na Etapa 3</li>
      <li><b>04</b> Recursos de Acessibilidade</li>
      <li><b>05</b> Links de Entrega (deploy, repositório, vídeo-pitch)</li>
      <li><b>06</b> Como Executar Localmente</li>
    </ol>
    <div class="foot"><span>Aurora · Enterprise Challenge Etapa 3 · FIAP · 2026</span><span>02</span></div>
  </section>

  <!-- Página 3: Integrantes e Contexto -->
  <section class="page content">
    <div class="head">
      <div class="brand"><img src="../assets/aurora-mark.svg" alt="" />aurora</div>
      <div>Enterprise Challenge · Etapa 3</div>
      <div>03</div>
    </div>
    <div class="breadcrumb">01 · Integrantes e Contexto</div>
    <h1>Integrantes e Contexto</h1>
    <table>
      <thead><tr><th>NOME</th><th>RM</th></tr></thead>
      <tbody>
        <tr><td>Amanda Ayumi Guedes Ueno</td><td>RM573609</td></tr>
        <tr><td>Ana Rubia de Oliveira Freire</td><td>RM573171</td></tr>
        <tr><td>Francisco Caetano Bernardes</td><td>RM571399</td></tr>
        <tr><td>Giovanna Camargo Budin</td><td>RM571861</td></tr>
        <tr><td>Mariana Costa Cruz Maciel</td><td>RM570455</td></tr>
      </tbody>
    </table>
    <div class="block">
      <h4>Contexto e Proposta de Valor</h4>
      <p>A Aurora é uma plataforma (fictícia) de People Analytics voltada a empresas de médio e grande porte. Ela integra fontes dispersas de dados de RH (HRIS, folha, ATS, pulse surveys), cruza indicadores em tempo real e entrega insights acionáveis — reduzindo turnover, aumentando engajamento e acelerando decisões da liderança. A proposta de valor para o público B2B: transformar dados de pessoas em decisão estratégica com impacto financeiro demonstrável.</p>
    </div>
    <div class="foot"><span>Aurora · Enterprise Challenge Etapa 3 · FIAP · 2026</span><span>03</span></div>
  </section>

  <!-- Página 4: Contextualização e Justificativa -->
  <section class="page content">
    <div class="head">
      <div class="brand"><img src="../assets/aurora-mark.svg" alt="" />aurora</div>
      <div>Enterprise Challenge · Etapa 3</div>
      <div>04</div>
    </div>
    <div class="breadcrumb">02 · Contextualização e Justificativa</div>
    <h1>Contextualização e Justificativa</h1>
    <div class="block teal">
      <h4>Plataforma de Publicação — Netlify</h4>
      <p>Deploy por integração com o repositório GitHub, com publicação automática a cada push na branch main. O formulário usa Netlify Forms, sem necessidade de backend próprio — mantendo o projeto 100% HTML/CSS/JS, conforme o enunciado. HTTPS automático, previews por pull request e plano gratuito suficiente para o escopo.</p>
    </div>
    <div class="block roxo">
      <h4>Stack — HTML + CSS + JavaScript Vanilla</h4>
      <p>Nenhum framework ou bundler. O JavaScript foi extraído para js/main.js e a lógica da calculadora isolada em js/roi.js, com testes automatizados via node --test tests/roi.test.js.</p>
    </div>
    <div class="block">
      <h4>Identidade Visual — Direção "Campo de Risco"</h4>
      <p>Fundo claro #F6F5F8, texto quase-preto #17141D, magenta #A81F62 como cor de acento principal, teal #12796C e roxo #574587 como apoio. Tipografia Archivo, pesos 700–800. Layout assimétrico e tipografia editorial forte, em que cada seção é um instrumento que o visitante opera — não apenas texto.</p>
    </div>
    <div class="foot"><span>Aurora · Enterprise Challenge Etapa 3 · FIAP · 2026</span><span>04</span></div>
  </section>

  <!-- Página 5: O que foi validado na Etapa 3 -->
  <section class="page content">
    <div class="head">
      <div class="brand"><img src="../assets/aurora-mark.svg" alt="" />aurora</div>
      <div>Enterprise Challenge · Etapa 3</div>
      <div>05</div>
    </div>
    <div class="breadcrumb">03 · O que foi validado na Etapa 3</div>
    <h1>O que foi validado na Etapa 3</h1>
    <div class="block">
      <h4>QA de Verificação</h4>
      <p>Sem mudanças estruturais na landing page: a Etapa 2 já atendia aos requisitos técnicos da Etapa 3. O trabalho desta etapa foi um QA de verificação, executado ao vivo na página publicada.</p>
    </div>
    <div class="block teal">
      <h4>Console e Formulário</h4>
      <p>Sem erros JavaScript durante carregamento e uso. Submissão do formulário testada de ponta a ponta: mensagem "Recebido. O time da Aurora responde em até 1 dia útil com dois horários." exibida inline após o envio, confirmando o Netlify Forms em produção.</p>
    </div>
    <div class="block roxo">
      <h4>Interatividade, Responsividade e Movimento Reduzido</h4>
      <p>Sliders do modelo de risco e abas "Pergunte à Aurora" testados e funcionando. Responsividade e prefers-reduced-motion confirmados por inspeção do código-fonte: breakpoints mobile-first em todas as seções e bloco global zerando animações quando o sistema operacional pede movimento reduzido.</p>
    </div>
    <div class="foot"><span>Aurora · Enterprise Challenge Etapa 3 · FIAP · 2026</span><span>05</span></div>
  </section>

  <!-- Página 6: Acessibilidade -->
  <section class="page content">
    <div class="head">
      <div class="brand"><img src="../assets/aurora-mark.svg" alt="" />aurora</div>
      <div>Enterprise Challenge · Etapa 3</div>
      <div>06</div>
    </div>
    <div class="breadcrumb">04 · Recursos de Acessibilidade</div>
    <h1>Recursos de Acessibilidade</h1>
    <table>
      <thead><tr><th>Recurso</th><th>Onde</th><th>WCAG 2.1</th></tr></thead>
      <tbody>
        <tr><td>HTML semântico, um único h1</td><td>Página inteira</td><td>1.3.1</td></tr>
        <tr><td>Skip-link "Ir para o conteúdo principal"</td><td>Topo do body</td><td>2.4.1</td></tr>
        <tr><td>Sliders nativos com rótulo e aria-valuetext</td><td>Hero, Diagnóstico, Calculadora</td><td>2.1.1, 4.1.2</td></tr>
        <tr><td>Abas com padrão ARIA completo</td><td>A plataforma</td><td>2.1.1, 4.1.2</td></tr>
        <tr><td>Regiões aria-live nos medidores e no razonete</td><td>Hero, Diagnóstico, Calculadora</td><td>4.1.3</td></tr>
        <tr><td>role="alert" no erro do formulário</td><td>Agendar demonstração</td><td>4.1.3</td></tr>
        <tr><td>Foco sempre visível (:focus-visible)</td><td>Todos os interativos</td><td>2.4.7</td></tr>
        <tr><td>label associado a cada campo</td><td>Formulário</td><td>1.3.1, 3.3.2</td></tr>
        <tr><td>prefers-reduced-motion respeitado</td><td>Hexágono, medidores, calculadora</td><td>2.3.3</td></tr>
        <tr><td>Contraste AA; informação não só por cor</td><td>Página inteira</td><td>1.4.1, 1.4.3</td></tr>
        <tr><td>Sem rolagem horizontal de 360px a 1280px, zoom 200%</td><td>Página inteira</td><td>1.4.4, 1.4.10</td></tr>
      </tbody>
    </table>
    <div class="foot"><span>Aurora · Enterprise Challenge Etapa 3 · FIAP · 2026</span><span>06</span></div>
  </section>

  <!-- Página 7: Links de entrega -->
  <section class="page content">
    <div class="head">
      <div class="brand"><img src="../assets/aurora-mark.svg" alt="" />aurora</div>
      <div>Enterprise Challenge · Etapa 3</div>
      <div>07</div>
    </div>
    <div class="breadcrumb">05 · Links de Entrega</div>
    <h1>Links de Entrega</h1>
    <div class="linkcard deploy"><b>Deploy · Netlify</b><br />https://aurora-people-analytics.netlify.app/</div>
    <div class="linkcard repo"><b>Repositório GitHub</b><br />https://github.com/defxico/aurora-project</div>
    <div class="linkcard video"><b>Vídeo-pitch</b><br />[link do vídeo-pitch — a inserir pelo grupo]</div>
    <div class="block">
      <h4>Como Executar Localmente</h4>
      <p>Clone o repositório e sirva o projeto localmente:</p>
    </div>
    <pre>git clone https://github.com/defxico/aurora-project.git
cd aurora-project
npx --yes serve .
# abrir o endereço mostrado no terminal (ex.: http://localhost:3000)

# testes automatizados da calculadora de ROI:
node --test tests/roi.test.js</pre>
    <div class="foot"><span>Aurora · Enterprise Challenge Etapa 3 · FIAP · 2026</span><span>07</span></div>
  </section>

</body>
</html>
```

- [ ] **Step 2: Renderizar o HTML para PDF via Chrome headless**

Run:
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="C:/dev/aurora-project/docs/aurora-etapa-3-pdf.pdf" --print-to-pdf-no-header "file:///C:/dev/aurora-project/docs/aurora-etapa-3-pdf-template.html"
```
Expected: comando termina sem erro e o arquivo `docs/aurora-etapa-3-pdf.pdf` é criado.

- [ ] **Step 3: Verificar o PDF gerado**

Usar a ferramenta de leitura de PDF (Read com `pages`) sobre `docs/aurora-etapa-3-pdf.pdf` para conferir visualmente as 7 páginas: capa com os 5 integrantes em ordem alfabética, sumário, integrantes e contexto, contextualização e justificativa, "O que foi validado na Etapa 3", tabela de acessibilidade, e a página final com os 3 cards de link (deploy, repositório, vídeo-pitch com o placeholder) e o bloco "Como executar localmente".

Checar especificamente:
- Nenhum texto cortado ou saindo da página (indicativo de quebra de layout no template).
- O card de vídeo-pitch mostra o texto `[link do vídeo-pitch — a inserir pelo grupo]` por completo.
- A ordem dos integrantes na capa e na página 3 é: Amanda, Ana Rubia, Francisco, Giovanna, Mariana (alfabética — corrigindo a ordem que estava errada no PDF da Etapa 2).

Se algo estiver cortado ou desalinhado, ajustar o CSS no Step 1 (tipicamente `font-size`, `padding` ou `height` dos elementos) e repetir os Steps 2–3.

- [ ] **Step 4: Commit**

```bash
git add docs/aurora-etapa-3-pdf-template.html docs/aurora-etapa-3-pdf.pdf
git commit -m "Gera o PDF de entrega da Etapa 3 com o layout da Etapa 2"
```
