/**
 * Everest to Emirates - Refined GSAP & ScrollTrigger Motion System
 * 
 * Lightweight, GPU-friendly, SEO-safe, and fully responsive.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGSAPAnimations();
});

function initGSAPAnimations() {
  // Verify GSAP and ScrollTrigger availability
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Content remains fully visible.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // MatchMedia for responsive and reduced-motion handling
  const mm = gsap.matchMedia();

  // ----------------------------------------------------
  // 01. Accessibility: Prefers-Reduced-Motion
  // ----------------------------------------------------
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('[data-reveal], .hero-content, .hero h1, .convoke-card, .goal, .activity, .audience, .package-grid > div', {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      clearProps: 'all'
    });
  });

  // ----------------------------------------------------
  // 02. Desktop & Tablet Animations (> 768px)
  // ----------------------------------------------------
  mm.add('(min-width: 769px)', () => {

    // Hero Entrance Sequence
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    if (document.querySelector('.hero-content') || document.querySelector('.hero')) {
      heroTl
        .fromTo('.hero-image', 
          { scale: 1.05 }, 
          { scale: 1, duration: 1.4, ease: 'power2.out' }, 0
        )
        .fromTo('.hero h1', 
          { opacity: 0, y: 35 }, 
          { opacity: 1, y: 0, duration: 0.9 }, 0.15
        )
        .fromTo('.hero-pretitle, .hero-tagline', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, 0.4
        )
        .fromTo('.hero-actions, .hero-bottom', 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 0.65
        );
    }

    // Hero Restrained Parallax Background Scroll
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      gsap.to(heroImage, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Global ScrollReveal System (Up, Fade, Left, Right)
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(el => {
      const type = el.getAttribute('data-reveal') || 'up';
      const delay = parseFloat(el.getAttribute('data-delay') || '0');

      let fromVars = { opacity: 0, y: 24 };
      if (type === 'fade') fromVars = { opacity: 0, y: 0 };
      if (type === 'left') fromVars = { opacity: 0, x: -30, y: 0 };
      if (type === 'right') fromVars = { opacity: 0, x: 30, y: 0 };

      gsap.fromTo(el, fromVars, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.85,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    // Staggered Cards Reveal (Service cards, Goals, Activities, Audiences)
    const cardSections = ['.goals-grid', '.activities-grid', '.audience-grid', '.package-grid', '.gallery-grid'];
    cardSections.forEach(selector => {
      const container = document.querySelector(selector);
      if (!container) return;

      const items = container.children;
      if (items.length > 0) {
        gsap.fromTo(items, 
          { opacity: 0, y: 28 }, 
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 82%',
              once: true
            }
          }
        );
      }
    });

    // Section Headings Masked Editorial Reveal
    const headings = document.querySelectorAll('.section-intro h2, .section-intro h3');
    headings.forEach(h => {
      gsap.fromTo(h, 
        { opacity: 0, y: 25 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: h,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

  });

  // ----------------------------------------------------
  // 03. Mobile Optimization (<= 768px)
  // ----------------------------------------------------
  mm.add('(max-width: 768px)', () => {
    // Fast, responsive entrance on mobile without parallax or long cascades
    const mobileElements = document.querySelectorAll('[data-reveal], .section-intro h2, .goal, .activity, .audience, .package-grid > div');
    
    mobileElements.forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 16 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });
  });
}
