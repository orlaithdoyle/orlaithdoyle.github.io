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

  // Which dots are in the EU (1) or Ireland (2), worked out from Natural Earth country borders
  var EU_MASK = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010000000000000000000010000000000001000000000000000000001000000000000100000000000000000000100000000000000000000100000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000';
  var EU_EXTRA = [[34.9,32.9,1],[36.7,-5.4,1],[37.6,-8.7,1],[37.6,-7.6,1],[37.6,-6.5,1],[37.6,-5.3,1],[37.6,-4.2,1],[37.6,-3,1],[37.6,-1.9,1],[37.6,-0.8,1],[37.6,12.9,1],[37.6,14,1],[37.6,15.1,1],[37.6,21.9,1],[37.6,23.1,1],[38.5,-8.7,1],[38.5,-7.5,1],[38.5,-6.4,1],[38.5,-5.2,1],[38.5,-4.1,1],[38.5,-2.9,1],[38.5,-1.8,1],[38.5,-0.6,1],[38.5,21.2,1],[38.5,22.4,1],[38.5,23.5,1],[39.4,-8.7,1],[39.4,-7.5,1],[39.4,-6.3,1],[39.4,-5.2,1],[39.4,-4,1],[39.4,-2.8,1],[39.4,-1.7,1],[39.4,-0.5,1],[39.4,3,1],[39.4,8.8,1],[39.4,17,1],[39.4,20.4,1],[39.4,21.6,1],[39.4,22.8,1],[40.3,-8.6,1],[40.3,-7.5,1],[40.3,-6.3,1],[40.3,-5.1,1],[40.3,-3.9,1],[40.3,-2.7,1],[40.3,-1.6,1],[40.3,-0.4,1],[40.3,9.1,1],[40.3,15,1],[40.3,16.1,1],[40.3,20.9,1],[40.3,22,1],[40.3,23.2,1],[41.2,-8.6,1],[41.2,-7.4,1],[41.2,-6.2,1],[41.2,-5,1],[41.2,-3.8,1],[41.2,-2.6,1],[41.2,-1.4,1],[41.2,-0.2,1],[41.2,1,1],[41.2,14.1,1],[41.2,15.3,1],[41.2,16.5,1],[41.2,23.7,1],[41.2,24.9,1],[41.2,26.1,1],[42.1,-8.6,1],[42.1,-7.4,1],[42.1,-6.1,1],[42.1,-4.9,1],[42.1,-3.7,1],[42.1,-2.5,1],[42.1,-1.3,1],[42.1,-0.1,1],[42.1,1.1,1],[42.1,2.3,1],[42.1,12,1],[42.1,13.3,1],[42.1,14.5,1],[42.1,23,1],[42.1,24.2,1],[42.1,25.4,1],[42.1,26.6,1],[42.1,27.8,1],[43,-8.5,1],[43,-7.3,1],[43,-6.1,1],[43,-4.8,1],[43,-3.6,1],[43,-2.4,1],[43,-1.2,1],[43,0.1,1],[43,1.3,1],[43,2.5,1],[43,11.2,1],[43,12.4,1],[43,13.6,1],[43,23.5,1],[43,24.7,1],[43,25.9,1],[43,27.1,1],[43.9,-1,1],[43.9,0.2,1],[43.9,1.5,1],[43.9,2.7,1],[43.9,4,1],[43.9,5.2,1],[43.9,6.5,1],[43.9,7.7,1],[43.9,10.2,1],[43.9,11.5,1],[43.9,12.7,1],[43.9,16.5,1],[43.9,22.7,1],[43.9,24,1],[43.9,25.2,1],[43.9,26.5,1],[43.9,27.7,1],[44.8,-0.9,1],[44.8,0.4,1],[44.8,1.7,1],[44.8,3,1],[44.8,4.2,1],[44.8,5.5,1],[44.8,6.8,1],[44.8,8,1],[44.8,9.3,1],[44.8,10.6,1],[44.8,11.8,1],[44.8,14.4,1],[44.8,15.6,1],[44.8,22,1],[44.8,23.2,1],[44.8,24.5,1],[44.8,25.8,1],[44.8,27.1,1],[44.8,28.3,1],[45.7,-0.7,1],[45.7,0.6,1],[45.7,1.9,1],[45.7,3.2,1],[45.7,4.5,1],[45.7,5.8,1],[45.7,7,1],[45.7,8.3,1],[45.7,9.6,1],[45.7,10.9,1],[45.7,12.2,1],[45.7,14.8,1],[45.7,16.1,1],[45.7,17.3,1],[45.7,18.6,1],[45.7,21.2,1],[45.7,22.5,1],[45.7,23.8,1],[45.7,25.1,1],[45.7,26.4,1],[45.7,27.7,1],[46.6,-1.8,1],[46.6,-0.5,1],[46.6,0.8,1],[46.6,2.1,1],[46.6,3.4,1],[46.6,4.7,1],[46.6,6,1],[46.6,11.3,1],[46.6,12.6,1],[46.6,13.9,1],[46.6,15.2,1],[46.6,16.5,1],[46.6,17.8,1],[46.6,19.1,1],[46.6,20.4,1],[46.6,21.7,1],[46.6,23.1,1],[46.6,24.4,1],[46.6,25.7,1],[46.6,27,1],[47.5,-1.7,1],[47.5,-0.3,1],[47.5,1,1],[47.5,2.3,1],[47.5,3.7,1],[47.5,5,1],[47.5,6.3,1],[47.5,10.3,1],[47.5,11.6,1],[47.5,13,1],[47.5,14.3,1],[47.5,15.6,1],[47.5,17,1],[47.5,18.3,1],[47.5,19.6,1],[47.5,21,1],[47.5,22.3,1],[47.5,23.6,1],[47.5,25,1],[47.5,26.3,1],[48.4,-4.2,1],[48.4,-2.9,1],[48.4,-1.5,1],[48.4,-0.2,1],[48.4,1.2,1],[48.4,2.6,1],[48.4,3.9,1],[48.4,5.3,1],[48.4,6.6,1],[48.4,8,1],[48.4,9.3,1],[48.4,10.7,1],[48.4,12,1],[48.4,13.4,1],[48.4,14.8,1],[48.4,16.1,1],[48.4,17.5,1],[48.4,18.8,1],[48.4,20.2,1],[48.4,21.5,1],[49.3,-1.3,1],[49.3,0,1],[49.3,1.4,1],[49.3,2.8,1],[49.3,4.2,1],[49.3,5.6,1],[49.3,6.9,1],[49.3,8.3,1],[49.3,9.7,1],[49.3,11.1,1],[49.3,12.5,1],[49.3,13.8,1],[49.3,15.2,1],[49.3,16.6,1],[49.3,18,1],[49.3,19.4,1],[49.3,20.7,1],[49.3,22.1,1],[50.2,1.7,1],[50.2,3.1,1],[50.2,4.5,1],[50.2,5.9,1],[50.2,7.3,1],[50.2,8.7,1],[50.2,10.1,1],[50.2,11.5,1],[50.2,12.9,1],[50.2,14.3,1],[50.2,15.7,1],[50.2,17.1,1],[50.2,18.5,1],[50.2,19.9,1],[50.2,21.3,1],[50.2,22.7,1],[51.1,3.3,1],[51.1,4.8,1],[51.1,6.2,1],[51.1,7.6,1],[51.1,9.1,1],[51.1,10.5,1],[51.1,11.9,1],[51.1,13.4,1],[51.1,14.8,1],[51.1,16.2,1],[51.1,17.7,1],[51.1,19.1,1],[51.1,20.5,1],[51.1,22,1],[51.1,23.4,1],[52,5.1,1],[52,6.5,1],[52,8,1],[52,9.5,1],[52,10.9,1],[52,12.4,1],[52,13.9,1],[52,15.3,1],[52,16.8,1],[52,18.2,1],[52,19.7,1],[52,21.2,1],[52,22.6,1],[52.9,5.4,1],[52.9,6.9,1],[52.9,8.4,1],[52.9,9.9,1],[52.9,11.4,1],[52.9,12.9,1],[52.9,14.4,1],[52.9,15.9,1],[52.9,17.3,1],[52.9,18.8,1],[52.9,20.3,1],[52.9,21.8,1],[52.9,23.3,1],[53.8,8.8,1],[53.8,10.3,1],[53.8,11.9,1],[53.8,13.4,1],[53.8,14.9,1],[53.8,16.4,1],[53.8,18,1],[53.8,19.5,1],[53.8,21,1],[53.8,22.5,1],[54.7,9.2,1],[54.7,23.3,1],[54.7,24.8,1],[55.6,9.7,1],[55.6,11.3,1],[55.6,22.5,1],[55.6,24,1],[55.6,25.6,1],[56.5,8.6,1],[56.5,10.2,1],[56.5,13.5,1],[56.5,15.1,1],[56.5,21.6,1],[56.5,23.2,1],[56.5,24.9,1],[56.5,26.5,1],[57.4,12.4,1],[57.4,14.1,1],[57.4,15.7,1],[57.4,22.4,1],[57.4,25.8,1],[57.4,27.4,1],[58.3,13,1],[58.3,14.7,1],[58.3,16.4,1],[58.3,25,1],[58.3,26.7,1],[59.2,11.8,1],[59.2,13.6,1],[59.2,15.4,1],[59.2,17.1,1],[59.2,24.2,1],[59.2,25.9,1],[59.2,27.7,1],[60.1,14.3,1],[60.1,16.1,1],[60.1,17.9,1],[60.1,23.3,1],[61,13.1,1],[61,15,1],[61,16.8,1],[61,22.4,1],[61,24.3,1],[61,26.1,1],[61,28,1],[61.9,13.8,1],[61.9,15.8,1],[61.9,21.5,1],[61.9,23.4,1],[61.9,25.3,1],[61.9,27.2,1],[61.9,29.1,1],[62.8,12.6,1],[62.8,14.6,1],[62.8,16.6,1],[62.8,22.5,1],[62.8,24.4,1],[62.8,26.4,1],[62.8,28.4,1],[62.8,30.3,1],[63.7,13.4,1],[63.7,15.4,1],[63.7,17.4,1],[63.7,19.5,1],[63.7,23.5,1],[63.7,25.6,1],[63.7,27.6,1],[63.7,29.6,1],[64.6,14.2,1],[64.6,16.3,1],[64.6,18.4,1],[64.6,20.5,1],[64.6,24.7,1],[64.6,26.8,1],[64.6,28.9,1],[65.5,15,1],[65.5,17.2,1],[65.5,19.4,1],[65.5,21.6,1],[65.5,25.9,1],[65.5,28.1,1],[66.4,16,1],[66.4,18.2,1],[66.4,20.5,1],[66.4,22.7,1],[66.4,25,1],[66.4,27.2,1],[66.4,29.5,1],[67.3,17,1],[67.3,19.3,1],[67.3,21.7,1],[67.3,24,1],[67.3,26.3,1],[67.3,28.6,1],[68.2,20.5,1],[68.2,22.9,1],[68.2,25.4,1],[68.2,27.8,1],[69.1,21.8,1],[69.1,26.8,1],[51.75,-9.87,2],[51.75,-9.15,2],[51.75,-8.42,2],[52.2,-9.87,2],[52.2,-9.13,2],[52.2,-8.4,2],[52.2,-7.66,2],[52.2,-6.93,2],[52.65,-8.37,2],[52.65,-7.63,2],[52.65,-6.89,2],[53.1,-9.1,2],[53.1,-8.35,2],[53.1,-7.6,2],[53.1,-6.85,2],[53.1,-6.1,2],[53.55,-9.84,2],[53.55,-9.09,2],[53.55,-8.33,2],[53.55,-7.57,2],[53.55,-6.81,2],[54,-9.83,2],[54,-9.07,2],[54,-8.3,2],[54,-7.54,2],[54,-6.77,2],[54.45,-8.28,2],[54.9,-8.25,2],[54.9,-7.47,2]];
  // Planet surface: evenly spread points, each with a "heat" for the imaged swath
  var pts = [], N = 1100, i;
  for (i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
    pts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r, heat: 0, land: +EU_MASK[i], fine: 0 });
  }
  // Extra, finer dots so the EU (green) and Ireland (brighter green) have a recognisable shape
  EU_EXTRA.forEach(function (e) {
    var la = e[0] * Math.PI / 180, lo = e[1] * Math.PI / 180;
    pts.push({ x: Math.cos(la) * Math.cos(lo), y: -Math.sin(la), z: Math.cos(la) * Math.sin(lo), heat: 0, land: e[2], fine: 1 });
  });
  N = pts.length;
  // Ground stations (lat, lon). Screen y points down, so north is negative y.
  var stations = [[67.9, 20.2], [50.1, 5.25], [-31.0, 116.2], [-35.8, -69.4], [53.31, -6.22]]
    .map(function (s) {
      var la = s[0] * Math.PI / 180, lo = s[1] * Math.PI / 180;
      return { x: Math.cos(la) * Math.cos(lo), y: -Math.sin(la), z: Math.cos(la) * Math.sin(lo), link: 0 };
    });

  var SPIN = 0.00016, SAT_R = 1.62, SPEED = 0.00042, TILT = 0.55;
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
    // soft glow behind the planet
    var g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.9);
    g.addColorStop(0, 'rgba(170,80,255,0.26)'); g.addColorStop(1, 'rgba(170,80,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    // planet points, lit up where the radar has imaged
    ctx.globalCompositeOperation = 'lighter';
    var landQ = [];
    for (var j = 0; j < N; j++) {
      var p = pts[j], q = spin(p, a);
      if (imaging) {
        var dx = q[0] - foot[0], dy = q[1] - foot[1], dz = q[2] - foot[2];
        if (dx * dx + dy * dy + dz * dz < 0.016) p.heat = 1;
      }
      p.heat *= 0.9975;
      var depth = (q[2] + 1) / 2, h = p.heat;
      var s = 1.25 * dpr * (0.55 + depth * 0.9) * (1 + h * 0.6) * (p.fine ? 0.8 : 1) * (p.land === 2 ? 1.15 : 1);
      var hue = 268 - h * 95, light = 55 + depth * 18 + h * 15, alpha = 0.12 + depth * 0.7 + h * 0.3;
      if (p.land === 1) { hue = 140; light = 40 + depth * 10 + h * 8; alpha = 0.25 + depth * 0.6; }
      if (p.land === 2) { hue = 115; light = 58 + depth * 8; alpha = 0.35 + depth * 0.6; }
      var col = 'hsla(' + hue + ',95%,' + light + '%,' + Math.min(alpha, 1) + ')';
      if (p.land) { landQ.push([q[0], q[1], s, col, p.land]); continue; }
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(cx + q[0] * R, cy + q[1] * R, s, 0, 6.283); ctx.fill();
    }
    // EU and Ireland drawn on top with normal blending so the dense dots stay green, not white
    ctx.globalCompositeOperation = 'source-over';
    landQ.sort(function (m, n) { return m[4] - n[4]; });
    for (var L2 = 0; L2 < landQ.length; L2++) {
      var lq = landQ[L2]; ctx.fillStyle = lq[3];
      ctx.beginPath(); ctx.arc(cx + lq[0] * R, cy + lq[1] * R, lq[2], 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'lighter';

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
      ctx.fillStyle = 'rgba(120,240,210,' + (0.25 * pulse) * vis + ')';
      ctx.beginPath(); ctx.arc(gx, gy, (5 + 5 * pulse) * dpr, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(190,255,240,' + 0.8 * vis + ')';
      ctx.beginPath(); ctx.moveTo(gx, gy - 2.6 * dpr); ctx.lineTo(gx + 2.3 * dpr, gy + 1.7 * dpr); ctx.lineTo(gx - 2.3 * dpr, gy + 1.7 * dpr); ctx.closePath(); ctx.fill();
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
