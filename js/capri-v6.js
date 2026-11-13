(()=>{'use strict';
const $=id=>document.getElementById(id), desk=$('crDesktop'),char=$('crSticker'),img=$('crSprite');if(!desk||!char)return;
const state={mode:'idle',speed:3,motion:true,persona:'Kuudere',bubble:true,walk:null,raf:0,step:0,rest:null,endTimer:null};
const asset='assets/capri/capri-';const poses=['neutral','idle-happy','idle-thinking','idle-wave_a','idle-sleepy','sit_floor-neutral'];poses.forEach(n=>{const i=new Image();i.src=asset+n+'.png'});
const label=$('crModeLabel'),say=$('crBubble');let originX=null,originY=null;
function bounds(){const r=desk.getBoundingClientRect();return {width:r.width,height:r.height,minY:55,maxY:Math.max(60,r.height-char.offsetHeight-48),maxX:Math.max(0,r.width-char.offsetWidth)}}
function xy(){const r=char.getBoundingClientRect(),d=desk.getBoundingClientRect();return {x:r.left-d.left,y:r.top-d.top}}
function place(x,y){const b=bounds();char.style.left=Math.max(0,Math.min(b.maxX,x))+'px';char.style.top=Math.max(b.minY,Math.min(b.maxY,y))+'px'}
function message(t){if(!state.bubble)return;say.hidden=false;say.textContent=t}
function mode(name){state.mode=name;label.textContent='MODE : '+name.toUpperCase();char.dataset.mode=name}
function cancel(){cancelAnimationFrame(state.raf);clearTimeout(state.rest);clearTimeout(state.endTimer);state.raf=0;state.walk=null}
function walkTo(x,y,done){cancel();if(!state.motion){place(x,y);done?.();return}const a=xy(),b=bounds();x=Math.max(0,Math.min(b.maxX,x));y=Math.max(b.minY,Math.min(b.maxY,y));const distance=Math.hypot(x-a.x,y-a.y);const duration=Math.max(450,distance/(35+state.speed*35)*1000);let start=0;mode('walking');
function tick(ts){if(!start)start=ts;const t=Math.min(1,(ts-start)/duration),e=t*t*(3-2*t);place(a.x+(x-a.x)*e,a.y+(y-a.y)*e);if(t<1){if(Math.floor(ts/230)%2===0)img.src=asset+'idle-happy.png';else img.src=asset+'neutral.png';state.raf=requestAnimationFrame(tick)}else{img.src=asset+'neutral.png';mode('idle');state.raf=0;done?.()}}state.raf=requestAnimationFrame(tick)}
function roam(){if(state.mode==='sleeping'||state.walk!=='wander')return;const b=bounds();walkTo(18+Math.random()*(b.maxX-25),b.minY+Math.random()*(b.maxY-b.minY),()=>{if(state.mode==='idle')state.rest=setTimeout(roam,1200+Math.random()*1900)})}
function toggleRoam(){const running=state.mode==='walking'||state.walk==='wander';cancel();if(running){state.walk=null;mode('idle');message('Je reste ici.')}else{state.walk='wander';message('Je pars me promener…');roam()}}
function animate(name){cancel();state.walk=null;mode(name);if(name==='sleeping'){img.src=asset+'sit_floor-neutral.png';message('Bonne nuit…');return}if(name==='dancing'){message('Une petite danse, juste pour toi. ♫');let n=0;function dance(){if(state.mode!=='dancing')return;img.src=asset+(n++%2?'idle-happy':'idle-excited')+'.png';char.style.rotate=(n%2?'-4deg':'4deg');state.rest=setTimeout(dance,340)}dance();state.endTimer=setTimeout(()=>{clearTimeout(state.rest);mode('idle');img.src=asset+'neutral.png';char.style.rotate=''},3800);return}mode('idle')}
$('crV6Wander')?.addEventListener('click',toggleRoam);$('crV6Dance')?.addEventListener('click',()=>animate('dancing'));$('crV6Sleep')?.addEventListener('click',()=>animate('sleeping'));$('crV6Reset')?.addEventListener('click',()=>{cancel();state.walk=null;mode('idle');img.src=asset+'neutral.png';char.style.rotate='';place(80,190);message('Tout est réinitialisé.');});
$('crSpeed')?.addEventListener('input',e=>{state.speed=+e.target.value;$('crSpeedValue').textContent=e.target.value});$('crMotion')?.addEventListener('change',e=>state.motion=e.target.checked);$('crBubbleToggle')?.addEventListener('change',e=>{state.bubble=e.target.checked;say.hidden=!state.bubble});$('crPersona')?.addEventListener('change',e=>{state.persona=e.target.value;message('Personnalité de démo : '+state.persona)});
// Preserve existing context menu and settings; new behavior is additive.
const wander=$('crWander');wander?.addEventListener('change',e=>{if(e.target.checked){cancel();state.walk='wander';state.rest=setTimeout(roam,100)}else{cancel();state.walk=null;mode('idle')} });
const realClose=$('crMainClose');if(realClose)realClose.addEventListener('click',()=>message('Mainframe fermé.'));
const observer=new MutationObserver(()=>{if(char.hidden){cancel();mode('hidden')}});observer.observe(char,{attributes:true,attributeFilter:['hidden']});
char.addEventListener('pointerdown',()=>{cancel();mode('dragging')},true);char.addEventListener('pointerup',()=>{if(state.mode==='dragging')mode('idle')},true);
window.addEventListener('pagehide',cancel);
})();
