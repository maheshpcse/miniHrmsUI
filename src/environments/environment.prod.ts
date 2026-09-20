const liveConfig = (window as any).__MINI_HRMS_CONFIG__ || {};
export const environment = {
  production: true,
  apiUrl: liveConfig.apiUrl || '/api',
  useHash: liveConfig.useHash === true
};
