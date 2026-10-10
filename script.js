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
// see the full image; arrows, arrow keys or a swipe step through the other
// photos of the same project. Escape, the close button, or a click outside
// the image closes it.
(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lbImg = document.getElementById('lightboxImg');
  var lbNum = document.getElementById('lightboxNum');
  var lbTitle = document.getElementById('lightboxTitle');
  var closeBtn = lightbox.querySelector('.lb-close');
  var prevBtn = lightbox.querySelector('.lb-prev');
  var nextBtn = lightbox.querySelector('.lb-next');
  var lastFocused = null;
  // Photos of the project the open image belongs to, and its position in them
  var group = [];
  var index = 0;

  function show(i) {
    index = (i + group.length) % group.length;
    var frame = group[index];
    lbImg.src = frame.getAttribute('data-full');
    lbImg.alt = frame.querySelector('img') ? frame.querySelector('img').alt : '';
    lbNum.textContent = group.length > 1 ? (index + 1) + ' / ' + group.length : '';
    lbTitle.textContent = frame.getAttribute('data-title') || '';
  }

  function open(frame) {
    if (!frame.getAttribute('data-full')) return;
    var project = frame.closest('.case-block');
    group = Array.prototype.slice.call(
      (project || document).querySelectorAll('.frame[data-full]')
    );
    lightbox.classList.toggle('single', group.length < 2);
    show(group.indexOf(frame));
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
  prevBtn.addEventListener('click', function () { show(index - 1); });
  nextBtn.addEventListener('click', function () { show(index + 1); });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe left/right on touch screens
  var touchX = null;
  lightbox.addEventListener('touchstart', function (e) {
    touchX = e.touches.length === 1 ? e.touches[0].clientX : null;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    if (touchX === null || group.length < 2) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) show(dx < 0 ? index + 1 : index - 1);
  });
})();
