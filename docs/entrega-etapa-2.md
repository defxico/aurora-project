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
qualificado: os campos ocultos `perfil-diagnostico` (resultado do quiz), `colaboradores` e
`economia-estimada` (calculadora de ROI) são enviados junto.

### Identidade visual
Paleta e tipografia da Etapa 1 mantidas: roxo `#534079`, teal `#238076`, magenta
`#89275E`, fundo `#0D0B14`; Plus Jakarta Sans (títulos) e Open Sans (texto). O refino
visual (Hero, Resultados, Solução) trabalhou dentro dessa identidade:

- **Hero** — backdrop "aurora" (gradiente animado em camadas, CSS puro) e card de vidro
  com três KPIs, dando presença visual à primeira dobra.
- **Resultados** — cards com anel de gradiente, mini-gráfico (sparkline) por métrica e
  nota de rodapé sobre a natureza referencial dos números.
- **Solução** — remoção de estilos inline, bloco de indicadores centralizado e os quatro
  diferenciais reorganizados em grade 2×2 com cartões.

### Arquitetura de conteúdo
Sequência: Hero → Desafios → Como funciona → Diagnóstico (quiz) → Solução →
Funcionalidades → Resultados → Calculadora de ROI → Formulário → Acessibilidade → Rodapé.
Fluxo do problema à decisão de compra, com dois momentos interativos de qualificação.

### Diferenciais ("solução disruptiva")
1. **Quiz de maturidade analítica** conectado ao lead: ao concluir o quiz, o perfil do
   respondente é exibido no formulário ("Diagnóstico do quiz: …") e enviado junto da
   solicitação de demonstração.
2. **Calculadora de ROI**: o visitante informa número de colaboradores, turnover anual e
   salário médio, e a página estima o custo anual de turnover e a economia potencial com
   a Aurora — com a fórmula exibida de forma transparente. O resultado também acompanha o
   lead.

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
| Elementos decorativos com `aria-hidden` | Diagramas SVG, card do Hero, sparklines | 1.1.1 |
| Contraste AA e informação não transmitida só por cor | Página inteira | 1.4.3, 1.4.1 |
| `label` associado, `aria-required`, `aria-invalid`, `aria-describedby` nos erros | Formulário | 3.3.1, 3.3.2, 1.3.1 |
| Respeito a `prefers-reduced-motion` (todas as animações) | Página inteira | 2.3.3 |
| Layout utilizável até 200% de zoom, sem rolagem horizontal | Página inteira | 1.4.4, 1.4.10 |

## 5. Link do deploy

`https://aurora-people-analytics.netlify.app/`  *(ajustar para a URL real após publicar na Netlify)*

## 6. Link do repositório

https://github.com/defxico/aurora-project

## 7. Como executar localmente

```bash
git clone https://github.com/defxico/aurora-project.git
cd aurora-project
npx --yes serve@14 .
# abrir http://localhost:3000
```

Testes da calculadora de ROI: `node --test tests/roi.test.js`

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
