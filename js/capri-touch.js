(()=>{const targets=[document.getElementById('crSticker'),document.getElementById('crDesktop')].filter(Boolean);if(!targets.length)return;
let timer,sx=0,sy=0,fired=false;
const stop=()=>clearTimeout(timer);
targets.forEach(el=>{
el.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;sx=e.clientX;sy=e.clientY;fired=false;stop();timer=setTimeout(()=>{fired=true;if(navigator.vibrate)navigator.vibrate(20);e.target.dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,cancelable:true,clientX:sx,clientY:sy}))},550)});
el.addEventListener('pointermove',e=>{if(Math.hypot(e.clientX-sx,e.clientY-sy)>10)stop()});
['pointerup','pointercancel','pointerleave'].forEach(t=>el.addEventListener(t,stop));
el.addEventListener('click',e=>{if(fired){e.stopImmediatePropagation();e.preventDefault();fired=false}},true);
});})();