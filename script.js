const menu=document.getElementById('menu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));


// Motion layer: progressively enhanced, no external dependencies.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('.scroll-progress');
  const backTop = document.querySelector('.back-top');
  const links = [...document.querySelectorAll('#nav a[href^="#"]')];
  let ticking = false;
  function updateScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = Math.min(100, window.scrollY / max * 100) + '%';
    backTop.classList.toggle('visible', window.scrollY > 550);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
  }, {passive:true});
  window.addEventListener('resize', updateScroll, {passive:true});
  updateScroll();
  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:reduced?'instant':'smooth'}));
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        links.forEach(a => {
          const active = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('active', active);
          if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      }
    }, {rootMargin:'-22% 0px -62% 0px'});
    document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
  }
  if (reduced) return;
  const targets = document.querySelectorAll('.section-head,.project,.feature,.milestone,.journal>div,.about>div');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }, {threshold:0.09,rootMargin:'0px 0px -24px 0px'});
    targets.forEach((el,i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', (i%3)*85+'ms');
      revealObserver.observe(el);
    });
  }
  // Decorative stars: deterministic positions, minimal DOM footprint.
  const stars = document.querySelector('.ambient-stars');
  for (let i=0; i<28; i++) {
    const star=document.createElement('span'); star.className='star';
    star.style.setProperty('--x', ((i*47.37+11)%100)+'%');
    star.style.setProperty('--y', ((i*31.83+7)%100)+'%');
    star.style.setProperty('--size', (i%5===0?3:2)+'px');
    star.style.setProperty('--dur', (3+(i%6))+'s');
    star.style.setProperty('--delay', (-i*.43)+'s');
    stars.appendChild(star);
  }
  // Pointer glow on cards. Does not interfere with clicks or touch.
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.project,.feature,.journal>div').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect=card.getBoundingClientRect();
        card.style.setProperty('--mx',(event.clientX-rect.left)+'px');
        card.style.setProperty('--my',(event.clientY-rect.top)+'px');
      }, {passive:true});
    });
  }
})();
