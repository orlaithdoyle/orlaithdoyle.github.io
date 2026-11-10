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

/* 2. The home page planet: Biomass orbiting, imaging the surface with its
      side-looking radar, and talking to ground stations as it passes. */
(function () {
  var c = document.getElementById('orb');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Planet surface: evenly spread points, each with a "heat" for the imaged swath
  var pts = [], N = 1100, i;
  for (i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
    pts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r, heat: 0 });
  }
  // Ground stations (lat, lon). Screen y points down, so north is negative y.
  var stations = [[67.9, 20.2], [50.1, 5.25], [-31.0, 116.2], [-35.8, -69.4], [53.31, -6.22]]
    .map(function (s) {
      var la = s[0] * Math.PI / 180, lo = s[1] * Math.PI / 180;
      return { x: Math.cos(la) * Math.cos(lo), y: -Math.sin(la), z: Math.cos(la) * Math.sin(lo), link: 0 };
    });

  var SPIN = 0.00016, SAT_R = 1.62, SPEED = 0.00042, TILT = 0.55;
  function spin(p, a) { var ca = Math.cos(a), sa = Math.sin(a); return [p.x * ca - p.z * sa, p.y, p.x * sa + p.z * ca]; }
  // Near-polar orbit (like the real Biomass), tilted a little towards us so it reads as a loop
  function satPos(t) {
    var a = t * SPEED, ca = Math.cos(a), sa = Math.sin(a);
    return [sa * Math.cos(TILT) * SAT_R * 0.92 + ca * 0.18, -ca * SAT_R, sa * Math.sin(TILT) * SAT_R];
  }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function behind(p) { return p[2] < 0 && (p[0] * p[0] + p[1] * p[1]) < 1; }

  function size() { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; }

  function draw(t) {
    var W = c.width, H = c.height, R = Math.min(W / 5.6, H / 3.7), cx = W / 2, cy = H / 2;
    var a = t * SPIN;
    var S = satPos(t), V = norm([satPos(t + 50)[0] - S[0], satPos(t + 50)[1] - S[1], satPos(t + 50)[2] - S[2]]);
    var nadir = norm(S), side = norm(cross(V, nadir));
    var foot = norm([nadir[0] + side[0] * 0.3, nadir[1] + side[1] * 0.3, nadir[2] + side[2] * 0.3]);
    var imaging = foot[2] > -0.15 && !behind(S);

    ctx.clearRect(0, 0, W, H);
    // soft glow behind the planet
    var g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.9);
    g.addColorStop(0, 'rgba(170,80,255,0.26)'); g.addColorStop(1, 'rgba(170,80,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    // planet points, lit up where the radar has imaged
    ctx.globalCompositeOperation = 'lighter';
    for (var j = 0; j < N; j++) {
      var p = pts[j], q = spin(p, a);
      if (imaging) {
        var dx = q[0] - foot[0], dy = q[1] - foot[1], dz = q[2] - foot[2];
        if (dx * dx + dy * dy + dz * dz < 0.016) p.heat = 1;
      }
      p.heat *= 0.9975;
      var depth = (q[2] + 1) / 2, h = p.heat;
      var s = 1.25 * dpr * (0.55 + depth * 0.9) * (1 + h * 0.6);
      var hue = 268 - h * 95, light = 55 + depth * 18 + h * 15, alpha = 0.12 + depth * 0.7 + h * 0.3;
      ctx.fillStyle = 'hsla(' + hue + ',95%,' + light + '%,' + Math.min(alpha, 1) + ')';
      ctx.beginPath(); ctx.arc(cx + q[0] * R, cy + q[1] * R, s, 0, 6.283); ctx.fill();
    }

    // ground stations, and a link to the satellite when it is above their horizon
    for (var k = 0; k < stations.length; k++) {
      var st = stations[k], gp = spin(st, a);
      var sees = (gp[0] * S[0] + gp[1] * S[1] + gp[2] * S[2]) > 1.02;
      st.link += ((sees ? 1 : 0) - st.link) * 0.06;
      if (gp[2] < -0.05) continue;
      var gx = cx + gp[0] * R, gy = cy + gp[1] * R, vis = Math.min(1, (gp[2] + 0.05) * 3);
      if (st.link > 0.02 && !behind(S)) {
        ctx.setLineDash([3 * dpr, 4 * dpr]); ctx.lineDashOffset = -t * 0.03;
        ctx.strokeStyle = 'rgba(120,240,210,' + (0.75 * st.link * vis) + ')'; ctx.lineWidth = 1.1 * dpr;
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(cx + S[0] * R, cy + S[1] * R); ctx.stroke();
        ctx.setLineDash([]);
      }
      var pulse = st.link > 0.5 ? 0.5 + 0.5 * Math.sin(t * 0.012) : 0;
      ctx.fillStyle = 'rgba(120,240,210,' + (0.10 + 0.25 * pulse) * vis + ')';
      ctx.beginPath(); ctx.arc(gx, gy, (5 + 5 * pulse) * dpr, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(160,255,225,' + 0.95 * vis + ')';
      ctx.beginPath(); ctx.moveTo(gx, gy - 3.4 * dpr); ctx.lineTo(gx + 3 * dpr, gy + 2.2 * dpr); ctx.lineTo(gx - 3 * dpr, gy + 2.2 * dpr); ctx.closePath(); ctx.fill();
    }

    // radar beam from the reflector down to the swath, with pulses travelling along it
    if (imaging) {
      var sx = cx + S[0] * R, sy = cy + S[1] * R, fx = cx + foot[0] * R, fy = cy + foot[1] * R;
      var ux = fx - sx, uy = fy - sy, L = Math.hypot(ux, uy), nx = -uy / L, ny = ux / L, wdt = 10 * dpr;
      var bg = ctx.createLinearGradient(sx, sy, fx, fy);
      bg.addColorStop(0, 'rgba(224,77,255,0.05)'); bg.addColorStop(1, 'rgba(224,77,255,0.32)');
      ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(sx, sy);
      ctx.lineTo(fx + nx * wdt, fy + ny * wdt); ctx.lineTo(fx - nx * wdt, fy - ny * wdt); ctx.closePath(); ctx.fill();
      for (var m = 0; m < 4; m++) {
        var f = ((t * 0.0016) + m / 4) % 1, px = sx + ux * f, py = sy + uy * f, w2 = wdt * f;
        ctx.strokeStyle = 'rgba(255,170,255,' + (0.85 * (1 - f * 0.6)) + ')'; ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath(); ctx.moveTo(px + nx * w2, py + ny * w2); ctx.lineTo(px - nx * w2, py - ny * w2); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(255,190,255,0.5)';
      ctx.beginPath(); ctx.ellipse(fx, fy, wdt * 1.1, wdt * 0.45, Math.atan2(ny, nx), 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    drawSatellite(S, cx, cy, R);
    if (!still) requestAnimationFrame(draw);
  }

  // Biomass: a box-shaped body, one solar wing, and a long boom holding
  // the big 12 m wire-mesh reflector that unfolds like an umbrella.
  function drawSatellite(p, cx, cy, R) {
    var x = cx + p[0] * R, y = cy + p[1] * R;
    var near = (p[2] + SAT_R) / (2 * SAT_R), sc = dpr * (0.7 + near * 0.4);
    ctx.save();
    ctx.globalAlpha = behind(p) ? 0.18 : 1;
    ctx.translate(x, y); ctx.rotate(Math.atan2(p[1], p[0]) + Math.PI * 1.5);
    ctx.shadowColor = 'rgba(214,150,255,0.85)'; ctx.shadowBlur = 12 * dpr;
    ctx.fillStyle = '#7f6cff'; ctx.fillRect(-21 * sc, -2.4 * sc, 15 * sc, 4.8 * sc);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 0.5 * sc;
    for (var u = -18; u <= -8; u += 3) { ctx.beginPath(); ctx.moveTo(u * sc, -2.4 * sc); ctx.lineTo(u * sc, 2.4 * sc); ctx.stroke(); }
    ctx.fillStyle = '#e9c77a'; ctx.fillRect(-4 * sc, -4.5 * sc, 8 * sc, 9 * sc);
    ctx.fillStyle = '#f3effc'; ctx.fillRect(-4 * sc, -4.5 * sc, 8 * sc, 2 * sc);
    ctx.strokeStyle = '#f3effc'; ctx.lineWidth = 1 * sc; ctx.beginPath();
    ctx.moveTo(3 * sc, -3 * sc); ctx.lineTo(8 * sc, -9 * sc); ctx.lineTo(11 * sc, -15 * sc); ctx.lineTo(13 * sc, -20 * sc); ctx.stroke();
    ctx.save(); ctx.translate(14 * sc, -24 * sc); ctx.rotate(-0.35); ctx.shadowBlur = 16 * dpr;
    ctx.fillStyle = 'rgba(233,199,122,0.32)'; ctx.strokeStyle = 'rgba(245,225,170,0.95)'; ctx.lineWidth = 0.8 * sc;
    ctx.beginPath(); ctx.ellipse(0, 0, 13 * sc, 4.6 * sc, 0, 0, 6.283); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(245,225,170,0.45)'; ctx.lineWidth = 0.45 * sc;
    for (var r2 = 0; r2 < 12; r2++) { var th2 = r2 * Math.PI / 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(th2) * 13 * sc, Math.sin(th2) * 4.6 * sc); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(0, 0, 7 * sc, 2.5 * sc, 0, 0, 6.283); ctx.stroke();
    ctx.restore(); ctx.restore();
  }

  size(); window.addEventListener('resize', size);
  if (still) { for (var w = 0; w < 400; w++) draw(9000 + w * 16); } else requestAnimationFrame(draw);
})();
