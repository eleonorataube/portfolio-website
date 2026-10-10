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

// "Skatīt" cursor over project images - the page's one signature detail.
// Only for a real mouse; touch screens and keyboard users keep the defaults.
(function () {
  var cursor = document.querySelector('.cursor');
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var x = -200, y = -200, cx = x, cy = y, shown = false, raf = null;

  function draw() {
    cx += (x - cx) * (still ? 1 : 0.22);
    cy += (y - cy) * (still ? 1 : 0.22);
    cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0) scale(' + (shown ? 1 : 0) + ')';
    raf = (Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3) ? requestAnimationFrame(draw) : null;
  }
  function move(e) {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(draw);
  }

  document.querySelectorAll('.strip .frame').forEach(function (frame) {
    frame.addEventListener('mouseenter', function (e) {
      if (!shown) { cx = x = e.clientX; cy = y = e.clientY; }
      shown = true;
      cursor.classList.add('on');
      draw();
    });
    frame.addEventListener('mouseleave', function () {
      shown = false;
      cursor.classList.remove('on');
      draw();
    });
  });
  document.addEventListener('mousemove', move, { passive: true });
  // Hide it while the lightbox is open
  document.addEventListener('click', function () {
    if (document.querySelector('.lightbox.open')) { shown = false; cursor.classList.remove('on'); draw(); }
  });
})();
