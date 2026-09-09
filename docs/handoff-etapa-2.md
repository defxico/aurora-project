# Aurora — Etapa 2 · Handoff para o PDF

**Para:** Amanda, Ana Rubia, Giovanna, Mariana — montagem do PDF de entrega
**De:** Francisco
**Marca:** Aurora (fictícia) — plataforma de People Analytics para público B2B
**Repositório:** https://github.com/defxico/aurora-project
**Deploy:** https://aurora-people-analytics.netlify.app/

Este documento reúne, em texto corrido, tudo que foi feito nesta etapa: **o que mudou no
código**, o **novo direcionamento visual** (cores, tipografia, espaçamento) e **o que cada
seção da página faz** — como o usuário interage e o que aquilo representa. É a matéria-prima
para o PDF; usem os trechos que fizerem sentido.

O dossiê formal, já no formato pedido pelo enunciado (integrantes, justificativas, tabela de
acessibilidade, links), está em `docs/entrega-etapa-2.md`.

---

## 1. Resumo — o que mudou da Etapa 1 para a Etapa 2

A Etapa 1 entregou uma landing page navegável, com todas as seções, identidade visual e um
**formulário só de demonstração** (sem envio real). Nesta etapa:

1. **Deploy online** — o site vai ao ar em URL pública, publicado pela Netlify a cada push
   no GitHub.
2. **Formulário de verdade** — os leads são enviados e ficam registrados no painel da
   Netlify (Netlify Forms), sem backend próprio.
3. **Reorganização do código** — o HTML, o CSS e o JavaScript foram separados em arquivos
   (`index.html`, `css/styles.css`, `js/main.js`), com a lógica da calculadora isolada e
   coberta por testes automatizados.
4. **Nova direção visual** — a página foi redesenhada. A versão anterior recebeu a crítica
   de ter "cara genérica de site gerado por plataforma"; a resposta foi uma linguagem
   própria, batizada de **"Campo de risco"** (detalhada na seção 3).
5. **Acessibilidade** — recursos implementados e verificáveis diretamente na página
   (teclado, leitor de tela, movimento reduzido).

Não faz parte desta etapa: vídeo-pitch.

---

## 2. O que foi feito — código

### 2.1 Stack e arquitetura

- **HTML5 + CSS3 + JavaScript "vanilla"** (ES2020). Sem framework, sem bundler, sem passo
  de build — o site é servido como arquivos estáticos.
- Fontes via **Google Fonts** (família **Archivo**).
- **Netlify** para hospedagem e para o formulário (Netlify Forms).
- **Node.js** apenas para rodar os testes da calculadora (`node --test`).

O JavaScript é uma única função autoexecutável (IIFE) em `js/main.js`, dividida em módulos
internos — um por instrumento da página (modelo de risco, diagnóstico, "Pergunte à Aurora",
calculadora, hexágono, menu). A única lógica de negócio isolada é o cálculo de ROI, em
`js/roi.js`, para poder ser testada sem navegador.

### 2.2 Estrutura de arquivos

```
aurora-project/
├── index.html              # a landing page (marcação + <head> com SEO/redes sociais)
├── 404.html                # página de erro na mesma identidade
├── css/
│   └── styles.css          # todo o estilo — o "design system" Campo de risco
├── js/
│   ├── main.js             # comportamento da página (um módulo por seção interativa)
│   └── roi.js              # cálculo puro de ROI (usado pela calculadora, com testes)
├── tests/
│   └── roi.test.js         # 4 testes automáticos do cálculo de ROI
├── assets/
│   ├── aurora-logo.svg     # marca "A" da Aurora, vetorizada (usada no site com o wordmark)
│   ├── aurora-logo.png     # a mesma marca "A" em raster (arquivo de origem)
│   ├── favicon.svg         # ícone da aba — a marca "A" sobre um quadrado claro
│   └── og-cover.svg        # imagem de pré-visualização ao compartilhar o link
├── netlify.toml            # configuração de publicação + cabeçalhos de cache e segurança
├── robots.txt · sitemap.xml
└── docs/
    ├── entrega-etapa-2.md      # dossiê formal (para o PDF)
    ├── handoff-etapa-2.md      # este documento
    ├── proposta-visual/        # protótipo aprovado da nova direção (referência)
    └── superpowers/            # registro das decisões de projeto (spec + plano)
```

### 2.3 Formulário de captação de lead

- Marcação padrão do **Netlify Forms**: `name="agendar-demonstracao"`, `data-netlify="true"`,
  campo oculto `form-name` e um **honeypot** (`bot-field`) contra spam.
- O envio é feito por JavaScript (`fetch` em segundo plano) — o visitante **não sai da
  página**; ao dar certo, o formulário some e aparece a mensagem "Recebido. O time da Aurora
  responde em até 1 dia útil…". Se a rede falhar, o botão volta e aparece um aviso de erro.
- Validação no navegador antes de enviar: nome e empresa com pelo menos 2 caracteres,
  e-mail em formato válido, e o **aceite da LGPD** obrigatório.
- **O lead chega qualificado**: junto com os dados de contato vão três campos ocultos
  preenchidos pela própria página —
  - `perfil-diagnostico` — o resultado do diagnóstico de maturidade;
  - `colaboradores` — o número informado na calculadora;
  - `economia-estimada` — o valor que a calculadora projetou como recuperável.
- Os leads aparecem no painel da Netlify em **Forms** e podem disparar notificação por
  e-mail.
- Limite do plano gratuito: 100 envios/mês (suficiente para uso acadêmico).

### 2.4 Calculadora de ROI (com testes)

- O cálculo fica em `js/roi.js`, numa função `calcularRoi({ colaboradores, turnoverPct,
  salarioMensal })` que devolve `{ saidasAno, custoAtual, economiaAurora }`.
- Premissas (transparentes na tela): custo de repor um colaborador ≈ **75%** da remuneração
  anual; a Aurora reduz o turnover em **32%** de referência.
- `tests/roi.test.js` tem **4 testes** que travam o comportamento do cálculo (valores
  padrão, override de premissas, entradas inválidas viram zero, turnover limitado a 100%).
  Rodar com: `node --test tests/roi.test.js`.

### 2.5 Acessibilidade implementada (verificável na página)

- HTML semântico (`header` / `main` / `section` / `nav` / `footer`), um único `h1`.
- **Skip link** "Ir para o conteúdo principal" como primeiro elemento focável.
- Todos os **sliders** são `input[type=range]` nativos — funcionam com as setas do teclado,
  têm rótulo associado e `aria-valuetext`.
- As abas de "Pergunte à Aurora" seguem o padrão ARIA completo (`role="tablist/tab/tabpanel"`,
  `aria-controls`, `aria-labelledby`) e navegam com as **setas**.
- Regiões `aria-live` nos medidores (hero, diagnóstico) e no razonete da calculadora;
  `role="alert"` na mensagem de erro do formulário — o leitor de tela anuncia as mudanças.
- Marcos de navegação com nomes distintos ("Navegação principal", "Seções", "Aurora").
- Hierarquia de títulos sem saltos de nível.
- Foco sempre visível (contorno magenta) sobre o fundo claro.
- **`prefers-reduced-motion`**: com o modo de movimento reduzido do sistema ligado, os
  pulsos das linhas param e os contadores vão direto ao valor final.
- Contraste de texto em nível **AA**; a informação nunca depende só da cor.
- Layout sem rolagem horizontal e utilizável até 200% de zoom.

### 2.6 Deploy

- `netlify.toml` define `publish = "."` (sem build) e cabeçalhos de segurança
  (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) e
  de cache para `assets/`, `css/` e `js/`.
- `404.html`, `robots.txt` e `sitemap.xml` incluídos.
- `<head>` com `description`, `canonical`, Open Graph e Twitter Card para pré-visualização
  em redes sociais e mensageiros.

---

## 3. Direção visual e design

### 3.1 Conceito — "Campo de risco"

A crítica à versão anterior foi: "parece template". A nova direção responde a isso com três
decisões:

1. **Fundo claro, tipografia pesada, layout assimétrico** — o oposto do visual escuro e
   centralizado de gerador de site.
2. **A cor da marca com intenção** — o magenta deixa de ser detalhe e vira o acento
   principal, usado com parcimônia nos pontos que importam.
3. **"A página é um instrumento"** — cada seção não é só texto: é algo que o usuário
   **opera**. Ele mexe em controles e a página responde na hora. A ideia é que o visitante
   *sinta* o que a Aurora faz antes de agendar uma conversa.

### 3.2 Paleta de cores

| Cor | Hex | Uso |
| --- | --- | --- |
| Fundo | `#F6F5F8` | fundo de quase toda a página |
| Painel | `#EDECF1` / `#E5E4EB` | seções com leve contraste (diagnóstico, formulário) |
| Linha | `#D9D8E1` | divisórias e contornos finos |
| Tinta (texto) | `#17141D` | títulos e corpo de texto; também a logo e o favicon |
| Tinta secundária | `#5C5967` | textos de apoio, legendas |
| **Magenta** | **`#A81F62`** | **acento principal** — botões, números-chave, "risco alto" |
| Magenta claro | `#D63A7A` | detalhes e realces sobre fundo magenta |
| Teal | `#12796C` | apoio — rótulos de seção, veredito "estável" |
| Roxo | `#574587` | apoio — veredito "atenção" |

A seção "Números" inverte o esquema: fundo **magenta** com texto branco, para virar o ponto
alto visual da página.

### 3.3 Tipografia

- Família única: **Archivo** (Google Fonts), pesos 400 a 800.
- Títulos em peso **800**, bem grandes e com espaçamento entre letras levemente negativo —
  dão o tom "editorial forte".
- Corpo de texto em peso 400; rótulos de seção em **700**, caixa-alta, pequenos, com
  espaçamento entre letras aumentado.
- Sem serifa, sem segunda família — a consistência tipográfica é parte da identidade.

### 3.4 Espaçamento e grid

- **Ritmo vertical uniforme**: toda seção tem o mesmo respiro em cima e embaixo, definido
  por um único valor que se adapta à largura da tela (de ~4rem em telas pequenas a ~9rem em
  telas grandes). O intervalo entre o conteúdo de uma seção e o da seguinte é sempre o
  mesmo. Exceções propositais: o topo do site (menor, por causa do menu fixo) e o rodapé
  (mais leve).
- **Margem lateral** também elástica (de ~1,25rem no celular a ~6rem no desktop).
- **Layout responsivo, mobile-first**: cada seção começa em **uma coluna** e ganha colunas
  só a partir de larguras maiores. O hexágono de funcionalidades (um gráfico grande) é
  trocado por uma **lista** em telas estreitas. O menu do topo vira um botão "Seções" com
  lista suspensa no celular.

### 3.5 Logo e favicon

- **Logo**: a marca "A" da Aurora (o triângulo em gradiente teal → magenta → roxo com o
  corte diagonal escuro), **vetorizada** a partir do arquivo original, ao lado do wordmark
  "aurora" em Archivo peso 800 — no topo à esquerda e no rodapé.
- **Favicon** (ícone da aba): a mesma marca "A" sobre um quadradinho arredondado claro.

### 3.6 Movimento

- Animações discretas e lentas: pulsos pretos percorrem as linhas em "Como funciona" e as
  arestas do hexágono em "Funcionalidades"; os números da calculadora e da seção "Números"
  sobem com uma contagem rápida.
- Tudo isso **desliga** quando o sistema operacional está em modo de movimento reduzido.

---

## 4. As seções, uma a uma

Para cada seção: **o que representa** · **como o usuário interage** · **o que acontece**.

### 4.1 Navegação (topo, fixa)

- **Representa:** acesso rápido às seções e o convite constante para agendar.
- **Interação:** no desktop, links diretos para cada seção; no celular, um botão "Seções"
  abre a lista. O link em destaque é sempre "Agendar demonstração".
- **O que acontece:** ao rolar a página, o link da seção visível fica em destaque.

### 4.2 Hero — "Campo de risco" (primeira dobra)

- **Representa:** a promessa central — "o risco de saída não avisa; a Aurora mostra ele se
  formando" — demonstrada, não afirmada.
- **Interação:** três sliders — **Engajamento**, **Carga de trabalho** e **Semanas sem 1:1**
  (reunião individual).
- **O que acontece:** a cada ajuste, um modelo recalcula na hora e o painel mostra o
  **turnover projetado (%)**, o **custo anual de turnover em reais** e um **veredito** que
  muda de cor e de texto — "estável" (teal), "atenção" (roxo) ou "risco alto" (magenta). A
  barra do medidor acompanha. É a Aurora funcionando em miniatura.

### 4.3 Desafios — "O RH decide sobre pessoas no escuro"

- **Representa:** os seis pontos cegos de quase toda operação de RH — dados fragmentados,
  turnover que só aparece tarde, engajamento medido uma vez por ano, decisões lentas, ROI
  que ninguém prova, ausência de antecipação.
- **Interação:** leitura. Seis cartões numerados.
- **O que acontece:** nada dinâmico — é o problema, exposto de forma direta, que as seções
  seguintes vão respondendo.

### 4.4 Como funciona — "Seus dados entram. Decisões saem."

- **Representa:** o pipeline da Aurora: fontes dispersas de RH → o modelo → saídas
  acionáveis.
- **Interação:** leitura, com um diagrama em três blocos (entradas · **AURORA** · saídas).
- **O que acontece:** pulsos pretos percorrem as linhas de ligação entre os blocos,
  sugerindo o fluxo contínuo de dados (param no modo de movimento reduzido).

### 4.5 Diagnóstico — "Onde a sua empresa está na curva de maturidade"

- **Representa:** um autodiagnóstico de maturidade analítica em RH.
- **Interação:** quatro sliders de espectro, cada um entre dois extremos — por exemplo
  "Como você decide sobre pessoas: da percepção do gestor ao modelo preditivo"; "Quando o
  turnover aparece no radar: do aviso prévio a semanas antes".
- **O que acontece:** o medidor e o perfil se formam **enquanto o usuário ajusta** — sem
  "próxima página", sem botão "enviar". Os perfis são **Gestão Intuitiva → Em Transição →
  Quase lá**, cada um com um diagnóstico curto. Quando os quatro eixos são tocados, aparece
  o botão "Levar o diagnóstico para a conversa", e o perfil passa a acompanhar o lead do
  formulário.

### 4.6 A plataforma — "Pergunte à Aurora"

- **Representa:** o jeito de usar a Aurora — perguntas em linguagem de RH, respostas com o
  dado **e** a próxima ação.
- **Interação:** cinco perguntas de negócio para escolher, por exemplo "Quem está em risco
  de sair em Vendas?", "Qual o ROI do programa de mentoria?", "Vamos perder alguém-chave nos
  próximos 90 dias?". Navegáveis por clique ou pelas setas do teclado.
- **O que acontece:** cada pergunta abre um cartão "Resposta da Aurora" com um **gráfico**
  (barras ou linha), o **achado** ("7 pessoas em Vendas com risco alto — 3 no time do gestor
  B"), a **próxima ação** recomendada e a linha **"fonte:"** — os dados que a Aurora cruzou
  para chegar ali (ex.: "absenteísmo + queda de NPS interno + semanas desde o último 1:1").
  Mostra que a resposta não é caixa-preta.

### 4.7 Funcionalidades — o hexágono

- **Representa:** os seis recursos centrais da plataforma, todos ligados ao mesmo modelo:
  predição de turnover, pulse surveys contínuos, mapa organizacional, ROI de RH calculado,
  planos de ação guiados, conformidade e segurança.
- **Interação:** leitura. Um hexágono com seis nós conectados a um centro ("MODELO AURORA").
- **O que acontece:** pulsos pretos lentos percorrem as arestas e os raios até o centro,
  reforçando "um só modelo alimenta tudo". Em telas estreitas, o hexágono é substituído por
  uma lista com os mesmos seis itens. Animação desligada no modo de movimento reduzido.

### 4.8 Números — "O que muda quando o dado chega antes da decisão"

- **Representa:** o impacto esperado, em três indicadores: **−32%** de turnover, **+47%** de
  engajamento acompanhado, **3×** mais rápido para decidir.
- **Interação:** leitura. É a única seção com fundo magenta — o ponto alto visual.
- **O que acontece:** os números sobem com uma contagem rápida quando a seção entra na tela.
  Uma nota deixa claro que são valores ilustrativos, não garantia contratual.

### 4.9 Calculadora — "Monte o cenário. Veja a conta se fechar."

- **Representa:** o custo do turnover na operação do próprio visitante, montado passo a
  passo.
- **Interação:** três sliders — **colaboradores**, **turnover anual (%)** e **salário
  mensal**.
- **O que acontece:** um "razonete" se monta linha a linha, com a conta à mostra:
  saídas por ano → custo de repor cada saída → **custo anual de turnover** → **recuperável
  com a Aurora** (destacado em magenta), com uma barra proporcional. Os valores animam a
  cada ajuste. O número de colaboradores e a economia estimada seguem com o lead. O botão
  "Levar esta conta para uma conversa" leva ao formulário.

### 4.10 Agendar demonstração — o formulário

- **Representa:** a conversão — 30 minutos com o time de dados da Aurora sobre um recorte
  real da operação do visitante.
- **Interação:** nome, e-mail corporativo, empresa (obrigatórios), cargo, tamanho da
  empresa, "o que você quer resolver?" e o aceite da LGPD.
- **O que acontece:** validação no navegador; ao enviar, o formulário é substituído pela
  confirmação "Recebido…". O lead chega ao painel da Netlify **com o contexto** que o
  visitante gerou nas seções anteriores (perfil do diagnóstico, nº de colaboradores,
  economia estimada).

### 4.11 Rodapé

- **Representa:** fecho institucional e navegação complementar.
- **Interação:** logo, frase de posicionamento, links para as seções e uma nota curta que
  **identifica os recursos de acessibilidade** presentes na página (exigência do
  enunciado).
- **O que acontece:** estático.

---

## 5. Como rodar localmente

```bash
git clone https://github.com/defxico/aurora-project.git
cd aurora-project
npx --yes serve .
# abrir o endereço que aparecer no terminal (ex.: http://localhost:3000)
```

Não é preciso instalar dependências — é um site estático. Abrir o `index.html` direto pelo
`file://` não funciona bem (os scripts e o formulário precisam de um servidor HTTP).

Testes da calculadora: `node --test tests/roi.test.js` (rodar o arquivo explicitamente).

---

## 6. Links

- **Repositório:** https://github.com/defxico/aurora-project
- **Deploy:** https://aurora-people-analytics.netlify.app/

## 7. Integrantes (ordem alfabética, com RM)

- Amanda Ayumi Guedes Ueno — RM573609
- Ana Rubia de Oliveira Freire — RM573171
- Francisco Caetano Bernardes — RM571399
- Giovanna Camargo Budin — RM571861
- Mariana Costa Cruz Maciel — RM570455
