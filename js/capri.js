(()=>{
const root="assets/capri/capri-";
const images=[...document.querySelectorAll("[data-capri-sprite]")];
const bubbles=[...document.querySelectorAll("[data-capri-speech]")];
const actions={
hello:{sprites:["idle-wave_raise","idle-wave_a","idle-wave_b","idle-happy"],text:"Hm… bonjour. Je suis là, tu sais."},
voice:{sprites:["idle-attentive","idle-thinking","idle-attentive"],text:"Je t'écoute. Qu'est-ce que tu veux faire ?"},
mood:{sprites:["idle-smirk","idle-happy","idle-wink_closed"],text:"Je suis de bonne humeur… ne t'y habitue pas trop."},
idle:{sprites:["idle-sleepy","neutral"],text:"Je vais rester ici un moment. Réveille-moi si besoin."},
surprise:{sprites:["idle-surprised","idle-happy"],text:"Hé ! Tu m'as surprise !"},
annoyed:{sprites:["arms_crossed-annoyed","idle-annoyed","idle-smirk"],text:"Tss… tu fais exprès de me taquiner ?"},
heart:{sprites:["idle-heart_hands","idle-happy"],text:"C'est pour toi. ♡"}
};
let frameTimer,resetTimer,blinkTimer,active=false;
new Set(["neutral",...Object.values(actions).flatMap(a=>a.sprites)]).forEach(s=>{const i=new Image();i.src=root+s+".png"});
function show(sprite){images.forEach(img=>{img.classList.add("is-changing");const p=new Image();p.onload=()=>{img.src=p.src;img.classList.remove("is-changing")};p.onerror=()=>img.classList.remove("is-changing");p.src=root+sprite+".png"})}
function stop(){clearTimeout(frameTimer);clearTimeout(resetTimer);clearTimeout(blinkTimer)}
function scheduleBlink(){clearTimeout(blinkTimer);blinkTimer=setTimeout(()=>{if(active)return;show("idle-blink_closed");frameTimer=setTimeout(()=>show("neutral"),180);scheduleBlink()},4500+Math.random()*5000)}
function react(key){const a=actions[key];if(!a)return;stop();active=true;
document.querySelectorAll("[data-capri-action]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.capriAction===key)));
bubbles.forEach(b=>{b.textContent=a.text;b.animate([{opacity:.4,transform:"translateY(6px)"},{opacity:1,transform:"translateY(0)"}],{duration:280})});
let i=0;function advance(){show(a.sprites[i++]);if(i<a.sprites.length)frameTimer=setTimeout(advance,i===1?650:420)}advance();
resetTimer=setTimeout(()=>{active=false;show("neutral");document.querySelectorAll("[data-capri-action]").forEach(b=>b.setAttribute("aria-pressed","false"));scheduleBlink()},Math.max(3400,a.sprites.length*650+650))}
document.querySelectorAll("[data-capri-action]").forEach(b=>b.addEventListener("click",()=>react(b.dataset.capriAction)));
scheduleBlink();
})();
