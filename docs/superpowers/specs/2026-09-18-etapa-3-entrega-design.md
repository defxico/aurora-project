# Aurora — Landing Page B2B · Etapa 3 — Design

**Data:** 2026-09-18
**Challenge:** People First Cup — Enterprise Challenge — Etapa 3 (entrega final)
**Repositório:** https://github.com/defxico/aurora-project
**Marca:** Aurora (fictícia) — plataforma de People Analytics para público B2B

---

## 1. Contexto

A Etapa 2 já entregou uma landing page publicada e funcional: deploy online (Netlify),
formulário de lead com envio real, todas as seções refinadas na direção visual "Campo de
risco", responsividade e recursos de acessibilidade implementados e documentados
(`docs/entrega-etapa-2.md`).

A Etapa 3 é a entrega final do Enterprise Challenge. O enunciado pede a mesma landing page
"completa, polida e publicada", mais um vídeo-pitch (responsabilidade de outro integrante do
grupo, fora do escopo deste trabalho) e um PDF de entrega com formato específico.

Como a Etapa 2 já cobre a quase totalidade dos requisitos técnicos, este design não prevê
mudanças estruturais na landing page — apenas:

1. um QA de verificação (já executado nesta sessão, ver seção 3);
2. os documentos de entrega da Etapa 3 (dossiê, PDF, README).

Não faz parte deste trabalho: gravação/edição do vídeo-pitch.

## 2. Objetivos e critérios de avaliação atendidos

| Critério da Etapa 3 | Como é atendido |
| --- | --- |
| Clareza da proposta de valor B2B | Já entregue na Etapa 2 (hero, desafios, solução, calculadora de ROI) — sem mudanças |
| Qualidade do design visual e coerência com a marca | Direção "Campo de risco" já aplicada — sem mudanças |
| Organização da interface e hierarquia de informação | Já entregue — sem mudanças |
| Formulário de captação de lead | Validado nesta etapa: envio real confirmado por teste ao vivo (Netlify Forms) |
| Publicação online com acesso funcionando | Validada nesta etapa: site ao vivo, console sem erros |
| Responsividade | Confirmada por inspeção de código (breakpoints mobile-first em `css/styles.css`) |
| Recursos de acessibilidade | Estrutura confirmada (skip-link, ARIA nas abas, `aria-live`) + identificados no dossiê |
| Qualidade e argumentação do vídeo-pitch | Fora de escopo — feito por outro integrante |
| Solução disruptiva | Já entregue (sliders de risco, diagnóstico, "Pergunte à Aurora", calculadora) — sem mudanças |

## 3. QA realizado nesta etapa

QA executado ao vivo em https://aurora-people-analytics.netlify.app/ via automação de
navegador, nesta sessão:

- **Console:** sem erros JS durante carregamento e uso.
- **Skip-link:** confirmado como primeiro elemento focável do DOM (`<a class="skip-link"
  href="#conteudo">Ir para o conteúdo principal</a>`), antes do link da marca.
- **Interatividade (mouse):** sliders do modelo de risco (hero) recalculam turnover, custo
  anual e veredito em tempo real; abas "Pergunte à Aurora" trocam o painel de resposta
  corretamente ao clicar.
- **Formulário:** submissão real testada de ponta a ponta — mensagem de confirmação
  "Recebido. O time da Aurora responde em até 1 dia útil com dois horários." exibida
  inline após o envio. **Nota:** o teste gerou um lead real no painel Netlify Forms
  (nome "QA Teste Aurora") que deve ser removido antes da entrega.
- **Responsividade e `prefers-reduced-motion`:** validados por inspeção do código-fonte
  (`css/styles.css`) — breakpoints `min-width` mobile-first em todas as seções (hero,
  desafios, números, diagnóstico, "pergunte à Aurora", calculadora, formulário, rodapé) e
  um bloco global `@media (prefers-reduced-motion: reduce)` zerando durações de
  animação/transição, além de overrides específicos nos pulsos SVG e nas barras animadas.

**Limitação registrada:** a ferramenta de automação não conseguiu redimensionar a janela
nem simular teclas (Tab/setas) de forma confiável nesta sessão — não é um problema do site.
A cobertura equivalente foi obtida por inspeção de código (breakpoints, `tabindex`, atributos
ARIA no DOM) e por interação via mouse.

**Resultado:** nenhum bug encontrado. Não há correções de código a fazer antes de
documentar a entrega.

## 4. Documentos de entrega

### 4.1 `docs/entrega-etapa-3.md` (dossiê formal, base do PDF)

Reaproveita a estrutura e o conteúdo validado de `docs/entrega-etapa-2.md`, com ajustes:

1. **Integrantes** — mesma lista, já em ordem alfabética com RM (sem mudança).
2. **Contexto e proposta de valor (B2B)** — reaproveitado.
3. **Contextualização e justificativa das decisões** — reaproveitado (plataforma, stack,
   formulário, identidade visual, arquitetura de conteúdo, diferenciais), acrescido de uma
   subseção nova **"O que foi validado na Etapa 3"** com o resumo do QA da seção 3 deste
   design.
4. **Recursos de acessibilidade presentes** — mesma tabela (WCAG), já revalidada pelo QA.
5. **Link do deploy** — reaproveitado.
6. **Link do repositório** — reaproveitado.
7. **Link do vídeo-pitch** — novo campo, com placeholder
   `[link do vídeo-pitch — a inserir pelo grupo]` até o colega publicar o vídeo.
8. **Como executar localmente / estrutura de arquivos** — reaproveitado.

### 4.2 `README.md`

- Trocar as referências de "Etapa 2" por "Etapa 3" no título, na introdução e nos
  "Informações do projeto" (curso/turma/challenge/etapa).
- Atualizar "Status do projeto": mover a Etapa 2 para o histórico e descrever a Etapa 3
  como a entrega final, listando o que faz parte dela (landing page completa e publicada,
  vídeo-pitch — de responsabilidade de outro integrante) e apontando para
  `docs/entrega-etapa-3.md` / `docs/aurora-etapa-3-pdf.pdf`.
- Manter os links e arquivos da Etapa 2 no repositório (não apagar histórico).

### 4.3 PDF de entrega

- `docs/aurora-etapa-3-pdf.pdf`, gerado a partir do markdown de `entrega-etapa-3.md`,
  seguindo o mesmo padrão visual do PDF da Etapa 2.
- Só pode ser finalizado depois que o link do vídeo-pitch existir — até lá, o PDF é gerado
  com o placeholder e pode ser regenerado quando o link chegar.

## 5. Fora de escopo

- Vídeo-pitch (gravação, edição, upload) — outro integrante do grupo.
- Qualquer nova seção, funcionalidade ou mudança visual na landing page — a Etapa 2 já
  atende aos critérios técnicos e o QA desta etapa não encontrou bugs a corrigir.
- Remoção do lead de teste no painel Netlify Forms — ação manual do grupo no painel da
  Netlify, fora do repositório.
