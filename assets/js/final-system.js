(function(){
  // Premium section snap: smooth but not violent. Home only, desktop/tablet only.
  if(!document.body.classList.contains('home')) return;
  if(window.matchMedia('(max-width: 900px)').matches) return;
  const sections=[...document.querySelectorAll('body.home .panel, body.home .cta, body.home footer')];
  if(!sections.length) return;
  let locked=false;
  let last=0;
  function nearest(){
    const y=window.scrollY; let best=0, dist=Infinity;
    sections.forEach((s,i)=>{const d=Math.abs(s.offsetTop-y); if(d<dist){dist=d;best=i;}});
    return best;
  }
  window.addEventListener('wheel',function(e){
    if(Math.abs(e.deltaY)<10) return;
    const now=Date.now();
    e.preventDefault();
    if(locked || now-last<250) return;
    locked=true; last=now;
    const i=nearest();
    const next=Math.max(0,Math.min(sections.length-1,i+(e.deltaY>0?1:-1)));
    sections[next].scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>{locked=false},1350);
  },{passive:false});
})();
