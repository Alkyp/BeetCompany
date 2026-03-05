/* ============================================
   Beet Center Indonesia — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  document.documentElement.classList.add('js-loaded');

  initNavbar();
  initSlider();
  initTestiSlider();
  initGalleryTouch();
  initScrollAnimations();
  initFormSubmit();
  initSmoothScroll();

});


/* ============================================
   NAVBAR + HAMBURGER
   ============================================ */
function initNavbar() {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileNav = document.getElementById('mobileNav');

  if (!navbar || !hamburger || !mobileNav) return;

  var mobileLinks = mobileNav.querySelectorAll('.mobile-link');

  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNavLink();
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  function openNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    hamburger.classList.contains('open') ? closeNav() : openNav();
  });

  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', closeNav);
  }

  mobileNav.addEventListener('click', function (e) {
    if (e.target === mobileNav) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) closeNav();
  });
}

function updateActiveNavLink() {
  var sections    = document.querySelectorAll('section[id]');
  var navLinks    = document.querySelectorAll('.nav-links a[href^="#"]');
  var mobileLinks = document.querySelectorAll('.mobile-nav a[href^="#"]');
  var current     = '';

  for (var i = 0; i < sections.length; i++) {
    if (window.scrollY >= sections[i].offsetTop - 100) {
      current = sections[i].getAttribute('id');
    }
  }
  for (var j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove('active');
    if (navLinks[j].getAttribute('href') === '#' + current) {
      navLinks[j].classList.add('active');
    }
  }
  for (var k = 0; k < mobileLinks.length; k++) {
    mobileLinks[k].classList.remove('active');
    if (mobileLinks[k].getAttribute('href') === '#' + current) {
      mobileLinks[k].classList.add('active');
    }
  }
}


/* ============================================
   PRODUCT SLIDER
   - Selalu 1 slide per view (desktop & mobile)
   - Tidak ada auto-play, hanya on-click / swipe
   ============================================ */
function initSlider() {
  var wrap          = document.querySelector('.slider-wrap');
  var track         = document.getElementById('sliderTrack');
  var btnPrev       = document.getElementById('prevBtn');
  var btnNext       = document.getElementById('nextBtn');
  var dotsContainer = document.getElementById('sliderDots');

  if (!track || !btnPrev || !btnNext || !dotsContainer) return;

  var slides  = track.querySelectorAll('.product-slide');
  var total   = slides.length;
  var current = 0;

  /* Selalu 1 slide — lebar track = 100% wrap */
  function slideWidth() {
    return wrap ? wrap.offsetWidth : track.offsetWidth;
  }

  /* Bangun dots */
  function renderDots() {
    dotsContainer.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var btn = document.createElement('button');
      btn.className = 'dot' + (i === current ? ' active' : '');
      btn.setAttribute('aria-label', 'Produk ' + (i + 1));
      (function (idx) {
        btn.addEventListener('click', function () { goTo(idx); });
      }(i));
      dotsContainer.appendChild(btn);
    }
  }

  /* Navigasi ke index */
  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));

    track.style.transform = 'translateX(-' + (current * slideWidth()) + 'px)';

    var dots = dotsContainer.querySelectorAll('.dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === current);
    }

    btnPrev.disabled      = (current === 0);
    btnNext.disabled      = (current === total - 1);
    btnPrev.style.opacity = btnPrev.disabled ? '0.4' : '1';
    btnNext.style.opacity = btnNext.disabled ? '0.4' : '1';
  }

  btnNext.addEventListener('click', function () { goTo(current + 1); });
  btnPrev.addEventListener('click', function () { goTo(current - 1); });

  /* Touch swipe */
  var touchStartX = 0;
  var touchDeltaX = 0;

  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchDeltaX = 0;
  }, { passive: true });

  track.addEventListener('touchmove', function (e) {
    touchDeltaX = e.changedTouches[0].screenX - touchStartX;
  }, { passive: true });

  track.addEventListener('touchend', function () {
    if (Math.abs(touchDeltaX) > 50) {
      goTo(touchDeltaX < 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  /* Mouse drag */
  var isDragging = false;
  var dragStartX = 0;
  var dragDeltaX = 0;

  if (wrap) {
    wrap.addEventListener('mousedown', function (e) {
      isDragging = true;
      dragStartX = e.clientX;
      dragDeltaX = 0;
      track.style.transition = 'none';
      wrap.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      dragDeltaX = e.clientX - dragStartX;
      var base = current * slideWidth();
      track.style.transform = 'translateX(' + (-base + dragDeltaX) + 'px)';
    });

    window.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = '';
      wrap.style.cursor = '';
      var threshold = slideWidth() * 0.2;
      if      (dragDeltaX < -threshold) goTo(current + 1);
      else if (dragDeltaX >  threshold) goTo(current - 1);
      else                              goTo(current);
    });

    wrap.addEventListener('click', function (e) {
      if (Math.abs(dragDeltaX) > 5) e.preventDefault();
    });

    wrap.setAttribute('tabindex', '0');
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });
  }

  /* Recalculate posisi saat resize (lebar berubah) */
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer !== null) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      goTo(current);
      resizeTimer = null;
    }, 150);
  });

  /* Init */
  renderDots();
  goTo(0);
}


/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  var elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('visible');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  for (var j = 0; j < elements.length; j++) {
    observer.observe(elements[j]);
  }
}


/* ============================================
   FORM SUBMIT
   ============================================ */
function initFormSubmit() {
  var submitBtn = document.getElementById('submitBtn');
  var formMsg   = document.getElementById('formMsg');
  if (!submitBtn) return;

  function showMsg(type, text) {
    if (!formMsg) return;
    formMsg.className     = 'form-msg ' + type;
    formMsg.textContent   = text;
    formMsg.style.display = 'block';
  }

  submitBtn.addEventListener('click', function () {
    var nameEl    = document.getElementById('formName');
    var emailEl   = document.getElementById('formEmail');
    var messageEl = document.getElementById('formMessage');

    var name    = nameEl    ? nameEl.value.trim()    : '';
    var email   = emailEl   ? emailEl.value.trim()   : '';
    var message = messageEl ? messageEl.value.trim() : '';

    if (!name || !email || !message) {
      showMsg('error', '⚠️ Mohon lengkapi nama, email, dan pesan Anda.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('error', '⚠️ Format email tidak valid.');
      return;
    }

    var original = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim…';
    submitBtn.disabled    = true;

    window.setTimeout(function () {
      submitBtn.textContent      = '✓ Pesan Terkirim!';
      submitBtn.style.background = '#22c55e';
      submitBtn.style.color      = '#fff';
      showMsg('success', '✅ Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.');

      window.setTimeout(function () {
        submitBtn.textContent      = original;
        submitBtn.style.background = '';
        submitBtn.style.color      = '';
        submitBtn.disabled         = false;
        var ids = ['formName', 'formEmail', 'formSubject', 'formMessage'];
        for (var i = 0; i < ids.length; i++) {
          var el = document.getElementById(ids[i]);
          if (el) el.value = '';
        }
        if (formMsg) formMsg.style.display = 'none';
      }, 3500);
    }, 1400);
  });
}


/* ============================================
   TESTIMONIAL SLIDER — Infinite Loop + Auto-play
   Teknik: clone semua slide di awal & akhir,
   lalu snap tanpa animasi saat masuk zona clone.
   ============================================ */
function initTestiSlider() {
  var wrap    = document.getElementById('testiWrap');
  var track   = document.getElementById('testiTrack');
  var btnPrev = document.getElementById('testiPrev');
  var btnNext = document.getElementById('testiNext');
  var dotsEl  = document.getElementById('testiDots');

  if (!track || !btnPrev || !btnNext || !dotsEl) return;

  /* ── 1. Ambil slide asli, lalu clone ── */
  var origSlides = track.querySelectorAll('.testi-slide');
  var total      = origSlides.length; // 6

  // Clone semua slide: tempel salinan di depan & belakang
  for (var c = 0; c < total; c++) {
    var cloneFront = origSlides[c].cloneNode(true);
    var cloneBack  = origSlides[c].cloneNode(true);
    cloneFront.setAttribute('aria-hidden', 'true');
    cloneBack.setAttribute('aria-hidden', 'true');
    track.insertBefore(cloneFront, track.firstChild); // prepend (dibalik urutan, diperbaiki di bawah)
    track.appendChild(cloneBack);
  }

  // Setelah insertBefore berulang, urutan clone depan terbalik — perbaiki
  // Hapus semua yang baru ditambah di depan, lalu insert ulang dengan urutan benar
  var allNow = track.querySelectorAll('.testi-slide');
  // allNow[0..total-1] = clone depan TERBALIK, [total..2*total-1] = asli, [2*total..3*total-1] = clone belakang
  // Hapus clone depan yang terbalik, ganti dengan urutan benar
  for (var r = 0; r < total; r++) {
    track.removeChild(track.firstChild);
  }
  // Insert clone depan dengan urutan benar (origSlides[total-1] → origSlides[0] di posisi paling depan)
  for (var f = total - 1; f >= 0; f--) {
    var cf = origSlides[f].cloneNode(true);
    cf.setAttribute('aria-hidden', 'true');
    track.insertBefore(cf, track.firstChild);
  }

  /* ── 2. State ── */
  var allSlides = track.querySelectorAll('.testi-slide'); // 18 slide
  var current   = total;     // mulai dari slide asli pertama (index = total)
  var isJumping = false;
  var autoTimer = null;
  var AUTO_DELAY = 4000;     // ms antar slide

  /* ── 3. Helper ── */
  function pv() { // per-view
    if (window.innerWidth <= 580) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }
  function sw() { return wrap.offsetWidth / pv(); } // lebar 1 slide

  /* dot index = posisi dalam slide asli (0..total-1) */
  function dotIndex() { return (current - total) % total; }

  /* ── 4. Render dots (jumlah = total slide asli) ── */
  var progressBar = document.getElementById('testiProgressBar');

  function resetProgress() {
    if (!progressBar) return;
    progressBar.style.animation = 'none';
    progressBar.getBoundingClientRect(); // reflow
    progressBar.style.animation = '';
  }

  function renderDots() {
    dotsEl.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var btn = document.createElement('button');
      btn.className = 'testi-dot' + (i === dotIndex() ? ' active' : '');
      btn.setAttribute('aria-label', 'Testimoni ' + (i + 1));
      (function(idx) {
        btn.addEventListener('click', function() {
          stopAuto();
          jumpTo(total + idx);
          startAuto();
        });
      }(i));
      dotsEl.appendChild(btn);
    }
  }

  function updateDots() {
    var dots = dotsEl.querySelectorAll('.testi-dot');
    var di   = dotIndex();
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === di);
    }
  }

  /* ── 5. Gerak (dengan animasi) ── */
  function goTo(index) {
    if (isJumping) return;
    current = index;
    track.style.transition = 'transform .5s cubic-bezier(.25,.46,.45,.94)';
    track.style.transform  = 'translateX(-' + (current * sw()) + 'px)';
    updateDots();
    resetProgress();
  }

  /* Snap tanpa animasi (untuk infinite jump) */
  function jumpTo(index) {
    isJumping = true;
    current   = index;
    track.style.transition = 'none';
    track.style.transform  = 'translateX(-' + (current * sw()) + 'px)';
    // Force reflow agar browser terapkan 'none' sebelum transition diaktifkan lagi
    track.getBoundingClientRect();
    isJumping = false;
    updateDots();
  }

  /* Saat transisi selesai: cek apakah perlu snap ke zona real */
  track.addEventListener('transitionend', function() {
    // Zona clone belakang: current >= total*2
    if (current >= total * 2) {
      jumpTo(current - total);
    }
    // Zona clone depan: current < total
    if (current < total) {
      jumpTo(current + total);
    }
  });

  /* ── 6. Tombol prev/next ── */
  btnNext.addEventListener('click', function() {
    stopAuto(); goTo(current + 1); startAuto();
  });
  btnPrev.addEventListener('click', function() {
    stopAuto(); goTo(current - 1); startAuto();
  });

  /* ── 7. Auto-play ── */
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function() { goTo(current + 1); }, AUTO_DELAY);
  }
  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  /* Pause saat hover/touch */
  wrap.addEventListener('mouseenter', function() {
    stopAuto();
    if (progressBar) progressBar.style.animationPlayState = 'paused';
  });
  wrap.addEventListener('mouseleave', function() {
    startAuto();
    if (progressBar) progressBar.style.animationPlayState = 'running';
  });
  wrap.addEventListener('touchstart', stopAuto, { passive: true });
  wrap.addEventListener('touchend',   function() {
    setTimeout(startAuto, 800);
  }, { passive: true });

  /* ── 8. Touch swipe ── */
  var tStartX = 0, tDeltaX = 0;
  track.addEventListener('touchstart', function(e) {
    tStartX = e.changedTouches[0].screenX; tDeltaX = 0;
  }, { passive: true });
  track.addEventListener('touchmove', function(e) {
    tDeltaX = e.changedTouches[0].screenX - tStartX;
  }, { passive: true });
  track.addEventListener('touchend', function() {
    if (Math.abs(tDeltaX) > 50) {
      stopAuto();
      goTo(tDeltaX < 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  /* ── 9. Mouse drag ── */
  var isDragging = false, dragStartX = 0, dragDeltaX = 0;
  wrap.addEventListener('mousedown', function(e) {
    isDragging = true; dragStartX = e.clientX; dragDeltaX = 0;
    track.style.transition = 'none'; wrap.style.cursor = 'grabbing';
    stopAuto();
  });
  window.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    dragDeltaX = e.clientX - dragStartX;
    track.style.transform = 'translateX(' + (-(current * sw()) + dragDeltaX) + 'px)';
  });
  window.addEventListener('mouseup', function() {
    if (!isDragging) return;
    isDragging = false; track.style.transition = ''; wrap.style.cursor = '';
    var threshold = sw() * 0.2;
    if      (dragDeltaX < -threshold) goTo(current + 1);
    else if (dragDeltaX >  threshold) goTo(current - 1);
    else                              goTo(current);
    startAuto();
  });
  wrap.addEventListener('click', function(e) {
    if (Math.abs(dragDeltaX) > 5) e.preventDefault();
  });

  /* ── 10. Resize ── */
  var resizeTimer = null;
  window.addEventListener('resize', function() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      renderDots();
      jumpTo(current);
      resizeTimer = null;
    }, 150);
  });

  /* ── 11. Init ── */
  renderDots();
  jumpTo(total); // mulai di slide asli pertama
  startAuto();
}

function initSmoothScroll() {
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var targetPos = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  }
}

/* ============================================
   GALLERY TOUCH — overlay on tap (mobile)
   ============================================ */
function initGalleryTouch() {
  var items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (isTouch) {
    /* tidak ada hint, cukup overlay saja */
  }

  for (var j = 0; j < items.length; j++) {
    (function(item) {
      item.addEventListener('touchend', function(e) {
        var wasTapped = item.classList.contains('tapped');
        for (var k = 0; k < items.length; k++) {
          items[k].classList.remove('tapped');
        }
        if (!wasTapped) {
          item.classList.add('tapped');
          e.preventDefault();
        }
      }, { passive: false });
    }(items[j]));
  }

  document.addEventListener('touchend', function(e) {
    var inside = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].contains(e.target)) { inside = true; break; }
    }
    if (!inside) {
      for (var j = 0; j < items.length; j++) {
        items[j].classList.remove('tapped');
      }
    }
  }, { passive: true });
}