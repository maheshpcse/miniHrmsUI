// Restore a GitHub Pages deep link before Angular starts. Only enabled by the Pages build.
(function () {
  'use strict';
  var config = window.__MINI_HRMS_CONFIG__ || {};
  var base = config.pagesBasePath;
  if (!base) return;
  var current = new URL(window.location.href);
  var target = null;
  if (current.pathname === base && current.searchParams.has('__hrms_route')) {
    target = current.searchParams.get('__hrms_route');
  } else if (current.pathname === base && current.hash.indexOf('#/') === 0) {
    target = base + current.hash.slice(2);
    if (current.search) target += (target.indexOf('?') < 0 ? '?' : '&') + current.search.slice(1);
  }
  if (!target) return;
  try {
    var restored = new URL(target, current.origin);
    if (restored.origin !== current.origin || restored.pathname.indexOf(base) !== 0) return;
    window.history.replaceState(null, '', restored.pathname + restored.search + restored.hash);
  } catch (_) { /* Leave malformed links to the normal router. */ }
}());
