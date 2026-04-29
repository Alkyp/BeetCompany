/* ═══════════════════════════════════════════════════════════════
   HERO VISUAL ANIMATIONS — DOM Injection
   File: static/js/hero_anim.js

   Cara pakai:
   Tambahkan sebelum </body> :
   <script src="{{ url_for('static', filename='js/hero_anim.js') }}"></script>
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* Jangan jalankan kalau user prefer reduced motion */
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq && mq.matches) return;

  document.addEventListener('DOMContentLoaded', function () {
    var visual = document.querySelector('.hero-visual');
    if (!visual) return;

    /* ── 1. Particles ── */
    for (var i = 0; i < 6; i++) {
      var p = document.createElement('div');
      p.className = 'hero-particle';
      visual.appendChild(p);
    }

    /* ── 2. Sparkles ── */
    for (var j = 0; j < 3; j++) {
      var s = document.createElement('div');
      s.className = 'hero-sparkle';
      visual.appendChild(s);
    }

    /* ── 3. Floating Badges ── */
    // var badges = [
    //   {
    //     cls: 'hero-badge--1',
    //     icon: '🌿',
    //     strong: '100% Organik',
    //     span: 'Tanpa Bahan Kimia'
    //   },
    //   {
    //     cls: 'hero-badge--2',
    //     icon: '🏆',
    //     strong: '500+ Mitra',
    //     span: 'Se-Indonesia'
    //   },
    //   {
    //     cls: 'hero-badge--3',
    //     icon: '⭐',
    //     strong: 'Premium Quality',
    //     span: 'Bersertifikat Halal'
    //   }
    // ];

    badges.forEach(function (b) {
      var el = document.createElement('div');
      el.className = 'hero-badge ' + b.cls;
      el.innerHTML =
        '<span class="hero-badge__icon">' + b.icon + '</span>' +
        '<div class="hero-badge__text">' +
          '<strong>' + b.strong + '</strong>' +
          '<span>' + b.span + '</span>' +
        '</div>';
      visual.appendChild(el);
    });
  });
})();
