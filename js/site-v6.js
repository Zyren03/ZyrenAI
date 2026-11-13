(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce){document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank')return;const href=a.getAttribute('href');if(!href||href.startsWith('#'))return;e.preventDefault();document.body.classList.add('v6-leaving');setTimeout(()=>location.href=href,210)}));}
// Native, local MP4 video player with graceful fallback.
document.querySelectorAll('[data-video]').forEach(box=>{const path=box.dataset.video;const video=document.createElement('video');video.preload='metadata';video.controls=true;video.playsInline=true;video.style.cssText='display:none;width:100%;max-height:510px;object-fit:contain;border-radius:14px;background:#05050c';video.setAttribute('aria-label','Vidéo de présentation du projet');video.src=path;video.addEventListener('loadedmetadata',()=>{box.querySelector('.video-empty')?.remove();video.style.display='block'});video.addEventListener('error',()=>{video.remove()});box.append(video)});
})();
