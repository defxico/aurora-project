# Integração do novo visual no index.html — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Levar o protótipo aprovado "Campo de risco" (`docs/proposta-visual/index.html`, arquivo único) para o `index.html` de produção na branch `novo-visual`, dividido em `css/` e `js/`, sem regredir SEO/OG, formulário real, testes ou acessibilidade da Etapa 2.

**Architecture:** `index.html` (marcação semântica + `<head>` completo da Etapa 2 + Archivo + links para `css/styles.css`, `js/roi.js`, `js/main.js`). `css/styles.css` recebe o bloco `<style>` do protótipo inteiro. `js/main.js` recebe o bloco `<script>` do protótipo com 3 ajustes: calculadora passa a usar `window.AuroraRoi.calcularRoi`, `plates()` morto é removido, e o handler de formulário demo vira envio real Netlify Forms. `js/roi.js` e `tests/roi.test.js` ficam intocados.

**Tech Stack:** HTML5 + CSS3 + JavaScript ES2020 (vanilla, sem framework/bundler). Fonte Archivo (Google Fonts). Netlify Forms (submit AJAX). Testes `node:test`. Deploy Netlify (fora do escopo deste plano).

## Global Constraints

- **Branch:** todo o trabalho em `novo-visual` (já criada a partir de `main`). `main` permanece intacta. **Nenhum `git push`.**
- **Marca fictícia:** Aurora é fictícia; conteúdo ilustrativo. Não impersonar organização real.
- **Comando de teste:** `node --test tests/roi.test.js` (NUNCA `node --test tests/` — quebra no Node 24).
- **Trailer de commit obrigatório** em todos os commits:
  ```
  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu
  ```
- **Git user:** `gipy-francisco`.
- **Idioma:** todo texto de UI e documentação em pt-BR.
- **Fonte:** Archivo `wght@400;500;600;700;800`, `&display=swap`. Remover Plus Jakarta Sans + Open Sans.
- **theme-color:** `#F6F5F8` (era `#0D0B14`).
- **`<title>` de produção:** `Aurora · People Analytics para Empresas` (NÃO "Aurora — Campo de Risco").
- **Paleta "Campo de risco":** fundo `--void #F6F5F8`, texto `--fog #17141D`, `--fog2 #5C5967`, `--teal #12796C`, `--magenta #A81F62` (acento principal), `--mag-bright #D63A7A`, `--roxo #574587`, `--panel #EDECF1`, `--panel2 #E5E4EB`, `--line #D9D8E1`.
- **Fórmula ROI (não muda):** `saidasAno = colaboradores × turnoverPct/100`; `custoAtual = saidasAno × salarioMensal × 12 × 0,75`; `economiaAurora = custoAtual × 0,32`.
- **Spec de referência:** `docs/superpowers/specs/2026-09-09-aurora-novo-visual-design.md`.

---

## Estrutura de arquivos

| Arquivo | Responsabilidade após o plano |
| --- | --- |
| `index.html` | Marcação semântica das 9 seções + `<head>` (SEO/OG/Twitter/canonical/favicon/theme-color/Archivo) + `<link>` css + `<script defer>` roi.js, depois main.js. Sem `<style>` nem `<script>` inline. |
| `css/styles.css` | Design system "Campo de risco" completo: tokens `:root`, todas as seções, `@media (prefers-reduced-motion)`, breakpoints. Substitui o CSS atual. |
| `js/main.js` | IIFE única de comportamento da página: nav scroll-spy, `riskModel`, `flowPulses`, `hexPulses`, `maturity`, `ask`, `calc` (via `AuroraRoi`), submit real do formulário. Substitui o JS atual. |
| `js/roi.js` | **Intocado.** Módulo puro `calcularRoi()`, UMD (`window.AuroraRoi` + `module.exports`). |
| `tests/roi.test.js` | **Intocado.** 4 testes `node:test`. |
| `404.html` | Página 404 na paleta clara, `<link>` Archivo + `css/styles.css`. |
| `assets/favicon.svg` | Ícone na paleta clara (fundo claro, marca teal/magenta). |
| `assets/og-cover.svg` | Capa social 1200×630 na paleta clara, fonte Archivo/Arial. |
| `docs/entrega-etapa-2.md` | Dossiê do PDF — seções 3, 4 e 7 reescritas para a nova direção. |
| `README.md` | Estrutura, tecnologias (+Archivo), identidade visual, funcionalidades. |
| `docs/proposta-visual/` | **Já commitado** (`7391edb`) como referência congelada. |
| `netlify.toml`, `robots.txt`, `sitemap.xml` | **Intocados.** |

**Mapa de offsets do protótipo** (`docs/proposta-visual/index.html`, 1194 linhas):

- Linhas 1–4: fragmentos de `<head>` (title, preconnect, `<link>` Archivo).
- Linha 6 `<style>` … linha 376 `</style>`: bloco CSS a extrair.
- Linhas 378–738: `<body>` (header nav 378–388, `<main>` 390–703, `<footer>` 705–736, `.stamp` 738).
- Linha 740 `<script>` … linha 1194 `</script>`: bloco JS a extrair.
  - `riskModel` 746, `flowPulses` 784, `hexPulses` 862, `plates` 899–933, `maturity` 936, `ask` 992, `calc` 1096–1152, form demo 1155–1179, nav scroll-spy 1181+.

---

## Task 1: Extrair o protótipo em `index.html` + `css/styles.css` + `js/main.js`

Extração mecânica. O comportamento visual e de script fica **idêntico ao protótipo** (os 3 ajustes de lógica vêm nas Tasks 2–4). Só o `<head>` muda de verdade, além de adicionar skip-link e remover a tarja `.stamp`.

**Files:**

- Modify: `index.html` (reescrita completa do arquivo)
- Modify: `css/styles.css` (substituição completa do conteúdo)
- Modify: `js/main.js` (substituição completa do conteúdo)
- Reference: `docs/proposta-visual/index.html` (fonte)

**Interfaces:**

- Consumes: nada (primeira task).
- Produces:
  - `css/styles.css` com os tokens `:root` e classes `.nav`, `.hero`, `.challenges`, `.flow`, `.quiz`, `.method`, `.feat`, `.numbers`, `.calc`, `.subscribe`, `.foot`, `.skip-link`.
  - `js/main.js` = IIFE `(function(){"use strict"; … })()` contendo os módulos `riskModel`, `flowPulses`, `hexPulses`, `plates` (ainda presente aqui), `maturity`, `ask`, `calc` (ainda com `calcularRoi` inline aqui), handler de formulário demo (ainda demo aqui), nav scroll-spy. Nenhuma função exportada.
  - `index.html` com IDs preservados do protótipo: `#hero-h`, `#s-eng`/`#s-load`/`#s-oto`, `#g-fill`, `#r-turn`/`#r-cost`/`#verdict`, `#flow-lines`, `#mat-0..3`, `#mat-fill`/`#mat-badge`/`#mat-title`/`#mat-desc`/`#mat-cta`, `#hex`, `#c-col`/`#c-tur`/`#c-sal`, `#c-col-v`/`#c-tur-v`/`#c-sal-v`, `#l-saidas`/`#l-rep`/`#l-total`/`#l-rec`/`#calc-bar-rec`, `#calc-form`, `#lead` (form), `#lead-perfil`/`#lead-col`/`#lead-eco`, `#diag`/`#diag-val`, `#f-nome`/`#f-email`/`#f-empresa`/`#f-cargo`/`#f-tam`/`#f-msg`/`#f-lgpd`, `#form-err`, `#lead-done`.

- [ ] **Step 1: Criar `css/styles.css` a partir do bloco `<style>`**

Copiar `docs/proposta-visual/index.html` linhas **7–375** (conteúdo entre `<style>` na linha 6 e `</style>` na linha 376, sem as tags) para `css/styles.css`, substituindo todo o conteúdo atual do arquivo. Não alterar nenhuma regra.

Acrescentar ao final de `css/styles.css` a regra do skip-link (não existe no protótipo):

```css
/* ===== Skip link (acessibilidade) ===== */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 999;
  background: var(--fog);
  color: var(--void);
  padding: .7rem 1.1rem;
  font-weight: 700;
  text-decoration: none;
}
.skip-link:focus {
  left: .5rem;
  top: .5rem;
}
```

- [ ] **Step 2: Criar `js/main.js` a partir do bloco `<script>`**

Copiar `docs/proposta-visual/index.html` linhas **741–1193** (conteúdo entre `<script>` na linha 740 e `</script>` na linha 1194, sem as tags) para `js/main.js`, substituindo todo o conteúdo atual. Não alterar nenhuma linha nesta task. O arquivo deve começar com `(function () {` e `"use strict";` e terminar com `})();`.

- [ ] **Step 3: Reescrever `index.html`**

Substituir todo o `index.html` por:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aurora · People Analytics para Empresas</title>
  <meta name="description" content="Aurora transforma dados de RH em decisões estratégicas. Reduza turnover, aumente engajamento e tome decisões 3× mais rápidas." />
  <link rel="canonical" href="https://aurora-people-analytics.netlify.app/" />
  <meta name="theme-color" content="#F6F5F8" />
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

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
<a href="#conteudo" class="skip-link">Ir para o conteúdo principal</a>

<!-- COLE AQUI: docs/proposta-visual/index.html linhas 378 a 736 -->
<!-- (do <header class="nav"> na linha 378 até o </footer> na linha 736, INCLUSIVE; -->
<!-- NÃO copiar a linha 738 .stamp) -->

<script src="js/roi.js" defer></script>
<script src="js/main.js" defer></script>
</body>
</html>
```

Ao colar o trecho 378–736 do protótipo:

1. Na tag `<main>` (linha 390 do protótipo), adicionar `id="conteudo"`: `<main id="conteudo">`.
2. **Não** copiar a linha 738 (`<div class="stamp" …>`).
3. No footer, trocar o segundo `<span>` de `.foot__fine`:
   - de: `<span>Proposta de direção visual · conteúdo ilustrativo</span>`
   - para: `<span>Marca fictícia · projeto acadêmico</span>`

- [ ] **Step 4: Remover CSS órfão da tarja `.stamp`**

Em `css/styles.css`, localizar e remover o bloco de regras `.stamp { … }` (5 linhas, `position: fixed; right: .7rem; bottom: .7rem; …` — era linhas 369–373 do protótipo). Buscar por `.stamp`. Remover só esse seletor e suas chaves.

- [ ] **Step 5: Checar sintaxe**

Run: `node --check js/main.js && node --check js/roi.js`
Expected: sem saída, exit 0.

Run: `node --test tests/roi.test.js`
Expected: `# pass 4`, `# fail 0`.

- [ ] **Step 6: Servir e conferir visualmente**

Run: `npx --yes serve -l 5000 .` (ou `python -m http.server 5000`), abrir `http://localhost:5000/`.
Expected:
- Página carrega com fundo claro `#F6F5F8`, tipografia Archivo, acento magenta.
- Hero mostra 3 sliders + medidor; ao arrastar, `#r-turn`/`#r-cost`/`#verdict` mudam.
- Diagnóstico: 4 sliders movem o medidor `#mat-fill`.
- "Pergunte à Aurora": 5 abas trocam o conteúdo do card.
- Hexágono `#hex` e linhas do "Como funciona": pulsos pretos animando lentamente.
- Calculadora: 3 sliders atualizam o razonete; nos valores padrão (1.800 / 18% / R$ 5.200) o razonete mostra `324` saídas, `R$ 15,2 mi` custo, `R$ 4,9 mi` recuperável.
- Sem barra de rolagem horizontal; sem a tarja fixa "proposta de direção visual".
- Console sem erros (`F12` → Console).

- [ ] **Step 7: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "$(printf 'Divide o prototipo aprovado em index.html, css/ e js/\n\nExtrai o <style> para css/styles.css e o <script> para js/main.js.\n<head> de producao da Etapa 2 preservado (SEO/OG/canonical/favicon),\ntrocado para a fonte Archivo e theme-color #F6F5F8. Adiciona skip-link\ne remove a tarja de proposta. Comportamento de script ainda identico\nao prototipo (ajustes de logica nas proximas tasks).\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu')"
```

---

## Task 2: Ligar a calculadora ao `js/roi.js` e remover `plates()` morto

**Files:**

- Modify: `js/main.js` (módulo `calc()` ~linhas do IIFE; função `plates()`)
- Test: `tests/roi.test.js` (não muda — roda como regressão)

**Interfaces:**

- Consumes: `window.AuroraRoi.calcularRoi({ colaboradores, turnoverPct, salarioMensal })` de `js/roi.js` → retorna `{ saidasAno, custoAtual, economiaAurora }` (todos `number`, não arredondados; `turnoverPct` é limitado a 100 dentro do módulo).
- Produces: `js/main.js` sem a função `plates()` e sem sua IIFE de chamada; módulo `calc()` sem `calcularRoi` inline.

- [ ] **Step 1: Remover a função `plates()`**

Em `js/main.js`, localizar o bloco IIFE `(function plates() { … })();` (começa com `(function plates() {`, termina em `})();`, ~35 linhas, contém `getElementById("plates")`). Remover o bloco inteiro, incluindo o comentário `/* ============ ... ============ */` imediatamente acima dele se houver.

- [ ] **Step 2: Reescrever a função `render()` dentro do módulo `calc()`**

Em `js/main.js`, dentro de `(function calc() { … })();`, substituir a função `render()` inteira por:

```js
    function render() {
      var col = +$c.value, tur = +$t.value, sal = +$s.value;
      vc.textContent = nf.format(col);
      vt.textContent = tur + "%";
      vs.textContent = brl0.format(sal);

      var roi = window.AuroraRoi.calcularRoi({
        colaboradores: col,
        turnoverPct: tur,
        salarioMensal: sal
      });
      var saidas = roi.saidasAno;
      var rep = saidas > 0 ? roi.custoAtual / saidas : 0;
      var total = roi.custoAtual;
      var rec = roi.economiaAurora;

      countTo(lSai, saidas, function (v) { return nf.format(Math.round(v)); });
      countTo(lRep, rep, function (v) { return brl0.format(Math.round(v / 100) * 100); });
      countTo(lTot, total, money);
      countTo(lRec, rec, money);
      if (bar) bar.style.width = (total > 0 ? Math.round((rec / total) * 100) : 0) + "%";

      var lc = document.getElementById("lead-col"); if (lc) lc.value = String(col);
      var le = document.getElementById("lead-eco"); if (le) le.value = money(rec);
    }
```

Nada mais no módulo `calc()` muda (`countTo`, `money`, listeners e `render()` inicial permanecem).

- [ ] **Step 3: Confirmar ordem de carga**

Verificar em `index.html` que `<script src="js/roi.js" defer></script>` aparece **antes** de `<script src="js/main.js" defer></script>`. Scripts `defer` executam na ordem do documento, então `window.AuroraRoi` existe quando `main.js` roda.

- [ ] **Step 4: Regressão de testes**

Run: `node --test tests/roi.test.js`
Expected: `# pass 4`, `# fail 0`.

Run: `node --check js/main.js`
Expected: exit 0, sem saída.

- [ ] **Step 5: Conferir paridade da calculadora no navegador**

Servir e abrir a seção Calculadora. Nos valores padrão dos sliders (col 1.800, turnover 18%, salário R$ 5.200):
- Saídas por ano: `324`
- Custo de repor cada saída: `R$ 46.800`
- Custo anual de turnover: `R$ 15,2 mi`
- Recuperável com a Aurora: `R$ 4,9 mi`
- Barra `#calc-bar-rec` com ~32% de largura.

Arrastar cada slider: os quatro números e a barra reagem, com contagem animada. Com `prefers-reduced-motion` ativo (DevTools → Rendering → Emulate CSS prefers-reduced-motion), os números trocam instantaneamente.

- [ ] **Step 6: Commit**

```bash
git add js/main.js
git commit -m "$(printf 'Liga a calculadora ao modulo js/roi.js e remove plates() morto\n\nO modulo calc() passa a usar window.AuroraRoi.calcularRoi em vez da\nformula inline; mesmos numeros na tela (formula identica). Remove a\nfuncao plates(), que ja era no-op desde a remocao do elemento #plates.\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu')"
```

---

## Task 3: Substituir o handler demo do formulário pelo envio real (Netlify Forms)

**Files:**

- Modify: `js/main.js` (bloco `var form = document.getElementById("lead"); if (form) { … }`)

**Interfaces:**

- Consumes: marcação estática do `<form id="lead" name="agendar-demonstracao" method="POST" data-netlify="true" netlify-honeypot="bot-field" novalidate>` com `<input type="hidden" name="form-name" value="agendar-demonstracao">`, honeypot `bot-field`, ocultos `#lead-perfil`/`#lead-col`/`#lead-eco`, campos `#f-nome`/`#f-email`/`#f-empresa`/`#f-lgpd`, alerta `#form-err`, painel `#lead-done`. Tudo já presente vindo da Task 1.
- Produces: `js/main.js` com submit que faz `fetch('/', …)` real; sucesso → `#lead-done`; falha → mensagem em `#form-err` e botão reabilitado.

- [ ] **Step 1: Localizar o handler demo**

Em `js/main.js`, achar o bloco (veio do protótipo, ~linhas 1155–1179):

```js
  var form = document.getElementById("lead");
  if (form) {
    var err = document.getElementById("form-err");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["f-nome", "f-empresa"].forEach(function (id) {
        var i = document.getElementById(id);
        var bad = !i.value.trim() || i.value.trim().length < 2;
        i.style.boxShadow = bad ? "inset 0 -2px 0 #C81E3A" : "";
        if (bad) ok = false;
      });
      var em = document.getElementById("f-email");
      var badEm = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value);
      em.style.boxShadow = badEm ? "inset 0 -2px 0 #C81E3A" : "";
      if (badEm) ok = false;
      if (!document.getElementById("f-lgpd").checked) ok = false;
      if (!ok) { if (err) err.hidden = false; return; }
      if (err) err.hidden = true;
      form.hidden = true;
      var done = document.getElementById("lead-done");
      done.hidden = false;
      done.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    });
  }
```

- [ ] **Step 2: Substituir por envio real**

Trocar o bloco inteiro por:

```js
  var form = document.getElementById("lead");
  if (form) {
    var err = document.getElementById("form-err");
    var submitBtn = form.querySelector(".submit");
    var submitLabel = submitBtn ? submitBtn.textContent : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var ok = true;
      ["f-nome", "f-empresa"].forEach(function (id) {
        var i = document.getElementById(id);
        var bad = !i.value.trim() || i.value.trim().length < 2;
        i.style.boxShadow = bad ? "inset 0 -2px 0 #C81E3A" : "";
        if (bad) ok = false;
      });
      var em = document.getElementById("f-email");
      var badEm = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value);
      em.style.boxShadow = badEm ? "inset 0 -2px 0 #C81E3A" : "";
      if (badEm) ok = false;
      if (!document.getElementById("f-lgpd").checked) ok = false;

      if (!ok) {
        if (err) {
          err.textContent = "Existem campos obrigatórios com erro. Confira os itens marcados.";
          err.hidden = false;
        }
        return;
      }
      if (err) err.hidden = true;
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Enviando…"; }

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.hidden = true;
          var done = document.getElementById("lead-done");
          done.hidden = false;
          done.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
        })
        .catch(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitLabel; }
          if (err) {
            err.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
            err.hidden = false;
          }
        });
    });
  }
```

- [ ] **Step 3: Conferir o seletor do botão**

Em `index.html`, na seção `#assine`, confirmar que o botão de envio do `<form id="lead">` tem `class="submit"` (é o seletor usado por `form.querySelector(".submit")`). Se a classe for outra, ajustar o seletor no Step 2 para a classe real. Confirmar também que `<input type="hidden" name="form-name" value="agendar-demonstracao">` tem `value` **idêntico** ao atributo `name` do `<form>` (`agendar-demonstracao`).

- [ ] **Step 4: Checar sintaxe**

Run: `node --check js/main.js`
Expected: exit 0, sem saída.

- [ ] **Step 5: Testar caminho de erro localmente**

Servir (`npx --yes serve -l 5000 .`), abrir a seção "Agendar demonstração".
- Enviar com campos vazios → `#form-err` aparece com "Existem campos obrigatórios com erro…", sem requisição de rede.
- Preencher nome/e-mail/empresa válidos + marcar LGPD + enviar → botão vai para "Enviando…", depois volta ao rótulo original e `#form-err` mostra "Não foi possível enviar agora…" (esperado: sem backend local, o `fetch('/')` recebe 405/404 do server estático). Console pode registrar o erro de rede — ok.

O caminho de sucesso só é verificável no deploy Netlify (fora deste plano); registrar isso no checklist da Task 8.

- [ ] **Step 6: Commit**

```bash
git add js/main.js
git commit -m "$(printf 'Substitui o handler demo do formulario pelo envio real (Netlify Forms)\n\nO submit passa a fazer fetch POST para / com o corpo url-encoded que a\nNetlify Forms espera. Sucesso mostra #lead-done; falha reabilita o botao\ne exibe mensagem em #form-err. Mantida toda a validacao client-side.\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu')"
```

---

## Task 4: Atualizar `404.html` para a paleta clara

**Files:**

- Modify: `404.html`

**Interfaces:**

- Consumes: `css/styles.css` (tokens `--void`, `--fog`, `--fog2`, `--magenta`, `--sans`) da Task 1.
- Produces: `404.html` autoconsistente na paleta clara.

- [ ] **Step 1: Reescrever `404.html`**

Substituir todo o arquivo por:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Página não encontrada · Aurora</title>
  <meta name="robots" content="noindex" />
  <meta name="theme-color" content="#F6F5F8" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap" />
  <link rel="stylesheet" href="css/styles.css" />
  <style>
    .nf {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 1rem;
      padding: clamp(1.5rem, 6vw, 6rem);
      background: var(--void);
    }
    .nf h1 {
      font-family: var(--sans);
      font-size: clamp(3.5rem, 14vw, 8rem);
      font-weight: 800;
      letter-spacing: -.04em;
      line-height: .9;
      color: var(--fog);
    }
    .nf h1 b { color: var(--magenta); font-weight: 800; }
    .nf p {
      font-family: var(--sans);
      color: var(--fog2);
      max-width: 44ch;
      line-height: 1.6;
      font-size: 1.05rem;
    }
    .nf a {
      font-family: var(--sans);
      font-weight: 700;
      color: var(--fog);
      text-decoration: none;
      border-bottom: 2px solid var(--magenta);
      padding-bottom: 2px;
      margin-top: .5rem;
    }
  </style>
</head>
<body>
  <main class="nf">
    <h1>4<b>0</b>4</h1>
    <p>A página que você procura não existe ou foi movida. Volte para a página inicial da Aurora.</p>
    <a href="/">Voltar ao início →</a>
  </main>
</body>
</html>
```

- [ ] **Step 2: Conferir**

Servir e abrir `http://localhost:5000/404.html`.
Expected: fundo claro, "404" grande em Archivo com o "0" magenta, texto cinza, link com sublinhado magenta. Sem rolagem horizontal em 360px.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "$(printf 'Atualiza a pagina 404 para a paleta clara\n\nFundo #F6F5F8, tipografia Archivo, acento magenta, alinhamento a\nesquerda como o resto do site.\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu')"
```

---

## Task 5: Atualizar `assets/favicon.svg` e `assets/og-cover.svg` para a paleta clara

**Files:**

- Modify: `assets/favicon.svg`
- Modify: `assets/og-cover.svg`

**Interfaces:**

- Consumes: nada (assets estáticos).
- Produces: dois SVGs na paleta clara, mesmos `viewBox` de antes (`0 0 64 64` e `0 0 1200 630`) e mesmos nomes de arquivo (referenciados por `index.html`, `404.html`, OG tags).

- [ ] **Step 1: Reescrever `assets/favicon.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#F6F5F8"/>
  <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" fill="none" stroke="#D9D8E1" stroke-width="1.5"/>
  <circle cx="32" cy="32" r="13" fill="#A81F62"/>
  <circle cx="32" cy="32" r="20" fill="none" stroke="#12796C" stroke-width="3"/>
</svg>
```

- [ ] **Step 2: Reescrever `assets/og-cover.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F6F5F8"/>
  <circle cx="980" cy="140" r="130" fill="#A81F62" opacity="0.12"/>
  <circle cx="980" cy="140" r="130" fill="none" stroke="#12796C" stroke-width="6" opacity="0.5"/>
  <text x="90" y="250" fill="#17141D" font-family="Archivo, Arial, sans-serif" font-size="86" font-weight="800" letter-spacing="-3">Aurora</text>
  <text x="90" y="322" fill="#17141D" font-family="Archivo, Arial, sans-serif" font-size="34" font-weight="600">People Analytics para decisões que a diretoria assina.</text>
  <text x="90" y="386" fill="#5C5967" font-family="Archivo, Arial, sans-serif" font-size="26" font-weight="500">Reduza turnover · aumente engajamento · decida 3× mais rápido</text>
  <rect x="90" y="430" width="150" height="6" fill="#A81F62"/>
</svg>
```

- [ ] **Step 3: Conferir**

Abrir os dois SVGs no navegador (`http://localhost:5000/assets/favicon.svg` e `/assets/og-cover.svg`).
Expected: favicon claro com ponto magenta e anel teal; capa clara com "Aurora" em Archivo preto e detalhes magenta/teal. Nenhum texto cortado.
Conferir também que a aba do navegador em `http://localhost:5000/` mostra o novo favicon (pode exigir hard-refresh).

- [ ] **Step 4: Commit**

```bash
git add assets/favicon.svg assets/og-cover.svg
git commit -m "$(printf 'Atualiza favicon e capa social para a paleta clara\n\nMesmos viewBox e nomes de arquivo; fundo #F6F5F8, marca em magenta e\nteal, tipografia Archivo na capa OG.\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu')"
```

---

## Task 6: Reescrever `docs/entrega-etapa-2.md` — seções 3, 4 e 7

**Files:**

- Modify: `docs/entrega-etapa-2.md` (seções 3, 4, 7; demais seções intocadas)

**Interfaces:**

- Consumes: estado final de `index.html` / `css/styles.css` / `js/main.js` (Tasks 1–3), estrutura de arquivos.
- Produces: dossiê coerente com a direção "Campo de risco" para o PDF que as integrantes vão montar.

- [ ] **Step 1: Ler o arquivo e localizar as seções**

Run: `grep -n "^## " docs/entrega-etapa-2.md`
Identificar os limites de linha das seções "3", "4" e "7".

- [ ] **Step 2: Substituir a Seção 3 (contextualização / justificativa das decisões)**

Reescrever o corpo da seção 3 cobrindo, em prosa curta:

- **Direção visual "Campo de risco":** resposta direta à crítica de "cara genérica de gerador de site". Fundo claro `#F6F5F8`, texto quase-preto `#17141D`, tipografia **Archivo** (sans, pesos 700–800) sem serifa, **magenta `#A81F62` como cor de acento principal**, teal `#12796C` e roxo `#574587` como apoio. Sem fundo creme, sem hairlines por toda parte, sem coluna única centralizada. Layout assimétrico e tipografia editorial forte para diferenciar de templates.
- **Paleta herdada da Aurora:** os matizes roxo/teal/magenta do design system original foram mantidos e recalibrados para fundo claro (contraste AA).
- **Arquitetura de conteúdo:** nav → hero (campo de risco) → desafios → como funciona → diagnóstico → solução → funcionalidades → números → calculadora → assine → rodapé.
- **Diferenciais ("a página é um instrumento"):** cada seção é operável —
  - hero: 3 sliders de fatores (engajamento, carga, 1:1s) → medidor de turnover projetado + custo estimado;
  - diagnóstico de maturidade: 4 sliders de espectro → medidor + perfil, que preenche campos ocultos do formulário;
  - "Pergunte à Aurora": seletor de perguntas de negócio com resposta visual (gráfico + achado + ação);
  - calculadora "conta que se monta": razonete animado, cálculo em `js/roi.js` (módulo testado);
  - hexágono de funcionalidades: constelação de 6 nós com pulsos pretos lentos percorrendo arestas e raios.
- **Stack e deploy:** mantidos — HTML/CSS/JS vanilla, sem build; Netlify + Netlify Forms; `netlify.toml` com headers de cache e segurança.
- **Formulário:** envio real via Netlify Forms (AJAX), honeypot `bot-field`, campos ocultos de contexto (perfil do diagnóstico, nº de colaboradores, economia estimada).

- [ ] **Step 3: Substituir a Seção 4 (acessibilidade — verificável na página)**

Manter o formato de tabela com referência a critérios WCAG. Atualizar as linhas para os controles da nova direção:

| Recurso | Onde | Critério WCAG |
| --- | --- | --- |
| HTML semântico (`header`/`main`/`section`/`nav`/`footer`), um `h1` | todo o documento | 1.3.1 |
| Skip link "Ir para o conteúdo principal" | topo do `body` → `#conteudo` | 2.4.1 |
| Sliders operáveis por teclado, com `aria-valuetext`/rótulo | hero, diagnóstico, calculadora | 2.1.1, 4.1.2 |
| Abas "Pergunte à Aurora" com `role="tab"` e navegação por setas | seção Solução | 2.1.1, 4.1.2 |
| Regiões `aria-live="polite"` nos medidores e no razonete | hero, diagnóstico, calculadora | 4.1.3 |
| `role="alert"` na mensagem de erro do formulário | seção Assine | 4.1.3 |
| Foco visível (`:focus-visible`) sobre fundo claro | todos os controles | 2.4.7 |
| `prefers-reduced-motion`: pulsos desligados, contadores instantâneos | hexágono, "como funciona", calculadora | 2.3.3 |
| Rótulo `<label>` associado a cada campo do formulário | seção Assine | 1.3.1, 3.3.2 |
| Contraste de texto AA na paleta clara | todo o documento | 1.4.3 |
| `alt` em imagens; SVGs decorativos com `aria-hidden` | logo, ícones, hexágono | 1.1.1 |

Acrescentar 1 frase: "Todos os recursos acima são verificáveis diretamente na página publicada — navegação por teclado, leitor de tela e o modo de movimento reduzido do sistema operacional."

- [ ] **Step 4: Substituir a Seção 7 (como executar + estrutura de arquivos)**

- Comando de teste: `node --test tests/roi.test.js` (manter o aviso de não usar `node --test tests/`).
- Como rodar local: servidor estático simples (`npx serve` ou `python -m http.server`).
- Árvore de arquivos atualizada:

```
aurora-project/
├── index.html              # landing page (marcação + <head>)
├── 404.html
├── css/
│   └── styles.css          # design system "Campo de risco"
├── js/
│   ├── main.js             # comportamento da página (IIFE)
│   └── roi.js              # módulo calcularRoi (testado)
├── tests/
│   └── roi.test.js         # node:test — 4 casos
├── assets/
│   ├── aurora-logo.svg
│   ├── favicon.svg
│   └── og-cover.svg
├── netlify.toml
├── robots.txt · sitemap.xml
└── docs/
    ├── entrega-etapa-2.md
    ├── proposta-visual/    # prototipo aprovado (referencia)
    └── superpowers/        # specs e planos
```

- [ ] **Step 5: Commit**

```bash
git add docs/entrega-etapa-2.md
git commit -m "$(printf 'Atualiza o dossie da Etapa 2 para a direcao Campo de risco\n\nSecoes 3 (identidade visual, arquitetura de conteudo, diferenciais),\n4 (acessibilidade verificavel) e 7 (estrutura de arquivos) reescritas.\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu')"
```

---

## Task 7: Atualizar `README.md`

**Files:**

- Modify: `README.md`

**Interfaces:**

- Consumes: estado final do projeto (Tasks 1–6).
- Produces: README coerente com a nova direção.

- [ ] **Step 1: Ler o README e localizar as seções**

Run: `grep -n "^#\|^##" README.md`

- [ ] **Step 2: Atualizar as seções**

- **Estrutura / seções da página:** nav, hero (campo de risco), desafios, como funciona, diagnóstico, solução, funcionalidades, números, calculadora, agendar demonstração, rodapé.
- **Tecnologias:** HTML5, CSS3, JavaScript ES2020 (vanilla), **Archivo (Google Fonts)**, Netlify + Netlify Forms, `node:test`.
- **Identidade visual:** direção "Campo de risco" — fundo claro `#F6F5F8`, texto `#17141D`, **magenta `#A81F62` como acento principal**, teal `#12796C` e roxo `#574587` de apoio, tipografia Archivo.
- **Funcionalidades:** sliders do modelo de risco no hero; diagnóstico de maturidade por sliders; "Pergunte à Aurora"; calculadora de ROI com razonete (`js/roi.js`, testada); hexágono de funcionalidades animado; formulário de lead com envio real.
- **Estrutura de pastas:** mesma árvore da Task 6 Step 4.
- **Como testar:** `node --test tests/roi.test.js`.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "$(printf 'Atualiza o README para a direcao Campo de risco\n\nSecoes, tecnologias (+Archivo), identidade visual (magenta principal),\nfuncionalidades e estrutura de pastas.\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01TS8cUUAvbvKLfcbG61WnVu')"
```

---

## Task 8: Verificação final

**Files:**

- Nenhum arquivo de código muda por padrão. Se algo falhar, corrigir na task correspondente e re-commitar.

**Interfaces:**

- Consumes: tudo das Tasks 1–7.
- Produces: relatório de verificação (comentário no PR / mensagem ao usuário). Nenhum artefato de código novo.

- [ ] **Step 1: Testes e sintaxe**

Run: `node --test tests/roi.test.js`
Expected: `# pass 4`, `# fail 0`.

Run: `node --check js/main.js && node --check js/roi.js`
Expected: exit 0.

- [ ] **Step 2: Grep de sanidade**

Run: `grep -n "stamp\|proposta de direção\|Plus Jakarta\|Open Sans\|#0D0B14\|plates(" index.html css/styles.css js/main.js 404.html`
Expected: nenhuma ocorrência (tudo removido/trocado).

Run: `grep -c "AuroraRoi" js/main.js`
Expected: ≥ 1.

- [ ] **Step 3: Servir e percorrer todas as seções**

Servir e abrir `http://localhost:5000/`. Conferir cada seção:
- nav com scroll-spy (link ativo muda ao rolar);
- hero: sliders → medidor + readout + veredito;
- desafios: 6 cartões;
- como funciona: entradas → núcleo → saídas + pulsos pretos;
- diagnóstico: 4 sliders → medidor + perfil; ao mexer nos 4, `#mat-cta` aparece e `#diag`/`#diag-val` no formulário são preenchidos;
- solução: 5 abas "Pergunte à Aurora";
- funcionalidades: hexágono com pulsos; lista fallback em telas estreitas;
- números: −32% / +47% / 3×;
- calculadora: razonete reativo (valores da Task 2 Step 5);
- assine: formulário (validação + caminho de erro da Task 3 Step 5);
- rodapé: 3 colunas, nota de acessibilidade, "Marca fictícia · projeto acadêmico".

- [ ] **Step 4: Só teclado**

Do topo, `Tab` por toda a página. Confirmar: skip link aparece primeiro e funciona; foco visível em cada controle; sliders movem com as setas; abas "Pergunte à Aurora" navegam com as setas; formulário inteiro alcançável; nenhuma armadilha de foco.

- [ ] **Step 5: Responsivo**

DevTools responsive em 360, 768 e 1280 px. Confirmar: sem rolagem horizontal; nav colapsa para wordmark + CTA em <880px; razonete e card do hero refluem; hexágono some/vira lista em telas estreitas.

- [ ] **Step 6: Movimento reduzido**

DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Recarregar. Confirmar: pulsos do hexágono e do "como funciona" não animam; contadores da calculadora trocam instantaneamente; barras/medidores sem transição.

- [ ] **Step 7: Lighthouse**

DevTools → Lighthouse → categoria Acessibilidade (modo Navigation, Desktop). Rodar.
Expected: pontuação ≥ 95. Registrar qualquer item sinalizado. Se contraste reprovar em `--fog2` sobre `--void`, escurecer `--fog2` em `css/styles.css` (ex.: `#4A4753`), re-commitar na Task 1, e repetir.

- [ ] **Step 8: `<head>` / view-source**

Run: `grep -n "theme-color\|canonical\|og:image\|Archivo\|css/styles.css\|js/roi.js\|js/main.js\|<title>" index.html`
Expected: `theme-color` = `#F6F5F8`; canonical presente; `og:image` presente; `<link>` Archivo presente; `css/styles.css` linkado; `js/roi.js` antes de `js/main.js`; título = `Aurora · People Analytics para Empresas`.

- [ ] **Step 9: Registrar pendência de deploy**

Anotar no relatório final: o **caminho de sucesso do formulário** (Netlify Forms recebendo o lead) só é verificável após o deploy do preview da branch na Netlify — passo manual do usuário, fora deste plano. O mesmo vale para conferir a captura da OG image por um validador social.

- [ ] **Step 10: Relatório**

Escrever ao usuário: resumo do que foi feito, resultado de cada verificação (testes, Lighthouse, teclado, responsivo, movimento reduzido), pendências (deploy Netlify, push), e a pergunta sobre merge de `novo-visual` em `main`.

---

## Self-Review (preenchido pelo autor do plano)

**1. Cobertura do spec:**
- §3.2 tabela de arquivos → Tasks 1–7 (todos os arquivos listados têm task; `docs/proposta-visual/` já commitado; `netlify.toml`/`robots`/`sitemap` explicitamente intocados).
- §4 arquitetura / ordem de carga → Task 1 (Step 3) + Task 2 (Step 3).
- §5.1 form real → Task 3. §5.2 calc via roi.js → Task 2 (Step 2). §5.3 remover `plates()` → Task 2 (Step 1).
- §6 `<head>` merge, fontes, theme-color, title, remover `.stamp` → Task 1 (Steps 3–4).
- §7.1 dossiê seções 3/4/7 → Task 6. §7.2 README → Task 7.
- §8 plano de verificação (10 itens) → Task 8 (Steps 1–9).
- §9 riscos (contraste `--fog2`) → Task 8 Step 7 tem mitigação explícita.
- Extra além do spec: skip-link (`#conteudo`) — melhoria de acessibilidade de baixo risco, alinhada a "acessibilidade verificável"; footer fine print ("Marca fictícia · projeto acadêmico") — coerência com marca fictícia.

**2. Placeholders:** nenhum "TBD/TODO"; todos os steps de código têm o código completo; os steps de documentação (Tasks 6–7) listam exatamente o conteúdo a escrever, não "escreva sobre X".

**3. Consistência de tipos:** `AuroraRoi.calcularRoi({colaboradores,turnoverPct,salarioMensal})` → `{saidasAno,custoAtual,economiaAurora}` usado de forma idêntica no spec §5.2 e na Task 2 Step 2. IDs de formulário (`#lead`, `#form-err`, `#lead-done`, `.submit`) consistentes entre Task 1 (Produces), Task 3 e Task 8. Offsets do protótipo (378–736 corpo, 741–1193 script, `plates` 899–933) verificados contra o arquivo real.
