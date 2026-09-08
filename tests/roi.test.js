'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularRoi } = require('../js/roi.js');

test('calcula saídas/ano, custo atual e economia com os defaults', () => {
  const r = calcularRoi({ colaboradores: 200, turnoverPct: 20, salarioMensal: 4000 });
  assert.equal(r.saidasAno, 40);
  assert.equal(r.custoAtual, 1440000);
  assert.equal(r.economiaAurora, 460800);
});

test('aceita override de fator de substituição e redução', () => {
  const r = calcularRoi({ colaboradores: 100, turnoverPct: 10, salarioMensal: 5000, fatorSubstituicao: 1, reducaoAurora: 0.5 });
  assert.equal(r.saidasAno, 10);
  assert.equal(r.custoAtual, 600000);
  assert.equal(r.economiaAurora, 300000);
});

test('entradas inválidas ou vazias resultam em zeros', () => {
  const r = calcularRoi({ colaboradores: 0, turnoverPct: 20, salarioMensal: 4000 });
  assert.equal(r.saidasAno, 0);
  assert.equal(r.custoAtual, 0);
  assert.equal(r.economiaAurora, 0);
  const r2 = calcularRoi({ colaboradores: NaN, turnoverPct: NaN, salarioMensal: NaN });
  assert.equal(r2.custoAtual, 0);
});

test('turnover é limitado entre 0 e 100', () => {
  const r = calcularRoi({ colaboradores: 100, turnoverPct: 150, salarioMensal: 4000 });
  assert.equal(r.saidasAno, 100);
});
