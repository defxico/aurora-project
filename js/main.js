(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============ MODELO DE RISCO (hero) ============ */
  (function riskModel() {
    if (!document.getElementById("s-eng")) return;
    var eng = 58, load = 46, oto = 5;
    function risk() {
      var r = (1 - eng / 100) * 0.42 + (load / 100) * 0.34 + (oto / 16) * 0.24;
      return Math.max(0, Math.min(1, r));
    }
    var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
    function update() {
      var rk = risk();
      var turn = 10 + rk * 16;                 // 10%..26%
      var cost = 1800 * (turn / 100) * 5200 * 12 * 0.75;
      document.getElementById("r-turn").textContent = turn.toFixed(0) + "%";
      document.getElementById("r-cost").textContent = brl.format(cost);
      var fill = document.getElementById("g-fill");
      if (fill) fill.style.width = Math.min(100, turn / 30 * 100).toFixed(1) + "%";
      var vd = document.getElementById("verdict");
      if (rk < 0.33) { vd.textContent = "estável"; vd.style.color = "var(--teal)"; }
      else if (rk < 0.62) { vd.textContent = "atenção"; vd.style.color = "var(--roxo)"; }
      else { vd.textContent = "risco alto"; vd.style.color = "var(--magenta)"; }
      var le = document.getElementById("lead-eco");
      if (le) le.value = brl.format(cost * 0.32);
    }
    function bind(id, valId, setter) {
      var s = document.getElementById(id), v = document.getElementById(valId);
      s.addEventListener("input", function () {
        setter(parseInt(s.value, 10));
        v.textContent = s.value;
        update();
      });
    }
    bind("s-eng", "v-eng", function (x) { eng = x; });
    bind("s-load", "v-load", function (x) { load = x; });
    bind("s-oto", "v-oto", function (x) { oto = x; });
    update();
  })();

  /* ============ pulsos do "como funciona" ============ */
  (function flowPulses() {
    var sec = document.getElementById("como-funciona");
    var svg = document.getElementById("flow-lines");
    if (!sec || !svg) return;
    var NS = "http://www.w3.org/2000/svg";
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var DIRS = [1, -1, 1, -1];             // 1 = entra→sai, -1 = sai→entra (volta)
    var DURS = [5200, 6000, 4800, 6600];   // lento; ritmos diferentes = disparos dessincronizados

    function draw() {
      if (getComputedStyle(svg).display === "none") return;
      var core = sec.querySelector(".flow__core");
      var cols = sec.querySelectorAll(".flow__col");
      if (!core || cols.length < 2) return;
      var ins = cols[0].querySelectorAll(".flow__item");
      var outs = cols[1].querySelectorAll(".flow__item");
      if (ins.length < 4 || outs.length < 4) return;

      var sr = sec.getBoundingClientRect();
      var cr = core.getBoundingClientRect();
      var W = sr.width, Hs = sr.height;
      var cx = (cr.left - sr.left).toFixed(1), cxr = (cr.right - sr.left).toFixed(1);
      var cy = (cr.top - sr.top).toFixed(1), cb = (cr.bottom - sr.top).toFixed(1);

      svg.setAttribute("viewBox", "0 0 " + W.toFixed(1) + " " + Hs.toFixed(1));
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // cada rota percorre arestas do quadrado; juntas, formam o quadrado inteiro
      // 0: topo   1: esquerda+base   2: esquerda+topo   3: base+direita
      var edges = [
        function (y1, y2) { return "L " + cx + " " + cy + " L " + cxr + " " + cy + " "; },
        function (y1, y2) { return "L " + cx + " " + cy + " L " + cx + " " + cb + " L " + cxr + " " + cb + " "; },
        function (y1, y2) { return "L " + cx + " " + cb + " L " + cx + " " + cy + " L " + cxr + " " + cy + " "; },
        function (y1, y2) { return "L " + cx + " " + cb + " L " + cxr + " " + cb + " L " + cxr + " " + cy + " "; }
      ];
      var assign = [0, 3, 1, 2];

      for (var i = 0; i < 4; i++) {
        var y1 = ((ins[i].getBoundingClientRect().bottom - sr.top) - 1).toFixed(1);
        var y2 = ((outs[assign[i]].getBoundingClientRect().bottom - sr.top) - 1).toFixed(1);
        var d = "M -40 " + y1 + " L " + cx + " " + y1 + " " + edges[i](y1, y2)
              + "L " + cxr + " " + y2 + " L " + (W + 40).toFixed(1) + " " + y2;

        var tr = document.createElementNS(NS, "path");
        tr.setAttribute("d", d); tr.setAttribute("class", "flow__trace");
        svg.appendChild(tr);

        var pu = document.createElementNS(NS, "path");
        pu.setAttribute("d", d);
        pu.setAttribute("class", "flow__pulse");
        svg.appendChild(pu);

        if (reduced || !pu.animate) continue;
        var len = pu.getTotalLength();
        var P = 48;
        pu.style.strokeDasharray = P + " " + (len + P * 2);
        var span = len + P;
        var a = DIRS[i] > 0 ? P : -(span);
        var b = DIRS[i] > 0 ? -(span) : P;
        pu.animate(
          [
            { strokeDashoffset: a, offset: 0 },
            { strokeDashoffset: b, offset: 0.55 },
            { strokeDashoffset: b, offset: 1 }   // segura fora do caminho → intervalo entre disparos
          ],
          { duration: DURS[i], iterations: Infinity, delay: i * 900, easing: "cubic-bezier(.45,.05,.35,1)" }
        );
      }
    }

    draw();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    setTimeout(draw, 350);
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(draw, 150); });
  })();

  /* ============ pulsos do hexágono (funcionalidades) ============ */
  (function hexPulses() {
    var svg = document.getElementById("hex");
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.CSS || !CSS.supports || !CSS.supports("offset-path", "path('M0 0 L1 1')")) return;
    var NS = "http://www.w3.org/2000/svg";
    var N = [[520, 90], [693, 190], [693, 390], [520, 490], [347, 390], [347, 190]];
    var C = [520, 290];
    var segs = [];
    for (var i = 0; i < 6; i++) segs.push([N[i], N[(i + 1) % 6], "edge"]);   // arestas
    for (i = 0; i < 6; i++) segs.push([N[i], C, "spoke"]);                    // raios ao centro

    segs.forEach(function (s, k) {
      var rev = (k % 2 === 1);                       // metade vai, metade volta
      var from = rev ? s[1] : s[0];
      var to = rev ? s[0] : s[1];
      var dot = document.createElementNS(NS, "circle");
      dot.setAttribute("r", s[2] === "edge" ? 3 : 3.4);
      dot.setAttribute("class", "hex__pulse");
      dot.style.offsetPath = "path('M " + from[0] + " " + from[1] + " L " + to[0] + " " + to[1] + "')";
      dot.style.offsetRotate = "0deg";
      svg.appendChild(dot);
      var dur = 6000 + (k % 4) * 1400;               // pulsar lento, ritmos variados
      dot.animate(
        [
          { offsetDistance: "0%", opacity: 0, offset: 0 },
          { opacity: 1, offset: 0.06 },
          { opacity: 1, offset: 0.46 },
          { offsetDistance: "100%", opacity: 0, offset: 0.52 },
          { offsetDistance: "100%", opacity: 0, offset: 1 }   // intervalo entre disparos
        ],
        { duration: dur, iterations: Infinity, delay: k * 800, easing: "linear" }
      );
    });
  })();

  /* ============ small multiples ============ */
  (function plates() {
    var NS = "http://www.w3.org/2000/svg";
    function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
    var cs = getComputedStyle(document.documentElement);
    var MAG = cs.getPropertyValue("--magenta").trim(), FOG = cs.getPropertyValue("--fog2").trim();
    var sm = [
      { t: "Por área", lab: ["Eng", "Ops", "Adm", "Vendas", "CX"], v: [9, 11, 8, 19, 10], hi: 3 },
      { t: "Por tempo de casa", lab: ["<1a", "1–2", "2–4", "4–7", "7+"], v: [22, 14, 9, 7, 6], hi: 0 },
      { t: "Por faixa salarial", lab: ["F1", "F2", "F3", "F4", "F5"], v: [8, 11, 16, 9, 7], hi: 2 },
      { t: "Por gestor", lab: ["A", "B", "C", "D", "E"], v: [7, 9, 8, 6, 20], hi: 4 }
    ];
    var g = document.getElementById("plates");
    if (!g) return;
    sm.forEach(function (s) {
      var cell = document.createElement("div");
      cell.className = "plate2";
      var h = document.createElement("p"); h.className = "plate2__t"; h.textContent = s.t; cell.appendChild(h);
      var W = 200, H = 82, pad = 1, gap = 8, top = 12, mx = Math.max.apply(null, s.v);
      var bw = (W - pad * 2 - gap * (s.v.length - 1)) / s.v.length;
      var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", role: "img" });
      svg.setAttribute("aria-label", s.t + ": risco concentrado em " + s.lab[s.hi]);
      s.v.forEach(function (val, i) {
        var bh = (val / mx) * (H - 14 - top), bx = pad + i * (bw + gap);
        svg.appendChild(el("rect", { x: bx, y: H - 14 - bh, width: bw, height: bh, fill: i === s.hi ? MAG : FOG, "fill-opacity": i === s.hi ? 1 : .28 }));
        var tt = el("text", { x: bx + bw / 2, y: H - 3, fill: FOG, "font-size": 8.5, "text-anchor": "middle", "font-family": "Archivo, sans-serif" });
        tt.textContent = s.lab[i]; svg.appendChild(tt);
      });
      cell.appendChild(svg);
      g.appendChild(cell);
    });
    var cap = document.createElement("p");
    cap.className = "plates__cap";
    cap.innerHTML = 'Barra em <b>magenta</b>: onde o risco está concentrado neste trimestre. É por onde a conversa com a liderança começa.';
    g.appendChild(cap);
  })();

  /* ============ diagnóstico de maturidade (instrumento) ============ */
  (function maturity() {
    var sliders = [].slice.call(document.querySelectorAll(".mat__slider"));
    if (sliders.length < 4) return;
    var profiles = [
      { max: 40, badge: "Gestão Intuitiva", title: "Sua empresa decide pela percepção.",
        desc: "O RH opera de forma reativa, sem dados estruturados. O turnover é invisível. Aurora pode mudar isso em semanas — começando pela integração dos sistemas e os primeiros dashboards de liderança." },
      { max: 70, badge: "Em Transição", title: "Você tem dados, mas chegam tarde.",
        desc: "Existem relatórios, mas são manuais, esporádicos e lentos. Com Aurora, você automatiza o que já faz e ganha análise preditiva em tempo real — sem construir do zero." },
      { max: 101, badge: "Quase lá", title: "Sua estrutura é boa. Aurora turbina.",
        desc: "Você já tem base analítica sólida. O próximo passo é integrar predição de risco, ROI de RH automático e planos de ação guiados." }
    ];
    var fill = document.getElementById("mat-fill");
    var elBadge = document.getElementById("mat-badge");
    var elTitle = document.getElementById("mat-title");
    var elDesc = document.getElementById("mat-desc");
    var cta = document.getElementById("mat-cta");
    var touched = {};

    function poleWord(v) { return v < 34 ? "mais para a esquerda" : v > 66 ? "mais para a direita" : "no meio"; }

    function update(started) {
      var sum = 0;
      sliders.forEach(function (s) { sum += parseInt(s.value, 10); });
      var score = Math.round(sum / sliders.length);
      if (fill) fill.style.width = score + "%";

      var p = profiles.find(function (x) { return score < x.max; }) || profiles[2];
      if (started) {
        elBadge.textContent = p.badge;
        elTitle.textContent = p.title;
        elDesc.textContent = p.desc;
      }

      var done = Object.keys(touched).length >= sliders.length;
      if (done) {
        cta.hidden = false;
        var lp = document.getElementById("lead-perfil");
        var dg = document.getElementById("diag");
        var dv = document.getElementById("diag-val");
        if (lp) lp.value = p.badge;
        if (dg && dv) { dv.textContent = p.badge; dg.hidden = false; }
      }
    }

    sliders.forEach(function (s) {
      s.setAttribute("aria-valuetext", poleWord(parseInt(s.value, 10)));
      s.addEventListener("input", function () {
        touched[s.id] = true;
        s.setAttribute("aria-valuetext", poleWord(parseInt(s.value, 10)));
        update(true);
      });
    });
    update(false);
  })();

  /* ============ pergunte à Aurora ============ */
  (function ask() {
    var qs = [].slice.call(document.querySelectorAll(".ask__q"));
    var viz = document.getElementById("ask-viz");
    var find = document.getElementById("ask-find");
    var act = document.getElementById("ask-act");
    var src = document.getElementById("ask-src");
    if (!qs.length || !viz) return;
    var NS = "http://www.w3.org/2000/svg";
    var cs = getComputedStyle(document.documentElement);
    var MAG = cs.getPropertyValue("--magenta").trim();
    var TEAL = cs.getPropertyValue("--teal").trim();
    var FOG = cs.getPropertyValue("--fog2").trim();
    function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
    function tx(e, s) { e.textContent = s; return e; }

    var A = [
      { viz: { t: "bars", v: [6, 9, 7, 19, 10], hi: [3], lab: ["Eng", "Ops", "Adm", "Vendas", "CX"] },
        find: "7 pessoas em Vendas com risco alto — 3 concentradas no time do gestor B.",
        act: "Conversa de retenção com as 3 e revisão de carga no time B, ainda esta semana.",
        src: "absenteísmo + queda de NPS interno + semanas desde o último 1:1" },
      { viz: { t: "spark", v: [62, 61, 59, 56, 50, 45, 42] },
        find: "Engajamento de CX caiu 12 pontos em duas semanas, puxado por sobrecarga pós-lançamento.",
        act: "Redistribuir a fila de atendimento e congelar novas demandas por um sprint.",
        src: "pulse survey semanal + volume de tickets por pessoa" },
      { viz: { t: "fig", big: "3,4×", small: "retorno sobre o custo do programa" },
        find: "Mentorados têm 41% menos turnover no 1º ano. Retorno de R$ 1,9 mi — 3,4× o custo.",
        act: "Expandir a mentoria para Ops e CX, onde o turnover de early-career é maior.",
        src: "turnover evitado × custo de reposição − custo do programa" },
      { viz: { t: "bars", v: [4, 5, 4, 18, 17], hi: [3, 4], lab: ["P1", "P2", "P3", "chave A", "chave B"] },
        find: "Dois colaboradores-chave estão com risco alto e sem plano de sucessão.",
        act: "Iniciar plano de sucessão e revisão de pacote para os dois — agora, não no próximo ciclo.",
        src: "grafo de dependências + risco de saída + mapa de sucessão" },
      { viz: { t: "spark", v: [100, 103, 101, 98, 95, 93, 91] },
        find: "Headcount de Eng +28% em 6 meses; o throughput por pessoa caiu 9%. O onboarding está represado.",
        act: "Pausar a contratação e investir em ramp-up: pareamento e documentação dos 2 sistemas críticos.",
        src: "PRs por pessoa + tempo até a 1ª entrega + carga de code review" }
    ];

    function drawViz(spec) {
      while (viz.firstChild) viz.removeChild(viz.firstChild);
      if (spec.t === "fig") {
        var wrap = document.createElement("div");
        wrap.style.display = "flex";
        wrap.style.alignItems = "baseline";
        wrap.style.gap = ".7rem";
        var big = document.createElement("span");
        big.textContent = spec.big;
        big.style.font = "800 clamp(2.4rem,6vw,3.6rem)/1 var(--sans)";
        big.style.letterSpacing = "-.03em";
        big.style.color = "var(--magenta)";
        var small = document.createElement("span");
        small.textContent = spec.small;
        small.style.fontSize = ".8rem";
        small.style.color = "var(--fog2)";
        wrap.appendChild(big); wrap.appendChild(small);
        viz.appendChild(wrap);
        return;
      }
      var W = 320, H = 84, svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img" });
      if (spec.t === "bars") {
        var pad = 1, gap = 9, top = 12, mx = Math.max.apply(null, spec.v);
        var bw = (W - pad * 2 - gap * (spec.v.length - 1)) / spec.v.length;
        spec.v.forEach(function (val, i) {
          var bh = (val / mx) * (H - 16 - top), bx = pad + i * (bw + gap);
          var on = spec.hi.indexOf(i) >= 0;
          svg.appendChild(el("rect", { x: bx, y: H - 14 - bh, width: bw, height: bh, fill: on ? MAG : FOG, "fill-opacity": on ? 1 : .25 }));
          svg.appendChild(tx(el("text", { x: bx + bw / 2, y: H - 3, fill: FOG, "font-size": 9, "text-anchor": "middle", "font-family": "Archivo, sans-serif" }), spec.lab[i]));
        });
      } else {
        var mn = Math.min.apply(null, spec.v), mxx = Math.max.apply(null, spec.v);
        var pts = spec.v.map(function (val, i) {
          return [i / (spec.v.length - 1) * (W - 8) + 4, 8 + (H - 24) * (1 - (val - mn) / (mxx - mn || 1))];
        });
        var falling = spec.v[spec.v.length - 1] < spec.v[0];
        var col = falling ? MAG : TEAL;
        svg.appendChild(el("path", { d: pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" "), fill: "none", stroke: col, "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" }));
        svg.appendChild(el("circle", { cx: pts[pts.length - 1][0], cy: pts[pts.length - 1][1], r: 3, fill: col }));
      }
      viz.appendChild(svg);
    }

    function select(i) {
      qs.forEach(function (b, k) { b.setAttribute("aria-selected", k === i ? "true" : "false"); b.tabIndex = k === i ? 0 : -1; });
      var a = A[i];
      drawViz(a.viz);
      find.textContent = a.find;
      act.textContent = a.act;
      src.textContent = a.src;
    }

    qs.forEach(function (b, i) {
      b.addEventListener("click", function () { select(i); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var ni = (i + d + qs.length) % qs.length;
        qs[ni].focus(); select(ni);
      });
    });
    select(0);
  })();

  /* ============ calculadora (conta que se monta) ============ */
  (function calc() {
    var cf = document.getElementById("calc-form");
    if (!cf) return;
    var $c = document.getElementById("c-col"), $t = document.getElementById("c-tur"), $s = document.getElementById("c-sal");
    var vc = document.getElementById("c-col-v"), vt = document.getElementById("c-tur-v"), vs = document.getElementById("c-sal-v");
    var lSai = document.getElementById("l-saidas"), lRep = document.getElementById("l-rep"),
        lTot = document.getElementById("l-total"), lRec = document.getElementById("l-rec"),
        bar = document.getElementById("calc-bar-rec");
    var nf = new Intl.NumberFormat("pt-BR");
    var brl0 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function money(v) {
      if (v >= 1e6) return "R$ " + (v / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + " mi";
      return brl0.format(Math.round(v / 100) * 100);
    }
    function countTo(elm, target, fmt) {
      var from = elm._prev || 0;
      elm._prev = target;
      elm.textContent = fmt(target);                 // valor final já correto
      if (reduced || from === target) return;
      if (elm._raf) cancelAnimationFrame(elm._raf);
      var start = performance.now(), dur = 380;
      function step(now) {
        var p = Math.min(1, (now - start) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        elm.textContent = p < 1 ? fmt(from + (target - from) * e) : fmt(target);
        if (p < 1) elm._raf = requestAnimationFrame(step);
      }
      elm._raf = requestAnimationFrame(step);
    }

    function render() {
      var col = +$c.value, tur = +$t.value, sal = +$s.value;
      vc.textContent = nf.format(col);
      vt.textContent = tur + "%";
      vs.textContent = brl0.format(sal);

      var saidas = col * tur / 100;
      var rep = sal * 12 * 0.75;
      var total = saidas * rep;
      var rec = total * 0.32;

      countTo(lSai, saidas, function (v) { return nf.format(Math.round(v)); });
      countTo(lRep, rep, function (v) { return brl0.format(Math.round(v / 100) * 100); });
      countTo(lTot, total, money);
      countTo(lRec, rec, money);
      if (bar) bar.style.width = "32%";

      var lc = document.getElementById("lead-col"); if (lc) lc.value = String(col);
      var le = document.getElementById("lead-eco"); if (le) le.value = money(rec);
    }

    [$c, $t, $s].forEach(function (e) { e.addEventListener("input", render); });
    cf.addEventListener("submit", function (e) { e.preventDefault(); });
    render();
  })();

  /* ============ formulário (demo) ============ */
  var form = document.getElementById("lead");
  if (form) {
    var err = document.getElementById("form-err");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["f-nome", "f-empresa"].forEach(function (id) {
        var i = document.getElementById(id);
        var bad = !i.value.trim() || i.value.trim().length < 2;
        i.style.boxShadow = bad ? "inset 0 -2px 0 #C81E3A" : "";
        if (bad) ok = false;
      });
      var em = document.getElementById("f-email");
      var badEm = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value);
      em.style.boxShadow = badEm ? "inset 0 -2px 0 #C81E3A" : "";
      if (badEm) ok = false;
      if (!document.getElementById("f-lgpd").checked) ok = false;
      if (!ok) { if (err) err.hidden = false; return; }
      if (err) err.hidden = true;
      form.hidden = true;
      var done = document.getElementById("lead-done");
      done.hidden = false;
      done.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ============ nav scroll-spy ============ */
  var links = [].slice.call(document.querySelectorAll(".nav__links a[href^='#']"));
  var map = links.map(function (a) { return [a, document.querySelector(a.getAttribute("href"))]; }).filter(function (p) { return p[1]; });
  if (map.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        map.forEach(function (p) { p[0].style.color = p[1] === e.target ? "var(--fog)" : ""; });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach(function (p) { io.observe(p[1]); });
  }
})();
