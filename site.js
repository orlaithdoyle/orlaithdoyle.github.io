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


  // A small satellite on its own tilted orbit, with a fading trail.
  var INC = 1.05, SAT_R = 1.38, SPEED = 0.00045;
  function satPos(t) {
    var a = t * SPEED;
    return [Math.cos(a) * SAT_R, Math.sin(a) * SAT_R * Math.sin(INC) * -0.55 + Math.cos(a) * 0.18,
            Math.sin(a) * SAT_R * Math.cos(INC)];
  }
  function hidden(p) { // behind the planet?
    return p[2] < 0 && (p[0] * p[0] + p[1] * p[1]) < 1;
  }
  function drawSatellite(t, cx, cy, R) {
    // trail
    for (var k = 28; k > 0; k--) {
      var q = satPos(t - k * 45);
      if (hidden(q)) continue;
      ctx.fillStyle = 'rgba(224,170,255,' + (0.35 * (1 - k / 28)) + ')';
      ctx.beginPath(); ctx.arc(cx + q[0] * R, cy + q[1] * R, 1.2 * dpr, 0, 6.283); ctx.fill();
    }
    var p = satPos(t), ahead = satPos(t + 60);
    var x = cx + p[0] * R, y = cy + p[1] * R;
    var ang = Math.atan2((ahead[1] - p[1]), (ahead[0] - p[0]));
    var near = (p[2] + SAT_R) / (2 * SAT_R);
    var sc = dpr * (0.7 + near * 0.4);
    ctx.save();
    ctx.globalAlpha = hidden(p) ? 0.18 : 1;
    ctx.translate(x, y); ctx.rotate(Math.atan2(p[1], p[0]) + Math.PI / 2 + Math.PI);
    ctx.shadowColor = 'rgba(214,150,255,0.85)'; ctx.shadowBlur = 12 * dpr;
    // Biomass: a box-shaped body, one solar wing, and a long boom holding
    // the big 12 m wire-mesh reflector that unfolds like an umbrella.
    // solar wing
    ctx.fillStyle = '#7f6cff';
    ctx.fillRect(-21 * sc, -2.4 * sc, 15 * sc, 4.8 * sc);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 0.5 * sc;
    for (var u = -18; u <= -8; u += 3) { ctx.beginPath(); ctx.moveTo(u * sc, -2.4 * sc); ctx.lineTo(u * sc, 2.4 * sc); ctx.stroke(); }
    ctx.fillStyle = 'rgba(200,190,255,0.7)'; ctx.fillRect(-6 * sc, -0.4 * sc, 2 * sc, 0.8 * sc);
    // body (gold thermal blanket look)
    ctx.fillStyle = '#e9c77a'; ctx.fillRect(-4 * sc, -4.5 * sc, 8 * sc, 9 * sc);
    ctx.fillStyle = '#f3effc'; ctx.fillRect(-4 * sc, -4.5 * sc, 8 * sc, 2 * sc);
    // boom, three segments with hinges
    ctx.strokeStyle = '#f3effc'; ctx.lineWidth = 1 * sc; ctx.beginPath();
    ctx.moveTo(3 * sc, -3 * sc); ctx.lineTo(8 * sc, -9 * sc); ctx.lineTo(11 * sc, -15 * sc); ctx.lineTo(13 * sc, -20 * sc); ctx.stroke();
    // reflector: a wide shallow dish seen at an angle, with ribs
    ctx.save(); ctx.translate(14 * sc, -24 * sc); ctx.rotate(-0.35);
    ctx.shadowBlur = 16 * dpr;
    ctx.fillStyle = 'rgba(233,199,122,0.32)'; ctx.strokeStyle = 'rgba(245,225,170,0.95)'; ctx.lineWidth = 0.8 * sc;
    ctx.beginPath(); ctx.ellipse(0, 0, 13 * sc, 4.6 * sc, 0, 0, 6.283); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(245,225,170,0.45)'; ctx.lineWidth = 0.45 * sc;
    for (var r = 0; r < 12; r++) { var th = r * Math.PI / 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(th) * 13 * sc, Math.sin(th) * 4.6 * sc); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(0, 0, 7 * sc, 2.5 * sc, 0, 0, 6.283); ctx.stroke();
    ctx.restore();
    ctx.restore();
  }

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
    drawSatellite(t, cx, cy, R);
    if (!still) requestAnimationFrame(draw);
  }
  size(); window.addEventListener('resize', size);
  still ? draw(4000) : requestAnimationFrame(draw);
})();
