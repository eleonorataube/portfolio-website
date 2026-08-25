// Scroll-reveal for elements marked .reveal — fades and lifts sections
// into view as the visitor scrolls. Falls back to showing everything
// immediately if IntersectionObserver isn't available.
(function () {
  var els = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  els.forEach(function (el) { io.observe(el); });
})();

// Lightbox for the "Projekti" gallery — click (or Enter/Space) a frame to
// see the full image and its caption; Escape, the close button, or a click
// outside the image closes it.
(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lbImg = document.getElementById('lightboxImg');
  var lbNum = document.getElementById('lightboxNum');
  var lbTitle = document.getElementById('lightboxTitle');
  var closeBtn = lightbox.querySelector('.lb-close');
  var lastFocused = null;

  function open(frame) {
    var full = frame.getAttribute('data-full');
    if (!full) return;
    lbImg.src = full;
    lbImg.alt = frame.querySelector('img') ? frame.querySelector('img').alt : '';
    lbNum.textContent = frame.getAttribute('data-num') || '';
    lbTitle.textContent = frame.getAttribute('data-title') || '';
    lastFocused = document.activeElement;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('#darbi .frame').forEach(function (frame) {
    frame.addEventListener('click', function () { open(frame); });
    frame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(frame);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();

// Accordion for the "Projekti" service categories (Ielūgumi, Plakāti,
// Sociālo tīklu vizuāļi) — each opens automatically as it scrolls into
// view, and can still be toggled open/closed by click.
(function () {
  var toggles = document.querySelectorAll('.category-toggle');
  if (!toggles.length) return;

  function setOpen(toggle, panel, open) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('open', open);
  }

  var pairs = [];
  toggles.forEach(function (toggle) {
    var panel = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!panel) return;
    pairs.push({ toggle: toggle, panel: panel });

    toggle.addEventListener('click', function () {
      setOpen(toggle, panel, toggle.getAttribute('aria-expanded') !== 'true');
    });
  });

  if (!('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var pair = pairs.filter(function (p) { return p.toggle === entry.target; })[0];
        if (pair) setOpen(pair.toggle, pair.panel, true);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
  );

  pairs.forEach(function (p) { io.observe(p.toggle); });
})();
