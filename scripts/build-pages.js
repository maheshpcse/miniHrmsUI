'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { pagesConfig } = require('./pages-config');
const { pagesFallback } = require('./pages-fallback');
let config;
try { config = pagesConfig(process.env); } catch (error) {
  console.error('Pages configuration error: ' + error.message);
  process.exit(1);
}
if (process.argv.includes('--check-config')) {
  console.log('Pages configuration is valid.');
  process.exit(0);
}
const result = spawnSync(process.execPath, [path.resolve('node_modules/@angular/cli/bin/ng'), 'build', '--prod', '--base-href', config.base], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status || 1);
const out = path.resolve('dist/miniHrmsUI');
fs.writeFileSync(path.join(out, 'assets/runtime-config.js'), 'window.__MINI_HRMS_CONFIG__ = ' + JSON.stringify({ apiUrl: config.apiUrl, useHash: false, pagesBasePath: config.base }) + ';\n');
fs.writeFileSync(path.join(out, '.nojekyll'), '');
fs.writeFileSync(path.join(out, '404.html'), pagesFallback(config.base));
console.log('Pages artifact ready at dist/miniHrmsUI with base ' + config.base);
