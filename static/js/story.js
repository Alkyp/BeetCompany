/* ═══════════════════════════════════════════════════════════════
   STORY PAGE SCRIPTS
   File: static/js/story.js
   Includes: i18n translations, WhatsApp popup, back to top,
             reveal on scroll, stat counter
═══════════════════════════════════════════════════════════════ */

(function () {

  /* ─── TRANSLATIONS ─── */
  var i18n = {
    id: {
      'nav.back':           'Kembali ke Beranda',
      'hero.eyebrow':       'Kisah di Balik Setiap Tetes',
      'hero.title':         'Dari <em>Tanah</em><br>Ke Meja Makan',
      'hero.subtitle':      'Perjalanan Ketulusan',
      'hero.desc':          'Kami bukan sekadar produsen. Kami adalah penjaga tradisi, pemelihara bumi, dan mitra kesehatan jutaan keluarga Indonesia.',
      'hero.scroll':        'Gulir ke bawah',
      'origin.chapterLabel':'Asal Muasal',
      'origin.yearSub':     'Tahun Kelahiran',
      'origin.yearDesc':    '"Berawal dari sebuah kebun kecil di lereng Gunung Lawu, kami percaya bahwa alam menyimpan jawaban atas segala kebutuhan tubuh manusia."',
      'origin.heading':     'Berawal dari<br><em>Satu Kebun</em><br>Satu Keyakinan',
      'origin.body1':       'Tahun 2018, di desa kecil di kaki Gunung Lawu, seorang petani muda bernama Raden Agus melihat ladang buah bit yang diabaikan. <strong>Ia melihat potensi yang tidak dilihat orang lain</strong> — superfood yang tumbuh subur di tanah vulkanik kaya mineral, namun belum pernah diolah dengan teknologi yang tepat.',
      'origin.body2':       'Bersama sekelompok kecil petani yang percaya pada visi yang sama, ia memulai perjalanan panjang — belajar teknik cold-press, membangun standar organik, dan memastikan <strong>setiap botol membawa manfaat nyata</strong> bagi konsumen tanpa mengorbankan kesehatan bumi.',
      'origin.body3':       'Hari ini, Beet Center Indonesia hadir sebagai bukti bahwa kecintaan terhadap alam dan ketekunan dapat mengubah satu kebun kecil menjadi gerakan kesehatan yang menyentuh ratusan ribu kehidupan.',
      'tl.y2018':           '<strong>Benih Pertama.</strong> Satu hektar lahan, satu mimpi besar. Pendiri kami menanam batch perdana buah bit organik bersama petani lokal.',
      'tl.y2020':           '<strong>Panen & Produksi.</strong> Fasilitas cold-press pertama beroperasi. Produk pertama hadir di pasar dengan respons yang luar biasa.',
      'tl.y2022':           '<strong>Sertifikasi & Ekspansi.</strong> Meraih sertifikat Halal MUI dan izin BPOM. Jaringan mitra petani meluas ke 5 provinsi.',
      'tl.y2024':           '<strong>Kini.</strong> Melayani lebih dari 500+ mitra, tersedia di Shopee, dan terus berinovasi demi kesehatan Indonesia.',
      'quote.text':         'Kami tidak hanya menjual produk.<br>Kami menjual <em>kepercayaan</em> bahwa alam<br>selalu cukup untuk menyehatkan kita.',
      'quote.role':         'Pendiri & CEO, Beet Center Indonesia',
      'mission.label':      'Misi & Visi',
      'mission.heading':    'Mengapa Kami<br><em>Ada?</em>',
      'mission.body':       'Di balik setiap produk terdapat tujuan yang lebih besar dari sekadar keuntungan — sebuah komitmen untuk mengubah cara Indonesia memandang kesehatan dan alam.',
      'mission.c1.label':   'Misi',
      'mission.c1.title':   'Alam sebagai Apotek',
      'mission.c1.text':    'Menghadirkan produk berbasis tanaman lokal berkualitas tinggi yang dapat diakses oleh semua lapisan masyarakat Indonesia — dari kota besar hingga pelosok desa.',
      'mission.c2.label':   'Visi',
      'mission.c2.title':   'Indonesia Sehat 2030',
      'mission.c2.text':    'Menjadi merek superfood Indonesia yang dikenal di seluruh Asia Tenggara, sambil mempertahankan akar pada petani lokal dan ekosistem yang lestari.',
      'mission.c3.label':   'Komitmen',
      'mission.c3.title':   'Sejahtera Bersama',
      'mission.c3.text':    'Setiap pembelian berkontribusi langsung pada pendapatan petani mitra kami, program beasiswa anak petani, dan pelestarian lahan pertanian organik.',
      'process.label':      'Cara Kami Bekerja',
      'process.heading':    'Dari <em>Benih</em><br>Hingga Botol',
      'process.body':       'Setiap tahap kami kendalikan dengan teliti. Bukan karena tidak percaya, tetapi karena kami bertanggung jawab atas setiap tetes yang masuk ke tubuh Anda.',
      'process.s1.title':   'Seleksi Benih',
      'process.s1.text':    'Hanya varietas buah bit unggulan dengan kandungan betalain tertinggi yang kami pilih. Benih bersertifikat organik, bebas GMO.',
      'process.s2.title':   'Tanam & Rawat',
      'process.s2.text':    'Dibudidayakan di tanah vulkanik bebas pestisida, dengan irigasi alami dan pemupukan organik selama 90–120 hari masa tumbuh.',
      'process.s3.title':   'Panen & QC',
      'process.s3.text':    'Dipanen manual pada waktu optimal. Setiap batch melewati uji laboratorium independen untuk memastikan kemurnian dan kadar nutrisi.',
      'process.s4.title':   'Proses & Kemas',
      'process.s4.text':    'Teknologi cold-press bersuhu rendah mempertahankan enzim aktif. Dikemas dalam kemasan daur ulang, siap dikirim ke seluruh Indonesia.',
      'values.label':       'Nilai Kami',
      'values.heading':     'Prinsip yang <em>Tak Pernah</em><br>Kami Kompromikan',
      'values.v1.title':    'Organik Sejati',
      'values.v1.text':     'Tidak ada pestisida sintetis. Tidak ada pupuk kimia. Tidak ada rekayasa genetika. Hanya alam, sinar matahari, dan ketelatenan petani kami.',
      'values.v2.title':    'Berbasis Ilmu',
      'values.v2.text':     'Setiap klaim didukung riset. Kami bekerja sama dengan Universitas Gadjah Mada dan IPB untuk validasi kandungan dan manfaat produk.',
      'values.v3.title':    'Berdayakan Petani',
      'values.v3.text':     '60% margin diberikan langsung kepada petani mitra. Kami percaya kesejahteraan petani adalah fondasi produk yang benar-benar berkualitas.',
      'values.v4.title':    'Ramah Lingkungan',
      'values.v4.text':     'Kemasan 100% dapat didaur ulang. Program buyback botol kaca. Target carbon-neutral sebelum tahun 2027 untuk seluruh rantai produksi.',
      'stats.s1.label':     'Mitra Petani',
      'stats.s1.desc':      'Di 7 provinsi Indonesia',
      'stats.s2.label':     'Pelanggan Aktif',
      'stats.s2.desc':      'Di seluruh Nusantara',
      'stats.s3.label':     'Lini Produk',
      'stats.s3.desc':      'Terus berkembang',
      'stats.s4.label':     'Kepuasan Pelanggan',
      'stats.s4.desc':      'Rating rata-rata 4.8/5',
      'cta.pre':            'Bergabung Bersama Kami',
      'cta.title':          'Jadilah Bagian dari<br><em>Gerakan</em> Ini',
      'cta.sub':            'Setiap pembelian Anda bukan hanya untuk kesehatan diri sendiri — tetapi juga untuk petani, bumi, dan generasi berikutnya.',
      'cta.btnProduct':     'Lihat Produk Kami',
      'cta.btnContact':     'Hubungi Kami',
      'footer.copy':        '© 2024 Beet Center Indonesia. Semua hak dilindungi.',
      'wa.status':          'Online',
      'wa.bubble':          'Halo! 👋 Ada yang bisa kami bantu? Hubungi kami langsung via WhatsApp untuk info produk, pemesanan, atau kemitraan.',
      'wa.btnText':         'Mulai Chat WhatsApp'
    },
    en: {
      'nav.back':           'Back to Home',
      'hero.eyebrow':       'The Story Behind Every Drop',
      'hero.title':         'From <em>the Earth</em><br>to Your Table',
      'hero.subtitle':      'A Journey of Sincerity',
      'hero.desc':          'We are more than a producer. We are guardians of tradition, stewards of the earth, and wellness partners to millions of Indonesian families.',
      'hero.scroll':        'Scroll down',
      'origin.chapterLabel':'Our Origin',
      'origin.yearSub':     'Year Founded',
      'origin.yearDesc':    '"Starting from a small garden on the slopes of Mount Lawu, we believed nature holds the answer to every human body\'s needs."',
      'origin.heading':     'Started from<br><em>One Garden</em><br>One Conviction',
      'origin.body1':       'In 2018, in a small village at the foot of Mount Lawu, a young farmer named Raden Agus saw an abandoned beetroot field. <strong>He saw potential others overlooked</strong> — a superfood thriving in mineral-rich volcanic soil, yet never processed with the right technology.',
      'origin.body2':       'Together with a small group of farmers who shared his vision, he embarked on a long journey — learning cold-press techniques, building organic standards, and ensuring <strong>every bottle delivers real benefit</strong> to consumers without sacrificing the health of the earth.',
      'origin.body3':       'Today, Beet Center Indonesia stands as proof that love for nature and perseverance can turn one small garden into a wellness movement touching hundreds of thousands of lives.',
      'tl.y2018':           '<strong>First Seeds.</strong> One hectare of land, one big dream. Our founder planted the first batch of organic beetroot alongside local farmers.',
      'tl.y2020':           '<strong>Harvest & Production.</strong> The first cold-press facility went live. The first product hit the market to an overwhelming response.',
      'tl.y2022':           '<strong>Certification & Expansion.</strong> Earned Halal MUI and BPOM certification. Farmer partner network expanded to 5 provinces.',
      'tl.y2024':           '<strong>Today.</strong> Serving 500+ partners, available on Shopee, and continuously innovating for Indonesia\'s health.',
      'quote.text':         'We don\'t just sell products.<br>We sell <em>trust</em> that nature<br>is always enough to keep us healthy.',
      'quote.role':         'Founder & CEO, Beet Center Indonesia',
      'mission.label':      'Mission & Vision',
      'mission.heading':    'Why Do<br><em>We Exist?</em>',
      'mission.body':       'Behind every product lies a purpose greater than profit — a commitment to change how Indonesia views health and nature.',
      'mission.c1.label':   'Mission',
      'mission.c1.title':   'Nature as a Pharmacy',
      'mission.c1.text':    'Delivering high-quality plant-based products accessible to all Indonesians — from big cities to remote villages.',
      'mission.c2.label':   'Vision',
      'mission.c2.title':   'Healthy Indonesia 2030',
      'mission.c2.text':    'To become Indonesia\'s superfood brand recognized across Southeast Asia, while staying rooted in local farmers and a sustainable ecosystem.',
      'mission.c3.label':   'Commitment',
      'mission.c3.title':   'Prospering Together',
      'mission.c3.text':    'Every purchase directly contributes to our farmer partners\' income, farmer children scholarships, and preservation of organic farmland.',
      'process.label':      'How We Work',
      'process.heading':    'From <em>Seed</em><br>to Bottle',
      'process.body':       'We control every step meticulously. Not out of distrust, but because we are responsible for every drop that enters your body.',
      'process.s1.title':   'Seed Selection',
      'process.s1.text':    'Only premium beetroot varieties with the highest betalain content are chosen. Organically certified seeds, GMO-free.',
      'process.s2.title':   'Plant & Nurture',
      'process.s2.text':    'Cultivated in pesticide-free volcanic soil with natural irrigation and organic fertilization over 90–120 days of growth.',
      'process.s3.title':   'Harvest & QC',
      'process.s3.text':    'Hand-harvested at peak time. Every batch undergoes independent laboratory testing to ensure purity and nutrient levels.',
      'process.s4.title':   'Process & Pack',
      'process.s4.text':    'Low-temperature cold-press technology preserves active enzymes. Packed in recyclable packaging, ready to ship across Indonesia.',
      'values.label':       'Our Values',
      'values.heading':     'Principles We <em>Never</em><br>Compromise',
      'values.v1.title':    'Truly Organic',
      'values.v1.text':     'No synthetic pesticides. No chemical fertilizers. No genetic engineering. Only nature, sunlight, and the dedication of our farmers.',
      'values.v2.title':    'Science-Based',
      'values.v2.text':     'Every claim is backed by research. We collaborate with Universitas Gadjah Mada and IPB to validate product content and benefits.',
      'values.v3.title':    'Empower Farmers',
      'values.v3.text':     '60% of margin goes directly to partner farmers. We believe farmer welfare is the foundation of truly quality products.',
      'values.v4.title':    'Eco-Friendly',
      'values.v4.text':     '100% recyclable packaging. Glass bottle buyback program. Carbon-neutral target before 2027 across the entire production chain.',
      'stats.s1.label':     'Farmer Partners',
      'stats.s1.desc':      'Across 7 Indonesian provinces',
      'stats.s2.label':     'Active Customers',
      'stats.s2.desc':      'Across the archipelago',
      'stats.s3.label':     'Product Lines',
      'stats.s3.desc':      'And growing',
      'stats.s4.label':     'Customer Satisfaction',
      'stats.s4.desc':      'Average rating 4.8/5',
      'cta.pre':            'Join Us',
      'cta.title':          'Be Part of<br><em>This Movement</em>',
      'cta.sub':            'Every purchase isn\'t just for your own health — it\'s also for the farmers, the earth, and the next generation.',
      'cta.btnProduct':     'View Our Products',
      'cta.btnContact':     'Contact Us',
      'footer.copy':        '© 2024 Beet Center Indonesia. All rights reserved.',
      'wa.status':          'Online',
      'wa.bubble':          'Hello! 👋 How can we help you? Contact us directly via WhatsApp for product info, orders, or partnerships.',
      'wa.btnText':         'Start WhatsApp Chat'
    }
  };

  var currentLang = 'id';

  function applyLang(lang) {
    currentLang = lang;
    var t = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.documentElement.lang = lang;
    updateWaLink();
  }

  /* Lang buttons */
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.lang-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  /* ─── WHATSAPP ─── */
  var WA_NUMBER = '6282121217307'; /* ← GANTI dengan nomor WA bisnis kamu */
  var WA_MSG_ID = 'Halo Beet Center Indonesia, saya tertarik dengan produk Anda. Boleh minta info lebih lanjut?';
  var WA_MSG_EN = 'Hello Beet Center Indonesia, I am interested in your products. Could I get more information?';

  function updateWaLink() {
    var msg = currentLang === 'en' ? WA_MSG_EN : WA_MSG_ID;
    document.getElementById('waSendBtn').href =
      'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }
  updateWaLink();

  var fabWa     = document.getElementById('fabWa');
  var waPopup   = document.getElementById('waPopup');
  var waClose   = document.getElementById('waPopupClose');
  var popupOpen = false;

  function togglePopup() {
    popupOpen = !popupOpen;
    waPopup.classList.toggle('open', popupOpen);
  }

  fabWa.addEventListener('click', togglePopup);
  waClose.addEventListener('click', function () { popupOpen = false; waPopup.classList.remove('open'); });
  document.addEventListener('click', function (e) {
    if (popupOpen && !waPopup.contains(e.target) && e.target !== fabWa) {
      popupOpen = false; waPopup.classList.remove('open');
    }
  });

  /* Auto open popup after 5s (once) */
  setTimeout(function () {
    if (!popupOpen) { popupOpen = true; waPopup.classList.add('open'); }
  }, 5000);

  /* ─── BACK TO TOP ─── */
  var fabTop = document.getElementById('fabTop');
  window.addEventListener('scroll', function () {
    fabTop.classList.toggle('show', window.scrollY > 400);
  });
  fabTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── REVEAL on scroll ─── */
  var els = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });

  /* ─── STAT COUNTER ─── */
  var stats = document.querySelectorAll('.stat-num');
  var io2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var raw = el.textContent.replace(/[^\d]/g, '');
      if (!raw) return;
      var target = parseInt(raw, 10);
      var unit = el.querySelector('.stat-unit');
      var unitHTML = unit ? unit.outerHTML : '';
      var duration = 1600; var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        el.innerHTML = Math.floor(progress * target) + unitHTML;
        if (progress < 1) requestAnimationFrame(step);
        else el.innerHTML = target + unitHTML;
      }
      requestAnimationFrame(step);
      io2.unobserve(el);
    });
  }, { threshold: 0.5 });
  stats.forEach(function (s) { io2.observe(s); });

})();
