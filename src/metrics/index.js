import { Counter } from './send';
import { browserParser } from './browserParser';

/* Initialization */
let counter = new Counter();

const pages = {
  '': 'home',
  build: 'build',
  settings: 'settings',
};
const matchPage = (location) => pages[location.split('/')[1]] || 'unknown';

/**
 * Sends event data to metric server. Counter is available via closure
 * @param event - string with event name
 * @param type - start / stop / pause and etc
 */
export const sendMetricEvent = (event, type) =>
  counter.send(`${event}-${type}`, Date.now());

export const ID = '40ca45e5-3504-45c7-b871-d77e1afd5802';
const sessionID = String(Math.random()).substr(2, 12);

counter.init(ID, sessionID, matchPage(window.location.pathname));

counter.setAdditionalParams({
  env: 'development',
  platform: 'desktop',
  locale: navigator.language.toLocaleLowerCase(),
  browser: browserParser(navigator.userAgent),
});

/* Metrics counting */
counter.send(
  'connect',
  performance.timing.connectEnd - performance.timing.connectStart
);
counter.send(
  'ttfb',
  performance.timing.responseEnd - performance.timing.requestStart
);

new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    const delay = entry.processingStart - entry.startTime;
    counter.send('fid', delay);
  }
}).observe({ type: 'first-input', buffered: true });

new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
    counter.send('fcp', entry.startTime);
  }
}).observe({ type: 'paint', buffered: true });
