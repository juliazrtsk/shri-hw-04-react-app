import { Counter } from './send';

let counter = new Counter();

export const ID = '40ca45e5-3504-45c7-b871-d77e1afd5802';

counter.init(ID, String(Math.random()).substr(2, 12), 'send test');
counter.setAdditionalParams({
  env: 'development',
  platform: 'desktop',
});

counter.send(
  'connect',
  performance.timing.connectEnd - performance.timing.connectStart
);
counter.send(
  'ttfb',
  performance.timing.responseEnd - performance.timing.requestStart
);
