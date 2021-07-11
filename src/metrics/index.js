import { Counter } from './send';
import { browserParser } from './browserParser';

let counter = new Counter();

const pages = {
  '': 'home',
  build: 'build',
  settings: 'settings',
};
const matchPage = (location) => pages[location.split('/')[1]] || 'unknown';

export const ID = '40ca45e5-3504-45c7-b871-d77e1afd5802';
const sessionID = String(Math.random()).substr(2, 12);

counter.init(ID, sessionID, matchPage(window.location.pathname));

counter.setAdditionalParams({
  env: 'development',
  platform: 'desktop',
  locale: navigator.language.toLocaleLowerCase(),
  browser: browserParser(navigator.userAgent),
});

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
