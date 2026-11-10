// Mobile menu
(function(){
  const b=document.querySelector('.menu-btn'), n=document.getElementById('nav');
  if(b&&n) b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
})();
// Synthetic radar ocean strip (home page only): swell + fresh plume + speckle.
(function(){
  const c=document.getElementById('swath'); if(!c||!c.getContext) return;
  const ctx=c.getContext('2d');
  const stops=[[22,33,74],[70,62,170],[143,134,255],[78,224,192],[255,201,107]];
  const ramp=t=>{t=Math.min(1,Math.max(0,t))*(stops.length-1);const i=Math.min(stops.length-2,Math.floor(t)),f=t-i,a=stops[i],b=stops[i+1];return a.map((v,k)=>v+(b[k]-v)*f)};
  let seed;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  function draw(){
    const W=520,H=Math.max(40,Math.round(W*c.clientHeight/Math.max(1,c.clientWidth)));
    c.width=W;c.height=H;seed=11;
    const img=ctx.createImageData(W,H),d=img.data;
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){
      const u=x/W,v=y/H;
      const swell=.07*Math.sin(u*40+v*12)+.04*Math.sin(u*9-v*24+1.3);
      const plume=.55*Math.exp(-Math.pow((v-.5-.2*Math.sin(u*4))/.24,2))*Math.exp(-u*1.5);
      const speck=.85+.15*(-Math.log(rnd()+1e-6));
      const [r,g,b]=ramp((.7-plume+swell)*speck),k=(y*W+x)*4;
      d[k]=r;d[k+1]=g;d[k+2]=b;d[k+3]=255;
    }
    ctx.putImageData(img,0,0);
  }
  draw();let to;addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(draw,150)});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&c.animate)
    c.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:1800,easing:'cubic-bezier(.3,.1,.2,1)'});
})();
