/* ─── MOBILE NAV ─── */
document.addEventListener('DOMContentLoaded', function () {

  const toggle = document.getElementById('mobileToggle');
  const menu   = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('show'));
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('show');
    });
  }

  /* ─── SCROLL TO TOP ─── */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => scrollBtn.classList.toggle('show', window.scrollY > 400));
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ─── REVEAL ON SCROLL ─── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => obs.observe(el));

  /* ─── COUNTER ANIMATION ─── */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el     = e.target;
          const target = +el.dataset.target;
          let   cur    = 0;
          const step   = target / 60;
          const timer  = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(timer); }
            el.textContent = Math.floor(cur) + (target === 98 ? '%' : '+');
          }, 20);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  /* ─── SKILL BARS (portfolio page) ─── */
  const bars = document.querySelectorAll('.skill-fill');
  if (bars.length) {
    const bObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.width + '%';
          bObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => bObs.observe(b));
  }

  /* ─── CONTACT FORM ─── */
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitForm);
  }
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
  }
});

function submitForm() {
  const f   = document.getElementById('fname')   ? document.getElementById('fname').value   : '';
  const e   = document.getElementById('email')   ? document.getElementById('email').value   : '';
  const s   = document.getElementById('service') ? document.getElementById('service').value : '';
  const m   = document.getElementById('msg')     ? document.getElementById('msg').value     : '';
  const err = document.getElementById('formError');

  if (!f || !e || !s || !m) {
    if (err) err.style.display = 'block';
    return;
  }
  if (err) err.style.display = 'none';
  document.getElementById('formContent').style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
}

function resetForm() {
  ['fname', 'email', 'msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const s = document.getElementById('service');
  if (s) s.value = '';
  document.getElementById('formContent').style.display  = 'block';
  document.getElementById('formSuccess').classList.remove('show');
}
