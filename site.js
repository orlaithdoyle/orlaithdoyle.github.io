/* 0. On phones the Education dropdown starts closed, and closes when you tap elsewhere */
(function () {
  if (!window.matchMedia('(max-width:860px)').matches) return;
  var groups = document.querySelectorAll('.navgroup');
  groups.forEach(function (g) { g.removeAttribute('open'); });
  document.addEventListener('click', function (e) {
    groups.forEach(function (g) { if (!g.contains(e.target)) g.removeAttribute('open'); });
  });
})();

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

  // Which dots are ocean (0), land (1) or Ireland (2), from Natural Earth land and country outlines
  var LAND_MASK = '011111111111111110111111101111001111110011110111111001111110011110101111001011110010100101101001011110010100101101001000010010100100111001010010010100100000001000010000000100000001000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000010000000000000000000000000000000001000000100000000000000000000000000000000000000000000000100000010000000000000000000000000100000000000000000000010000001000000000000000000000000001000000000000000000001000000000000000000000000000000000100000000000100000000100000000000100000000000000000000010000000000010000000010000000000001000000000001000000001000000000001000000001000000000000100010000000100000010100000000000100001000100010000001010001000000010000001010001000000011000100000001000000101000100000001000010101000100000010100010000000100000010100010000000100001000100010000001010001000000010000101010001000000101000100000001000000101000100000001000010101000100000010100010000000100000010100010100001010001010100010000001010001000100010000101010001000000101000100010001000000101000101000000000010101000100000010100010001000100000010100010100001010000010100010000001010001000100000000001010001000000101000100010001000000101000101000010100000101000000000010100010001000000000010100010100001010000010100010000001010001000100001000001010000000000101000001010000000000101000100000010100000101000000000010100000001000010000010100000000001010000010100000000001010000000100001000001010000000000101000000010000100000101000000010010100010101000100000010100000001000010000010100000000001010000010100011000001010000000100101000001010001000000101000000010000100000101000000000010100000101000110000010100000001001010000010100010000101010000010100001000101010000000000101000101010000000000101000100000010100010101000000001010100010100000010001010100010000001010000010100000000001010000010000001000101010000000010101000001000000000000101000001000010100010101000000000010100000100000000000010100000100001010000010000000000001010000010000101000001010010000010101000001000010000000101001001000010100000100001000000010100010100001010000010010100100001010000010000101000001010010010000101000001000010000000101000001000010000000100101001001010100000100001000001010000100100001000000010000100000001010010010000100000001001010010000100000001000010100010100001001000010000000100101011001010000000100001000001010010100000001000000010000100100101000010010000100000001001010110010100000001000010010010100101010000010100000100101011001010100001100001001000010010100100101000000010010100100101000010100000100000001001010010010100000011001010010010100101001001010000000100101001001010010101000101001001010010100100101000001110010100000101001010010010100000101001010010010100100010001010000010100101001001010010011100101000001010010001100101001001010010100100101001001110010100100101001000110010100100111001010000010100100111001010010010100101011001010010011100101011001000010001100101001001100010101100100001001100010101100110001000110010100100110001011110011000100011001010110011100100011001000010011000101111001100010001100101011001110010101100110001001110010011100111001011110010000100111001010100011000100011001000110011000101011001100010011100101010001110010011000101011001100010101000110001001100010011100111001001110010101100110001010110011101100111001010110011100100111001110110011100101011001110010011100101011001110110111100111011001110010111100111001001110011101100111001001110011101100111001010110011101101111001110110011100100101001110110211100111011001110010111100110111001110010000100111001011110011101100111001000010011111100111001100110011100100101001110010011100110101001111011010100111111101111011010100110101101111111110110111101101010011111111110111101010011010110111111101011011110110101011111111010011110110011111011010001100110101000110001101110000001000110000001000010000100110000000000010000100100001000000011000100100000000000000000000000000';
  var IE_EXTRA = [[51.8,-8.98],[52.3,-9.78],[52.3,-8.96],[52.3,-8.15],[52.3,-7.33],[52.3,-6.51],[52.8,-8.95],[52.8,-8.12],[52.8,-7.29],[52.8,-6.47],[53.3,-8.93],[53.3,-8.09],[53.3,-7.25],[53.3,-6.42],[53.8,-8.91],[53.8,-8.06],[53.8,-7.21],[53.8,-6.37],[54.3,-8.03],[54.3,-7.17],[54.8,-8]];
  // Planet surface: evenly spread points, each with a "heat" for the imaged swath
  var pts = [], N = 4200, i;
  for (i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
    pts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r, heat: 0, land: +LAND_MASK[i], fine: 0 });
  }
  // Extra, finer dots so Ireland has a recognisable shape
  IE_EXTRA.forEach(function (e) {
    var la = e[0] * Math.PI / 180, lo = e[1] * Math.PI / 180;
    pts.push({ x: Math.cos(la) * Math.cos(lo), y: -Math.sin(la), z: Math.cos(la) * Math.sin(lo), heat: 0, land: 2, fine: 1 });
  });
  N = pts.length;
  // Ground stations (lat, lon). Screen y points down, so north is negative y.
  var stations = [[67.9, 20.2], [50.1, 5.25], [-31.0, 116.2], [-35.8, -69.4], [53.31, -6.22]]
    .map(function (s) {
      var la = s[0] * Math.PI / 180, lo = s[1] * Math.PI / 180;
      return { x: Math.cos(la) * Math.cos(lo), y: -Math.sin(la), z: Math.cos(la) * Math.sin(lo), link: 0 };
    });

  var SPIN = 0.00010, SAT_R = 1.62, SPEED = 0.00030, TILT = 0.55;
  // Turn the planet, then tip its north pole towards us so Europe is in view
  var TIPC = Math.cos(0.5), TIPS = Math.sin(0.5);
  function spin(p, a) {
    var ca = Math.cos(a), sa = Math.sin(a), x = p.x * ca - p.z * sa, z = p.x * sa + p.z * ca;
    return [-x, p.y * TIPC + z * TIPS, z * TIPC - p.y * TIPS];   // -x so east is on the right
  }
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
    var INK = '232,226,246';                       // off-white "ink" for lines

    // outline of the planet, like a diagram
    ctx.strokeStyle = 'rgba(' + INK + ',0.18)'; ctx.lineWidth = 1 * dpr;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.01, 0, 6.283); ctx.stroke();

    // planet dots: faint ocean, pale land, Ireland in green, imaged strips in pale blue
    var landQ = [];
    for (var j = 0; j < N; j++) {
      var p = pts[j], q = spin(p, a);
      if (imaging) {
        var dx = q[0] - foot[0], dy = q[1] - foot[1], dz = q[2] - foot[2];
        if (dx * dx + dy * dy + dz * dz < 0.016) p.heat = 1;
      }
      p.heat *= 0.9975;
      if (q[2] < -0.05) continue;                 // only the side facing us
      var depth = (q[2] + 1) / 2, h = p.heat, s = 1.0 * dpr * (0.6 + depth * 0.6) * (p.fine ? 0.85 : 1), col;
      if (p.land === 2) { landQ.push([q[0], q[1], s * 1.1]); continue; }
      if (p.land === 1) col = 'rgba(' + (h > 0.15 ? '170,205,235' : '214,206,236') + ',' + (0.25 + depth * 0.55) + ')';
      else col = 'rgba(' + (h > 0.15 ? '150,190,230' : '140,128,190') + ',' + (h > 0.15 ? 0.25 + h * 0.4 : 0.10 + depth * 0.22) + ')';
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(cx + q[0] * R, cy + q[1] * R, s, 0, 6.283); ctx.fill();
    }
    ctx.fillStyle = 'rgba(120,200,130,0.9)';
    for (var L2 = 0; L2 < landQ.length; L2++) {
      var lq = landQ[L2]; ctx.beginPath(); ctx.arc(cx + lq[0] * R, cy + lq[1] * R, lq[2], 0, 6.283); ctx.fill();
    }

    // ground stations: small triangles, a thin dashed line when the satellite is overhead
    for (var k = 0; k < stations.length; k++) {
      var st = stations[k], gp = spin(st, a);
      var sees = (gp[0] * S[0] + gp[1] * S[1] + gp[2] * S[2]) > 1.02;
      st.link += ((sees ? 1 : 0) - st.link) * 0.06;
      if (gp[2] < -0.05) continue;
      var gx = cx + gp[0] * R, gy = cy + gp[1] * R, vis = Math.min(1, (gp[2] + 0.05) * 3);
      if (st.link > 0.02 && !behind(S)) {
        ctx.setLineDash([2 * dpr, 4 * dpr]);
        ctx.strokeStyle = 'rgba(' + INK + ',' + (0.55 * st.link * vis) + ')'; ctx.lineWidth = 0.8 * dpr;
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(cx + S[0] * R, cy + S[1] * R); ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.strokeStyle = 'rgba(' + INK + ',' + 0.85 * vis + ')'; ctx.lineWidth = 0.9 * dpr;
      ctx.beginPath(); ctx.moveTo(gx, gy - 2.8 * dpr); ctx.lineTo(gx + 2.5 * dpr, gy + 1.8 * dpr); ctx.lineTo(gx - 2.5 * dpr, gy + 1.8 * dpr); ctx.closePath(); ctx.stroke();
    }

    // radar beam: two thin edge lines, a faint fill, and pulses drawn as short arcs
    if (imaging) {
      var sx = cx + S[0] * R, sy = cy + S[1] * R, fx = cx + foot[0] * R, fy = cy + foot[1] * R;
      var ux = fx - sx, uy = fy - sy, L = Math.hypot(ux, uy), nx = -uy / L, ny = ux / L, wdt = 9 * dpr;
      ctx.fillStyle = 'rgba(' + INK + ',0.06)';
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(fx + nx * wdt, fy + ny * wdt); ctx.lineTo(fx - nx * wdt, fy - ny * wdt); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(' + INK + ',0.35)'; ctx.lineWidth = 0.7 * dpr;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(fx + nx * wdt, fy + ny * wdt); ctx.moveTo(sx, sy); ctx.lineTo(fx - nx * wdt, fy - ny * wdt); ctx.stroke();
      var ang = Math.atan2(uy, ux);
      for (var m = 0; m < 3; m++) {
        var f = ((t * 0.0012) + m / 3) % 1;
        ctx.strokeStyle = 'rgba(' + INK + ',' + (0.6 * (1 - f * 0.7)) + ')'; ctx.lineWidth = 0.8 * dpr;
        ctx.beginPath(); ctx.arc(sx, sy, L * f, ang - Math.atan(wdt / L), ang + Math.atan(wdt / L)); ctx.stroke();
      }
    }

    drawSatellite(S, cx, cy, R);
    if (!still) requestAnimationFrame(draw);
  }

  // A simple satellite drawn in outline: a box body, two solar panels and a small antenna
  function drawSatellite(p, cx, cy, R) {
    var x = cx + p[0] * R, y = cy + p[1] * R;
    var near = (p[2] + SAT_R) / (2 * SAT_R), sc = dpr * (0.75 + near * 0.4);
    ctx.save();
    ctx.globalAlpha = behind(p) ? 0.15 : 1;
    ctx.translate(x, y); ctx.rotate(Math.atan2(p[1], p[0]) + Math.PI * 1.5);
    ctx.lineWidth = 0.9 * dpr; ctx.strokeStyle = 'rgba(232,226,246,0.95)';
    ctx.fillStyle = 'rgba(19,15,44,0.95)';          // page colour, so the drawing reads as line art
    [[-16, -3, 11, 6], [5, -3, 11, 6], [-4, -4.5, 8, 9]].forEach(function (r) {
      ctx.fillRect(r[0] * sc, r[1] * sc, r[2] * sc, r[3] * sc); ctx.strokeRect(r[0] * sc, r[1] * sc, r[2] * sc, r[3] * sc);
    });
    ctx.lineWidth = 0.5 * dpr; ctx.strokeStyle = 'rgba(232,226,246,0.55)';
    [-12.3, -8.6, 8.6, 12.3].forEach(function (u) { ctx.beginPath(); ctx.moveTo(u * sc, -3 * sc); ctx.lineTo(u * sc, 3 * sc); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(-5 * sc, 0); ctx.lineTo(-4 * sc, 0); ctx.moveTo(4 * sc, 0); ctx.lineTo(5 * sc, 0); ctx.stroke();
    ctx.lineWidth = 0.9 * dpr; ctx.strokeStyle = 'rgba(232,226,246,0.95)';
    ctx.beginPath(); ctx.moveTo(0, -4.5 * sc); ctx.lineTo(0, -8 * sc); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -9 * sc, 1.2 * sc, 0, 6.283); ctx.stroke();
    ctx.restore();
  }

  size(); window.addEventListener('resize', size);
  if (still) { for (var w = 0; w < 400; w++) draw(9000 + w * 16); } else requestAnimationFrame(draw);
})();
