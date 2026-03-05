/**
 * TallyAero Website — GSAP Animation Orchestration
 * Hero word stagger, scroll-triggered sections, 3D tilt cards,
 * floating nav glass effect, page load coordination.
 */

(function () {
  'use strict';

  // ── Respect reduced-motion ──────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Immediately reveal all hidden elements, skip animations
    document.querySelectorAll('.gs-hidden, .gs-from-left, .gs-from-right').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // ── Register ScrollTrigger ──────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── Page Load Timeline ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Brief page fade-in
    tl.from('body', { opacity: 0, duration: 0.3 });

    // Hero content entrance
    var heroContent = document.querySelector('.blackout-hero-content');
    if (heroContent) {
      heroContent.classList.remove('gs-hidden');

      // Split headline into words for stagger (preserves inline HTML tags)
      var headline = heroContent.querySelector('h1');
      if (headline) {
        var wrapWord = function (text) {
          return '<span class="hero-word" style="display:inline-block;opacity:0;transform:translateY(12px)">' + text + '</span>';
        };

        // Walk child nodes to preserve <span> tags
        var result = '';
        headline.childNodes.forEach(function (node) {
          if (node.nodeType === 3) {
            // Text node — split into words
            var words = node.textContent.split(/(\s+)/);
            words.forEach(function (w) {
              if (w.trim()) {
                result += wrapWord(w);
              } else {
                result += w; // preserve whitespace
              }
            });
          } else {
            // Element node (e.g. <span class="accent">) — wrap entire element as one word
            result += wrapWord(node.outerHTML);
          }
        });
        headline.innerHTML = result;

        tl.to('.hero-word', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
        }, '+=0.1');
      }

      // Subtitle fade in
      var subtitle = heroContent.querySelector('.hero-subtitle');
      if (subtitle) {
        tl.from(subtitle, { opacity: 0, y: 8, duration: 0.4 }, '-=0.2');
      }

      // CTA buttons scale-in with slight bounce
      var ctaButtons = heroContent.querySelectorAll('.btn');
      if (ctaButtons.length) {
        tl.from(ctaButtons, {
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.75)',
        }, '-=0.2');
      }
    }

    // ── Scroll-triggered: Product Cards ────────────────────────────────
    var productCards = document.querySelectorAll('.blackout-card');
    productCards.forEach(function (card, i) {
      // Remove gs-hidden and set initial state via GSAP
      card.classList.remove('gs-hidden');
      gsap.set(card, { opacity: 0, y: 30 });
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: 'power2.out',
      });
    });

    // ── Scroll-triggered: Generic sections ─────────────────────────────
    document.querySelectorAll('.gs-hidden').forEach(function (el) {
      el.classList.remove('gs-hidden');
      gsap.set(el, { opacity: 0, y: 20 });
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    document.querySelectorAll('.gs-from-left').forEach(function (el) {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    document.querySelectorAll('.gs-from-right').forEach(function (el) {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    // ── 3D Tilt Cards ──────────────────────────────────────────────────
    var maxTilt = 5;
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        var rotateX = -y * maxTilt * 2;
        var rotateY = x * maxTilt * 2;

        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-2px)';

        // Move glare
        var glare = card.querySelector('.tilt-glare');
        if (glare) {
          var glareX = (x + 0.5) * 100;
          var glareY = (y + 0.5) * 100;
          glare.style.background = 'radial-gradient(circle at ' + glareX + '% ' + glareY + '%, rgba(255,255,255,0.15) 0%, transparent 60%)';
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });

    // ── Floating Nav — Glass Effect on Scroll ──────────────────────────
    var header = document.querySelector('.header, .blackout-header');
    if (header) {
      var scrollThreshold = 80;
      var lastScrollY = 0;

      function updateNavScroll() {
        var currentY = window.scrollY;
        if (currentY > scrollThreshold) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        lastScrollY = currentY;
      }

      window.addEventListener('scroll', updateNavScroll, { passive: true });
      updateNavScroll();
    }

    // ── Animated Counters on Scroll ────────────────────────────────────
    document.querySelectorAll('[data-count-to]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count-to')) || 0;
      var decimals = parseInt(el.getAttribute('data-decimals')) || 0;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';

      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        textContent: 0,
        duration: 1,
        ease: 'power2.out',
        snap: { textContent: decimals > 0 ? 1 / Math.pow(10, decimals) : 1 },
        onUpdate: function () {
          var val = parseFloat(el.textContent);
          el.textContent = prefix + (decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
        },
        onComplete: function () {
          el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
        },
      });
    });

    // ── Ecosystem Diagram — Draw Lines on Scroll ───────────────────────
    document.querySelectorAll('.eco-line').forEach(function (line) {
      gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top 80%',
          once: true,
        },
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    });

  }); // DOMContentLoaded
})();
