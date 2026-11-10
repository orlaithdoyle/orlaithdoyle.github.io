/* 1. Put each project / job / course (everything from one ### heading
      to the next) in its own glass panel. The pages stay plain Markdown. */
(function () {
  var main = document.querySelector('main');
  if (!main) return;
  var stop = /^(H1|H2|H3|HR|FOOTER|CANVAS)$/;
  Array.prototype.slice.call(main.querySelectorAll(':scope > h3')).forEach(function (h) {
    var box = document.createElement('div');
    box.className = 'panel';
    h.parentNode.insertBefore(box, h);
    var n = h;
    while (n && (n === h || !stop.test(n.tagName))) {
      var next = n.nextElementSibling;
      box.appendChild(n);
      n = next;
    }
  });
})();

/* 2. The glowing particle orb on the home page. */
(function () {
  var c = document.getElementById('orb');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // points on a sphere, plus two tilted rings of particles
  var pts = [], N = 900, i;
  for (i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r, 0]);
  }
  function ring(count, radius, tilt, kind) {
    for (var k = 0; k < count; k++) {
      var a = (k / count) * Math.PI * 2, jitter = 1 + (Math.random() - .5) * .08;
      var x = Math.cos(a) * radius * jitter, z = Math.sin(a) * radius * jitter;
      pts.push([x, z * Math.sin(tilt), z * Math.cos(tilt), kind]);
    }
  }
  ring(420, 1.75, 0.32, 1);
  ring(260, 2.25, 0.32, 2);

  function size() {
    c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr;
  }
  function draw(t) {
    var W = c.width, H = c.height, R = Math.min(W / 5.2, H / 2.9), cx = W / 2, cy = H / 2;
    var a = t * 0.00012, ca = Math.cos(a), sa = Math.sin(a);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
    g.addColorStop(0, 'rgba(170,80,255,0.28)'); g.addColorStop(1, 'rgba(170,80,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (var j = 0; j < pts.length; j++) {
      var p = pts[j];
      var spin = p[3] ? -a * 1.6 : a;              // rings drift the other way
      var cs = Math.cos(spin), sn = Math.sin(spin);
      var x = p[0] * cs - p[2] * sn, z = p[0] * sn + p[2] * cs, y = p[1];
      var depth = (z + 2.3) / 4.6;                  // 0 far .. 1 near
      var s = (p[3] ? 1.1 : 1.3) * dpr * (0.5 + depth);
      var hue = p[3] === 2 ? 300 : 270 - depth * 20;
      ctx.fillStyle = 'hsla(' + hue + ',95%,' + (55 + depth * 20) + '%,' + (0.18 + depth * 0.7) + ')';
      ctx.beginPath(); ctx.arc(cx + x * R, cy + y * R, s, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    if (!still) requestAnimationFrame(draw);
  }
  size(); window.addEventListener('resize', size);
  still ? draw(4000) : requestAnimationFrame(draw);
})();
