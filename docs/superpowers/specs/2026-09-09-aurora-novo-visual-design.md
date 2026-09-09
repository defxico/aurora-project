# Aurora — Integração do novo visual no `index.html` de produção — Design

**Data:** 2026-09-09
**Challenge:** People First Cup — Enterprise Challenge — Etapa 2
**Repositório:** https://github.com/defxico/aurora-project
**Marca:** Aurora (fictícia) — plataforma de People Analytics para público B2B
**Branch:** `novo-visual` (a partir de `main`)

---

## 1. Contexto

A entrega da Etapa 2 já está em `main` (`index.html` + `css/styles.css` + `js/main.js` +
`js/roi.js` + `tests/roi.test.js`), com deploy Netlify configurado e formulário operacional.
O visual dessa entrega recebeu a crítica de ter "cara genérica de plataforma geradora de
site".

Em resposta, foi desenvolvido um protótipo de nova direção visual — **"Campo de risco"** —
iterado e **aprovado** pelo time. Ele está congelado como referência em
`docs/proposta-visual/index.html` (arquivo único, autocontido, 1194 linhas).

Este design cobre **apenas a integração** desse protótipo aprovado ao projeto de produção.
Não há decisão de design visual em aberto: a direção, a paleta, a tipografia, o
comportamento de cada seção e os textos já foram aprovados no protótipo. O que este
documento define é **como** trazer aquele arquivo único para a arquitetura real do projeto
sem regredir nada que a Etapa 2 já entregou (formulário real, SEO/OG, deploy, testes,
acessibilidade verificável).

## 2. Objetivo

`main` continua sendo a Etapa 2 atual e intacta. Na branch `novo-visual`, o `index.html`
de produção passa a ser o protótipo aprovado, dividido em `css/` e `js/`, com:

- todo o `<head>` de SEO/social/deploy da Etapa 2 preservado;
- formulário de lead com **envio real** via Netlify Forms (não o handler de demonstração
  do protótipo);
- `js/roi.js` e seus testes mantidos e efetivamente usados pela calculadora;
- `404.html` e a documentação de entrega atualizados para a nova direção.

O merge de `novo-visual` em `main` fica para aprovação posterior do usuário.

## 3. Escopo

### 3.1 Fora de escopo

- Qualquer alteração no visual, textos, seções ou comportamento aprovados no protótipo.
- Deploy / conexão com a Netlify (etapa manual do usuário, pendente de login).
- Push para o GitHub (`main` e `proposta-visual` ainda não foram publicados; decisão do
  usuário).
- Refatoração não relacionada.

### 3.2 Em escopo

Arquivos criados/alterados na branch `novo-visual`:

| Arquivo | Ação |
| --- | --- |
| `docs/proposta-visual/` (2 arquivos) | **Já trazido** de `proposta-visual` como referência congelada |
| `index.html` | Reescrito: marcação do protótipo + `<head>` da Etapa 2 |
| `css/styles.css` | Substituído pelo `<style>` do protótipo |
| `js/main.js` | Substituído pelo `<script>` do protótipo, com 3 ajustes (§5) |
| `js/roi.js` | **Mantido sem alteração** |
| `tests/roi.test.js` | **Mantido sem alteração** |
| `404.html` | Reescrito na paleta clara nova |
| `assets/favicon.svg` | Atualizado para a paleta clara |
| `assets/og-cover.svg` | Atualizado para a paleta clara |
| `docs/entrega-etapa-2.md` | Seções 3, 4 e 7 reescritas |
| `README.md` | Estrutura, tecnologias, identidade visual, funcionalidades |
| `netlify.toml`, `robots.txt`, `sitemap.xml` | Sem alteração |

## 4. Arquitetura resultante

```
index.html          marcação semântica + <head> completo (SEO/OG/Twitter/canonical/
                     favicon/theme-color) + <link> Archivo + <link> css/styles.css
                     + <script src="js/roi.js" defer> + <script src="js/main.js" defer>
css/styles.css       design system "Campo de risco" (tokens :root, todas as seções,
                     @media prefers-reduced-motion, breakpoints 360/768/1280)
js/roi.js            módulo puro calcularRoi() — UMD (window.AuroraRoi + module.exports)
js/main.js           IIFE única: nav+scroll-spy, riskModel, flowPulses, hexPulses,
                     maturity, ask, calc (usa AuroraRoi), submit real do formulário
tests/roi.test.js    4 testes node:test sobre js/roi.js
```

**Ordem de carregamento:** `roi.js` antes de `main.js` (ambos `defer`, ordem preservada),
para `window.AuroraRoi` existir quando o módulo `calc()` rodar.

**Fronteiras:**

- `roi.js` não conhece o DOM; entrada e saída são objetos. Testável isoladamente.
- `main.js` é a camada de comportamento da página; cada módulo do IIFE opera uma seção e
  não depende dos outros (o único acoplamento é via IDs de campos ocultos do formulário,
  que `riskModel`, `maturity` e `calc` preenchem — comportamento herdado do protótipo
  aprovado).
- `styles.css` não tem JS; `main.js` só alterna classes/estilos e atributos ARIA.

## 5. Ajustes ao portar o `<script>` do protótipo

O `<script>` do protótipo vai quase inteiro para `js/main.js`. Três mudanças:

### 5.1 Formulário: handler real do Netlify Forms

O protótipo tem um handler **de demonstração**: valida os campos e faz
`form.hidden = true; document.getElementById('lead-done').hidden = false`, sem envio.

Substituir pelo envio real, reaproveitando o padrão AJAX que já está em `js/main.js` na
`main` (`fetch('/', { method:'POST', headers:{'Content-Type':
'application/x-www-form-urlencoded'}, body: new URLSearchParams(new FormData(form)).toString() })`):

1. Manter toda a validação client-side do protótipo (nome/empresa `trim().length >= 2`,
   e-mail via regex, LGPD marcada) e a mensagem em `#form-err`.
2. Se válido: desabilitar o botão `.submit` (texto → "Enviando…"), `fetch('/', …)`.
3. Sucesso (`res.ok`): `form.hidden = true; #lead-done.hidden = false` +
   `scrollIntoView` (o protótipo já faz), mesmo desfecho visual do protótipo.
4. Falha (rede ou `!res.ok`): reabilitar o botão, exibir mensagem de erro de envio em
   `#form-err` (texto tipo "Não foi possível enviar agora. Tente novamente em instantes.").
5. A marcação do `<form>` já vem pronta do protótipo: `name="agendar-demonstracao"`,
   `method="POST"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, `<input
   type="hidden" name="form-name" value="agendar-demonstracao">`, honeypot `bot-field`,
   e os ocultos de contexto (`#lead-perfil`, `#lead-col`, `#lead-eco`, `#diag`,
   `#diag-val`). Conferir que o `value` do `form-name` bate com o `name` do form.

> IDs mudam em relação à `main` (`#lead`/`#lead-done` no protótipo vs.
> `#contact-form`/`#form-success` antigos). O handler novo usa os IDs do protótipo.

### 5.2 Calculadora usa `js/roi.js`

O módulo `calc()` do protótipo tem um `calcularRoi` **inline** com parâmetros `{col, tur,
sal}`. Trocar por `window.AuroraRoi.calcularRoi`, que espera
`{colaboradores, turnoverPct, salarioMensal}` e retorna `{saidasAno, custoAtual,
economiaAurora}`:

- `col → colaboradores`, `tur → turnoverPct`, `sal → salarioMensal`;
- razonete: `#l-saidas ← saidasAno`, `#l-total ← custoAtual`, `#l-rec ← economiaAurora`;
  `#l-rep` (custo por reposição) = `custoAtual / saidasAno` quando `saidasAno > 0`, senão 0;
- `#calc-bar-rec` (largura da barra) = `economiaAurora / custoAtual` quando
  `custoAtual > 0`.
- Fórmula idêntica à do protótipo aprovado (mesmos defaults `fatorSubstituicao 0.75`,
  `reducaoAurora 0.32`), então os números na tela não mudam.
- `countTo(elm, alvo, fmt)` do protótipo (grava o valor final de forma síncrona e depois
  anima com rAF, com guardas `_prev`/`_raf`) é mantido como está.
- Manter a gravação dos ocultos do formulário (`#lead-col`, `#lead-eco`).

### 5.3 Remover `plates()` morto

O IIFE tem `plates()`, hoje um no-op (o elemento `#plates` foi removido numa iteração).
Remover a função e a sua chamada.

## 6. `<head>` do `index.html`

Combinar o `<head>` da Etapa 2 (`main`) com o do protótipo:

**Preservar da Etapa 2:** `<meta charset>`, `<meta name="viewport">`, `<title>` (ver
abaixo), `<meta name="description" content="Aurora transforma dados de RH em decisões
estratégicas…">`, `<link rel="canonical" href="https://aurora-people-analytics.netlify.app/">`,
OG (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`), Twitter
Card, `<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">`.

**Trazer do protótipo / alterar:**

- Fontes: remover Plus Jakarta Sans + Open Sans; adicionar **Archivo**
  (`https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap`),
  com `<link rel="preconnect">` para `fonts.googleapis.com` e `fonts.gstatic.com`.
- `<meta name="theme-color" content="#F6F5F8">` (era `#0D0B14`).
- `<link rel="stylesheet" href="css/styles.css">` (sem `<style>` inline).
- `<title>`: manter o título de produção da Etapa 2 —
  `Aurora · People Analytics para Empresas` (**não** "Aurora — Campo de Risco", que é
  rótulo interno da proposta).
- Remover a tarja `.stamp` fixa ("Aurora · proposta de direção visual") — é do protótipo,
  não vai para produção. Remover o elemento e o seu CSS.

## 7. Documentação

### 7.1 `docs/entrega-etapa-2.md`

- **Seção 3 (contextualização / justificativa das decisões):**
  - *Identidade visual:* nova direção "Campo de risco" — fundo claro `#F6F5F8`, texto
    `#17141D`, tipografia **Archivo** (sans, pesos fortes), **magenta `#A81F62` como cor
    de acento principal**, teal `#12796C` e roxo `#574587` como apoio. Sem serifa, sem
    fundo creme, sem hairlines por toda parte, sem coluna centralizada. Justificar como
    resposta direta à crítica de "cara genérica de gerador de site": layout assimétrico,
    tipografia editorial forte, cor de marca usada com intenção.
  - *Arquitetura de conteúdo:* nova lista de seções (nav → hero → desafios → como funciona
    → diagnóstico → solução → funcionalidades → números → calculadora → assine → footer).
  - *Diferenciais:* "a página é um instrumento" — cada seção é operável:
    - hero com **campo de risco** (3 sliders de fatores → medidor de turnover projetado e
      custo);
    - **diagnóstico de maturidade** por sliders de espectro → medidor + perfil, que
      alimenta o formulário;
    - **"Pergunte à Aurora"** — seletor de perguntas de negócio com resposta visual;
    - **calculadora "conta que se monta"** — razonete animado (usa `js/roi.js`, testado);
    - **hexágono de funcionalidades** — constelação de 6 nós com pulsos pretos lentos
      percorrendo arestas e raios.
- **Seção 4 (acessibilidade — verificável na página):** atualizar para os controles da
  nova direção — sliders operáveis por teclado com `aria-valuetext`, abas do "Pergunte à
  Aurora" com `role="tab"`/setas, `aria-live` nos medidores e no razonete, `:focus-visible`
  visível sobre fundo claro, `prefers-reduced-motion` desliga todos os pulsos e torna os
  contadores instantâneos, contraste AA verificado na paleta clara. Manter formato de
  tabela com referência a critérios WCAG.
- **Seção 7 (como executar + estrutura de arquivos):** atualizar a árvore de arquivos
  (`css/styles.css`, `js/main.js`, `js/roi.js`, `docs/proposta-visual/`); manter o comando
  de teste `node --test tests/roi.test.js`.

### 7.2 `README.md`

Atualizar: lista de seções, Tecnologias (**+ Archivo**), Identidade visual (nova paleta,
magenta principal), Funcionalidades implementadas (os instrumentos interativos), estrutura
de pastas.

## 8. Plano de verificação

1. `node --test tests/roi.test.js` → 4/4 passando (fórmula não mudou).
2. `node --check js/roi.js` e `node --check js/main.js` → sem erro de sintaxe.
3. Servir localmente (`npx serve` ou similar) e percorrer todas as seções.
4. Operar cada instrumento: sliders do hero, do diagnóstico e da calculadora; abas do
   "Pergunte à Aurora"; pulsos do hexágono e do "Como funciona" animando.
5. Formulário: caminho de erro (sem backend local → mensagem de falha de envio);
   caminho de sucesso a validar no preview da Netlify após deploy.
6. Só teclado: tab por todos os controles, foco visível, sliders e abas operáveis.
7. Responsivo em 360 / 768 / 1280 — sem overflow horizontal; card do hero e razonete
   refluem.
8. `prefers-reduced-motion: reduce` — todos os pulsos somem, contadores são instantâneos.
9. Lighthouse (aba Acessibilidade) — meta ≥ 95.
10. Conferir `<head>`: `view-source` mostra description, canonical, OG, favicon, theme-color
    `#F6F5F8`, `<link>` Archivo, `<link>` css/styles.css.

## 9. Riscos

| Risco | Mitigação |
| --- | --- |
| Contraste AA falhar em texto secundário (`--fog2 #5C5967`) sobre `#F6F5F8` | Verificar no item 9 da verificação; escurecer o token se reprovar |
| `offset-path` sem suporte em navegador antigo | Protótipo já tem `CSS.supports(...)` + fallback de lista; manter |
| Envio Netlify Forms exigir o form também no HTML buildado (detecção) | A marcação `data-netlify` + `<input name="form-name">` estáticos já cobrem; validar no preview |
| Merge futuro em `main` conflitar | `novo-visual` sai de `main` limpa; manter rebased se `main` andar |

## 10. Definição de pronto

- Branch `novo-visual` com `index.html` / `css/styles.css` / `js/main.js` divididos,
  visualmente idênticos ao protótipo aprovado.
- Formulário com envio real (não o handler de demonstração).
- `node --test tests/roi.test.js` 4/4; calculadora usando `js/roi.js`.
- `plates()` removido; tarja `.stamp` removida.
- `404.html`, favicon e capa OG na paleta clara.
- `docs/entrega-etapa-2.md` (3, 4, 7) e `README.md` atualizados.
- `main` intacta; nenhum push.
