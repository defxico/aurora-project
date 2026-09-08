'use strict';
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

const fab = document.getElementById('fab');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) fab.classList.add('visible');
  else fab.classList.remove('visible');
}, { passive: true });

const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        a.removeAttribute('aria-current');
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page');
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObs.observe(s));

const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false');
  }));
}

const diagObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const lines = e.target.querySelectorAll('.d-line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('draw'), i * 110));
    const dots  = e.target.querySelectorAll('.d-dot:not(.show)');
    dots.forEach((d, i) => setTimeout(() => d.classList.add('show'), 380 + i * 90));
    const outs  = e.target.querySelectorAll('.d-output-group');
    outs.forEach((o, i) => setTimeout(() => o.classList.add('show'), 760 + i * 130));
    diagObs.unobserve(e.target);
  });
}, { threshold: 0.3 });
const diag = document.getElementById('diagram-wrap');
if (diag) diagObs.observe(diag);

const constellObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.c-line').forEach((l, i) => setTimeout(() => l.classList.add('draw'), i * 90));
    e.target.querySelectorAll('.c-dot:not(.show)').forEach((d, i) => setTimeout(() => d.classList.add('show'), 400 + i * 80));
    constellObs.unobserve(e.target);
  });
}, { threshold: 0.25 });
const consWrap = document.getElementById('constellation-wrap');
if (consWrap) constellObs.observe(consWrap);

const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.solucao__bar-fill').forEach(b => {
        b.style.width = (parseFloat(b.dataset.width) * 100) + '%';
        b.classList.add('animate');
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const solV = document.querySelector('.solucao__visual');
if (solV) barObs.observe(solV);

function animateCounter(el) {
  const suffix = el.dataset.suffix || '';
  const target = parseInt(el.dataset.target, 10);
  const fps = 30, steps = 1800 / (1000 / fps);
  let step = 0;
  const iv = setInterval(() => {
    step++;
    el.textContent = Math.round((1 - Math.pow(1 - step / steps, 3)) * target) + suffix;
    if (step >= steps) { el.textContent = target + suffix; clearInterval(iv); }
  }, 1000 / fps);
}
const numObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      numObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
const numGrid = document.querySelector('.numeros__grid');
if (numGrid) numObs.observe(numGrid);

const profiles = [
  { range:[4,7],  badge:'Gestão Intuitiva', bg:'rgba(137,39,94,.15)',   color:'#c0547e', title:'Sua empresa decide pela percepção', desc:'O RH ainda opera de forma reativa, sem dados estruturados. O turnover é invisível e as decisões dependem da intuição dos gestores. Aurora pode mudar isso em semanas — começando pela integração dos seus sistemas e os primeiros dashboards de liderança.' },
  { range:[8,11], badge:'Em Transição',     bg:'rgba(83,64,121,.15)',   color:'#8b72c2', title:'Você tem dados, mas chegam tarde', desc:'Existem relatórios, mas são manuais, esporádicos e lentos. Com Aurora, você automatiza o que já faz e ganha análise preditiva em tempo real — sem construir do zero.' },
  { range:[12,16],badge:'Quase lá',         bg:'rgba(35,128,118,.15)', color:'#3aad9f', title:'Sua estrutura é boa. Aurora turbina.', desc:'Você já tem uma base analítica sólida. O próximo passo é integrar predição de risco, ROI de RH automático e planos de ação guiados para levar o people analytics ao próximo nível.' },
];
let quizScore = 0, currentStep = 1;
const totalSteps = 4;

function setupQuizFocus(group) {
  const options = [...group.querySelectorAll('.quiz-option')];
  const selectedIndex = options.findIndex(opt => opt.classList.contains('selected'));
  const fallbackIndex = selectedIndex >= 0 ? selectedIndex : 0;
  options.forEach((opt, index) => {
    opt.tabIndex = index === fallbackIndex ? 0 : -1;
  });
}

function selectQuizOption(btn) {
  const group = btn.closest('.quiz-options');
  const options = [...group.querySelectorAll('.quiz-option')];
  options.forEach(option => {
    const selected = option === btn;
    option.classList.toggle('selected', selected);
    option.setAttribute('aria-checked', selected ? 'true' : 'false');
    option.tabIndex = selected ? 0 : -1;
  });
  const nextBtn = btn.closest('.quiz-step').querySelector('.quiz-next');
  if (nextBtn) { nextBtn.classList.add('enabled'); nextBtn.disabled = false; }
}

function moveQuizFocus(group, targetIndex) {
  const options = [...group.querySelectorAll('.quiz-option')];
  const nextIndex = (targetIndex + options.length) % options.length;
  options.forEach((option, index) => {
    option.tabIndex = index === nextIndex ? 0 : -1;
  });
  options[nextIndex].focus();
}

function updateProgress(step) {
  const pct = ((step - 1) / totalSteps * 100);
  const bar = document.querySelector('.quiz-progress-fill');
  const pb  = document.querySelector('.quiz-progress-bar');
  if (bar) bar.style.width = pct + '%';
  if (pb)  pb.setAttribute('aria-valuenow', pct);
}

document.querySelectorAll('.quiz-option').forEach(btn => {
  btn.tabIndex = -1;
  btn.addEventListener('click', () => selectQuizOption(btn));
  btn.addEventListener('keydown', e => {
    const group = btn.closest('.quiz-options');
    const options = [...group.querySelectorAll('.quiz-option')];
    const currentIndex = options.indexOf(btn);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      moveQuizFocus(group, currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      moveQuizFocus(group, currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      moveQuizFocus(group, 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      moveQuizFocus(group, options.length - 1);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      selectQuizOption(btn);
    }
  });
});

document.querySelectorAll('.quiz-options').forEach(setupQuizFocus);

document.querySelectorAll('.quiz-next').forEach(btn => {
  btn.addEventListener('click', () => {
    const step = btn.closest('.quiz-step');
    const sel  = step.querySelector('.quiz-option.selected');
    if (!sel) return;
    quizScore += parseInt(sel.dataset.score, 10);

    const stepNum  = parseInt(step.dataset.step, 10);
    const nextStep = document.querySelector(`.quiz-step[data-step="${stepNum + 1}"]`);

    if (nextStep) {
      step.classList.remove('active');
      nextStep.classList.add('active');
      currentStep = stepNum + 1;
      updateProgress(currentStep);
    } else {
      showResult();
    }
  });
});

function showResult() {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  const profile = profiles.find(p => quizScore >= p.range[0] && quizScore <= p.range[1]) || profiles[0];
  const result  = document.getElementById('quiz-result');
  if (!result) return;
  result.classList.add('active');
  const bar = document.querySelector('.quiz-progress-fill');
  if (bar) bar.style.width = '100%';
  result.innerHTML = `
    <div class="quiz-result__badge" style="background:${profile.bg};color:${profile.color}">${profile.badge}</div>
    <p class="quiz-result__title">${profile.title}</p>
    <p class="quiz-result__desc">${profile.desc}</p>
    <a href="#contato" class="quiz-result__cta"><span>Quero ver Aurora em ação</span><span aria-hidden="true">→</span></a>
    <br/>
    <button class="quiz-result__restart" id="quiz-restart">Refazer o diagnóstico</button>
  `;
  document.getElementById('quiz-restart')?.addEventListener('click', resetQuiz);
}

function resetQuiz() {
  quizScore = 0; currentStep = 1;
  document.querySelectorAll('.quiz-step').forEach(s => {
    s.classList.remove('active');
    s.querySelectorAll('.quiz-option').forEach(b => {
      b.classList.remove('selected');
      b.setAttribute('aria-checked','false');
      b.tabIndex = -1;
    });
    s.querySelectorAll('.quiz-next').forEach(b => { b.classList.remove('enabled'); b.disabled = true; });
    const group = s.querySelector('.quiz-options');
    if (group) setupQuizFocus(group);
  });
  const result = document.getElementById('quiz-result');
  if (result) { result.classList.remove('active'); result.innerHTML = ''; }
  document.querySelector('.quiz-step[data-step="1"]')?.classList.add('active');
  updateProgress(1);
}

const form = document.getElementById('contact-form');
if (form) {
  const formStatus = document.getElementById('form-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const required = [
      { id: 'nome',      err: 'err-nome',      check: v => v.trim().length > 1 },
      { id: 'sobrenome', err: 'err-sobrenome',  check: v => v.trim().length > 1 },
      { id: 'email',     err: 'err-email',      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'empresa',   err: 'err-empresa',    check: v => v.trim().length > 1 },
    ];
    required.forEach(({ id, err, check }) => {
      const input = document.getElementById(id);
      const errEl = document.getElementById(err);
      const ff    = input?.closest('.form-field');
      if (!input) return;
      if (check(input.value)) {
        ff?.classList.remove('error');
        errEl?.classList.remove('show');
        input.setAttribute('aria-invalid', 'false');
      } else {
        ff?.classList.add('error');
        errEl?.classList.add('show');
        input.setAttribute('aria-invalid', 'true');
        valid = false;
      }
    });
    const lgpd = document.getElementById('lgpd');
    if (!lgpd?.checked) { valid = false; lgpd?.focus(); }
    if (!valid) {
      if (formStatus) formStatus.textContent = 'Existem campos obrigatórios com erro no formulário.';
      return;
    }

    const btn = document.getElementById('form-submit');
    const neterror = document.getElementById('form-neterror');
    if (neterror) neterror.hidden = true;
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.style.display = 'none';
        document.getElementById('form-success')?.classList.add('show');
        if (formStatus) formStatus.textContent = 'Formulário enviado com sucesso.';
      })
      .catch(() => {
        if (btn) { btn.disabled = false; btn.textContent = 'Agendar demonstração'; }
        if (neterror) neterror.hidden = false;
        if (formStatus) formStatus.textContent = 'Erro de rede ao enviar o formulário.';
      });
  });
}
