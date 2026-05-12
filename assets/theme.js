/* ─────────────────────────────────────────────────────────────────────────
   theme.js — site-wide day/night toggle behavior
   The pre-paint init script must remain INLINE in each page's <head>
   to avoid the flash-of-wrong-theme. This file only handles user
   interaction and OS preference changes after the page has loaded.
───────────────────────────────────────────────────────────────────────── */

(function () {
  var btn = document.getElementById('theme-toggle');

  if (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // If the user hasn't made an explicit choice yet, keep the page in sync
  // with their OS preference if it changes.
  if (window.matchMedia) {
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    var handler = function (e) {
      var stored;
      try { stored = localStorage.getItem('theme'); } catch (err) {}
      if (!stored) {
        document.documentElement.setAttribute(
          'data-theme', e.matches ? 'dark' : 'light'
        );
      }
    };
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else if (mql.addListener) mql.addListener(handler);
  }
})();
