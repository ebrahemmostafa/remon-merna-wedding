/* ===== Wedding Site Vanilla JS ===== */
(function () {
  'use strict';

  // ============= Preloader =============
  window.addEventListener('load', function () {
    setTimeout(function () {
      var pre = document.getElementById('preloader');
      if (!pre) return;
      pre.classList.add('fade');
      setTimeout(function () { pre.style.display = 'none'; }, 900);
    }, 2400);
  });

  // ============= Reveal animations =============
  function setupReveals() {
    // Hero text reveal w/ data-delay (ms)
    document.querySelectorAll('.reveal').forEach(function (el) {
      var delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(function () { el.classList.add('shown'); }, delay);
    });

    // Generic fade-in-up via IntersectionObserver
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
      document.querySelectorAll('.fade-in-up').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.fade-in-up').forEach(function (el) { el.classList.add('in-view'); });
    }
  }
  setupReveals();

  // ============= Scroll progress bar =============
  var progressEl = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    var doc = document.documentElement;
    var max = (doc.scrollHeight - window.innerHeight) || 1;
    var p = Math.max(0, Math.min(1, window.scrollY / max));
    if (progressEl) progressEl.style.transform = 'scaleX(' + p + ')';
    updateHeartMarker(p);
    updateParallax();
  }

  // ============= Heart path marker =============
  var pathEl = document.getElementById('heart-path-curve');
  var marker = document.getElementById('heart-path-marker');
  var pathLen = pathEl ? pathEl.getTotalLength() : 0;
  function updateHeartMarker(p) {
    if (!pathEl || !marker) return;
    var pt = pathEl.getPointAtLength(Math.max(0, Math.min(1, p)) * pathLen);
    var tx = (pt.x - 8);
    var ty = (pt.y - 8);
    marker.style.setProperty('--heart-tx', 'translate(' + tx + 'px, ' + ty + 'px)');
    marker.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
  }

  // ============= Parallax (hero/location bg + photo cards) =============
  function updateParallax() {
    // Background parallax
    document.querySelectorAll('[data-parallax-bg]').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = (vh - rect.top) / (vh + rect.height);
      var translateY = (progress - 0.5) * 80;
      var scale = 1 + Math.abs(progress - 0.5) * 0.1;
      el.style.transform = 'translateY(' + translateY + 'px) scale(' + scale + ')';
    });
    // Photo card parallax
    document.querySelectorAll('[data-parallax-y]').forEach(function (el) {
      var amount = parseFloat(el.dataset.parallaxY);
      var rect = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = (vh - rect.top) / (vh + rect.height); // 0..1
      var ty = (1 - progress) * amount * 0.6 - amount * 0.3;
      el.style.transform = 'translateY(' + ty + 'px)';
    });
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateScrollProgress);
  }, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();

  // ============= Floating petals =============
  (function petals() {
    var host = document.getElementById('petals');
    if (!host) return;
    var count = 14;
    var colors = ['var(--burgundy)', 'var(--rose)', 'var(--gold)'];
    for (var i = 0; i < count; i++) {
      var el = document.createElement('span');
      el.className = 'petal';
      var size = 10 + Math.random() * 18;
      el.style.left = (Math.random() * 100) + '%';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.background = colors[i % colors.length];
      el.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
      el.style.animationDuration = (14 + Math.random() * 16) + 's';
      el.style.animationDelay = (Math.random() * 12) + 's';
      host.appendChild(el);
    }
  })();

  // ============= Audio toggle =============
  (function audio() {
    var btn = document.getElementById('audio-toggle');
    if (!btn) return;
    var icon = document.getElementById('audio-icon');
    var label = document.getElementById('audio-label');
    var audio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-10685.mp3');
    audio.loop = true;
    audio.volume = 0;
    var playing = false;

    var playSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="var(--burgundy)"><path d="M8 5v14l11-7z"/></svg>';
    var barsSvg = '<span class="audio-bars"><span></span><span></span><span></span></span>';

    btn.addEventListener('click', function () {
      if (playing) {
        var v = audio.volume;
        var fade = setInterval(function () {
          v = Math.max(0, v - 0.05);
          audio.volume = v;
          if (v <= 0) { audio.pause(); clearInterval(fade); }
        }, 40);
        playing = false;
        icon.innerHTML = playSvg;
        label.textContent = 'music';
        btn.setAttribute('aria-label', 'Play music');
      } else {
        audio.volume = 0;
        var p = audio.play();
        if (p && typeof p.catch === 'function') p.catch(function () {});
        var v2 = 0;
        var fade2 = setInterval(function () {
          v2 = Math.min(0.45, v2 + 0.04);
          audio.volume = v2;
          if (v2 >= 0.45) clearInterval(fade2);
        }, 60);
        playing = true;
        icon.innerHTML = barsSvg;
        label.textContent = 'playing';
        btn.setAttribute('aria-label', 'Pause music');
      }
    });
  })();

  // ============= Countdown =============
  (function countdown() {
    var TARGET = new Date('2026-12-20T20:00:00').getTime();
    var nums = {
      days: document.querySelector('[data-unit="days"]'),
      hours: document.querySelector('[data-unit="hours"]'),
      minutes: document.querySelector('[data-unit="minutes"]'),
      seconds: document.querySelector('[data-unit="seconds"]')
    };
    if (!nums.days) return;
    var prev = { days: -1, hours: -1, minutes: -1, seconds: -1 };

    function pad(n) { return String(n).padStart(2, '0'); }
    function tick() {
      var ms = Math.max(0, TARGET - Date.now());
      var d = Math.floor(ms / 86400000);
      var h = Math.floor((ms / 3600000) % 24);
      var m = Math.floor((ms / 60000) % 60);
      var s = Math.floor((ms / 1000) % 60);
      var vals = { days: d, hours: h, minutes: m, seconds: s };
      Object.keys(vals).forEach(function (k) {
        if (vals[k] !== prev[k]) {
          nums[k].textContent = pad(vals[k]);
          nums[k].classList.remove('tick');
          // force reflow
          void nums[k].offsetWidth;
          nums[k].classList.add('tick');
          prev[k] = vals[k];
        }
      });
    }
    tick();
    setInterval(tick, 1000);
  })();

  // ============= Calendar (December 2026) =============
  (function calendar() {
    var grid = document.getElementById('calendar-grid');
    if (!grid) return;
    var weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    var html = '';
    weekdays.forEach(function (d) {
      html += '<div class="calendar__weekday">' + d + '</div>';
    });
    // December 1, 2026 = Tuesday => offset 2
    for (var b = 0; b < 2; b++) html += '<div></div>';
    for (var d = 1; d <= 31; d++) {
      if (d === 20) {
        html += '<div class="calendar__day calendar__day--target"><span>' + d + '</span></div>';
      } else {
        html += '<div class="calendar__day">' + d + '</div>';
      }
    }
    grid.innerHTML = html;
  })();

  // ============= Timeline =============
  (function timeline() {
    var list = document.getElementById('timeline-list');
    if (!list) return;
    var events = [
      { time: '7:30 PM', title: 'Guest Arrival', desc: 'Welcome drinks in the rose courtyard.' },
      { time: '8:00 PM', title: 'Ceremony', desc: 'Vows beneath the floral arch, under the evening sky.' },
      { time: '9:00 PM', title: 'Cocktail Hour', desc: 'Live oud, signature drinks, golden lantern light.' },
      { time: '10:00 PM', title: 'Dinner', desc: 'A long table beneath the stars.' },
      { time: '11:30 PM', title: 'First Dance', desc: 'Followed by dancing till the small hours.' },
      { time: '2:00 AM', title: 'Send-off', desc: 'Sparklers and goodbyes.' }
    ];
    var html = '';
    events.forEach(function (e) {
      html +=
        '<li class="timeline__item fade-in-up">' +
          '<div class="timeline__body">' +
            '<div class="timeline__time">' + e.time + '</div>' +
            '<h3>' + e.title + '</h3>' +
            '<p>' + e.desc + '</p>' +
          '</div>' +
        '</li>';
    });
    list.innerHTML = html;
    // Re-observe new fade-in-up nodes
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
      list.querySelectorAll('.fade-in-up').forEach(function (el) { io.observe(el); });
    } else {
      list.querySelectorAll('.fade-in-up').forEach(function (el) { el.classList.add('in-view'); });
    }
  })();

  // ============= Gallery (drag carousel) =============
  (function gallery() {
    var track = document.getElementById('gallery-track');
    var viewport = document.getElementById('gallery-viewport');
    if (!track || !viewport) return;

    var images = [
      'assets/petra.jpg',
      'assets/pyramids-kiss.jpg',
      'assets/pyramids-walk.jpg',
      'assets/sunset-hand.jpg',
      'assets/beach-dance.jpg',
      'assets/painting.jpg',
      'assets/cinema.jpg'
    ];
    var html = '';
    images.forEach(function (src, i) {
      html += '<div class="gallery__item"><img src="' + src + '" alt="Memory ' + (i + 1) + '" loading="lazy" draggable="false" /></div>';
    });
    track.innerHTML = html;

    var pos = 0;
    var startX = 0;
    var startPos = 0;
    var dragging = false;
    var maxDrag = 0;

    function recalcMax() {
      maxDrag = Math.max(0, track.scrollWidth - viewport.clientWidth);
    }
    recalcMax();
    window.addEventListener('resize', recalcMax);

    function setPos(p) {
      pos = Math.max(-maxDrag, Math.min(0, p));
      track.style.transform = 'translateX(' + pos + 'px)';
    }

    function onDown(clientX) {
      dragging = true;
      startX = clientX;
      startPos = pos;
      track.classList.add('dragging');
      viewport.classList.add('dragging');
    }
    function onMove(clientX) {
      if (!dragging) return;
      var delta = clientX - startX;
      setPos(startPos + delta);
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('dragging');
      viewport.classList.remove('dragging');
    }

    viewport.addEventListener('mousedown', function (e) { onDown(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove', function (e) { onMove(e.clientX); });
    window.addEventListener('mouseup', onUp);

    viewport.addEventListener('touchstart', function (e) { onDown(e.touches[0].clientX); }, { passive: true });
    viewport.addEventListener('touchmove', function (e) { onMove(e.touches[0].clientX); }, { passive: true });
    viewport.addEventListener('touchend', onUp);

    // Wheel to scroll horizontally
    viewport.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        setPos(pos - e.deltaX);
        e.preventDefault();
      }
    }, { passive: false });
  })();

  // ============= RSVP form =============
  (function rsvp() {
    var form = document.getElementById('rsvp-form');
    var success = document.getElementById('rsvp-success');
    var btn = document.getElementById('rsvp-submit');
    var label = document.getElementById('rsvp-submit-label');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      btn.disabled = true;
      label.innerHTML = '<span class="spinner"></span>sending';
      setTimeout(function () {
        form.style.display = 'none';
        success.hidden = false;
        // trigger transition
        requestAnimationFrame(function () { success.classList.add('show'); });
      }, 1400);
    });
  })();
})();
