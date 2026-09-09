# Proposta de nova direção visual — Aurora

> **Isto é uma proposta, não o site.** O site atual (`index.html` na raiz do projeto)
> continua intacto. Nada aqui foi aplicado ainda — é para o time aprovar a direção antes
> de refazer a "pele" da landing page.

## O que é

Um protótipo de **direção de arte** para a landing page da Aurora, no conceito
**"Aurora, a Vogue do RH"** — revista editorial aplicada a People Analytics.

- **Ver online (artifact):** https://claude.ai/code/artifact/e392f843-4d3c-4bee-bb91-d6db111210c9
  — precisa clicar em **Share** no artifact para gerar o link que as meninas conseguem abrir.
- **Ver local:** abrir `docs/proposta-visual/index.html` no navegador (arquivo único,
  sem dependência — pode mandar por e-mail/WhatsApp).
- **Ver como página pública:** publicar esta branch numa preview da Netlify.

O protótipo mostra um recorte (capa, índice, uma matéria, o spread "os números",
"dentro do modelo" e o formulário). O conteúdo é ilustrativo.

## Por que mudar

Feedback recebido: o site atual tem "cara de site gerado por plataforma" (Lovable e
similares) — fundo escuro com gradiente roxo/teal, cards de vidro, botões com gradiente,
diagramas abstratos. É o visual padrão que essas ferramentas produzem.

A proposta foge disso por um caminho oposto: **publicação editorial impressa** —
fundo claro, tipografia de revista, gráficos de verdade no lugar de decoração, o magenta
da Aurora como cor única de destaque.

## O que muda se for aprovado

| Item | Hoje | Proposta |
| --- | --- | --- |
| Fundo | Preto/roxo com gradiente | Papel claro `#FBFAF6` |
| Tipografia títulos | Plus Jakarta Sans | **Newsreader** (serifa editorial calma) + Jakarta no corpo/rótulos |
| Cor principal | Roxo `#534079` | **Magenta `#89275E`** (roxo e teal ficam só dentro de gráfico) |
| Estrutura | Hero + seções + cards | Capa de edição → índice → matérias → spread de números → formulário |
| Decoração | Constelação, blobs de brilho, contadores animados | Gráficos reais (curva de turnover, small multiples), numerais editoriais |
| Botões | Gradiente, cantos arredondados | Sólido, cantos retos |

## O que NÃO muda

- Todo o **conteúdo** e a proposta de valor (integra HRIS/folha/ATS, risco de saída,
  ROI de RH, etc.).
- As **funcionalidades**: formulário de lead (Netlify Forms), quiz de diagnóstico,
  calculadora de ROI, responsividade, acessibilidade.
- O **deploy** (Netlify) e a organização de arquivos.
- As **cores da Aurora** — continuam as mesmas, muda só qual delas lidera.

## Decisões que o time precisa bater o martelo

1. **A direção editorial "revista"** serve para a marca Aurora? (sim / não / ajustar)
2. **Newsreader** como fonte de título — ok adicionar essa serifa? (o site hoje usa só
   Jakarta + Open Sans)
3. **Magenta como cor principal** no lugar do roxo — ok?

Aprovado isso, o próximo passo é aplicar a direção no site inteiro (todas as seções da
Sprint 1 + calculadora + quiz), substituindo o `index.html` atual.
