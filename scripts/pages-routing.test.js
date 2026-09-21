'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { pagesFallback } = require('./pages-fallback');
const restore = fs.readFileSync(path.join(__dirname, '../src/assets/pages-routing.js'), 'utf8');
function roundTrip(route, base) {
  const origin = 'https://example.github.io';
  const current = new URL(route, origin);
  let redirected;
  vm.runInNewContext(pagesFallback(base).match(/<script>([\s\S]*?)<\/script>/)[1], { location: {pathname:current.pathname,search:current.search,hash:current.hash,replace:value=>redirected=value}, encodeURIComponent });
  let restored;
  vm.runInNewContext(restore, {URL,window:{__MINI_HRMS_CONFIG__:{pagesBasePath:base},location:{href:new URL(redirected,origin).href},history:{replaceState:(_,__,value)=>restored=value}}});
  assert.strictEqual(restored, route);
}
for (const base of ['/miniHrmsUI/', '/']) {
  for (const suffix of ['admin/login','admin/reset-password?challenge=a%2Bb%26c&code=012345','admin/login?returnUrl=%2Fadmin%2Frequests#help','unknown-route','admin/employees/view-employee/EMP%20ONE']) roundTrip(base+suffix,base);
}
function restoreUrl(url, config = {pagesBasePath:'/miniHrmsUI/'}) {
 let result;
 vm.runInNewContext(restore,{URL,window:{__MINI_HRMS_CONFIG__:config,location:{href:url},history:{replaceState:(_,__,value)=>result=value}}});
 return result;
}
assert.strictEqual(restoreUrl('https://example.github.io/miniHrmsUI/#/admin/login'), '/miniHrmsUI/admin/login');
assert.strictEqual(restoreUrl('https://example.github.io/miniHrmsUI/#/'), '/miniHrmsUI/');
assert.strictEqual(restoreUrl('https://example.github.io/miniHrmsUI/?__hrms_route='+encodeURIComponent('https://evil.invalid/admin/login')),undefined);
assert.strictEqual(restoreUrl('https://example.github.io/miniHrmsUI/?__hrms_route='+encodeURIComponent('/other/app')),undefined);
assert.strictEqual(restoreUrl('https://example.github.io/miniHrmsUI/?__hrms_route='+encodeURIComponent('/miniHrmsUI/../other')),undefined);
assert.strictEqual(restoreUrl('http://localhost:7200/#/admin/login',{}),undefined);
console.log('PASS: 16 routing checks: deep links, queries, anchors, legacy hashes, custom domains, and unsafe targets.');
