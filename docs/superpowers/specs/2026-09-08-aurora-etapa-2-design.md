# Aurora — Landing Page B2B · Etapa 2 — Design

**Data:** 2026-09-08
**Challenge:** People First Cup — Enterprise Challenge — Etapa 2
**Repositório:** https://github.com/defxico/aurora-project
**Marca:** Aurora (fictícia) — plataforma de People Analytics para público B2B

---

## 1. Contexto

A Etapa 1 entregou uma landing page estática e navegável (`index.html` + `css/styles.css` +
`assets/aurora-logo.svg`), com todas as seções de conteúdo, identidade visual aplicada,
recursos básicos de acessibilidade e um **formulário apenas demonstrativo** (validação no
navegador + `setTimeout` simulando envio, sem backend).

A Etapa 2 evolui essa entrega para algo real e publicado:

- deploy online em URL pública;
- formulário de captação de lead com **envio operacional**;
- todas as seções da Etapa 1 refinadas;
- recursos de acessibilidade **implementados e identificados na própria página**;
- responsividade revisada.

Não é exigido nesta etapa: vídeo-pitch.

## 2. Objetivos e critérios de avaliação atendidos

| Critério da Etapa 2 | Como este design atende |
| --- | --- |
| Clareza da proposta de valor B2B | Hero reforçado, seção Solução redesenhada, calculadora de ROI concreta |
| Qualidade do design visual e coerência com a marca | Refino de Hero, Resultados e Solução mantendo paleta/tipografia Aurora |
| Organização da interface e hierarquia de informação | Reorganização de arquivos, remoção de estilos inline, grid limpo na Solução |
| Funcionamento do formulário de captação de lead | Netlify Forms com envio real, honeypot, campos ocultos de contexto |
| Publicação online com acesso funcionando | Deploy Netlify com integração GitHub, `netlify.toml`, `404.html` |
| Responsividade | Revisão em 360 / 768 / 1280; card do Hero reflui no mobile |
| Recursos de acessibilidade | Correção de `prefers-reduced-motion`, `:focus-visible`, nova seção dedicada |
| Solução disruptiva | Quiz de maturidade conectado ao lead + calculadora de ROI interativa |

## 3. Decisões arquiteturais

### 3.1 Plataforma de deploy — Netlify

- **Escolha:** Netlify com integração ao repositório GitHub. Push na `main` dispara deploy
  automático. Site estático, sem build step: `publish = "."`.
- **Por quê:** o formulário nativo (Netlify Forms) elimina a necessidade de backend próprio,
  o que mantém o projeto 100% HTML/CSS/JS — coerente com o enunciado ("Bibliotecas e
  frameworks são bem-vindos, mas não obrigatórios"). Gratuito, deploy por Git, previews
  por PR, HTTPS automático.
- **Alternativas descartadas:**
  - Formspree/Getform: limite baixo de envios no plano gratuito e dependência de terceiro
    sem ganho sobre o Netlify Forms.
  - Google Sheets via Apps Script: setup manual, CORS frágil, sem painel próprio.
  - Firebase: mais peças e configuração do que o necessário para o escopo.
  - GitHub Pages / Vercel: exigiriam solução de formulário separada.

### 3.2 Stack — HTML + CSS + JavaScript vanilla

- Mantém a decisão da Etapa 1. Nenhum framework ou bundler.
- O `<script>` inline do `index.html` é extraído para `js/main.js` (organização e cache).
- Estilos inline (`style="..."` na seção Solução) migram para classes em `css/styles.css`.

### 3.3 Formulário — Netlify Forms com submissão AJAX

- Atributos no `<form>`: `name="agendar-demonstracao"`, `data-netlify="true"`,
  `netlify-honeypot="bot-field"`.
- Campos ocultos obrigatórios para detecção da Netlify: `<input type="hidden"
  name="form-name" value="agendar-demonstracao">` e o honeypot `bot-field` dentro de um
  wrapper escondido (`hidden`, fora da ordem de tab).
- Todos os campos do formulário permanecem no HTML estático (os bots de pós-processamento
  da Netlify fazem parse do HTML publicado — sem HTML estático não há detecção).
- Fluxo de submit em `js/main.js`:
  1. `e.preventDefault()`.
  2. validação client-side atual (mantida, incluindo o checkbox LGPD).
  3. se válido: `fetch("/", { method: "POST", headers: { "Content-Type":
     "application/x-www-form-urlencoded" }, body: new URLSearchParams(new
     FormData(form)).toString() })`.
  4. sucesso → esconde o form, mostra `#form-success` (mensagem inline, sem sair da página).
  5. erro de rede → mensagem de erro acessível em região `aria-live` e reabilita o botão.
- **Campos ocultos de contexto** (preenchidos por JS, enviados junto do lead):
  - `perfil-diagnostico` — badge do resultado do quiz (ex.: "Em Transição").
  - `colaboradores` — nº informado na calculadora de ROI.
  - `economia-estimada` — valor estimado pela calculadora.
- Limite do plano gratuito: 100 envios/mês (suficiente para uso acadêmico).

### 3.4 Identidade visual

- Paleta e tipografia da Etapa 1 preservadas: roxo `#534079`, teal `#238076`, magenta
  `#89275E`, fundo `#0D0B14`, superfície `#F8F7FF`; Plus Jakarta Sans (títulos) + Open Sans
  (texto). Google Fonts.
- As melhorias visuais (Seção 5) trabalham **dentro** dessa identidade — sem novas cores
  fora da paleta, sem novas famílias tipográficas.

## 4. Estrutura de arquivos (alvo)

```
aurora-project/
├── index.html
├── 404.html                    (novo — página de erro com identidade Aurora)
├── netlify.toml                (novo — publish dir, headers, cache)
├── robots.txt                  (novo)
├── sitemap.xml                 (novo)
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── main.js                 (novo — script extraído do index.html + novas features)
├── assets/
│   ├── aurora-logo.svg
│   ├── favicon.svg             (novo — derivado do logo)
│   └── og-cover.svg            (novo — imagem de preview social; PNG se um scraper exigir)
└── docs/
    ├── aurora-project.pdf      (entrega da Etapa 1, já no repo)
    └── entrega-etapa-2.md      (novo — dossiê de texto para o PDF da Etapa 2)
```

## 5. Melhorias visuais

Escopo: Hero, Resultados, Solução. As demais seções (Desafios, Como funciona, Quiz,
Funcionalidades, Footer) permanecem como estão, salvo ajustes de acessibilidade e
responsividade.

### 5.1 Hero

- **Problema:** primeira dobra é só título + subtítulo + botões, sem elemento visual.
- **Solução:**
  - backdrop "aurora": gradiente em camadas com animação lenta (CSS puro, `@keyframes`),
    desativado sob `prefers-reduced-motion`.
  - card de vidro flutuante ("glass card") ao lado/abaixo do texto, exibindo 3 KPIs
    mockados coerentes com a marca (ex.: "Turnover -32%", "Engajamento +47%", "Decisão 3×").
    É puramente decorativo — `aria-hidden="true"`; os mesmos números já aparecem em texto
    real na seção "Resultados".
  - layout: texto + card lado a lado em ≥ 960px; card reflui para baixo do texto no mobile.
- **Acessibilidade:** contraste do texto sobre o backdrop verificado (mínimo AA);
  animação respeitando movimento reduzido.

### 5.2 Resultados (números)

- **Problema:** 3 cards de contador visualmente simples.
- **Solução:**
  - anel/borda em gradiente sutil na paleta Aurora;
  - mini-SVG por métrica (arco de progresso ou sparkline), decorativo (`aria-hidden`);
  - escala tipográfica do valor aumentada; hover lift consistente com os demais cards;
  - nota de rodapé reforçando "indicadores de referência, não garantia de resultado".
- Contadores continuam animados, mas **pulam direto para o valor final** sob
  `prefers-reduced-motion`.

### 5.3 Solução

- **Problema:** `style="..."` inline no wrapper; coluna de 4 pontos densa; CTA misturado.
- **Solução:**
  - estilos inline → classe `.solucao__inner` no CSS;
  - os 4 pontos viram grid 2×2 (1 coluna no mobile) com tratamento de ícone uniforme;
  - barras de indicador maiores e mais legíveis;
  - CTA "Conhecer a plataforma" movido para fora da coluna de pontos, centralizado abaixo
    do grid.

## 6. Diferencial disruptivo

### 6.1 Quiz de maturidade → formulário

- O quiz já existe e funciona. Refino:
  - revisar foco/teclado (já tem navegação por setas — validar) e `aria-live` das etapas;
  - ao concluir, o `badge` do perfil é salvo em variável e escrito no hidden
    `#lead-perfil-diagnostico` do formulário;
  - quando esse campo tem valor, aparece uma linha de confirmação no topo do formulário:
    "Diagnóstico: <perfil>" (elemento visível, não apenas hidden);
  - o CTA do resultado ("Quero ver Aurora em ação") já rola para `#contato` — manter.

### 6.2 Calculadora de ROI

- **Nova `<section id="calculadora">`**, posicionada entre "Resultados" (`#numeros`) e o
  formulário (`#contato`).
- **Inputs** (todos com `<label>` associado):
  - nº de colaboradores — `<input type="number">`, default vazio, `min="1"`;
  - turnover anual (%) — `<input type="number">` ou slider com `aria-valuetext`, default 20;
  - salário médio mensal (R$) — `<input type="number">`, default 4000.
- **Fórmula (exibida na página, texto legível):**
  - `saídas_ano = colaboradores × (turnover% / 100)`
  - `custo_atual = saídas_ano × salário_mensal × 12 × fator_substituição`
    - `fator_substituição = 0.75` (premissa conservadora de mercado: custo de substituir um
      colaborador ≈ 50–200% da remuneração anual; adotado 75%). Documentado na página e no
      dossiê.
  - `economia_aurora = custo_atual × 0.32` (mesmo 32% de redução de turnover usado em
    "Resultados" — mantém coerência numérica em toda a página).
- **Saída:** elemento `<output aria-live="polite">` — "Sua empresa gasta aproximadamente
  R$ X por ano com turnover. Aurora pode ajudar a evitar cerca de R$ Y por ano." + CTA
  "Levar esse cálculo para uma conversa" que rola ao formulário e preenche os hidden
  `#lead-colaboradores` e `#lead-economia`.
- **Disclaimer** visível: "Estimativa ilustrativa baseada em premissas de mercado; não
  constitui projeção contratual."
- **Sem bibliotecas.** Cálculo em `js/main.js`. Formatação de moeda via
  `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
- **Acessibilidade:** recálculo em `input`/`change`; resultado anunciado por `aria-live`;
  qualquer animação de contagem desativada sob `prefers-reduced-motion`.

## 7. Acessibilidade

### 7.1 Correções (lacunas atuais)

- **`prefers-reduced-motion`**: hoje nenhuma animação respeita a preferência. Adicionar
  guard em: reveal-on-scroll, animação do diagrama, constelação, barras da Solução,
  contadores de "Resultados", backdrop do Hero, calculadora. Sob a preferência: conteúdo
  aparece imediatamente no estado final.
- **`:focus-visible`**: estilo de foco consistente e visível em todos os elementos
  interativos (links, botões, inputs, opções do quiz).
- **Contraste**: revisar textos sobre o novo backdrop do Hero e sobre superfícies com
  gradiente (mínimo WCAG AA — 4.5:1 texto normal, 3:1 texto grande).
- **Região de status do formulário**: garantir que erros e sucesso sejam anunciados
  (`aria-live` / `role="alert"` já presentes — validar com o novo fluxo AJAX).

### 7.2 Identificação dos recursos de acessibilidade

> **Revisado após a implementação (2026-09-08):** a exigência "identificadas na página" é
> lida como *verificável no código* (HTML semântico, ARIA, foco, `prefers-reduced-motion`),
> não como uma seção de vitrine. Uma seção visível de meta-comentário não é conteúdo real
> de landing page B2B. **Decisão: não há seção `#acessibilidade` nem link no footer.** Os
> recursos ficam implementados no markup (verificáveis) e a identificação detalhada, com
> referências WCAG, vai no dossiê `docs/entrega-etapa-2.md` (seção 4) — que é o material do
> PDF de entrega.

Recursos garantidos no código (o que estava planejado para a lista):
  - **Estrutura semântica** — `header`/`nav`/`main`/`section`/`footer`, headings
    hierárquicos, `skip-link` para o conteúdo.
  - **Navegação por teclado** — todos os interativos focáveis; quiz operável por setas /
    Home / End / Enter / Espaço; foco visível.
  - **Leitores de tela** — `aria-label` na navegação, `aria-labelledby` nas seções,
    `aria-live` nas etapas do quiz / resultado da calculadora / status do formulário,
    `aria-current` no link ativo, elementos decorativos com `aria-hidden`.
  - **Contraste e cores** — paleta validada em AA; informação nunca transmitida só por cor.
  - **Formulários** — `<label>` associado a cada campo, `aria-required`, `aria-invalid`,
    mensagens de erro vinculadas por `aria-describedby`.
  - **Movimento reduzido** — todas as animações desativadas sob `prefers-reduced-motion`.
  - **Zoom e responsividade** — layout utilizável até 200% de zoom; unidades relativas.
- Link "Acessibilidade" adicionado à navegação do `<footer>`.

## 8. SEO / metadados / publicação

- `<head>`: Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`),
  Twitter Card, `theme-color`, `<link rel="canonical">`, `<link rel="icon">`.
- `robots.txt` liberando tudo + referência ao `sitemap.xml`.
- `sitemap.xml` com a URL única.
- `netlify.toml`: `[build] publish = "."`; headers de segurança (`X-Content-Type-Options:
  nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options:
  SAMEORIGIN`, `Permissions-Policy` mínimo); cache longo para `assets/`, `css/`, `js/`.
- `404.html` com o visual Aurora e link de volta para a home.

## 9. Dossiê de entrega — `docs/entrega-etapa-2.md`

Documento em português, texto corrido pronto para as integrantes montarem o PDF. Seções:

1. **Integrantes** — ordem alfabética, nome completo + RM. *(placeholder `RM000000` até o
   grupo fornecer.)*
2. **Contexto e proposta de valor B2B** — o que é a Aurora, para quem, qual problema resolve.
3. **Contextualização e justificativa das decisões** — plataforma (Netlify + Netlify
   Forms), stack vanilla, decisões de identidade visual, arquitetura de conteúdo das
   seções, os dois diferenciais (quiz conectado ao lead + calculadora de ROI).
4. **Recursos de acessibilidade presentes** — lista detalhada espelhando a seção
   `#acessibilidade`, com referência aos critérios WCAG 2.1 aplicáveis.
5. **Link do deploy** — URL pública da Netlify.
6. **Link do repositório** — https://github.com/defxico/aurora-project (público).
7. **Como executar localmente e estrutura de arquivos.**

O PDF em si é montado pelas integrantes fora deste projeto.

## 10. Verificação (site estático — sem framework de teste)

1. **Local** — servir o site (`npx serve` ou Live Server), clicar por todas as seções.
2. **Validação HTML** — W3C Validator ou `npx html-validate index.html 404.html`.
3. **Formulário** — no deploy preview da Netlify, enviar um lead de teste real e confirmar
   que aparece no painel Forms; confirmar exibição da mensagem de sucesso inline; testar
   caminho de erro de rede.
4. **Lighthouse** — acessibilidade ≥ 95; sem regressão grave de performance.
5. **Teclado** — percorrer a página inteira só com Tab/Shift-Tab/setas; foco sempre
   visível; quiz e calculadora operáveis.
6. **Responsividade** — 360 px, 768 px, 1280 px; sem overflow horizontal; card do Hero
   reflui.
7. **Movimento reduzido** — com `prefers-reduced-motion: reduce` ativo, nenhuma animação
   roda e todo o conteúdo aparece no estado final.
8. **Deploy** — push na `main` publica; URL pública abre sem erro; `404.html` funciona.

## 11. Ordem de execução

1. Housekeeping — extrair `js/main.js`, remover estilos inline, `<head>`/metadados,
   `favicon.svg`, `og-cover.svg`, `robots.txt`, `sitemap.xml`, `netlify.toml`, `404.html`.
2. Formulário → Netlify Forms (atributos, honeypot, fluxo AJAX, campos ocultos).
3. Acessibilidade — `prefers-reduced-motion` global, `:focus-visible`, revisão de
   contraste, seção `#acessibilidade`, link no footer.
4. Visual — Hero, Resultados, Solução.
5. Calculadora de ROI — nova seção + lógica em `js/main.js`.
6. Quiz — refino + wiring do resultado para os campos ocultos do formulário.
7. Deploy — conectar repo à Netlify, publicar, teste de lead real, ajuste do nome do site.
8. Dossiê `docs/entrega-etapa-2.md` + atualização do `README.md`.

## 12. Fora de escopo

- Vídeo-pitch (não exigido nesta etapa).
- Backend próprio, banco de dados, autenticação.
- Integração real com sistemas de RH (o diagrama "Como funciona" continua ilustrativo).
- Persistência dos dados da calculadora ou do quiz além do envio junto do lead.
- Redesenho das seções fora de Hero / Resultados / Solução.
- Domínio próprio pago (o subdomínio `netlify.app` atende à exigência de URL pública).

## 13. Pendências do grupo

- Nomes completos + RM dos integrantes (ordem alfabética).
- Login na Netlify e conexão do repositório (passo a passo será fornecido).
- Confirmar que o repositório GitHub está com visibilidade **pública**.
- Configurar notificação de e-mail dos leads no painel da Netlify.
