(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hover=matchMedia('(hover: hover)').matches;
  const zoom=document.querySelector('.zoom');
  const cards=document.querySelectorAll('.zoomcard');
  if(zoom && hover){
    const preview=zoom.querySelector('[style*="background-image"]');
    const caption=zoom.querySelector('[data-zoom-caption]');
    cards.forEach(card=>{
      card.addEventListener('mouseenter',()=>{
        const img=card.querySelector('[data-zoom-src]');
        const r=card.getBoundingClientRect(),w=Math.min(620,innerWidth*.6),h=(w-24)*549/1600+56;
        const x=innerWidth-r.right-16>=w?r.right+16:r.left-16>=w?r.left-w-16:Math.max(16,Math.min(innerWidth-w-16,r.left));
        const y=Math.max(16,Math.min(innerHeight-h-16,r.top+r.height/2-h/2));
        preview.style.backgroundImage='url("'+img.dataset.zoomSrc+'")';
        caption.textContent=img.alt;
        zoom.style.left=x+'px';zoom.style.top=y+'px';zoom.classList.add('open');
      });
      card.addEventListener('mouseleave',()=>zoom.classList.remove('open'));
      card.addEventListener('click',()=>zoom.classList.remove('open'));
    });
    addEventListener('scroll',()=>zoom.classList.remove('open'),{passive:true});
    addEventListener('keydown',e=>{if(e.key==='Escape') zoom.classList.remove('open');});
  }
  if(reduce || !hover) return;
  const glow=document.querySelector('[data-glow]');
  const portrait=document.querySelector('[data-look]');
  let active,queued=false,x=0,y=0;
  const draw=()=>{
    queued=false;
    if(glow){glow.classList.add('on');glow.style.transform='translate('+(x-210)+'px,'+(y-210)+'px)';}
    if(portrait){portrait.style.setProperty('--lx',(x/innerWidth-.5)*12+'px');portrait.style.setProperty('--ly',(y/innerHeight-.5)*8+'px');}
    if(active){
      const r=active.getBoundingClientRect(),dx=(x-r.left-r.width/2)/r.width,dy=(y-r.top-r.height/2)/r.height;
      active.style.transform=active.classList.contains('magnet')?'translate('+(dx*10)+'px,'+(dy*8)+'px)':'perspective(900px) rotateX('+(-dy*5)+'deg) rotateY('+(dx*6)+'deg) translateY(-2px)';
    }
  };
  addEventListener('mousemove',e=>{
    x=e.clientX;y=e.clientY;
    const target=e.target.closest('.magnet,.tilt');
    if(active && active!==target) active.style.transform='';
    active=target;
    if(!queued){queued=true;requestAnimationFrame(draw);}
  },{passive:true});
  document.documentElement.addEventListener('mouseleave',()=>{if(active)active.style.transform='';active=null;glow?.classList.remove('on');});
})();
