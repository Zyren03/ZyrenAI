(()=>{'use strict';
const body=document.body;
const bar=document.createElement('div');bar.className='v11-scroll';bar.setAttribute('aria-hidden','true');document.body.append(bar);
const grain=document.createElement('div');grain.className='v11-grain';grain.setAttribute('aria-hidden','true');document.body.prepend(grain);
const pages=[['index.html','⌂','Accueil'],['eva.html','◈','Eva'],['capri.html','✿','Capri'],['discord.html','⌘','Discord']];
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const nav=document.createElement('nav');nav.className='v11-floating-nav';nav.setAttribute('aria-label','Navigation rapide entre les projets');
for(const [href,icon,label] of pages){const a=document.createElement('a');a.href=href;a.title=label;a.setAttribute('aria-label','Aller à '+label);if(current===href)a.setAttribute('aria-current','page');const symbol=document.createElement('span');symbol.textContent=icon;symbol.setAttribute('aria-hidden','true');a.append(symbol,document.createTextNode(label));nav.append(a)}
document.body.append(nav);
const top=document.createElement('button');top.className='v11-top';top.type='button';top.textContent='↑';top.setAttribute('aria-label','Retour en haut de page');top.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));document.body.append(top);
let scheduled=false;function update(){scheduled=false;const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?Math.max(0,Math.min(100,scrollY/max*100)):0)+'%';top.classList.toggle('show',scrollY>450)}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
const main=document.querySelector('main');if(main&&!matchMedia('(prefers-reduced-motion: reduce)').matches)main.classList.add('v11-fade');
})();