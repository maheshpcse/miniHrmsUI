'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const api = new URL(process.env.API_URL || '');
if (api.protocol !== 'https:' || api.username || api.password || api.search || api.hash || api.pathname.replace(/\/$/, '') !== '/api') {
  throw new Error('API_URL must be the public HTTPS backend URL ending in /api, without credentials, query or fragment.');
}
const rawBase = process.env.PAGES_BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9._-]+\/?)?$/.test(rawBase)) throw new Error('PAGES_BASE_PATH must be / or /repository-name/.');
const base = rawBase.replace(/\/$/, '') + '/';
const result = spawnSync(process.execPath, [path.resolve('node_modules/@angular/cli/bin/ng'), 'build', '--prod', '--base-href', base], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status || 1);
const out = path.resolve('dist/miniHrmsUI');
fs.writeFileSync(path.join(out, 'assets/runtime-config.js'), 'window.__MINI_HRMS_CONFIG__ = ' + JSON.stringify({ apiUrl: api.href.replace(/\/$/, ''), useHash: true }) + ';\n');
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('Pages artifact ready at dist/miniHrmsUI with base ' + base);
