(()=>{
const cards=document.querySelectorAll('.project-card');
cards.forEach(card=>card.addEventListener('pointermove',e=>{
const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`);
}));
const items=document.querySelectorAll('.progress-card');
if(!('IntersectionObserver' in window)){items.forEach(el=>el.classList.add('is-visible'));return}
const obs=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
if(!isIntersecting)return;
target.classList.add('is-visible');obs.unobserve(target);
const val=target.querySelector('.progress-value');
if(!val||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const goal=Number(val.textContent.replace(/[^0-9]/g,''));if(!Number.isFinite(goal))return;
const t0=performance.now(),duration=1100;
const tick=t=>{const p=Math.min(1,(t-t0)/duration),ease=1-Math.pow(1-p,3);val.textContent=Math.round(goal*ease)+'%';if(p<1)requestAnimationFrame(tick)};
requestAnimationFrame(tick);
}),{threshold:.2});
items.forEach(el=>obs.observe(el));
})();