
(()=>{
'use strict';
const lab=document.getElementById('discordLab');if(!lab)return;
const feed=document.getElementById('dlFeed'),form=document.getElementById('dlForm'),input=document.getElementById('dlInput'),typing=document.getElementById('dlTyping'),title=document.getElementById('dlChannelTitle');
let channel='eva-bot',timers=[],history={};
const now=()=>new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
const messages={
 'eva-bot':[{who:'Eva',text:'Bienvenue dans #eva-bot ! 💜 Tape /help pour découvrir mes commandes de démonstration.',embed:null}],
 general:[{who:'Zyren',text:'Bienvenue dans le serveur fictif Zyren AI Lab !'},{who:'Eva',text:'Je suis là si tu as besoin de moi. ✦'}],
 projets:[{who:'Eva',text:'Trois univers à découvrir : Eva Windows, Capri et Eva Discord.',embed:{title:'✦ ZYREN AI UNIVERSE',description:'Une vitrine interactive pour découvrir les projets.',fields:[['Eva','Assistante Windows'],['Capri','Compagnon de bureau'],['Eva Discord','Bot communautaire — concept']]}}],
 annonces:[{who:'Eva',text:'Bienvenue sur la démo interactive du bot Eva.',embed:{title:'📢 Annonce du laboratoire',description:'Cette page est une simulation locale. Aucune donnée n’est envoyée sur Discord.'}}],
 vocal:[{who:'Eva',text:'🔊 Salon vocal fictif. Les appels vocaux ne sont pas activés dans cette démo.'}]
};
Object.keys(messages).forEach(k=>history[k]=messages[k].map(m=>({...m})));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderMsg(m){
 const el=document.createElement('div');el.className='dl-message';
 const avatar=document.createElement('div');avatar.className=m.who==='Eva'?'dl-bot-avatar':'dl-user-avatar';avatar.textContent=m.who==='Eva'?'✦':'Z';
 const body=document.createElement('div');body.className='dl-message-body';
 const header=document.createElement('div');header.className='dl-message-head';header.innerHTML='<strong>'+esc(m.who)+'</strong>'+(m.who==='Eva'?'<span class="dl-bot-label">BOT</span>':'')+'<time>'+now()+'</time>';
 const text=document.createElement('p');text.textContent=m.text;body.append(header,text);
 if(m.embed){const e=document.createElement('div');e.className='dl-embed';e.innerHTML='<strong>'+esc(m.embed.title)+'</strong><p>'+esc(m.embed.description)+'</p>'+(m.embed.fields||[]).map(f=>'<div class="dl-embed-field"><b>'+esc(f[0])+'</b><span>'+esc(f[1])+'</span></div>').join('');body.append(e)}
 el.append(avatar,body);return el;
}
function render(){feed.replaceChildren();const intro=document.createElement('div');intro.className='dl-welcome';intro.innerHTML='<div class="dl-welcome-icon">#</div><h3>Bienvenue dans #'+esc(channel)+'</h3><p>Une expérience de démonstration, directement dans ton navigateur.</p>';feed.append(intro);history[channel].forEach(m=>feed.append(renderMsg(m)));feed.scrollTop=feed.scrollHeight;title.textContent='# '+channel;input.placeholder='Envoyer un message dans #'+channel+'…';typing.textContent='';document.querySelectorAll('[data-dl-channel]').forEach(b=>b.classList.toggle('active',b.dataset.dlChannel===channel))}
function add(who,text,embed){history[channel].push({who,text,embed});feed.append(renderMsg({who,text,embed}));feed.scrollTop=feed.scrollHeight}
const commands={
 '/help':()=>({text:'Voici mes commandes disponibles dans cette démo :',embed:{title:'✦ Centre de commandes Eva',description:'Choisis une commande ou saisis-la dans le chat.',fields:[['/ping','Tester la latence simulée'],['/profil','Afficher ton profil fictif'],['/stats','Statistiques de démonstration'],['/avatar','Afficher une carte avatar'],['/help','Ouvrir cette aide']]}}),
 '/ping':()=>({text:'🏓 Pong ! Latence simulée : 24 ms. Aucun serveur Discord contacté.'}),
 '/profil':()=>({text:'Voici ton profil de démonstration :',embed:{title:'✦ Profil — Zyren',description:'Membre du laboratoire • Statut : en ligne',fields:[['Rôle','Créateur'],['Projet favori','Eva AI'],['Niveau','12 (fictif)']]}}),
 '/stats':()=>({text:'Voici les statistiques fictives du serveur :',embed:{title:'◈ Statistiques du laboratoire',description:'Données illustratives, non récupérées depuis Discord.',fields:[['Membres','128 (démo)'],['Messages','2 481 (démo)'],['Uptime','99,9 % (démo)']]}}),
 '/avatar':()=>({text:'Avatar de démonstration :',embed:{title:'♡ Identité visuelle — Eva',description:'Une assistante virtuelle à l’esthétique violette et futuriste.',fields:[['Thème','Cyber / Anime'],['Couleur','#a78bfa']]}})
};
let replyTimer;
function submit(value){const msg=value.trim().slice(0,250);if(!msg)return;clearTimeout(replyTimer);add('Zyren',msg);input.value='';const command=msg.split(/\s+/)[0].toLowerCase();typing.textContent='Eva est en train d’écrire…';
 replyTimer=setTimeout(()=>{typing.textContent='';const result=commands[command]?.()||{text:msg.toLowerCase().includes('bonjour')?'Salut Zyren ! 💜 Heureuse de te retrouver ici.':msg.toLowerCase().includes('capri')?'Capri est notre compagnon de bureau. Va voir sa page pour la rencontrer !':'Je suis Eva, une simulation interactive. Essaie /help pour explorer mes commandes.'};add('Eva',result.text,result.embed)},550+Math.random()*550)}
form.addEventListener('submit',e=>{e.preventDefault();submit(input.value)});
document.querySelectorAll('[data-dl-quick]').forEach(b=>b.addEventListener('click',()=>{if(channel!=='eva-bot'){channel='eva-bot';render()}submit(b.dataset.dlQuick)}));
document.querySelectorAll('[data-dl-channel]').forEach(b=>b.addEventListener('click',()=>{clearTimeout(replyTimer);channel=b.dataset.dlChannel;render()}));
document.getElementById('dlClear').addEventListener('click',()=>{clearTimeout(replyTimer);history[channel]=messages[channel].map(m=>({...m}));render()});
render();
const hm=location.hash.match(/^#msg=(.*)$/);if(hm){let m='';try{m=decodeURIComponent(hm[1]).slice(0,120)}catch(_){}if(m){channel='eva-bot';render();add('Eva','✉ Message envoyé depuis Eva (Windows) : « '+m+' »',{title:'✦ Pont Eva Windows → Discord',description:'Simulation : ce message a été préparé dans la démo d’Eva et affiché ici, sans aucun envoi réel.'});window.history.replaceState(null,'',location.pathname);lab.scrollIntoView({block:'center'})}}

})();
