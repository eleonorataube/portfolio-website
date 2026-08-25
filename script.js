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

// Nav background — solid page-background color once the hero has been
// scrolled past, instead of the mix-blend-mode trick that only reads
// correctly over the photo.
(function () {
  var nav = document.querySelector('header.site-nav');
  var hero = document.querySelector('.hero');
  if (!nav || !hero) return;

  if (!('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        nav.classList.toggle('scrolled', !entry.isIntersecting);
      });
    },
    { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
  );

  io.observe(hero);
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
