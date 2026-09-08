# Aurora Landing Page — Etapa 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar a landing page da Aurora online (Netlify) com formulário de lead que envia de verdade, refino visual de Hero/Resultados/Solução, calculadora de ROI, quiz conectado ao lead, seção de acessibilidade e dossiê de entrega.

**Architecture:** Site 100% estático (HTML + CSS + JS vanilla), sem build step. Deploy na Netlify por integração com o repositório GitHub; formulário via Netlify Forms com submissão AJAX. Todo o JavaScript sai do `index.html` para `js/main.js`; a lógica pura da calculadora fica em `js/roi.js` (única parte com teste automatizado, via `node --test`).

**Tech Stack:** HTML5, CSS3 (custom properties já existentes), JavaScript ES2020 sem dependências, SVG inline, Google Fonts, Netlify (hosting + Forms), Node 18+ apenas para rodar os testes da calculadora.

## Global Constraints

- **Sem frameworks, sem bundler, sem dependências de runtime.** Nenhum `npm install` de libs de produção. Node só para `node --test`.
- **Paleta fixa** (não introduzir cores fora disto): `--brand #534079`, `--magenta #89275E`, `--teal #238076`, `--purple-light #6A5299`, `--dark #0D0B14`, `--surface-1 #F8F7FF`.
- **Tipografia fixa:** Plus Jakarta Sans (títulos), Open Sans (texto) — via Google Fonts já incluído.
- **Idioma do conteúdo:** português (pt-BR). `<html lang="pt-BR">`.
- **Acessibilidade:** toda animação DEVE respeitar `prefers-reduced-motion: reduce`. Todo campo de formulário DEVE ter `<label>` associado. Contraste mínimo WCAG AA (4.5:1 texto normal, 3:1 texto grande).
- **Formulário Netlify:** o `<form>` tem `name="agendar-demonstracao"`; todos os campos (inclusive ocultos) existem no HTML estático — Netlify só detecta o que está no HTML publicado.
- **Nomes exatos dos campos ocultos:** `perfil-diagnostico`, `colaboradores`, `economia-estimada`.
- **Commits frequentes**, um por task no mínimo. Mensagens em português, imperativo.
- **Rodar local:** `npx --yes serve@14 .` (ou Live Server) — abrir via `http://localhost:3000`, nunca `file://` (o `fetch` do form e o carregamento de scripts precisam de origem HTTP).
- Repositório: `https://github.com/defxico/aurora-project`, branch de trabalho `etapa-2`.

---

## File Structure

| Arquivo | Responsabilidade | Ação |
| --- | --- | --- |
| `index.html` | Marcação da página única | Modificar (head, form, seções, remover `<script>` e estilos inline) |
| `404.html` | Página de erro com identidade Aurora | Criar |
| `css/styles.css` | Todo o estilo | Modificar (nova classe Solução, reduced-motion, Hero, Resultados, calculadora, seção a11y) |
| `js/main.js` | Todo o comportamento da página (observers, nav, quiz, form, calculadora) | Criar (recebe o script inline + novas features) |
| `js/roi.js` | Função pura `calcularRoi()` — sem DOM | Criar |
| `tests/roi.test.js` | Testes da `calcularRoi()` | Criar |
| `netlify.toml` | Config de publish + headers + cache | Criar |
| `robots.txt` | Diretrizes de crawler | Criar |
| `sitemap.xml` | Sitemap de 1 URL | Criar |
| `assets/favicon.svg` | Ícone da aba | Criar |
| `assets/og-cover.svg` | Preview social | Criar |
| `docs/entrega-etapa-2.md` | Dossiê de texto para o PDF | Criar |
| `README.md` | Documentação do repo | Modificar (Etapa 2, deploy, estrutura) |

---

## Task 1: Extrair JavaScript inline para `js/main.js`

Refactor puro — comportamento idêntico ao atual. Nenhuma feature nova.

**Files:**
- Create: `js/main.js`
- Modify: `index.html` (remover bloco `<script>` das linhas ~542–824; adicionar tag `src`)

**Interfaces:**
- Consumes: nada.
- Produces: `js/main.js` contendo todo o script atual, carregado com `defer`. Tasks seguintes editam este arquivo.

- [ ] **Step 1: Criar `js/main.js` com o conteúdo atual do script inline**

Copiar TODO o conteúdo entre `<script>` e `</script>` do `index.html` (hoje começa em `const revealObs = new IntersectionObserver(` e termina em `});` do handler de submit) para `js/main.js`, sem alterações. Primeira linha do arquivo:

```js
'use strict';
```

seguida do código copiado.

- [ ] **Step 2: Substituir o bloco inline no `index.html`**

Remover as linhas `<script> ... </script>` inteiras (imediatamente antes de `</body>`) e colocar no lugar:

```html
<script src="js/main.js" defer></script>
```

- [ ] **Step 3: Servir e verificar paridade**

Run: `npx --yes serve@14 . -l 3000`
Abrir `http://localhost:3000`. Verificar no navegador:
- Console sem erros (DevTools → Console).
- Reveal-on-scroll funciona ao rolar.
- Menu hambúrguer abre/fecha (viewport < 768px).
- Quiz: selecionar opção habilita "Próxima"; concluir mostra resultado.
- Contadores de "Resultados" animam ao entrar na viewport.
- Formulário: enviar vazio mostra erros; preencher + marcar LGPD mostra tela de sucesso.

Expected: comportamento idêntico ao estado anterior, zero erros no console.

- [ ] **Step 4: Commit**

```bash
git add js/main.js index.html
git commit -m "Extrai JavaScript inline para js/main.js"
```

---

## Task 2: Mover estilos inline da seção Solução para o CSS

**Files:**
- Modify: `index.html` (seção `#solucao`, ~linha 284 e ~linha 316)
- Modify: `css/styles.css` (bloco `.solucao`)

**Interfaces:**
- Consumes: nada.
- Produces: classe `.solucao__inner` e modificador `.btn-primary--block`.

- [ ] **Step 1: Adicionar classes no `css/styles.css`**

Depois do bloco `@media (min-width: 768px) { .solucao__card { ... } }` (linha ~315), adicionar:

```css
.solucao__inner {
  padding-block: 5.5rem;
  padding-inline: 1.5rem;
  max-width: 1120px;
  margin-inline: auto;
}
.btn-primary--block {
  display: flex;
  justify-content: center;
  margin-top: .5rem;
}
```

- [ ] **Step 2: Trocar os atributos `style` no `index.html`**

Linha ~284: `<div style="padding-block: 5.5rem; padding-inline: 1.5rem; max-width: 1120px; margin-inline: auto;">` → `<div class="solucao__inner">`

Linha ~316: `<a href="#contato" class="btn-primary" style="margin-top:.5rem;justify-content:center;">` → `<a href="#contato" class="btn-primary btn-primary--block">`

- [ ] **Step 3: Verificar**

Recarregar `http://localhost:3000`. A seção "Solução" deve estar visualmente idêntica: espaçamento vertical preservado, card centralizado, botão "Conhecer a plataforma" centralizado.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Move estilos inline da secao Solucao para o CSS"
```

---

## Task 3: Metadados do `<head>`, favicon e imagem social

**Files:**
- Modify: `index.html` (`<head>`)
- Create: `assets/favicon.svg`
- Create: `assets/og-cover.svg`

**Interfaces:**
- Consumes: nada.
- Produces: `assets/favicon.svg`, `assets/og-cover.svg` referenciados no `<head>`.

- [ ] **Step 1: Criar `assets/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#534079"/>
      <stop offset="1" stop-color="#238076"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0D0B14"/>
  <circle cx="32" cy="32" r="16" fill="url(#g)"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#6A5299" stroke-opacity=".4" stroke-width="2"/>
</svg>
```

- [ ] **Step 2: Criar `assets/og-cover.svg`** (1200×630, preview social)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0D0B14"/>
      <stop offset="0.55" stop-color="#171232"/>
      <stop offset="1" stop-color="#0C1A18"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#534079"/>
      <stop offset="1" stop-color="#238076"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="980" cy="150" r="120" fill="url(#accent)" opacity="0.25"/>
  <text x="90" y="270" fill="#FFFFFF" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="72" font-weight="800">Aurora</text>
  <text x="90" y="340" fill="#F0EEF8" font-family="Open Sans, Arial, sans-serif" font-size="34">People Analytics para decisões estratégicas</text>
  <text x="90" y="400" fill="rgba(240,238,248,0.6)" font-family="Open Sans, Arial, sans-serif" font-size="26">Reduza turnover · aumente engajamento · decida 3× mais rápido</text>
</svg>
```

- [ ] **Step 3: Atualizar o `<head>` do `index.html`**

Logo após a `<meta name="description" ...>` existente, inserir:

```html
  <link rel="canonical" href="https://aurora-people-analytics.netlify.app/" />
  <meta name="theme-color" content="#0D0B14" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Aurora · People Analytics para Empresas" />
  <meta property="og:description" content="Transforme dados de RH em decisões estratégicas. Reduza turnover, aumente engajamento e decida 3× mais rápido." />
  <meta property="og:url" content="https://aurora-people-analytics.netlify.app/" />
  <meta property="og:image" content="https://aurora-people-analytics.netlify.app/assets/og-cover.svg" />
  <meta property="og:locale" content="pt_BR" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Aurora · People Analytics para Empresas" />
  <meta name="twitter:description" content="Transforme dados de RH em decisões estratégicas." />
  <meta name="twitter:image" content="https://aurora-people-analytics.netlify.app/assets/og-cover.svg" />
```

> Nota: se o nome final do site na Netlify for outro, atualizar as 5 URLs acima na Task 12.

- [ ] **Step 4: Verificar**

Recarregar. Aba do navegador mostra o favicon novo. DevTools → Elements → `<head>` contém as meta tags. Sem erros de rede 404 para `favicon.svg`.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/favicon.svg assets/og-cover.svg
git commit -m "Adiciona metadados de head, favicon e imagem social"
```

---

## Task 4: Config de deploy Netlify — `netlify.toml`, `robots.txt`, `sitemap.xml`, `404.html`

**Files:**
- Create: `netlify.toml`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `404.html`

**Interfaces:**
- Consumes: `css/styles.css` (o `404.html` reusa o stylesheet).
- Produces: nada consumido por outras tasks.

- [ ] **Step 1: Criar `netlify.toml`**

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"
```

- [ ] **Step 2: Criar `robots.txt`**

```text
User-agent: *
Allow: /

Sitemap: https://aurora-people-analytics.netlify.app/sitemap.xml
```

- [ ] **Step 3: Criar `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aurora-people-analytics.netlify.app/</loc>
    <lastmod>2026-09-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Criar `404.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Página não encontrada · Aurora</title>
  <meta name="robots" content="noindex" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <style>
    .nf { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; gap: 1rem; }
    .nf h1 { font-family: var(--ff-title); font-size: clamp(3rem, 12vw, 6rem); font-weight: 800; color: #fff; letter-spacing: -.04em; }
    .nf p { font-family: var(--ff-body); color: var(--text-muted); max-width: 420px; line-height: 1.7; }
  </style>
</head>
<body>
  <main class="nf">
    <h1>404</h1>
    <p>A página que você procura não existe ou foi movida. Volte para a página inicial da Aurora.</p>
    <a href="/" class="btn-primary"><span>Voltar ao início</span><span aria-hidden="true">→</span></a>
  </main>
</body>
</html>
```

- [ ] **Step 5: Verificar**

Recarregar `http://localhost:3000/404.html` — página estilizada com a identidade Aurora e botão que leva a `/`. `serve` também mostra o 404.html para rotas inexistentes: abrir `http://localhost:3000/rota-que-nao-existe`.

- [ ] **Step 6: Commit**

```bash
git add netlify.toml robots.txt sitemap.xml 404.html
git commit -m "Adiciona config de deploy Netlify, robots, sitemap e pagina 404"
```

---

## Task 5: Formulário de lead com envio real (Netlify Forms)

**Files:**
- Modify: `index.html` (seção `#contato`, `<form id="contact-form">`)
- Modify: `js/main.js` (handler de submit — hoje ao final do arquivo)
- Modify: `css/styles.css` (estilos do honeypot e da linha de erro de rede)

**Interfaces:**
- Consumes: `js/main.js` (Task 1).
- Produces: `<form name="agendar-demonstracao">` com campos ocultos `perfil-diagnostico`, `colaboradores`, `economia-estimada` e ids `#lead-perfil-diagnostico`, `#lead-colaboradores`, `#lead-economia`. Task 10 e Task 11 escrevem nesses campos.

- [ ] **Step 1: Reescrever a abertura do `<form>` no `index.html`**

Trocar `<form id="contact-form" novalidate>` por:

```html
        <form id="contact-form" name="agendar-demonstracao" method="POST" data-netlify="true" netlify-honeypot="bot-field" novalidate>
          <input type="hidden" name="form-name" value="agendar-demonstracao" />
          <p class="hp-field" hidden>
            <label>Não preencha este campo: <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
          </p>
          <p class="form-diagnostico" id="form-diagnostico" hidden>
            Diagnóstico do quiz: <strong id="form-diagnostico-valor"></strong>
          </p>
          <input type="hidden" name="perfil-diagnostico" id="lead-perfil-diagnostico" />
          <input type="hidden" name="colaboradores" id="lead-colaboradores" />
          <input type="hidden" name="economia-estimada" id="lead-economia" />
```

(o restante do `<form>` — `<div class="form-grid">` etc. — permanece igual.)

- [ ] **Step 2: Adicionar região de erro de rede no `index.html`**

Logo após `<div class="sr-only" id="form-status" aria-live="polite"></div>` adicionar:

```html
        <p class="form-neterror" id="form-neterror" role="alert" hidden>
          Não foi possível enviar agora. Verifique sua conexão e tente novamente.
        </p>
```

- [ ] **Step 3: Estilos no `css/styles.css`**

Ao final do arquivo (antes do `@media (prefers-reduced-motion)` que a Task 6 adiciona, ou simplesmente no fim):

```css
.hp-field { position: absolute; left: -9999px; }
.form-diagnostico {
  font-family: var(--ff-body); font-size: .85rem; color: var(--text-on-dark);
  background: rgba(35,128,118,.12); border: 1px solid rgba(35,128,118,.3);
  border-radius: 8px; padding: .6rem .9rem; margin-bottom: 1.25rem;
}
.form-diagnostico strong { color: var(--teal); }
.form-neterror {
  font-family: var(--ff-body); font-size: .82rem; color: #f87171;
  text-align: center; margin-top: 1rem;
}
```

- [ ] **Step 4: Reescrever o handler de submit em `js/main.js`**

Localizar o bloco `const form = document.getElementById('contact-form');` e substituir a função interna do `form.addEventListener('submit', ...)`. A validação client-side (array `required`, checagem do `lgpd`) permanece idêntica. Trocar apenas o trecho final (do `const btn = document.getElementById('form-submit');` em diante) por:

```js
    const btn = document.getElementById('form-submit');
    const neterror = document.getElementById('form-neterror');
    if (neterror) neterror.hidden = true;
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.style.display = 'none';
        document.getElementById('form-success')?.classList.add('show');
        if (formStatus) formStatus.textContent = 'Formulário enviado com sucesso.';
      })
      .catch(() => {
        if (btn) { btn.disabled = false; btn.textContent = 'Agendar demonstração'; }
        if (neterror) neterror.hidden = false;
        if (formStatus) formStatus.textContent = 'Erro de rede ao enviar o formulário.';
      });
```

Remover o `setTimeout(...)` antigo que simulava o envio.

- [ ] **Step 5: Verificar local (o POST vai falhar local — é esperado)**

Recarregar. Preencher o form corretamente + marcar LGPD + enviar:
- Local (`serve`): não há backend, então o `fetch('/')` retorna 405/404 → a mensagem `#form-neterror` aparece e o botão reabilita. Isso confirma o caminho de erro.
- Validação: enviar com campos vazios ainda mostra os erros de campo e NÃO dispara o fetch.
- O honeypot `.hp-field` não aparece na tela e não recebe foco no Tab.

Expected: caminho de erro visível localmente; validação intacta. O caminho de sucesso só é testável no deploy (Task 12).

- [ ] **Step 6: Commit**

```bash
git add index.html js/main.js css/styles.css
git commit -m "Conecta formulario de lead ao Netlify Forms com envio AJAX"
```

---

## Task 6: Acessibilidade — `prefers-reduced-motion`, foco e contraste

**Files:**
- Modify: `css/styles.css` (novo bloco de media query ao final)
- Modify: `js/main.js` (guard nos contadores)

**Interfaces:**
- Consumes: `js/main.js` (Task 1).
- Produces: constante `prefersReducedMotion` disponível no escopo de `js/main.js` para Task 10.

- [ ] **Step 1: Adicionar bloco reduced-motion ao final de `css/styles.css`**

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }
  .reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
  .d-line { stroke-dashoffset: 0 !important; }
  .d-dot, .c-dot, .d-output-group { opacity: 1 !important; transform: none !important; }
  .solucao__bar-fill { transform: scaleX(1) !important; }
}
```

- [ ] **Step 2: Reforçar `:focus-visible` global em `css/styles.css`**

Logo após a regra `button { ... }` (linha ~22):

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 3px;
  border-radius: 4px;
}
```

- [ ] **Step 3: Guard de movimento reduzido nos contadores (`js/main.js`)**

No topo de `js/main.js` (após `'use strict';`):

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

No `numObs` (IntersectionObserver dos números), trocar `e.target.querySelectorAll('[data-target]').forEach(animateCounter);` por:

```js
      e.target.querySelectorAll('[data-target]').forEach(el => {
        if (prefersReducedMotion) {
          el.textContent = el.dataset.target + (el.dataset.suffix || '');
        } else {
          animateCounter(el);
        }
      });
```

- [ ] **Step 4: Verificar**

DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Recarregar:
- Nenhuma animação de entrada; todo conteúdo já no estado final.
- Números aparecem com o valor final imediatamente (32%, 47%, 3×).
- Navegar por Tab: contorno teal visível em todos os links/botões/campos.

Desligar a emulação → animações voltam a rodar.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css js/main.js
git commit -m "Respeita prefers-reduced-motion e reforca foco visivel"
```

---

## Task 7: Seção de acessibilidade na página

**Files:**
- Modify: `index.html` (nova `<section id="acessibilidade">` antes do `<footer>`; link no footer)
- Modify: `css/styles.css` (estilos da seção)

**Interfaces:**
- Consumes: nada.
- Produces: âncora `#acessibilidade`. Task 12 (dossiê) espelha esta lista.

- [ ] **Step 1: Inserir a seção no `index.html`** (imediatamente antes de `<footer role="contentinfo">`)

```html
  <section id="acessibilidade" class="a11y" aria-labelledby="a11y-title">
    <div class="container">
      <p class="section-label section-label--teal reveal">Compromisso com acessibilidade</p>
      <h2 id="a11y-title" class="section-title reveal reveal--blur">
        Recursos de acessibilidade<br />aplicados nesta página.
      </h2>
      <p class="section-sub reveal reveal-d1">
        A landing page da Aurora segue boas práticas das WCAG 2.1 nível AA. Abaixo, os
        recursos efetivamente implementados e onde encontrá-los.
      </p>

      <div class="a11y__grid reveal reveal-d2" role="list">
        <div class="a11y__item" role="listitem">
          <h3 class="a11y__item-title">Estrutura semântica</h3>
          <p class="a11y__item-text">Marcação com <code>header</code>, <code>nav</code>, <code>main</code>, <code>section</code> e <code>footer</code>, títulos em hierarquia e link "Ir para o conteúdo principal" no início da página.</p>
        </div>
        <div class="a11y__item" role="listitem">
          <h3 class="a11y__item-title">Navegação por teclado</h3>
          <p class="a11y__item-text">Todos os elementos interativos são focáveis. O quiz e a calculadora operam por Tab, setas, Home, End, Enter e Espaço, com contorno de foco sempre visível.</p>
        </div>
        <div class="a11y__item" role="listitem">
          <h3 class="a11y__item-title">Leitores de tela</h3>
          <p class="a11y__item-text">Uso de <code>aria-label</code>, <code>aria-labelledby</code>, <code>aria-current</code> na navegação e regiões <code>aria-live</code> para etapas do quiz, resultado da calculadora e status do formulário. Elementos decorativos com <code>aria-hidden</code>.</p>
        </div>
        <div class="a11y__item" role="listitem">
          <h3 class="a11y__item-title">Contraste e cores</h3>
          <p class="a11y__item-text">Paleta validada em contraste AA. Nenhuma informação é transmitida apenas por cor — estados também usam texto, ícone ou posição.</p>
        </div>
        <div class="a11y__item" role="listitem">
          <h3 class="a11y__item-title">Formulários</h3>
          <p class="a11y__item-text">Cada campo tem <code>label</code> associado, campos obrigatórios marcados com <code>aria-required</code>, erros vinculados por <code>aria-describedby</code> e <code>aria-invalid</code> atualizado na validação.</p>
        </div>
        <div class="a11y__item" role="listitem">
          <h3 class="a11y__item-title">Movimento reduzido</h3>
          <p class="a11y__item-text">Com <code>prefers-reduced-motion</code> ativo no sistema, todas as animações são desativadas e o conteúdo aparece imediatamente no estado final.</p>
        </div>
        <div class="a11y__item" role="listitem">
          <h3 class="a11y__item-title">Zoom e responsividade</h3>
          <p class="a11y__item-text">Layout utilizável até 200% de zoom, unidades relativas e adaptação a telas de 360&nbsp;px a desktop sem rolagem horizontal.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Adicionar link no footer do `index.html`**

Na `<nav class="footer__links" aria-label="Links da empresa">`, adicionar como primeiro item:

```html
          <a href="#acessibilidade">Acessibilidade</a>
```

- [ ] **Step 3: Estilos no `css/styles.css`** (antes do bloco `footer { ... }`, linha ~464)

```css
.a11y { background: transparent; }
.a11y .section-title { color: #fff; }
.a11y .section-sub { color: var(--text-muted); }
.a11y__grid {
  margin-top: 3rem; display: grid; gap: 1px;
  background: var(--border-dark);
  border: 1px solid var(--border-dark); border-radius: var(--radius-lg); overflow: hidden;
}
@media (min-width: 680px) { .a11y__grid { grid-template-columns: repeat(2, 1fr); } }
.a11y__item { background: #13102A; padding: 1.75rem; }
.a11y__item-title { font-family: var(--ff-title); font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: .5rem; }
.a11y__item-text { font-family: var(--ff-body); font-size: .875rem; line-height: 1.65; color: var(--text-muted); }
.a11y__item-text code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .82em; color: var(--teal);
  background: rgba(35,128,118,.1); padding: .05em .35em; border-radius: 4px;
}
```

- [ ] **Step 4: Verificar**

Recarregar. Rolar até antes do footer: seção "Recursos de acessibilidade" com grade de 7 cards. Link "Acessibilidade" no rodapé rola até a seção. Testar em 360px: cards em coluna única, sem overflow.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "Adiciona secao de acessibilidade e link no rodape"
```

---

## Task 8: Refino visual do Hero

**Files:**
- Modify: `index.html` (seção `.hero`)
- Modify: `css/styles.css` (bloco `.hero`)

**Interfaces:**
- Consumes: nada.
- Produces: nada consumido por outras tasks.

- [ ] **Step 1: Reestruturar o markup do Hero no `index.html`**

Trocar o conteúdo de `<section class="hero" ...>` `<div class="container">` por (mantendo `h1#hero-title`, `p.hero__sub` e `div.hero__actions` como estão, apenas envolvidos numa nova grade):

```html
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__aurora" aria-hidden="true"></div>
    <div class="container hero__grid">
      <div class="hero__content">
        <h1 id="hero-title" class="hero__title reveal reveal--blur">
          Transforme dados de pessoas<br />
          em <span class="c-teal">decisões estratégicas</span><br />
          <span class="c-magenta">que geram resultado</span>.
        </h1>
        <p class="hero__sub reveal reveal-d1">
          Aurora é a plataforma de people analytics que conecta dados de RH à estratégia do
          negócio — reduzindo turnover, aumentando engajamento e acelerando decisões.
        </p>
        <div class="hero__actions reveal reveal-d2">
          <a href="#contato" class="btn-primary">
            <span>Agendar demonstração</span><span aria-hidden="true">→</span>
          </a>
          <a href="#quiz" class="btn-ghost">Descobrir meu perfil <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <div class="hero__card reveal reveal-d2" aria-hidden="true">
        <p class="hero__card-label">Painel Aurora · exemplo</p>
        <div class="hero__kpi">
          <span class="hero__kpi-val c-teal">−32%</span>
          <span class="hero__kpi-label">Turnover projetado</span>
        </div>
        <div class="hero__kpi">
          <span class="hero__kpi-val">+47%</span>
          <span class="hero__kpi-label">Engajamento</span>
        </div>
        <div class="hero__kpi">
          <span class="hero__kpi-val c-magenta">3×</span>
          <span class="hero__kpi-label">Velocidade de decisão</span>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Substituir o bloco `.hero` em `css/styles.css`** (linhas ~164–181)

```css
.hero {
  background: transparent;
  padding-top: 130px; padding-bottom: 110px;
  position: relative; overflow: hidden;
}
.hero__aurora {
  position: absolute; inset: -20% -10% auto -10%; height: 70%;
  background:
    radial-gradient(40% 60% at 20% 30%, rgba(83,64,121,.45), transparent 70%),
    radial-gradient(45% 55% at 75% 20%, rgba(35,128,118,.35), transparent 70%),
    radial-gradient(35% 45% at 55% 60%, rgba(137,39,94,.28), transparent 70%);
  filter: blur(40px); opacity: .8;
  animation: hero-drift 18s var(--ease-out) infinite alternate;
  pointer-events: none;
}
@keyframes hero-drift {
  from { transform: translate3d(-3%, -2%, 0) scale(1); }
  to   { transform: translate3d(4%, 3%, 0) scale(1.08); }
}
.hero__grid { position: relative; display: grid; gap: 3rem; align-items: center; }
@media (min-width: 960px) { .hero__grid { grid-template-columns: 1.15fr .85fr; } }
.hero__title {
  font-family: var(--ff-title);
  font-size: clamp(2.1rem, 6.5vw, 3.75rem);
  font-weight: 800; line-height: 1.08; letter-spacing: -.035em;
  color: #fff; margin-bottom: 1.5rem; max-width: 780px;
}
.hero__title .c-teal    { color: var(--teal); }
.hero__title .c-magenta { color: var(--magenta); }
.hero__sub {
  font-size: 1.1rem; line-height: 1.78; color: var(--text-muted);
  max-width: 520px; margin-bottom: 2.5rem;
}
.hero__actions { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }
.hero__card {
  background: rgba(17,13,34,.72);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(106,82,153,.25);
  border-radius: var(--radius-lg);
  padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem;
  box-shadow: 0 24px 60px rgba(0,0,0,.35);
}
.hero__card-label {
  font-family: var(--ff-body); font-size: .7rem; letter-spacing: .12em;
  text-transform: uppercase; color: var(--text-dimmed);
}
.hero__kpi { display: flex; flex-direction: column; gap: .15rem; }
.hero__kpi-val { font-family: var(--ff-title); font-size: 2rem; font-weight: 800; letter-spacing: -.03em; color: #fff; }
.hero__kpi-label { font-family: var(--ff-body); font-size: .8rem; color: var(--text-muted); }
```

- [ ] **Step 3: Verificar contraste e layout**

Recarregar:
- Desktop ≥ 960px: texto à esquerda, card de KPIs à direita.
- Mobile: card desce abaixo dos botões, largura total.
- Backdrop "aurora" visível atrás, desfocado, com deriva lenta.
- DevTools → Rendering → emular `prefers-reduced-motion: reduce`: o `hero-drift` congela (media query da Task 6 zera `animation-duration`).
- Verificar contraste do `.hero__title` (branco) e `.hero__sub` sobre o backdrop com o color picker do DevTools — deve permanecer ≥ 4.5:1 (o backdrop é escuro e desfocado; se algum ponto falhar, reduzir `opacity` do `.hero__aurora` para `.6`).

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Refina o Hero com backdrop aurora e card de KPIs"
```

---

## Task 9: Refino visual da seção Resultados

**Files:**
- Modify: `index.html` (seção `#numeros`, os 3 `.numero-card`)
- Modify: `css/styles.css` (bloco `.numeros` / `.numero-card`)

**Interfaces:**
- Consumes: nada.
- Produces: nada.

- [ ] **Step 1: Adicionar mini-SVG decorativo em cada card no `index.html`**

Dentro de cada `<div class="numero-card">`, como PRIMEIRO filho (antes do `<p class="numero-card__value">`):

Card 1 (magenta):
```html
          <svg class="numero-card__spark" viewBox="0 0 80 24" aria-hidden="true"><path d="M2 20 L18 14 L34 16 L50 8 L66 10 L78 3" fill="none" stroke="#89275E" stroke-width="2" stroke-linecap="round"/></svg>
```
Card 2 (teal):
```html
          <svg class="numero-card__spark" viewBox="0 0 80 24" aria-hidden="true"><path d="M2 18 L18 16 L34 10 L50 12 L66 5 L78 6" fill="none" stroke="#238076" stroke-width="2" stroke-linecap="round"/></svg>
```
Card 3 (purple-light):
```html
          <svg class="numero-card__spark" viewBox="0 0 80 24" aria-hidden="true"><path d="M2 12 L18 13 L34 9 L50 11 L66 7 L78 9" fill="none" stroke="#6A5299" stroke-width="2" stroke-linecap="round"/></svg>
```

- [ ] **Step 2: Adicionar nota de rodapé após o `.numeros__grid` no `index.html`**

```html
      <p class="numeros__note reveal">
        Indicadores de referência construídos a partir das premissas da plataforma.
        Não constituem garantia de resultado.
      </p>
```

(Se já existir texto equivalente no `.section-sub`, manter só a nota nova e encurtar o sub para evitar redundância.)

- [ ] **Step 3: Estilos no `css/styles.css`** — adicionar após o bloco `.numero-card__sub` (linha ~402):

```css
.numero-card { position: relative; transition: transform .2s var(--ease-out), border-color .2s; }
.numero-card:hover { transform: translateY(-3px); border-color: rgba(106,82,153,.4); }
.numero-card__spark { width: 80px; height: 24px; margin: 0 auto 1rem; display: block; opacity: .8; }
.numeros__note {
  margin-top: 1.5rem; text-align: center;
  font-family: var(--ff-body); font-size: .78rem; line-height: 1.6;
  color: var(--text-dimmed); max-width: 520px; margin-inline: auto;
}
```

E dar um anel de gradiente sutil aos cards — adicionar após o `.numero-card:hover`:

```css
.numero-card::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  padding: 1px; pointer-events: none;
  background: linear-gradient(140deg, rgba(106,82,153,.5), transparent 60%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
```

- [ ] **Step 4: Verificar**

Recarregar. Cada card de número tem: sparkline no topo (na cor do card), valor grande, anel de borda em gradiente, hover que levanta o card. Nota de rodapé cinza abaixo da grade. Contadores ainda animam (e pulam ao final sob reduced-motion).

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "Refina a secao Resultados com sparklines, anel e nota"
```

---

## Task 10: Calculadora de ROI — lógica pura + testes

**Files:**
- Create: `js/roi.js`
- Create: `tests/roi.test.js`

**Interfaces:**
- Consumes: nada.
- Produces: `js/roi.js` exportando/expondo `calcularRoi(input)`:
  - `input`: `{ colaboradores: number, turnoverPct: number, salarioMensal: number, fatorSubstituicao?: number, reducaoAurora?: number }`
  - retorno: `{ saidasAno: number, custoAtual: number, economiaAurora: number }` (valores numéricos, não formatados)
  - defaults: `fatorSubstituicao = 0.75`, `reducaoAurora = 0.32`
  - No browser expõe `window.AuroraRoi = { calcularRoi }`. Task 11 consome via `window.AuroraRoi`.

- [ ] **Step 1: Escrever o teste que falha — `tests/roi.test.js`**

```js
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularRoi } = require('../js/roi.js');

test('calcula saídas/ano, custo atual e economia com os defaults', () => {
  const r = calcularRoi({ colaboradores: 200, turnoverPct: 20, salarioMensal: 4000 });
  // saidasAno = 200 * 0.20 = 40
  assert.equal(r.saidasAno, 40);
  // custoAtual = 40 * 4000 * 12 * 0.75 = 1_440_000
  assert.equal(r.custoAtual, 1440000);
  // economiaAurora = 1_440_000 * 0.32 = 460_800
  assert.equal(r.economiaAurora, 460800);
});

test('aceita override de fator de substituição e redução', () => {
  const r = calcularRoi({ colaboradores: 100, turnoverPct: 10, salarioMensal: 5000, fatorSubstituicao: 1, reducaoAurora: 0.5 });
  assert.equal(r.saidasAno, 10);
  assert.equal(r.custoAtual, 600000);
  assert.equal(r.economiaAurora, 300000);
});

test('entradas inválidas ou vazias resultam em zeros', () => {
  const r = calcularRoi({ colaboradores: 0, turnoverPct: 20, salarioMensal: 4000 });
  assert.equal(r.saidasAno, 0);
  assert.equal(r.custoAtual, 0);
  assert.equal(r.economiaAurora, 0);
  const r2 = calcularRoi({ colaboradores: NaN, turnoverPct: NaN, salarioMensal: NaN });
  assert.equal(r2.custoAtual, 0);
});

test('turnover é limitado entre 0 e 100', () => {
  const r = calcularRoi({ colaboradores: 100, turnoverPct: 150, salarioMensal: 4000 });
  assert.equal(r.saidasAno, 100); // tratado como 100%
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `node --test tests/`
Expected: FALHA com `Cannot find module '../js/roi.js'`.

- [ ] **Step 3: Implementar `js/roi.js`**

```js
'use strict';
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.AuroraRoi = api;
})(this, function () {
  function num(v) {
    const n = typeof v === 'number' ? v : parseFloat(v);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function calcularRoi(input) {
    input = input || {};
    const colaboradores = num(input.colaboradores);
    let turnoverPct = num(input.turnoverPct);
    if (turnoverPct > 100) turnoverPct = 100;
    const salarioMensal = num(input.salarioMensal);
    const fatorSubstituicao = Number.isFinite(input.fatorSubstituicao) ? input.fatorSubstituicao : 0.75;
    const reducaoAurora = Number.isFinite(input.reducaoAurora) ? input.reducaoAurora : 0.32;

    const saidasAno = colaboradores * (turnoverPct / 100);
    const custoAtual = saidasAno * salarioMensal * 12 * fatorSubstituicao;
    const economiaAurora = custoAtual * reducaoAurora;

    return { saidasAno, custoAtual, economiaAurora };
  }

  return { calcularRoi };
});
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `node --test tests/`
Expected: PASS — 4 testes, 0 falhas.

- [ ] **Step 5: Commit**

```bash
git add js/roi.js tests/roi.test.js
git commit -m "Adiciona logica pura da calculadora de ROI com testes"
```

---

## Task 11: Calculadora de ROI — seção na página + quiz conectado ao lead

**Files:**
- Modify: `index.html` (nova `<section id="calculadora">` entre `#numeros` e `#contato`; `<script src="js/roi.js">` antes de `js/main.js`)
- Modify: `css/styles.css` (estilos da calculadora)
- Modify: `js/main.js` (handler da calculadora; wiring do resultado do quiz para o formulário)

**Interfaces:**
- Consumes: `window.AuroraRoi.calcularRoi` (Task 10); campos `#lead-colaboradores`, `#lead-economia`, `#lead-perfil-diagnostico`, `#form-diagnostico`, `#form-diagnostico-valor` (Task 5).
- Produces: nada.

- [ ] **Step 1: Carregar `js/roi.js` antes de `js/main.js` no `index.html`**

```html
<script src="js/roi.js" defer></script>
<script src="js/main.js" defer></script>
```

- [ ] **Step 2: Inserir a seção no `index.html`** (entre o fim de `<section id="numeros">` e o início de `<section id="contato">`)

```html
  <section id="calculadora" class="calc" aria-labelledby="calc-title">
    <div class="container">
      <p class="section-label section-label--teal reveal">Calculadora de retorno</p>
      <h2 id="calc-title" class="section-title reveal reveal--blur">
        Quanto o turnover custa<br />para a sua empresa hoje.
      </h2>
      <p class="section-sub reveal reveal-d1">
        Ajuste os três campos e veja uma estimativa do custo anual de turnover e do quanto
        a Aurora pode ajudar a evitar.
      </p>

      <form class="calc__card reveal reveal-d2" id="calc-form" novalidate>
        <div class="calc__fields">
          <div class="calc__field">
            <label for="calc-colaboradores">Número de colaboradores</label>
            <input type="number" id="calc-colaboradores" name="calc-colaboradores" min="1" step="1" inputmode="numeric" value="200" />
          </div>
          <div class="calc__field">
            <label for="calc-turnover">Turnover anual (%)</label>
            <input type="number" id="calc-turnover" name="calc-turnover" min="0" max="100" step="1" inputmode="numeric" value="20" />
          </div>
          <div class="calc__field">
            <label for="calc-salario">Salário médio mensal (R$)</label>
            <input type="number" id="calc-salario" name="calc-salario" min="0" step="100" inputmode="numeric" value="4000" />
          </div>
        </div>

        <output class="calc__result" id="calc-result" for="calc-colaboradores calc-turnover calc-salario" aria-live="polite"></output>

        <p class="calc__formula">
          Cálculo: saídas por ano = colaboradores × turnover%. Custo atual = saídas × salário
          mensal × 12 × 0,75 (custo médio de substituir um colaborador ≈ 75% da remuneração
          anual). Economia estimada = custo atual × 32% (redução de turnover de referência da
          Aurora).
        </p>
        <p class="calc__disclaimer">
          Estimativa ilustrativa baseada em premissas de mercado; não constitui projeção
          contratual.
        </p>

        <a href="#contato" class="btn-primary btn-primary--block" id="calc-cta">
          <span>Levar esse cálculo para uma conversa</span><span aria-hidden="true">→</span>
        </a>
      </form>
    </div>
  </section>
```

- [ ] **Step 3: Estilos no `css/styles.css`** (adicionar antes do bloco `.form-section`, linha ~404)

```css
.calc { background: #13102A; }
.calc .section-label { color: var(--teal); }
.calc .section-title { color: #fff; }
.calc .section-sub { color: var(--text-muted); }
.calc__card {
  margin-top: 2.5rem; max-width: 640px; margin-inline: auto;
  background: rgba(255,255,255,.04); border: 1px solid rgba(106,82,153,.2);
  border-radius: var(--radius-lg); padding: 2rem;
  display: flex; flex-direction: column; gap: 1.5rem;
}
@media (min-width: 768px) { .calc__card { padding: 2.5rem; } }
.calc__fields { display: grid; gap: 1.25rem; }
@media (min-width: 560px) { .calc__fields { grid-template-columns: repeat(3, 1fr); } }
.calc__field { display: flex; flex-direction: column; gap: .4rem; }
.calc__field label { font-family: var(--ff-body); font-size: .82rem; font-weight: 600; color: var(--text-on-dark); }
.calc__field input {
  padding: .75rem 1rem; border-radius: 8px;
  border: 1px solid var(--border-dark); background: rgba(255,255,255,.05);
  color: var(--text-on-dark); font-family: var(--ff-body); font-size: .95rem; width: 100%;
  transition: border-color .2s, box-shadow .2s; outline: none;
}
.calc__field input:focus {
  border-color: var(--teal); background: rgba(35,128,118,.06);
  box-shadow: 0 0 0 3px rgba(35,128,118,.14);
}
.calc__result {
  display: block; font-family: var(--ff-body); font-size: 1rem; line-height: 1.7;
  color: var(--text-on-dark);
  background: rgba(35,128,118,.1); border: 1px solid rgba(35,128,118,.28);
  border-radius: var(--radius); padding: 1.25rem;
}
.calc__result strong { font-family: var(--ff-title); color: var(--teal); }
.calc__result .calc__result-cost { color: #fff; }
.calc__formula, .calc__disclaimer {
  font-family: var(--ff-body); font-size: .78rem; line-height: 1.6; color: var(--text-muted);
}
.calc__disclaimer { color: var(--text-dimmed); font-style: italic; }
```

- [ ] **Step 4: Handler da calculadora em `js/main.js`** (adicionar ao final do arquivo)

```js
const calcForm = document.getElementById('calc-form');
if (calcForm && window.AuroraRoi) {
  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const $col = document.getElementById('calc-colaboradores');
  const $tur = document.getElementById('calc-turnover');
  const $sal = document.getElementById('calc-salario');
  const $out = document.getElementById('calc-result');
  const $leadCol = document.getElementById('lead-colaboradores');
  const $leadEco = document.getElementById('lead-economia');

  function renderCalc() {
    const r = window.AuroraRoi.calcularRoi({
      colaboradores: parseFloat($col.value),
      turnoverPct: parseFloat($tur.value),
      salarioMensal: parseFloat($sal.value),
    });
    if (r.custoAtual <= 0) {
      $out.innerHTML = 'Preencha os três campos com valores maiores que zero para ver a estimativa.';
    } else {
      $out.innerHTML =
        'Sua empresa gasta aproximadamente <strong class="calc__result-cost">' + brl.format(r.custoAtual) +
        '</strong> por ano com turnover (' + Math.round(r.saidasAno) + ' saídas/ano). ' +
        'Com a Aurora, a estimativa de economia é de <strong>' + brl.format(r.economiaAurora) + '</strong> por ano.';
    }
    if ($leadCol) $leadCol.value = $col.value || '';
    if ($leadEco) $leadEco.value = r.economiaAurora > 0 ? brl.format(r.economiaAurora) : '';
  }

  [$col, $tur, $sal].forEach(el => el.addEventListener('input', renderCalc));
  calcForm.addEventListener('submit', e => e.preventDefault());
  renderCalc();
}
```

- [ ] **Step 5: Wiring do resultado do quiz para o formulário em `js/main.js`**

Na função `showResult()`, logo após `const profile = profiles.find(...) || profiles[0];`, adicionar:

```js
  const leadPerfil = document.getElementById('lead-perfil-diagnostico');
  const formDiag = document.getElementById('form-diagnostico');
  const formDiagVal = document.getElementById('form-diagnostico-valor');
  if (leadPerfil) leadPerfil.value = profile.badge;
  if (formDiag && formDiagVal) { formDiagVal.textContent = profile.badge; formDiag.hidden = false; }
```

Na função `resetQuiz()`, adicionar antes do fim:

```js
  const leadPerfil = document.getElementById('lead-perfil-diagnostico');
  const formDiag = document.getElementById('form-diagnostico');
  if (leadPerfil) leadPerfil.value = '';
  if (formDiag) formDiag.hidden = true;
```

- [ ] **Step 6: Verificar**

Recarregar `http://localhost:3000`:
- Seção "Calculadora de retorno" entre Resultados e o formulário.
- Valores default (200 / 20 / 4000) → resultado: "~R$ 1.440.000 por ano ... economia ~R$ 460.800 por ano".
- Alterar qualquer campo recalcula na hora; `#calc-result` é `aria-live` (com leitor de tela, anuncia).
- Zerar colaboradores → mensagem de "preencha os três campos".
- Fazer o quiz até o fim → rolar ao formulário: aparece "Diagnóstico do quiz: <perfil>". DevTools → Elements: `#lead-perfil-diagnostico`, `#lead-colaboradores`, `#lead-economia` com `value` preenchido.
- "Refazer o diagnóstico" limpa a linha do formulário.

- [ ] **Step 7: Rodar os testes da calculadora de novo (regressão)**

Run: `node --test tests/`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "Adiciona secao calculadora de ROI e conecta quiz ao formulario"
```

---

## Task 12: Deploy na Netlify e teste de lead real

Parte manual (login do usuário). O agente prepara e verifica; o usuário executa os passos de UI.

**Files:**
- Modify: `index.html`, `robots.txt`, `sitemap.xml` (se a URL final diferir do placeholder)

**Interfaces:**
- Consumes: `netlify.toml` (Task 4), formulário (Task 5).
- Produces: URL pública de produção.

- [ ] **Step 1: Publicar a branch e abrir PR para `main`**

```bash
git push -u origin etapa-2
```
Abrir PR `etapa-2 → main` no GitHub (ou, se o grupo preferir trabalhar direto na main, fazer merge local e `git push origin main`).

- [ ] **Step 2 (usuário): Conectar o repositório à Netlify**

Instruir o usuário:
1. Entrar em https://app.netlify.com → "Add new site" → "Import an existing project" → GitHub → `defxico/aurora-project`.
2. Branch: `main`. Build command: (vazio). Publish directory: `.` (ou deixar em branco — o `netlify.toml` já define).
3. "Deploy site".
4. Em "Site configuration" → "Change site name" → definir `aurora-people-analytics` (ou o nome escolhido) → a URL vira `https://<nome>.netlify.app`.

- [ ] **Step 3 (usuário): Confirmar detecção do formulário**

No painel Netlify → aba "Forms". Deve aparecer o formulário `agendar-demonstracao`. Se NÃO aparecer: garantir que o deploy terminou e que `data-netlify="true"` + `<input name="form-name">` estão no HTML publicado (ver "Deploys" → "Deploy log").

- [ ] **Step 4 (usuário): Configurar notificação de e-mail dos leads**

Netlify → "Forms" → "Settings and usage" → "Form notifications" → "Add notification" → "Email notification" → informar o e-mail do grupo.

- [ ] **Step 5: Ajustar a URL final no código, se necessário**

Se o nome do site não for `aurora-people-analytics`, editar em `index.html` (canonical + 5 meta tags OG/Twitter), `robots.txt` e `sitemap.xml` para a URL real. Commit:

```bash
git add index.html robots.txt sitemap.xml
git commit -m "Ajusta URLs para o dominio de producao da Netlify"
git push
```

- [ ] **Step 6: Teste de lead real (produção)**

Na URL pública:
1. Fazer o quiz até o fim.
2. Preencher a calculadora.
3. Preencher o formulário com dados de teste reais (ex.: nome "Teste", e-mail do próprio grupo), marcar LGPD, enviar.
4. Confirmar: mensagem de sucesso inline aparece (não recarrega a página).
5. Netlify → "Forms" → `agendar-demonstracao` → a submissão aparece com os campos `perfil-diagnostico`, `colaboradores`, `economia-estimada` preenchidos.
6. Confirmar que o e-mail de notificação chegou.

Expected: lead visível no painel + e-mail recebido.

- [ ] **Step 7: Lighthouse na URL pública**

Chrome DevTools → Lighthouse → categorias Acessibilidade + Melhores Práticas + SEO, modo Mobile. Meta: Acessibilidade ≥ 95. Corrigir o que aparecer (contraste, labels, ordem de headings) e commitar as correções.

- [ ] **Step 8: Commit final de ajustes (se houver)**

```bash
git add -A
git commit -m "Corrige apontamentos do Lighthouse"
git push
```

---

## Task 13: Dossiê de entrega e atualização do README

**Files:**
- Create: `docs/entrega-etapa-2.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: URL de produção (Task 12), lista da seção `#acessibilidade` (Task 7).
- Produces: documento de texto para o PDF.

- [ ] **Step 1: Criar `docs/entrega-etapa-2.md`**

```markdown
# People First Cup — Enterprise Challenge · Etapa 2 — Aurora

## 1. Integrantes

> Ordem alfabética. Preencher RM.

- Nome Completo 1 — RM000000
- Nome Completo 2 — RM000000

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
automatizados (`node --test`).

### Formulário de captação de lead
Netlify Forms com submissão via `fetch` (padrão AJAX), preservando a validação
client-side e a mensagem de sucesso inline. Proteção anti-spam por honeypot. O lead chega
qualificado: os campos ocultos `perfil-diagnostico` (resultado do quiz), `colaboradores` e
`economia-estimada` (calculadora de ROI) são enviados junto.

### Identidade visual
Paleta e tipografia da Etapa 1 mantidas: roxo `#534079`, teal `#238076`, magenta
`#89275E`, fundo `#0D0B14`; Plus Jakarta Sans (títulos) e Open Sans (texto). O refino
visual (Hero, Resultados, Solução) trabalhou dentro dessa identidade.

### Arquitetura de conteúdo
Sequência: Hero → Desafios → Como funciona → Diagnóstico (quiz) → Solução →
Funcionalidades → Resultados → Calculadora de ROI → Formulário → Acessibilidade → Rodapé.
Fluxo do problema à decisão de compra, com dois momentos interativos de qualificação.

### Diferenciais ("solução disruptiva")
1. **Quiz de maturidade analítica** conectado ao lead: o perfil do respondente
   acompanha a solicitação de demonstração.
2. **Calculadora de ROI**: o visitante estima o custo anual de turnover da sua empresa e
   a economia potencial com a Aurora, com fórmula transparente exibida na página.

## 4. Recursos de acessibilidade presentes

> Espelha a seção "Acessibilidade" da própria landing page.

| Recurso | Onde | Critério WCAG 2.1 |
| --- | --- | --- |
| HTML semântico + skip-link | Página inteira / topo | 1.3.1, 2.4.1 |
| Navegação por teclado completa (quiz e calculadora com setas/Home/End) | Quiz, calculadora, navegação | 2.1.1 |
| Foco sempre visível (`:focus-visible`) | Todos os interativos | 2.4.7 |
| `aria-label` / `aria-labelledby` nas seções e navegação | Página inteira | 1.3.1, 4.1.2 |
| Regiões `aria-live` (etapas do quiz, resultado da calculadora, status do formulário) | Quiz, calculadora, formulário | 4.1.3 |
| `aria-current` no link de navegação ativo | Cabeçalho | 2.4.8 |
| Elementos decorativos com `aria-hidden` | Diagramas SVG, card do Hero | 1.1.1 |
| Contraste AA e informação não transmitida só por cor | Página inteira | 1.4.3, 1.4.1 |
| `label` associado, `aria-required`, `aria-invalid`, `aria-describedby` nos erros | Formulário | 3.3.1, 3.3.2, 1.3.1 |
| Respeito a `prefers-reduced-motion` (todas as animações) | Página inteira | 2.3.3 |
| Layout utilizável até 200% de zoom, sem rolagem horizontal | Página inteira | 1.4.4, 1.4.10 |

## 5. Link do deploy

https://aurora-people-analytics.netlify.app/  <!-- ajustar para a URL real -->

## 6. Link do repositório

https://github.com/defxico/aurora-project

## 7. Como executar localmente

```bash
git clone https://github.com/defxico/aurora-project.git
cd aurora-project
npx --yes serve@14 .
# abrir http://localhost:3000
```

Testes da calculadora de ROI: `node --test tests/`

### Estrutura de arquivos

```
aurora-project/
├── index.html
├── 404.html
├── netlify.toml · robots.txt · sitemap.xml
├── css/styles.css
├── js/main.js · js/roi.js
├── tests/roi.test.js
├── assets/  aurora-logo.svg · favicon.svg · og-cover.svg
└── docs/  aurora-project.pdf · entrega-etapa-2.md
```
```

- [ ] **Step 2: Atualizar o `README.md`**

Substituir as seções desatualizadas (Etapa 1 → Etapa 2). Pontos obrigatórios a refletir:
- Etapa: 2.
- Adicionar bloco "Deploy" com a URL pública.
- Atualizar "Observação sobre o formulário": agora envia de verdade via Netlify Forms.
- Atualizar "Status do projeto": deploy online e formulário real agora **fazem** parte da entrega; vídeo-pitch continua fora.
- Atualizar "Estrutura de arquivos" para incluir `js/`, `tests/`, `404.html`, `netlify.toml`, `robots.txt`, `sitemap.xml`, `assets/favicon.svg`, `assets/og-cover.svg`, `docs/entrega-etapa-2.md`.
- Atualizar "Tecnologias": acrescentar Netlify / Netlify Forms.
- Preencher o link do repositório (remover o placeholder `INSERIR_LINK_DO_REPOSITÓRIO_AQUI`).

- [ ] **Step 3: Verificar**

`docs/entrega-etapa-2.md` abre com o Markdown renderizado sem seções quebradas. README sem placeholders (`INSERIR_...`, `RM000000` só onde o grupo ainda vai preencher).

- [ ] **Step 4: Commit**

```bash
git add docs/entrega-etapa-2.md README.md
git commit -m "Adiciona dossie da Etapa 2 e atualiza o README"
git push
```

---

## Self-Review

**1. Spec coverage:**

| Requisito do spec | Task |
| --- | --- |
| Deploy Netlify + integração GitHub | 4, 12 |
| `netlify.toml`, headers, cache | 4 |
| `404.html`, `robots.txt`, `sitemap.xml` | 4 |
| Formulário Netlify Forms + AJAX + honeypot + campos ocultos | 5 |
| Extrair JS para `js/main.js` | 1 |
| Remover estilos inline (Solução) | 2 |
| Head: OG, Twitter, theme-color, canonical, favicon | 3 |
| `favicon.svg`, `og-cover.svg` | 3 |
| `prefers-reduced-motion` global | 6 |
| `:focus-visible` consistente | 6 |
| Revisão de contraste | 6, 8, 12 (Lighthouse) |
| Seção `#acessibilidade` + link no footer | 7 |
| Hero: backdrop + glass card | 8 |
| Resultados: anel, sparkline, nota, hover | 9 |
| Solução: grid 2×2, sem inline, CTA fora | 2 (inline) + 9? → ver nota abaixo |
| Calculadora de ROI (fórmula, output aria-live, disclaimer, CTA) | 10, 11 |
| Quiz → hidden field + linha de confirmação | 11 |
| Dossiê `docs/entrega-etapa-2.md` | 13 |
| README atualizado | 13 |
| Verificação: HTML validate, Lighthouse, teclado, responsivo, reduced-motion, lead real | steps de verificação + 12 |

**Gap identificado e corrigido:** o redesenho do grid 2×2 da seção Solução (spec 5.3) não tinha task própria — a Task 2 só move os estilos inline. **Adicionar Task 9b abaixo.**

**2. Placeholder scan:** `RM000000` e a URL `aurora-people-analytics.netlify.app` são placeholders intencionais, resolvidos na Task 12/13 com instrução explícita. Nenhum "TODO"/"TBD"/"add error handling" genérico. OK.

**3. Type consistency:** `calcularRoi` retorna `{ saidasAno, custoAtual, economiaAurora }` — usado com esses nomes exatos na Task 11 (`r.custoAtual`, `r.economiaAurora`, `r.saidasAno`). Campos ocultos `perfil-diagnostico` / `colaboradores` / `economia-estimada` e ids `#lead-perfil-diagnostico` / `#lead-colaboradores` / `#lead-economia` consistentes entre Task 5, 10 e 11. `window.AuroraRoi` definido na Task 10, consumido na Task 11. OK.

---

## Task 9b: Refino visual da seção Solução (grid 2×2)

**Files:**
- Modify: `index.html` (seção `#solucao`, `.solucao__points`)
- Modify: `css/styles.css` (`.solucao__points`, `.solucao__grid`)

**Interfaces:**
- Consumes: Task 2 (classe `.solucao__inner`, `.btn-primary--block`).
- Produces: nada.

- [ ] **Step 1: Mover o CTA para fora da coluna de pontos no `index.html`**

Hoje o `<a href="#contato" class="btn-primary btn-primary--block">` está DENTRO de `<div class="solucao__points">`. Movê-lo para fora, como irmão do `.solucao__grid`, logo após o fechamento `</div>` do grid:

```html
        </div><!-- /.solucao__grid -->
        <a href="#contato" class="btn-primary btn-primary--block solucao__cta">
          <span>Conhecer a plataforma</span><span aria-hidden="true">→</span>
        </a>
```

- [ ] **Step 2: Transformar `.solucao__points` em grid 2×2 no `css/styles.css`**

Substituir a regra `.solucao__points { display: flex; flex-direction: column; gap: 1.4rem; }` (linha ~342) por:

```css
.solucao__points { display: grid; gap: 1.5rem; }
@media (min-width: 560px) { .solucao__points { grid-template-columns: 1fr 1fr; } }
.solucao__point {
  display: flex; gap: 1rem; align-items: flex-start;
  background: rgba(83,64,121,.05); border: 1px solid rgba(83,64,121,.1);
  border-radius: var(--radius); padding: 1.25rem;
}
.solucao__cta { max-width: 320px; margin: 2.5rem auto 0; }
```

E, como o grid principal `.solucao__grid` fica 1fr/1fr no desktop com o "visual" à esquerda e os "points" à direita: ajustar para o visual ocupar a coluna toda em cima quando os points viram 2×2. Trocar o `@media (min-width: 768px) { .solucao__grid { grid-template-columns: 1fr 1fr; align-items: center; } }` (linha ~321) por:

```css
@media (min-width: 768px) {
  .solucao__grid { grid-template-columns: 1fr; }
  .solucao__visual { max-width: 640px; margin-inline: auto; }
}
```

- [ ] **Step 3: Verificar**

Recarregar. Seção Solução: bloco "Indicadores em tempo real" centralizado no topo, os 4 pontos em grade 2×2 (1 coluna no mobile) cada um num card com borda sutil, e o CTA "Conhecer a plataforma" centralizado abaixo. Barras animam ao entrar na viewport (e já cheias sob reduced-motion).

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Redesenha a secao Solucao em grade 2x2"
```

---

## Execution Order

1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 9b → 10 → 11 → 12 → 13

Tasks 1–11 e 13(Step 1) podem rodar sem a Netlify. Task 12 exige login do usuário. Task 13 Steps 2–4 (README com URL) dependem da URL final da Task 12.
