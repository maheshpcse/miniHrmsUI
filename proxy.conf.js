module.exports = {
  '/api': {
    target: 'http://127.0.0.1:3663',
    secure: false,
    changeOrigin: true,
    logLevel: 'silent',
    onError(error, request, response) {
      console.error('[HRMS API] Service unavailable (' + error.code + '). Start miniHrmsServer or use npm run start:all.');
      if (!response.headersSent) {
        response.writeHead(503, { 'Content-Type': 'application/json' });
      }
      response.end(JSON.stringify({ success: false, message: 'We cannot reach the service right now. Please try again shortly.' }));
    }
  }
};

