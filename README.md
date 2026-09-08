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

1. **Hero**
   - Apresenta a proposta central da Aurora e os principais chamados para ação.

2. **Desafios**
   - Expõe dores comuns do RH, como dados fragmentados, turnover invisível e dificuldade de comprovar ROI.

3. **Como funciona**
   - Mostra, por meio de um diagrama visual, como os dados entram na plataforma e são transformados em insights acionáveis.

4. **Diagnóstico**
   - Inclui um quiz interativo para avaliar a maturidade analítica da empresa. O
     resultado acompanha o lead enviado pelo formulário.

5. **Solução**
   - Apresenta a Aurora como plataforma integrada de People Analytics.

6. **Funcionalidades**
   - Exibe os recursos principais da solução em formato visual.

7. **Resultados**
   - Apresenta indicadores de impacto esperado.

8. **Calculadora de ROI**
   - Estima o custo anual de turnover e a economia potencial com a Aurora, com a fórmula
     exibida de forma transparente. O resultado acompanha o lead.

9. **Formulário de lead**
   - Envio real via Netlify Forms, com validação no navegador e mensagem de sucesso na
     própria página.

10. **Acessibilidade**
    - Lista os recursos de acessibilidade efetivamente aplicados na página.

11. **Rodapé**
    - Reúne links institucionais e navegação complementar.

## Identidade visual

A identidade visual da Aurora foi construída para transmitir tecnologia, confiança e visão estratégica.

A paleta utiliza tons escuros combinados com roxo, verde e magenta, criando uma estética moderna e corporativa. A escolha visual reforça a ideia de análise de dados, inteligência e transformação organizacional.

### Principais cores

- Roxo institucional: `#534079`
- Verde/teal: `#238076`
- Magenta: `#89275E`
- Fundo escuro: `#0D0B14`
- Superfície clara: `#F8F7FF`

### Tipografia

Foram utilizadas fontes do Google Fonts:

- **Plus Jakarta Sans** para títulos e elementos de destaque;
- **Open Sans** para textos corridos e conteúdos de leitura.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (vanilla)
- SVG
- Google Fonts
- Netlify (hospedagem) + Netlify Forms (captação de lead)
- Node.js apenas para rodar os testes da calculadora (`node --test`)

Não foram utilizados frameworks ou bibliotecas externas para a construção da interface principal.

## Recursos de acessibilidade

A landing page inclui uma seção dedicada (`#acessibilidade`) que identifica os recursos
aplicados. Em resumo:

- uso de HTML semântico e link de pular para o conteúdo principal;
- navegação e seções com `aria-label` / `aria-labelledby`;
- regiões `aria-live` para o quiz, a calculadora e o status do formulário;
- navegação completa por teclado (inclui quiz e calculadora com setas / Home / End);
- foco sempre visível (`:focus-visible`);
- `label` associado a cada campo, com `aria-required`, `aria-invalid` e `aria-describedby`;
- contraste validado em nível AA;
- todas as animações respeitam `prefers-reduced-motion`;
- layout utilizável até 200% de zoom, sem rolagem horizontal.

## Funcionalidades implementadas

- Navegação entre seções por âncoras;
- Menu mobile com botão hamburguer;
- Animações de entrada ao rolar a página;
- Quiz interativo de maturidade analítica, com o resultado enviado junto do lead;
- Calculadora de ROI com fórmula transparente;
- Contadores animados de indicadores;
- Formulário de captação de lead com validação no navegador e **envio real** (Netlify Forms);
- Mensagem de sucesso exibida na própria página;
- Botão flutuante de chamada para ação em dispositivos móveis;
- Layout responsivo.

## Observação sobre o formulário

Na **Etapa 2** o formulário realiza **envio real**:

- validação local no navegador (campos obrigatórios + consentimento LGPD);
- envio via **Netlify Forms** (`fetch` no padrão AJAX), sem sair da página;
- proteção anti-spam por honeypot;
- campos ocultos enviados junto do lead: `perfil-diagnostico` (resultado do quiz),
  `colaboradores` e `economia-estimada` (calculadora de ROI);
- os leads ficam disponíveis no painel da Netlify em **Forms**.

## Estrutura de arquivos

```txt
aurora-project/
├── index.html
├── 404.html
├── netlify.toml
├── robots.txt
├── sitemap.xml
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── roi.js
├── tests/
│   └── roi.test.js
├── assets/
│   ├── aurora-logo.svg
│   ├── favicon.svg
│   └── og-cover.svg
└── docs/
    ├── aurora-project.pdf
    └── entrega-etapa-2.md
```

## Como visualizar o projeto

Para visualizar a landing page localmente:

1. Baixe ou clone este repositório.
2. Rode um servidor estático na raiz: `npx --yes serve@14 .`
3. Abra `http://localhost:3000` e navegue pelas seções.

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
