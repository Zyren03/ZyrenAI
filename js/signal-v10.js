(()=>{const panel=document.getElementById('zy-signal-panel');if(!panel)return;
const visual=panel.querySelector('.zy-signal-visual'),label=document.getElementById('zy-signal-state'),cap=document.getElementById('zy-signal-caption');
const steps=[...document.querySelectorAll('.zy-step')],section=panel.closest('section');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const data=[['Eva écoute…','« Eva, ouvre Spotify. »'],['Eva analyse la demande…','Intention détectée : ouvrir une application'],['Eva répond','« Spotify est ouvert. »']];
for(let i=0;i<39;i++){const b=document.createElement('i');b.className='zy-signal-bar';const c=1-Math.abs(i-19)/19,w=Math.abs(Math.sin(i*.61)+Math.cos(i*.24))*.5;b.style.setProperty('--height',Math.round(12+c*68+w*38)+'px');b.style.setProperty('--delay',(-i*.071).toFixed(2)+'s');b.style.setProperty('--duration',(1.15+(i%7)*.15).toFixed(2)+'s');visual.append(b)}
let cur=0,timer,paused=false;
function set(n){cur=n;panel.dataset.step=n;label.textContent=data[n][0];cap.textContent=data[n][1];steps.forEach((s,i)=>{s.setAttribute('aria-pressed',String(i===n));s.classList.toggle('on',i===n)})}
function play(){clearInterval(timer);if(reduce)return;timer=setInterval(()=>{if(!paused&&!document.hidden)set((cur+1)%3)},3200)}
steps.forEach((s,i)=>s.addEventListener('click',()=>{set(i);play()}));
[section,panel].forEach(el=>{el.addEventListener('pointerenter',()=>paused=true);el.addEventListener('pointerleave',()=>paused=false);el.addEventListener('focusin',()=>paused=true);el.addEventListener('focusout',()=>paused=false)});
panel.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=panel.getBoundingClientRect();panel.style.setProperty('--cursor-x',((e.clientX-r.left)/r.width-.5)*140+'px');panel.style.setProperty('--cursor-y',((e.clientY-r.top)/r.height-.5)*80+'px')});
set(0);
if('IntersectionObserver' in window)new IntersectionObserver(([e])=>{paused=!e.isIntersecting},{threshold:.3}).observe(panel);
play();})();