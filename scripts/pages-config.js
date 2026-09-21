'use strict';

function pagesConfig(env) {
  const value = (env.API_URL || '').trim();
  if (!value) {
    throw new Error('API_URL is missing. In the miniHrmsUI GitHub repository, open Settings > Secrets and variables > Actions > Variables > New repository variable. Set API_URL to your public Railway HTTPS backend address ending in /api, then run the workflow again. A variable set only in Railway or in the deploy job environment is not available to the build job.');
  }
  let api;
  try { api = new URL(value); } catch (_) {
    throw new Error('API_URL is not a valid absolute URL. Set it to your public HTTPS backend address ending in /api.');
  }
  if (api.protocol !== 'https:' || api.username || api.password || api.search || api.hash || api.pathname.replace(/\/$/, '') !== '/api') {
    throw new Error('API_URL must be the public HTTPS backend URL ending in /api, without credentials, query or fragment.');
  }
  const rawBase = (env.PAGES_BASE_PATH || '/').trim() || '/';
  if (!/^\/(?:[A-Za-z0-9._-]+\/?)?$/.test(rawBase)) {
    throw new Error('PAGES_BASE_PATH must be / or /repository-name/.');
  }
  return { apiUrl: api.href.replace(/\/$/, ''), base: rawBase.replace(/\/$/, '') + '/' };
}
module.exports = { pagesConfig };
