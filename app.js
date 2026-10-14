/* Animation Wizard - site script. You normally never need to edit this file. */
(function () {
  'use strict';
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ---------- helpers ---------- */
  function ytId(u) {
    if (!u) return null;
    var m = String(u).trim().match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#\s]*&)?v=|embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  function isShort(u) { return /\/shorts\//.test(String(u || '')); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function norm(s) { return String(s || '').trim().toLowerCase(); }
  function asItem(x) { return typeof x === 'string' ? { link: x } : (x || {}); }

  var PAL = [['#7C3AED', '#FF3D8B', '#0C0922'], ['#4C1D95', '#A78BFA', '#ffffff'], ['#9333EA', '#312E81', '#F0ABFC'], ['#6D28D9', '#FF3D8B', '#0C0922'], ['#5B21B6', '#C084FC', '#ffffff'], ['#7C3AED', '#312E81', '#F0ABFC']];
  function artHtml(i) {
    var p = PAL[i % PAL.length];
    return '<div class="art2" style="background:linear-gradient(135deg,' + p[0] + ',' + p[1] + ')">' +
      '<span style="left:8%;top:' + (14 + (i % 3) * 6) + '%"></span>' +
      '<span class="sq" style="background:' + p[2] + ';transform:rotate(' + (i * 25 + 8) + 'deg);border-radius:' + (i % 2 ? '50%' : '10px') + '"></span></div>';
  }

  /* ---------- contact links ---------- */
  var links = S.links || {};
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var u = links[a.getAttribute('data-link')] || '';
    if (!u || /YOUR|XXXX/.test(u)) { a.setAttribute('href', '#'); return; }
    a.setAttribute('href', u);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  /* ---------- YouTube titles (cached) ---------- */
  function getTitle(id) {
    var key = 'aw_t_' + id;
    try { var c = localStorage.getItem(key); if (c) return Promise.resolve(c); } catch (e) {}
    return fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (j && j.title) { try { localStorage.setItem(key, j.title); } catch (e) {} return j.title; }
        return null;
      })
      .catch(function () { return null; });
  }

  /* ---------- thumbnails ---------- */
  function thumb(item, i, vertical) {
    var id = ytId(item.link);
    var t = document.createElement('div');
    t.className = 't';
    t.style.aspectRatio = vertical ? '9 / 16' : '16 / 9';
    if (id) {
      var img = new Image();
      img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      var hq = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
      img.onload = function () {
        if (img.naturalWidth <= 120 && !img.dataset.f) { img.dataset.f = '1'; img.src = hq; }
      };
      img.onerror = function () {
        if (!img.dataset.f) { img.dataset.f = '1'; img.src = hq; }
        else { img.remove(); t.insertAdjacentHTML('afterbegin', artHtml(i)); }
      };
      img.src = 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';
      t.appendChild(img);
    } else {
      t.insertAdjacentHTML('afterbegin', artHtml(i));
    }
    t.insertAdjacentHTML('beforeend', '<i></i>');
    return t;
  }

  /* ---------- video modal ---------- */
  var modal;
  function buildModal() {
    var el = document.createElement('div');
    el.className = 'modal'; el.hidden = true;
    el.innerHTML = '<div class="mbox"><button class="mx" aria-label="Close video">&times;</button><div class="mv"></div></div>';
    document.body.appendChild(el);
    modal = { el: el, box: $('.mbox', el), mv: $('.mv', el), x: $('.mx', el) };
    function close() { modal.el.hidden = true; modal.mv.innerHTML = ''; document.body.style.overflow = ''; }
    el.addEventListener('click', function (e) { if (e.target === el || e.target === modal.x) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !el.hidden) close(); });
  }
  function openVideo(id, vertical) {
    if (!modal) buildModal();
    modal.box.classList.toggle('vert', !!vertical);
    modal.mv.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Video player"></iframe>';
    modal.el.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.x.focus();
  }

  /* ---------- cards ---------- */
  var verticalCats = (S.verticalCategories || []).map(norm);
  function isVertical(item) { return isShort(item.link) || verticalCats.indexOf(norm(item.category)) > -1; }

  function makeCard(item, i, kind) {
    var id = ytId(item.link);
    var vertical = isVertical(item);
    var el = document.createElement(kind === 'strip' ? 'div' : 'article');
    el.className = kind === 'strip' ? 'fr' : 'c card';
    if (kind === 'list') el.className = 'c card';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.appendChild(thumb(item, i, kind === 'list' ? vertical : false));
    var h = document.createElement('h3');
    h.textContent = item.title || (id ? 'Loading…' : 'Your video title');
    var sp = document.createElement('span');
    sp.textContent = item.category || '';
    el.appendChild(h); el.appendChild(sp);
    if (id) {
      el.setAttribute('aria-label', 'Play video');
      if (!item.title) getTitle(id).then(function (t) { h.textContent = t || 'Watch video'; });
      var go = function () { openVideo(id, kind === 'list' ? vertical : false); };
      el.addEventListener('click', go);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    } else {
      el.setAttribute('aria-label', 'Placeholder video');
      el.style.cursor = 'default';
    }
    return el;
  }

  function fill(container, items, kind, max) {
    if (!container) return;
    container.innerHTML = '';
    var list = (items || []).map(asItem);
    if (max) list = list.slice(0, max);
    list.forEach(function (it, i) { container.appendChild(makeCard(it, i, kind)); });
  }

  /* ---------- scroll reveal ---------- */
  function reveal() {
    var els = document.querySelectorAll('.rv:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.01 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- HOME ---------- */
  var stage = $('#stage');
  if (stage) {
    var home = S.home || {};
    var hid = ytId(home.hero);
    var pb = $('#heroPlay');
    if (hid) {
      stage.classList.add('has-video');
      var poster = new Image();
      poster.className = 'poster'; poster.alt = '';
      var hq = 'https://i.ytimg.com/vi/' + hid + '/hqdefault.jpg';
      poster.onload = function () { if (poster.naturalWidth <= 120 && !poster.dataset.f) { poster.dataset.f = '1'; poster.src = hq; } };
      poster.onerror = function () { if (!poster.dataset.f) { poster.dataset.f = '1'; poster.src = hq; } };
      poster.src = 'https://i.ytimg.com/vi/' + hid + '/maxresdefault.jpg';
      var shade = document.createElement('div'); shade.className = 'shade';
      stage.insertBefore(shade, stage.children[1]);
      stage.insertBefore(poster, shade);
      pb.addEventListener('click', function () {
        stage.classList.add('playing');
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + hid + '?autoplay=1&rel=0&playsinline=1';
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true; f.title = 'Showreel';
        stage.appendChild(f);
      });
    } else {
      pb.title = 'Add your showreel link in videos.js';
    }
    fill($('#recent'), home.recent, 'strip', 4);
    fill($('#proud'), home.proud, 'grid', 4);
  }

  /* ---------- PORTFOLIO ---------- */
  var right = $('#right');
  if (right) {
    var order = (S.categories || []).slice();
    var canon = {};
    order.forEach(function (c) { canon[norm(c)] = c; });
    var groups = {};
    (S.portfolio || []).map(asItem).forEach(function (it) {
      var raw = String(it.category || '').trim() || 'Other';
      var name = canon[norm(raw)] || raw;
      if (!canon[norm(name)]) { canon[norm(name)] = name; order.push(name); }
      (groups[name] = groups[name] || []).push(Object.assign({}, it, { category: name }));
    });
    var cats = order.filter(function (c) { return groups[c] && groups[c].length; });
    var total = cats.reduce(function (n, c) { return n + groups[c].length; }, 0);
    var side = $('#side');

    function active() {
      var h = decodeURIComponent((location.hash || '').slice(1));
      if (!h || h === 'all') return 'all';
      for (var i = 0; i < cats.length; i++) if (slug(cats[i]) === h) return cats[i];
      return 'all';
    }
    function grid(c) {
      var vertical = groups[c].some(isVertical) && verticalCats.indexOf(norm(c)) > -1;
      var g = document.createElement('div');
      g.className = vertical ? 'g4' : 'g3';
      groups[c].forEach(function (it, i) { g.appendChild(makeCard(it, i, 'list')); });
      return g;
    }
    function section(c) {
      var s = document.createElement('div');
      s.className = 'rs';
      s.innerHTML = '<div class="sh"><h2>' + esc(c) + '</h2><b>' + groups[c].length + (groups[c].length === 1 ? ' video' : ' videos') + '</b></div>';
      s.appendChild(grid(c));
      return s;
    }
    function render() {
      var a = active();
      side.innerHTML = '<a class="it' + (a === 'all' ? ' on' : '') + '" href="#all"><span>All work</span><em>' + total + '</em></a>' +
        cats.map(function (c) {
          return '<a class="it' + (a === c ? ' on' : '') + '" href="#' + slug(c) + '"><span>' + esc(c) + '</span><em>' + groups[c].length + '</em></a>';
        }).join('');
      right.innerHTML = '';
      if (!cats.length) { right.innerHTML = '<p class="empty">No videos yet.</p>'; return; }
      (a === 'all' ? cats : [a]).forEach(function (c) { right.appendChild(section(c)); });
    }
    window.addEventListener('hashchange', function () {
      render();
      if (window.innerWidth <= 900) { var l = $('#lay'); if (l) l.scrollIntoView(); } else { window.scrollTo({ top: 0 }); }
    });
    render();
  }

  reveal();
})();
