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
