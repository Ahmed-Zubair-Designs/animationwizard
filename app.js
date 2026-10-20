/* Animation Wizard - site script. You normally never need to edit this file.
   All videos, links, categories and prices live in videos.js. */
(function () {
  'use strict';
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var qs = function (sel, root) { return (root || document).querySelector(sel); };
  var qsa = function (sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  function ytId(u) {
    if (!u) return null;
    var m = String(u).trim().match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#\s]*&)?v=|embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  function isShort(u) { return /\/shorts\//.test(String(u || '')); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function slug(s) { return String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function norm(s) { return String(s || '').trim().toLowerCase(); }
  function asItem(x) { return typeof x === 'string' ? { link: x } : (x || {}); }
  function mmss(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

  var ICON = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z"/></svg>',
    upwork: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 6.6a4.7 4.7 0 0 0-4.6 3.7 15 15 0 0 1-2-4.2H8.6v5.6a2.1 2.1 0 1 1-4.2 0V6.1H2v5.6a4.5 4.5 0 1 0 9 0v-.9a14 14 0 0 0 1.4 2.3L11 19.5h2.4l1-4.6a5.6 5.6 0 0 0 3.1.9 4.6 4.6 0 0 0 0-9.2zm0 6.8a4.4 4.4 0 0 1-2.6-1l.2-.9v-.1c.2-1 .8-2.5 2.4-2.5a2.3 2.3 0 0 1 0 4.5z"/></svg>',
    fiverr: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 7.9H9.7v-.5c0-1 .8-1.3 1.6-1.3h1.6V2.9h-2.2C7.8 2.9 6 4.6 6 7.3v.6H3.9V11H6v10h3.7V11h3.8v10h3.7V7.9h-1.6zm1-2.1a2 2 0 1 0 0-4.1 2 2 0 0 0 0 4.1z" transform="translate(1.5 0)"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };
  qsa('[data-icon]').forEach(function (el) { el.innerHTML = ICON[el.getAttribute('data-icon')] || ''; });

  /* category order and label colours */
  var CAT_ORDER = (S.categories || []).slice();
  var COLORS = ['#8E7CFF', '#2FC2B4', '#F2B930', '#FF6FA8', '#FF8A4C', '#B07CFF', '#4FB0FF'];
  function catColor(name) { var i = CAT_ORDER.map(norm).indexOf(norm(name)); return COLORS[(i < 0 ? 0 : i) % COLORS.length]; }
  var verticalCats = (S.verticalCategories || []).map(norm);
  function isVertical(item) { return isShort(item.link) || verticalCats.indexOf(norm(item.category)) > -1; }

  /* ---------- contact links ---------- */
  var LINKS = S.links || {};
  var SOC = [
    { k: 'whatsapp', n: 'WhatsApp', s: 'Message me directly' },
    { k: 'upwork', n: 'Upwork', s: 'Hire me on Upwork' },
    { k: 'fiverr', n: 'Fiverr', s: 'See my gigs' },
    { k: 'linkedin', n: 'LinkedIn', s: "Let's connect" }
  ];
  function linkOk(u) { return !!u && !/YOUR|XXXX/.test(u); }
  function linkAttrs(k) {
    var u = LINKS[k];
    return linkOk(u) ? 'href="' + esc(u) + '" target="_blank" rel="noopener"' : 'href="#" aria-disabled="true"';
  }
  if ($('navsoc')) $('navsoc').innerHTML = SOC.map(function (l) { return '<a class="ic" ' + linkAttrs(l.k) + ' title="' + l.n + '" aria-label="' + l.n + '">' + ICON[l.k] + '</a>'; }).join('');
  if ($('soc')) $('soc').innerHTML = SOC.map(function (l) { return '<a ' + linkAttrs(l.k) + '><span class="ic">' + ICON[l.k] + '</span><span>' + l.n + '<small>' + l.s + '</small></span></a>'; }).join('');
  document.addEventListener('click', function (e) { var a = e.target.closest('a[aria-disabled="true"]'); if (a) e.preventDefault(); });

  /* ---------- YouTube titles (cached) ---------- */
  function getTitle(id) {
    var key = 'aw_t_' + id;
    try { var c = localStorage.getItem(key); if (c) return Promise.resolve(c); } catch (e) {}
    return fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && j.title) { try { localStorage.setItem(key, j.title); } catch (e) {} return j.title; } return null; })
      .catch(function () { return null; });
  }

  /* ---------- thumbnails ---------- */
  function thumbImg(id, vertical, className) {
    var img = new Image();
    img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
    if (className) img.className = className;
    var list = (vertical ? ['oardefault'] : []).concat(['maxresdefault', 'hqdefault']), i = 0;
    function next() { if (i >= list.length) { img.remove(); return; } img.src = 'https://i.ytimg.com/vi/' + id + '/' + list[i++] + '.jpg'; }
    img.onload = function () { if (img.naturalWidth <= 120 && i < list.length) next(); };
    img.onerror = next;
    next();
    return img;
  }

  /* ---------- cards ---------- */
  function card(item, vertical) {
    var id = ytId(item.link), el = document.createElement('div');
    el.className = 'card glass';
    el.innerHTML = '<div class="th"><span class="art"></span><span class="pp">' + ICON.play + '</span>' + (item.duration ? '<span class="d mono">' + esc(item.duration) + '</span>' : '') + '</div><h3></h3><span><i style="background:' + catColor(item.category) + '"></i>' + esc(item.category || '') + '</span>';
    var th = qs('.th', el), h = qs('h3', el);
    if (vertical) th.style.aspectRatio = '9 / 16';
    if (!id) { el.classList.add('ph'); var c = catColor(item.category); qs('.art', th).style.background = 'linear-gradient(135deg,#ffffff 0%,' + c + '55 55%,' + c + '99 100%)'; }
    if (id) th.insertBefore(thumbImg(id, vertical), th.children[1]);
    h.textContent = item.title || (id ? 'Loading…' : 'Coming soon');
    if (id && !item.title) getTitle(id).then(function (t) { h.textContent = t || 'Watch video'; });
    if (id) {
      el.tabIndex = 0; el.setAttribute('role', 'button'); el.setAttribute('aria-label', 'Play video');
      var go = function () { openVideo(id, vertical, h.textContent, item.category); };
      el.addEventListener('click', go);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    }
    return el;
  }

  /* ---------- video pop-up ---------- */
  var vm;
  function openVideo(id, vertical, title, cat) {
    if (!vm) {
      vm = document.createElement('div');
      vm.className = 'modal'; vm.hidden = true;
      vm.innerHTML = '<div class="mbox glass" role="dialog" aria-modal="true" aria-label="Video"><button class="mx" aria-label="Close video">&times;</button><div class="mv"></div><div class="mcap"><b></b><span class="mono"></span></div></div>';
      document.body.appendChild(vm);
      vm.addEventListener('click', function (e) { if (e.target === vm || e.target.closest('.mx')) closeVideo(); });
    }
    qs('.mbox', vm).classList.toggle('vert', !!vertical);
    qs('.mv', vm).innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="' + esc(title || 'Video') + '"></iframe>';
    qs('.mcap b', vm).textContent = title || '';
    qs('.mcap span', vm).textContent = cat || '';
    vm.hidden = false; document.body.style.overflow = 'hidden';
    qs('.mx', vm).focus();
  }
  function closeVideo() { if (!vm || vm.hidden) return; vm.hidden = true; qs('.mv', vm).innerHTML = ''; document.body.style.overflow = ''; }

  /* ---------- quote pop-up: short form, sends to WhatsApp ---------- */
  var qm, qsel = {};
  function waNumber() { var m = String(LINKS.whatsapp || '').match(/wa\.me\/\+?(\d{7,15})/); return m && !/XXXX/.test(LINKS.whatsapp) ? m[1] : null; }
  function chipGroup(key, opts) {
    return '<div class="chips" data-group="' + key + '">' + opts.map(function (o) {
      return '<button type="button" aria-pressed="false" data-v="' + esc(o.v) + '">' + (o.c ? '<i style="background:' + o.c + '"></i>' : '') + esc(o.v) + '</button>';
    }).join('') + '</div>';
  }
  function quoteMessage() {
    var f = function (id) { return (($(id) || {}).value || '').trim(); };
    var lines = ["Hi Ahmed, I'd like a quote.", ''];
    if (f('qName')) lines.push('Name: ' + f('qName'));
    if (f('qCo')) lines.push('Company: ' + f('qCo'));
    if (qsel.type) lines.push('Video: ' + qsel.type);
    if (qsel.len) lines.push('Length: ' + qsel.len);
    if (qsel.when) lines.push('Needed: ' + qsel.when);
    if (qsel.budget) lines.push('Budget: ' + qsel.budget);
    if (f('qBrief')) { lines.push(''); lines.push(f('qBrief')); }
    return lines.join('\n');
  }
  function updateQuote() {
    var msg = quoteMessage(), n = waNumber(), btn = $('qSend');
    $('qPrev').textContent = msg;
    if (n) { btn.href = 'https://wa.me/' + n + '?text=' + encodeURIComponent(msg); btn.removeAttribute('aria-disabled'); }
  }
  function openQuote(type) {
    if (!qm) {
      var types = (S.pricing || []).map(function (p) { return { v: p.name, c: catColor(p.name) }; }).concat([{ v: 'Something else' }]);
      qm = document.createElement('div');
      qm.className = 'qm'; qm.hidden = true;
      qm.innerHTML = '<div class="qbox glass" role="dialog" aria-modal="true" aria-labelledby="qTitle">' +
        '<form class="qf" id="qForm" novalidate>' +
          '<div class="qtop"><div><h3 id="qTitle">Get a quote</h3><p>About a minute. I\'ll reply with a fixed price within a day.</p></div><button type="button" class="qx" aria-label="Close">&times;</button></div>' +
          '<div class="q2"><div><label for="qName">Your name</label><input id="qName" autocomplete="name" placeholder="Your name"></div><div><label for="qCo">Company or brand</label><input id="qCo" autocomplete="organization" placeholder="Optional"></div></div>' +
          '<span class="lab">What kind of video?</span>' + chipGroup('type', types) +
          '<span class="lab">How long?</span>' + chipGroup('len', [{ v: 'Under 30s' }, { v: '30 to 60s' }, { v: '60 to 90s' }, { v: 'Over 90s' }, { v: 'Not sure yet' }]) +
          '<div class="q2"><div><span class="lab">When do you need it?</span>' + chipGroup('when', [{ v: 'This week' }, { v: 'In 2 weeks' }, { v: 'A month' }, { v: 'Flexible' }]) + '</div>' +
          '<div><span class="lab">Budget</span>' + chipGroup('budget', [{ v: 'Under $100' }, { v: '$100 to $300' }, { v: '$300 to $500' }, { v: '$500+' }]) + '</div></div>' +
          '<label for="qBrief">Tell me about it</label><textarea id="qBrief" placeholder="What is the video for, and where will it be shown?"></textarea>' +
          '<div class="qgo"><a class="cta" id="qSend" target="_blank" rel="noopener" href="#" aria-disabled="true"><span>' + ICON.whatsapp + '</span>Send on WhatsApp</a><small id="qNote">WhatsApp opens with your answers filled in. Just press send.</small></div>' +
        '</form>' +
        '<div class="qpv" aria-hidden="true"><h4>' + ICON.whatsapp + 'Message preview</h4><div class="chat"><div class="who"><img src="me.png" alt=""><div>Ahmed<small>Animation Wizard</small></div></div><div class="bub" id="qPrev"></div></div></div>' +
      '</div>';
      document.body.appendChild(qm);
      if (!waNumber()) { $('qNote').textContent = 'WhatsApp number not set yet. Add it in videos.js.'; $('qNote').className = 'warn'; }
      qm.addEventListener('click', function (e) {
        if (e.target === qm || e.target.closest('.qx')) { closeQuote(); return; }
        var b = e.target.closest('.chips button');
        if (b) {
          var g = b.parentNode.getAttribute('data-group'), on = b.getAttribute('aria-pressed') !== 'true';
          qsa('button', b.parentNode).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', String(on)); qsel[g] = on ? b.getAttribute('data-v') : '';
          updateQuote();
        }
      });
      qm.addEventListener('input', updateQuote);
      $('qForm').addEventListener('submit', function (e) { e.preventDefault(); });
      $('qSend').addEventListener('click', function (e) {
        if (!waNumber()) { e.preventDefault(); return; }
        if (!$('qName').value.trim()) { e.preventDefault(); $('qName').focus(); $('qName').placeholder = 'Please add your name'; }
      });
    }
    if (type) {
      var grp = qs('[data-group="type"]', qm);
      qsa('button', grp).forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-v') === type)); });
      qsel.type = type;
    }
    updateQuote();
    qm.hidden = false; document.body.style.overflow = 'hidden';
    setTimeout(function () { $('qName').focus(); }, 30);
  }
  function closeQuote() { if (!qm || qm.hidden) return; qm.hidden = true; document.body.style.overflow = ''; }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-quote]'); if (b) { e.preventDefault(); openQuote(b.getAttribute('data-quote') || ''); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeVideo(); closeQuote(); } });

  /* =================================================================
     HOME PAGE
     ================================================================= */
  if (document.body.classList.contains('home')) {
    var home = S.home || {};

    /* recent work + work I'm proud of */
    var recent = $('recent');
    (home.recent || []).map(asItem).slice(0, 4).forEach(function (it) { recent.appendChild(card(it, false)); });
    var proud = $('proud');
    var reelItem = asItem(home.proudReel);
    if (!reelItem.category) reelItem.category = 'Verticals';
    var rc = card(reelItem, true); rc.classList.add('rl'); rc.querySelector('.th').style.aspectRatio = 'auto'; proud.appendChild(rc);
    (home.proud || []).map(asItem).slice(0, 4).forEach(function (it) { proud.appendChild(card(it, false)); });

    /* pricing: hovered row pops, clicking opens those videos on the portfolio page */
    var price = $('price');
    price.innerHTML = (S.pricing || []).map(function (p, i) {
      return '<a class="row' + (i === 0 ? ' on' : '') + '" href="portfolio.html#' + slug(p.name) + '" aria-label="See ' + esc(p.name) + ' videos">' +
        '<span class="sw" style="background:' + catColor(p.name) + '"></span>' +
        '<h3>' + esc(p.name) + (p.popular ? '<small>Most requested</small>' : '') + '</h3>' +
        '<ul>' + (p.includes || []).map(function (x) { return '<li>' + ICON.check + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="pr">from<b>$' + esc(p.from) + '</b><span class="see">See videos ' + ICON.arrow + '</span></div></a>';
    }).join('');
    var rows = qsa('.row', price), first = rows[0];
    function pop(r) { rows.forEach(function (x) { x.classList.toggle('on', x === r); }); }
    rows.forEach(function (r) { r.addEventListener('mouseenter', function () { pop(r); }); r.addEventListener('focus', function () { pop(r); }); });
    price.addEventListener('mouseleave', function () { pop(first); });

    /* custom cursor, position follows the mouse, Scale and Rotation are draggable */
    var cursorEl = $('cur'), fine = window.matchMedia && matchMedia('(pointer: fine)').matches;
    var SCALE = 50, ROT = -12, mx = -100, my = -100;   /* 50% and -12 degrees = the normal cursor */
    function drawCursor() { cursorEl.style.transform = 'translate(' + mx + 'px,' + my + 'px) rotate(' + (ROT + 12) + 'deg) scale(' + (SCALE / 50) + ')'; }
    if (fine) document.documentElement.classList.add('cc');
    var pos = $('pos');
    /* hide the page cursor while the mouse is over a YouTube player (the player shows its own cursor) */
    function hideCur() { cursorEl.style.opacity = '0'; }
    function overPlayer(x, y) { var el = document.elementFromPoint(x, y); return !!el && el.tagName === 'IFRAME'; }
    document.addEventListener('pointerout', function (e) { var t = e.relatedTarget; if (!t || t.tagName === 'IFRAME') hideCur(); });
    window.addEventListener('scroll', function () { if (overPlayer(mx, my)) hideCur(); }, { passive: true });
    window.addEventListener('blur', hideCur);
    window.addEventListener('pointermove', function (e) {
      mx = e.clientX; my = e.clientY;
      cursorEl.style.opacity = overPlayer(mx, my) ? '0' : '1';
      var x = Math.round(Math.min(1, Math.max(0, e.clientX / innerWidth)) * 1920), y = Math.round(Math.min(1, Math.max(0, e.clientY / innerHeight)) * 1080);
      pos.textContent = x + ', ' + y; drawCursor();
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', function () { mx = my = -100; drawCursor(); });
    function scrubber(el, get, set, fmt, step) {
      var sx = 0, sv = 0, on = false;
      function show() { el.textContent = fmt(get()); }
      function stop() { on = false; el.classList.remove('on'); }
      el.addEventListener('pointerdown', function (e) { if (el.isContentEditable || e.button !== 0) return; on = true; sx = e.clientX; sv = get(); el.classList.add('on'); try { el.setPointerCapture(e.pointerId); } catch (_) {} e.preventDefault(); });
      el.addEventListener('pointermove', function (e) { if (on && !(e.buttons & 1)) stop(); if (!on) return; mx = e.clientX; my = e.clientY; set(sv + (e.clientX - sx) * step * (e.shiftKey ? 5 : 1)); show(); drawCursor(); });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { el.addEventListener(t, stop); });
      window.addEventListener('pointerup', stop); window.addEventListener('blur', stop);
      el.addEventListener('dblclick', function () { el.contentEditable = 'true'; el.textContent = String(Math.round(get())); el.focus(); document.getSelection().selectAllChildren(el); });
      el.addEventListener('blur', function () { if (el.isContentEditable) { el.contentEditable = 'false'; var n = parseFloat(el.textContent); if (!isNaN(n)) set(n); show(); drawCursor(); } });
      el.addEventListener('keydown', function (e) {
        if (el.isContentEditable) { if (e.key === 'Enter') { e.preventDefault(); el.blur(); } return; }
        var d = (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? -1 : 0;
        if (d) { set(get() + d * (e.shiftKey ? 10 : 1)); show(); drawCursor(); e.preventDefault(); }
      });
      show();
    }
    scrubber($('vScale'), function () { return SCALE; }, function (v) { SCALE = Math.max(50, Math.min(150, Math.round(v))); }, function (v) { return String(v); }, 0.5);
    scrubber($('vRot'), function () { return ROT; }, function (v) { ROT = Math.max(-180, Math.min(180, Math.round(v))); }, function (v) { return (v >= 0 ? '+' : '') + v + '°'; }, 0.6);

    /* speed graph: cycles through ease curves every 3 seconds */
    var P0 = [8, 94], P3 = [222, 10], GW = P3[0] - P0[0], GH = P0[1] - P3[1];
    var eases = [
      { n: 'Easy ease', o: 33, i: 33, c: [.33, 0, .67, 1] },
      { n: 'Smooth', o: 80, i: 80, c: [.8, 0, .2, 1] },
      { n: 'Ease out', o: 15, i: 85, c: [.15, 0, .15, 1] },
      { n: 'Overshoot', o: 40, i: 60, c: [.4, 0, .4, 1.35] }
    ];
    var gcur = eases[0].c.slice(), gfrom = gcur.slice(), gto = gcur.slice(), gi = 0, gStart = 0;
    function gpt(c, k) { return [P0[0] + GW * c[k * 2], P0[1] - GH * c[k * 2 + 1]]; }
    function bez(c, t) { var a = P0, b = gpt(c, 0), d = gpt(c, 1), e = P3, u = 1 - t; return [u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * d[0] + t * t * t * e[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * d[1] + t * t * t * e[1]]; }
    function drawGraph(c, dotT) {
      var a = gpt(c, 0), b = gpt(c, 1), d = bez(c, dotT);
      $('gCurve').setAttribute('d', 'M' + P0 + ' C' + a + ' ' + b + ' ' + P3);
      $('gH1').setAttribute('d', 'M' + P0 + ' L' + a); $('gH2').setAttribute('d', 'M' + P3 + ' L' + b);
      $('gC1').setAttribute('cx', a[0]); $('gC1').setAttribute('cy', a[1]); $('gC2').setAttribute('cx', b[0]); $('gC2').setAttribute('cy', b[1]);
      $('gDot').setAttribute('cx', d[0]); $('gDot').setAttribute('cy', d[1]);
    }
    function glabel(e) { $('gName').textContent = e.n; $('gOut').textContent = 'Out ' + e.o + '%'; $('gIn').textContent = 'In ' + e.i + '%'; }
    function smooth(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    glabel(eases[0]); drawGraph(gcur, .5);
    if (!reduce) {
      setInterval(function () { gi = (gi + 1) % eases.length; gfrom = gcur.slice(); gto = eases[gi].c.slice(); gStart = performance.now(); glabel(eases[gi]); }, 3000);
      (function gloop(now) { var s = smooth(Math.min(1, (now - gStart) / 700)); for (var j = 0; j < 4; j++) gcur[j] = gfrom[j] + (gto[j] - gfrom[j]) * s; drawGraph(gcur, (now % 2000) / 2000); requestAnimationFrame(gloop); })(0);
    }

    /* orbiting software icons */
    var vis = $('vis'), icons = qsa('.oi'), dashes = qsa('.rd');
    var CX = 343, CY = 300, RX = 245, RY = 118, N = 5, PERIOD = 14000, PH = .35 * Math.PI, LEN = 2 * Math.PI * Math.sqrt((RX * RX + RY * RY) / 2);
    function fit() {
      var k = window.innerWidth > 1000 ? Math.min(1.3, vis.clientWidth / 560, vis.clientHeight * 0.94 / 550) : Math.min(1, vis.clientWidth / 633);
      vis.style.setProperty('--k', k.toFixed(4));
    }
    fit(); window.addEventListener('resize', fit);
    function orbit(t) {
      icons.forEach(function (el, i) {
        var th = (t / PERIOD) * 2 * Math.PI + i * 2 * Math.PI / N + PH, s = Math.sin(th), c = Math.cos(th), d = (s + 1) / 2, front = Math.max(0, s), back = Math.max(0, -s);
        el.style.transform = 'translate3d(' + (CX + RX * c - 43).toFixed(2) + 'px,' + (CY + RY * s - 43).toFixed(2) + 'px,0) scale(' + (.74 + .42 * d).toFixed(4) + ')';
        el.style.zIndex = s > 0 ? 4 : 1;
        el.style.opacity = (.62 + .38 * d).toFixed(3);
        el.style.filter = 'blur(' + (.9 * back).toFixed(2) + 'px) brightness(' + (.9 + .1 * d).toFixed(3) + ') drop-shadow(0 ' + (4 + 6 * front).toFixed(1) + 'px ' + (8 + 10 * front).toFixed(1) + 'px rgba(20,8,60,' + (.06 + .29 * front).toFixed(3) + '))';
      });
      dashes.forEach(function (r) { r.style.strokeDashoffset = (-(t / PERIOD) * LEN).toFixed(1); });
    }
    orbit(800);
    if (!reduce) { var t0 = performance.now() - 800, run = true;
      if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { run = en[0].isIntersecting; }).observe(vis);
      (function oloop(now) { if (run) orbit(now - t0); requestAnimationFrame(oloop); })(t0); }

    /* showreel: the timeline reads the real length and position of your YouTube video */
    var hid = ytId(home.hero), reel = $('reel'), reelV = $('reelV'), ru = $('ru'), phd = $('phd'), keys = qsa('.tlp .k');
    var DURATION = 0, now = 0, playing = false, player = null, ready = false, wantPlay = false, dragging = false;
    qs('.pl', reelV).innerHTML = ICON.play;
    var w = ''; for (var x = 0; x < 400; x += 3) { var hh = 2 + Math.abs(Math.sin(x * .07) * Math.cos(x * .023)) * 7 + (x % 9) / 3; w += '<rect x="' + x + '" y="' + (9 - hh / 2) + '" width="1.6" height="' + hh + '" fill="#C9962A" opacity=".55"/>'; } $('wv').innerHTML = w;
    function niceStep(d) { var st = [1, 2, 5, 10, 15, 20, 30, 60, 120, 300, 600]; for (var i = 0; i < st.length; i++) if (d / st[i] <= 8) return st[i]; return 900; }
    function buildRuler() {
      if (!DURATION) { ru.innerHTML = ''; return; }
      var st = niceStep(DURATION), h = '';
      for (var s = 0; s <= DURATION + .01; s += st / 2) { var p = s / DURATION * 100; h += '<em style="left:' + p + '%"></em>'; if (Math.round(s / st * 2) % 2 === 0 && p < 92) h += '<span style="left:' + p + '%">' + mmss(s) + '</span>'; }
      h += '<span class="end" style="left:100%">' + mmss(DURATION) + '</span>';
      ru.innerHTML = h; $('tcDur').textContent = 'Showreel · ' + mmss(DURATION);
    }
    function place() {
      var box = $('tlp').getBoundingClientRect(), rb = ru.getBoundingClientRect(), f = DURATION ? Math.min(1, now / DURATION) : 0;
      phd.style.left = (rb.left - box.left + rb.width * f - 1) + 'px'; $('tcNow').textContent = mmss(now);
      keys.forEach(function (k) { k.classList.toggle('hit', DURATION > 0 && Math.abs(+k.dataset.t - f) < .012); });
    }
    function setPlay(p) { playing = p; $('pbtn').innerHTML = p ? ICON.pause : ICON.play; $('pbtn').setAttribute('aria-label', p ? 'Pause showreel' : 'Play showreel'); }
    function checkDur(tries) {
      if (!player || !player.getDuration) return;
      var d = player.getDuration();
      if (d > 0) { if (Math.abs(d - DURATION) > .5) { DURATION = d; buildRuler(); place(); } }
      else if ((tries || 0) < 20) setTimeout(function () { checkDur((tries || 0) + 1); }, 500);
    }
    function start() {
      if (!hid) return;
      if (!ready) { wantPlay = true; return; }
      reel.classList.add('started');
      if (playing) player.pauseVideo(); else player.playVideo();
    }
    if (hid) {
      var poster = thumbImg(hid, false, 'poster'); poster.loading = 'eager';
      reelV.insertBefore(poster, qs('.safe', reelV));
      window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('ytReel', {
          host: 'https://www.youtube-nocookie.com', videoId: hid,
          playerVars: { rel: 0, playsinline: 1, modestbranding: 1 },
          events: {
            onReady: function () { ready = true; checkDur(0); if (wantPlay) { wantPlay = false; reel.classList.add('started'); player.playVideo(); } },
            onStateChange: function (e) { if (e.data === 1) { reel.classList.add('started'); setPlay(true); checkDur(0); } else if (e.data === 2 || e.data === 0) setPlay(false); }
          }
        });
      };
      var tag = document.createElement('script'); tag.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(tag);
    } else { $('tcDur').textContent = 'Add your showreel link in videos.js'; }
    $('pbtn').addEventListener('click', start);
    reelV.addEventListener('click', function () { if (!reel.classList.contains('started')) start(); });
    reelV.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && !reel.classList.contains('started')) { e.preventDefault(); start(); } });
    function seekTo(cx, done) {
      if (!DURATION) return;
      var rb = ru.getBoundingClientRect(); now = Math.max(0, Math.min(1, (cx - rb.left) / rb.width)) * DURATION; place();
      if (ready) { player.seekTo(now, !!done); if (done) reel.classList.add('started'); }
    }
    [ru, phd].forEach(function (el) {
      el.addEventListener('pointerdown', function (e) { if (!DURATION) return; dragging = true; try { el.setPointerCapture(e.pointerId); } catch (_) {} seekTo(e.clientX, false); e.preventDefault(); });
      el.addEventListener('pointermove', function (e) { if (!dragging) return; if (!(e.buttons & 1)) { dragging = false; seekTo(e.clientX, true); return; } seekTo(e.clientX, false); });
      el.addEventListener('pointerup', function (e) { if (dragging) { dragging = false; seekTo(e.clientX, true); } });
      el.addEventListener('pointercancel', function () { dragging = false; });
    });
    (function tick() { if (ready && playing && !dragging && player.getCurrentTime) { now = player.getCurrentTime() || 0; place(); } requestAnimationFrame(tick); })();
    setPlay(false); buildRuler(); place(); window.addEventListener('resize', place);
  }

  /* =================================================================
     PORTFOLIO PAGE
     ================================================================= */
  if (document.body.classList.contains('portfolio')) {
    var order = CAT_ORDER.slice(), canon = {}, groups = {};
    order.forEach(function (c) { canon[norm(c)] = c; groups[c] = []; });
    (S.portfolio || []).map(asItem).forEach(function (it) {
      var raw = String(it.category || '').trim() || 'Other', name = canon[norm(raw)] || raw;
      if (!groups[name]) { groups[name] = []; order.push(name); canon[norm(name)] = name; }
      groups[name].push(Object.assign({}, it, { category: name }));
    });
    order.forEach(function (c) { if (!groups[c].length) groups[c] = [{ category: c }, { category: c }, { category: c }]; });
    var withVideos = order.slice();
    var total = withVideos.reduce(function (n, c) { return n + groups[c].length; }, 0);
    var closed = {}, side = $('side'), right = $('right');
    $('pfCount').textContent = total + ' items';

    function activeCat() {
      var h = decodeURIComponent((location.hash || '').slice(1));
      for (var i = 0; i < order.length; i++) if (slug(order[i]) === h) return order[i];
      return 'all';
    }
    function section(c) {
      var sl = slug(c), list = groups[c], vertical = verticalCats.indexOf(norm(c)) > -1;
      var s = document.createElement('div');
      s.className = 'rs' + (closed[sl] ? ' closed' : ''); s.id = 'sec-' + sl;
      s.innerHTML = '<div class="sh"><button class="tw" aria-expanded="' + !closed[sl] + '" aria-controls="g-' + sl + '" title="Show or hide these videos"><span class="kf"><i style="background:' + catColor(c) + '"></i></span><h2>' + esc(c) + '</h2></button><b>' + list.length + (list.length === 1 ? ' video' : ' videos') + '</b><span class="ln"></span></div><div class="gw" id="g-' + sl + '"><div><div class="' + (vertical ? 'g4v' : 'g3') + '"></div></div></div>';
      var grid = qs('.g3, .g4v', s);
      if (!list.length) grid.outerHTML = '<p class="empty">Videos are coming soon. Want one like this? Get a quote.</p>';
      else list.forEach(function (it) { grid.appendChild(card(it, vertical)); });
      qs('.tw', s).addEventListener('click', function () { toggle(s, sl, this); });
      return s;
    }
    function toggle(sec, sl, btn) {
      var gw = qs('.gw', sec), close = !closed[sl]; closed[sl] = close; btn.setAttribute('aria-expanded', String(!close));
      if (reduce || !gw.animate) { sec.classList.toggle('closed', close); return; }
      if (gw._a) gw._a.cancel();
      var from = gw.getBoundingClientRect().height;
      sec.classList.add('anim'); sec.classList.toggle('closed', close);
      gw.style.height = 'auto'; var to = close ? 0 : gw.scrollHeight; gw.style.height = '';
      gw._a = gw.animate([{ height: from + 'px' }, { height: to + 'px' }], { duration: close ? 420 : 520, easing: 'cubic-bezier(.22,1,.36,1)' });
      gw._a.onfinish = function () { gw._a = null; sec.classList.remove('anim'); };
    }
    function render() {
      var a = activeCat();
      side.innerHTML = '<a class="it' + (a === 'all' ? ' on' : '') + '" href="#all"><i style="background:linear-gradient(135deg,#8E7CFF,#FF6FA8)"></i>All work<em>' + total + '</em></a>' +
        withVideos.map(function (c) { return '<a class="it' + (a === c ? ' on' : '') + '" href="#' + slug(c) + '" title="Right-click to copy a link to ' + esc(c) + '"><i style="background:' + catColor(c) + '"></i>' + esc(c) + '<em>' + groups[c].length + '</em></a>'; }).join('');
      right.innerHTML = '';
      (a === 'all' ? withVideos : [a]).forEach(function (c) { right.appendChild(section(c)); });
      if (!right.children.length) right.innerHTML = '<p class="empty">No videos yet.</p>';
    }
    window.addEventListener('hashchange', function () {
      render();
      if (window.innerWidth <= 900) { var l = $('lay'); if (l) l.scrollIntoView({ behavior: 'smooth' }); } else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    render();
  }
})();
