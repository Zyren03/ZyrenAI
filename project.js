// Affiche un lecteur uniquement si une vraie vidéo existe. Aucune requête réseau externe.
const name=location.pathname.split('/').pop().replace('.html','');
const frame=document.getElementById('videoFrame');
if(frame && ['eva','capri','discord'].includes(name)){
  const url=`videos/${name}.mp4`;
  // Un chargement vidéo en échec conserve un aperçu explicite.
  const video=document.createElement('video');
  video.controls=true;video.preload='none';video.playsInline=true;video.setAttribute('aria-label','Démonstration vidéo de '+name);
  const source=document.createElement('source');source.src=url;source.type='video/mp4';video.append(source);
  video.addEventListener('loadedmetadata',()=>{frame.replaceChildren(video);},{once:true});
  // Charger les métadonnées sans démarrer la lecture.
  video.load();
}
