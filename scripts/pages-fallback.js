'use strict';
function pagesFallback(base) {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Opening MiNi HRMS</title><script>' +
    '(function(){var base=' + JSON.stringify(base) + ';var route=location.pathname+location.search+location.hash;' +
    'if(location.pathname!==base&&location.pathname.indexOf(base)===0){location.replace(base+"?__hrms_route="+encodeURIComponent(route));}}());' +
    '</script></head><body><p>Opening your workspace...</p><noscript>Enable JavaScript to open this application.</noscript><a href="' + base + '">Open MiNi HRMS</a></body></html>\n';
}
module.exports = { pagesFallback };
