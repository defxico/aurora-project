# People First Cup — Enterprise Challenge · Etapa 2 — Aurora

## 1. Integrantes

- Amanda Ayumi Guedes Ueno — RM573609
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
| SVGs informativos com `role="img"` + `aria-label`; logotipo com `alt` | Hexágono, logo | 1.1.1 |
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

## 7. Como executar localmente

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
│   └── roi.js              # módulo calcularRoi (com testes)
├── tests/
│   └── roi.test.js         # node:test — 4 casos
├── assets/                 # aurora-logo.svg · favicon.svg · og-cover.svg
├── netlify.toml · robots.txt · sitemap.xml
└── docs/
    ├── entrega-etapa-2.md
    ├── handoff-etapa-2.md  # matéria-prima do PDF (código, design, seções)
    ├── proposta-visual/    # protótipo aprovado (referência)
    └── superpowers/        # specs e planos
```
