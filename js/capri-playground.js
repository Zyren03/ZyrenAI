
(()=>{
'use strict';
const area=document.getElementById('capriPlayground');if(!area)return;
const char=document.getElementById('cpCharacter'),sprite=document.getElementById('cpSprite'),bubble=document.getElementById('cpDialog'),windowEl=document.getElementById('cpWindow'),title=document.getElementById('cpWindowTitle'),content=document.getElementById('cpWindowContent');
const root='assets/capri/capri-';
const scenes={
 wave:{frames:['idle-wave_raise','idle-wave_a','idle-wave_b','idle-happy'],say:'Oh. Salut, Zyren. Tu voulais me voir ?'},
 happy:{frames:['idle-happy','idle-heart_hands','idle-wink_closed'],say:'Tu me fais sourire. Mais je ne l’admettrai pas deux fois. ♡'},
 think:{frames:['idle-thinking','idle-focused','idle-attentive'],say:'Hmm… laisse-moi réfléchir une seconde.'},
 annoyed:{frames:['arms_crossed-annoyed','idle-annoyed','idle-smirk'],say:'Tss. Tu me taquines encore ?'},
 dance:{frames:['idle-excited','idle-happy','idle-excited','idle-happy','idle-excited'],say:'Bon… juste une petite danse. ♫'},
 sleep:{frames:['idle-sleepy','sit_floor-neutral'],say:'Cinq minutes de repos… pas plus. ☾'},
 sit:{frames:['sit_floor-neutral','idle-sleepy'],say:'Je m’installe ici. C’est confortable.'},
 random:{frames:['idle-surprised','idle-embarrassed','idle-happy'],say:'Hé ! Je ne m’attendais pas à ça.'}
};
const available=new Set([...Object.values(scenes).flatMap(s=>s.frames),'neutral','idle-blink_closed','idle-blink_half']);
available.forEach(n=>{const i=new Image();i.src=root+n+'.png'});
let timers=[],busy=false,drag=null,moved=false,blinkId=0;
const later=(f,ms)=>{const t=setTimeout(f,ms);timers.push(t);return t};
function clear(){timers.forEach(clearTimeout);timers=[];clearTimeout(blinkId)}
function pose(name){sprite.src=root+name+'.png'}
function say(message){bubble.textContent=message;bubble.classList.remove('cp-pop');void bubble.offsetWidth;bubble.classList.add('cp-pop')}
function scheduleBlink(){clearTimeout(blinkId);blinkId=setTimeout(()=>{if(!busy&&!drag){pose('idle-blink_closed');later(()=>pose('neutral'),160)}scheduleBlink()},4200+Math.random()*5500)}
function act(key){const scene=scenes[key];if(!scene)return;clear();busy=true;say(scene.say);
 scene.frames.forEach((name,i)=>later(()=>pose(name),i*410));
 later(()=>{busy=false;pose('neutral');scheduleBlink()},Math.max(2500,scene.frames.length*410+800));
}
document.querySelectorAll('[data-cp-action]').forEach(b=>b.addEventListener('click',()=>act(b.dataset.cpAction)));
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}
char.addEventListener('pointerdown',e=>{if(e.button!==0)return;const r=char.getBoundingClientRect(),a=area.getBoundingClientRect();drag={dx:e.clientX-r.left,dy:e.clientY-r.top,startX:e.clientX,startY:e.clientY,ar:a};moved=false;char.setPointerCapture(e.pointerId);char.classList.add('dragging')});
char.addEventListener('pointermove',e=>{if(!drag)return;const a=area.getBoundingClientRect();const x=clamp(e.clientX-a.left-drag.dx,8,a.width-char.offsetWidth-8),y=clamp(e.clientY-a.top-drag.dy,55,a.height-char.offsetHeight-44);char.style.transform='none';char.style.left=x+'px';char.style.top=y+'px';char.style.bottom='auto';if(Math.abs(e.clientX-drag.startX)+Math.abs(e.clientY-drag.startY)>8)moved=true});
char.addEventListener('pointerup',()=>{if(!drag)return;char.classList.remove('dragging');drag=null;if(moved){say('Je peux aller où tu veux sur ce bureau.');}else act('wave')});
char.addEventListener('pointercancel',()=>{drag=null;char.classList.remove('dragging')});
char.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();act('wave')}});
const apps={
 music:{title:'♫ Capri Music',html:'<div class="cp-app-music"><span>♫</span><div><b>Midnight Drive</b><small>Playlist de démonstration</small></div><div class="cp-eq"><i></i><i></i><i></i><i></i></div></div><p>Capri réagit à la musique dans cette simulation.</p>',say:'Une chanson ? Je pourrais presque danser.'},
 notes:{title:'▤ Capri Notes',html:'<div class="cp-note-card"><b>Notes de Capri</b><p>♡ Prendre soin de Zyren<br>✧ Garder une humeur kuudere<br>♫ Écouter de la musique<br>☾ Faire une petite sieste</p></div>',say:'Ne lis pas toutes mes notes, d’accord ?'},
 brain:{title:'◈ Capri Mainframe — aperçu',html:'<div class="cp-brain"><div><small>PERSONNALITÉ</small><b>KUUDERE</b></div><div><small>MODE</small><b>COMPANION</b></div><div><small>MODÈLE</small><b>LOCAL / DÉMO</b></div><div><small>ÉTAT</small><b>PRÊTE ✦</b></div></div><p>Interface fictive : aucun modèle IA n’est exécuté ici.</p>',say:'Tout est sous contrôle… enfin, presque.'}
};
document.querySelectorAll('[data-cp-app]').forEach(b=>b.addEventListener('click',()=>{const app=apps[b.dataset.cpApp];if(!app)return;title.textContent=app.title;content.innerHTML=app.html;windowEl.hidden=false;say(app.say);if(b.dataset.cpApp==='music')act('dance')}));
document.getElementById('cpCloseWindow').addEventListener('click',()=>windowEl.hidden=true);
document.getElementById('cpReset').addEventListener('click',()=>{clear();busy=false;pose('neutral');char.style.transform='translateX(-50%)';char.style.left='50%';char.style.top='';char.style.bottom='38px';windowEl.hidden=true;say('On recommence ? Je suis prête.');scheduleBlink()});
const clock=document.getElementById('cpClock');const updateClock=()=>clock.textContent=new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});updateClock();setInterval(updateClock,30000);scheduleBlink();
})();
