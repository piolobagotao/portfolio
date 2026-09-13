(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const word = document.querySelector('[data-hero-word]');
  const words = ['shows up in rankings', 'gets cited by AI', 'gains followers, likes, comments', 'can be repurposed', 'is streamlined', 'converts readers to buyers', 'earns backlinks', 'ships on schedule'];
  let wordIndex = 0;
  if (word && !reduce) setInterval(() => {
    if (document.hidden) return;
    const replacement = word.cloneNode();
    replacement.textContent = words[++wordIndex % words.length];
    const current = document.querySelector('[data-hero-word]');
    current.replaceWith(replacement);
  }, 2600);
  const clock = document.querySelector('[data-local-time]');
  const tick = () => {
    if (!clock) return;
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = now.toLocaleTimeString('en-PH', {timeZone:'Asia/Manila',hour:'2-digit',minute:'2-digit'});
  };
  tick();
  if(clock) setInterval(tick, 30000);
  const preload = document.querySelector('.preloader');
  let seen = true;
  try { seen = sessionStorage.getItem('piolo-preloaded') === '1'; } catch {}
  if(preload && !reduce && !seen) {
    const greetings = ['Kumusta','Hello','Hola','Hallo','Olá','Salaam'];
    preload.hidden = false;
    let greetingIndex = 0;
    const timer = setInterval(() => {
      if(++greetingIndex < greetings.length) {
        const el = document.createElement('span');
        el.className = 'greet'; el.textContent = greetings[greetingIndex];
        preload.replaceChildren(el);
      } else {
        clearInterval(timer); preload.classList.add('out');
        setTimeout(() => {preload.hidden = true;}, 850);
        try { sessionStorage.setItem('piolo-preloaded','1'); } catch {}
      }
    }, 260);
  }
  const countUp = section => {
    if(reduce) return;
    section.querySelectorAll('[data-count]').forEach(el => {
      const target = Number(el.dataset.count), suffix = el.dataset.suffix || '';
      const started = performance.now();
      const frame = time => {
        const p = Math.min((time-started)/1400,1);
        el.textContent = Math.round(target*(1-Math.pow(1-p,3))).toLocaleString('en-US')+suffix;
        if(p<1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  };
  if('IntersectionObserver' in window && !reduce) {
    const observer = new IntersectionObserver(entries => entries.forEach(e=>{
      if(e.isIntersecting) {e.target.classList.add('in');countUp(e.target);observer.unobserve(e.target);}
    }),{threshold:0,rootMargin:'0px 0px -30px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    document.documentElement.classList.add('motion-ready');
  }
  const bar = document.querySelector('[data-progress]');
  const hero = document.querySelector('[data-hero]');
  const portrait = document.querySelector('[data-parallax]');
  const marquees = [...document.querySelectorAll('[data-marquee]')];
  let queued = false;
  const scrollUpdate = () => {
    queued = false;
    const max = document.documentElement.scrollHeight-innerHeight;
    if(bar) bar.style.transform = 'scaleX('+(max>0?Math.min(scrollY/max,1):0)+')';
    if(reduce) return;
    const p = Math.min(scrollY/(innerHeight*.7),1);
    if(hero) {hero.style.opacity = String(1-p*.9);hero.style.transform = 'translateY('+(p*60)+'px) scale('+(1-p*.06)+')';}
    if(portrait) portrait.style.transform = 'translate3d(var(--lx,0px),calc('+(-p*innerHeight*.098)+'px + var(--ly,0px)),0)';
    marquees.forEach(el=>{
      const half = el.scrollWidth/2;
      if(half) el.style.transform = 'translateX('+(-((scrollY*.12*Number(el.dataset.marquee)%half+half)%half))+'px)';
    });
  };
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scrollUpdate);}},{passive:true});
  addEventListener('resize',scrollUpdate);
  scrollUpdate();
  const dialog = document.querySelector('#image-preview');
  if(dialog && typeof dialog.showModal === 'function') {
    let trigger;
    document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',event=>{
      if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey) return;
      event.preventDefault(); trigger=link;
      dialog.querySelector('img').src=link.href;
      dialog.querySelector('img').alt=link.querySelector('img').alt;
      dialog.querySelector('p').textContent=link.querySelector('img').alt;
      dialog.showModal();
    }));
    dialog.querySelector('button').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{
      const r=dialog.getBoundingClientRect();
      if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();
    });
    dialog.addEventListener('close',()=>trigger?.focus());
  }
})();
