'use strict';
const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');
const { pagesConfig } = require('./pages-config');
for (const API_URL of [undefined, '', '   ']) {
  assert.throws(() => pagesConfig({ API_URL }), /API_URL is missing/);
}
for (const API_URL of ['not-a-url', '/api', 'http://backend.example/api', 'https://backend.example', 'https://name:password@backend.example/api', 'https://backend.example/api?q=1', 'https://backend.example/api#hash']) {
  assert.throws(() => pagesConfig({ API_URL }), /API_URL/);
}
assert.deepStrictEqual(pagesConfig({ API_URL:' https://backend.example/api/ ', PAGES_BASE_PATH:'/miniHrmsUI' }), { apiUrl:'https://backend.example/api', base:'/miniHrmsUI/' });
assert.strictEqual(pagesConfig({ API_URL:'https://backend.example/api' }).base, '/');
assert.throws(() => pagesConfig({ API_URL:'https://backend.example/api', PAGES_BASE_PATH:'bad/path' }), /PAGES_BASE_PATH/);
for (const [value, code] of [['', 1], ['https://backend.example/api', 0]]) {
  const result = spawnSync(process.execPath, [path.join(__dirname,'build-pages.js'),'--check-config'], {env:{...process.env,API_URL:value,PAGES_BASE_PATH:'/'},encoding:'utf8'});
  assert.strictEqual(result.status, code);
  assert(!result.stderr.includes('ERR_INVALID_URL'));
}
console.log('PASS: Pages configuration validation and preflight exit codes (15 checks).');
