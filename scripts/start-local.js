'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const {spawn, spawnSync} = require('child_process');
const backend = path.resolve(__dirname, '../../miniHrmsServer');
const children = [];
let closing = false;
function stop(code) {
  if (closing) return; closing = true;
  for (const child of children) {
    if (!child.pid) continue;
    if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], {stdio:'ignore',windowsHide:true});
    else child.kill('SIGTERM');
  }
  process.exit(code);
}
function health() {
  return new Promise(resolve => {
    const req = http.get('http://127.0.0.1:3663/api/server', res => {
      let body='';res.on('data', chunk => body+=chunk);res.on('end',()=>{try { resolve(res.statusCode===200 && JSON.parse(body).success===true); } catch (_) {resolve(false);} });
    });
    req.setTimeout(1500,()=>req.destroy());req.on('error',()=>resolve(false));
  });
}
process.on('SIGINT',()=>stop(0));process.on('SIGTERM',()=>stop(0));
(async()=>{
  if (!await health()) {
    if (!fs.existsSync(path.join(backend,'node_modules'))) throw new Error('Install the backend dependencies in miniHrmsServer first.');
    console.log('Starting HRMS backend on port 3663. Its request logs appear in this terminal.');
    const api=spawn(process.execPath,['index.js'],{cwd:backend,env:{...process.env,HOST:'127.0.0.1',PORT:'3663'},stdio:'inherit',windowsHide:true});children.push(api);
    api.on('error',e=>{console.error(e.message);stop(1);});api.on('exit',code=>{if(!closing){console.error('Backend stopped. Check its error above.');stop(code||1);}});
    let ready=false;for(let i=0;i<40;i++){if(await health()){ready=true;break;}await new Promise(r=>setTimeout(r,500));}
    if(!ready)throw new Error('Backend did not become ready. Check the backend configuration and logs above.');
  } else console.log('Using the existing HRMS backend on port 3663. Its logs remain in its original terminal.');
  if(!process.env.npm_execpath)throw new Error('Run this launcher with npm run start:all.');
  const ui=spawn(process.execPath,[process.env.npm_execpath,'start'],{cwd:path.resolve(__dirname,'..'),env:process.env,stdio:'inherit',windowsHide:true});children.push(ui);
  ui.on('error',e=>{console.error(e.message);stop(1);});ui.on('exit',code=>stop(code||0));
})().catch(e=>{console.error(e.message);stop(1);});
