const matchBrowser = (agent, browser) => agent.includes(browser);

export const browserParser = (agent) => {
  if (matchBrowser(agent, 'Firefox')) {
    return 'Mozilla Firefox';
  }
  if (matchBrowser(agent, 'Opera')) {
    return 'Opera';
  }
  if (matchBrowser(agent, 'Trident')) {
    return 'Microsoft Internet Explorer';
  }
  if (matchBrowser(agent, 'Edge')) {
    return 'Microsoft Edge';
  }
  if (matchBrowser(agent, 'Chrome')) {
    return 'Google Chrome';
  }
  if (matchBrowser(agent, 'Safari')) {
    return 'Safari';
  }
  return 'unknown';
};
