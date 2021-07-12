import { ID } from './index';

function quantile(arr, q) {
  const sorted = arr.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
  } else {
    return Math.floor(sorted[base]);
  }
}

function prepareData(result) {
  return result.data.map((item) => {
    return { ...item, date: item.timestamp.split('T')[0] };
  });
}

/* Собирает данные для одной сессии в один объект
 * - склеивает метрики -start и -end
 * - объединяет в массив значения метрики lcp, т.к. в рамках одной сессии она отправляется несколько раз
 * - достаёт параметры из объекта additional
 *  */
/**
 * Собирает данные для одной сессии в один объект
 * - склеивает метрики -start и -end
 * - объединяет в массив значения метрики lcp, т.к. в рамках одной сессии она отправляется несколько раз
 * - достаёт параметры из объекта additional
 * @param data
 * @return массив объектов { requestId, metrics and params }
 */
function aggregate(data) {
  const aggregated = new Map();
  data.forEach((entry) => {
    const { requestId, additional, name, value, ...rest } = entry;
    const line = aggregated.get(requestId) || {};

    let metricName = name;
    let metricValue = value;
    if (name === 'lcp') {
      metricValue = line.lcp ? [...line.lcp, value] : [value];
    }

    if (name.includes('-start')) {
      metricName = name.split('-start')[0];
      metricValue = line[metricName] ? line[metricName] - value : -value;
    }

    if (name.includes('-end')) {
      metricName = name.split('-end')[0];
      metricValue = line[metricName] ? line[metricName] + value : value;
    }

    aggregated.set(requestId, {
      ...line,
      ...additional,
      ...rest,
      [metricName]: metricValue,
    });
  });

  return Array.from(aggregated.keys()).map((key) => {
    return {
      requestId: key,
      ...aggregated.get(key),
    };
  });
}

/* Показать значение одной метрики за несколько дней */
function getMetricByPeriod(data, name, start, end) {
  if (!(start && end)) return data;

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return data.filter((metric) => {
    if (metric.name !== name) return false;
    const time = new Date(metric.date).getTime();
    return time >= startTime && time <= endTime;
  });
}

/* Найти все метрики по id сессии пользователя */
function getMetricsBySession(data, sessionId) {
  return data.filter((metric) => metric.requestId === sessionId);
}

/**
 * Расчёт процентилей для отфильтрованных данных метрики
 * @param metricValues -- массив значений метрики
 * @return {{hits: number, p25: number, p50: number, p95: number, p75: number}}
 */
function calcMetric(metricValues) {
  return {
    p25: quantile(metricValues, 0.25),
    p50: quantile(metricValues, 0.5),
    p75: quantile(metricValues, 0.75),
    p95: quantile(metricValues, 0.95),
    hits: metricValues.length,
  };
}

/* Сравнить метрику в разных срезах для агрегированных данных */
function compareAggMetric(data, page, name, parameter) {
  const slice = new Map();
  data
    .filter((session) => session[name] !== undefined && session.page === page)
    .forEach((session) => {
      const sliceKey = session[parameter];
      if (!slice.get(sliceKey)) {
        slice.set(sliceKey, []);
      }
      slice.get(sliceKey).push(session[name]);
    });

  const calculated = {};
  slice.forEach((value, key) => {
    calculated[key] = calcMetric(value);
  });
  console.table(calculated);
}

/* Рассчитать метрику за выбранный день для агрегированных данных */
function calcAggMetricByDate(data, page, name, date) {
  const metricValues = data
    .filter((metric) => {
      return (
        metric[name] !== undefined &&
        metric.page === page &&
        metric.date === date
      );
    })
    .map((metric) => metric[name]);

  return {
    date,
    page,
    name,
    ...calcMetric(metricValues),
  };
}

fetch(`https://shri.yandex/hw/stat/data?counterId=${ID}`)
  .then((res) => res.json())
  .then((result) => {
    const data = prepareData(result);
    const agData = aggregate(data);

    console.group('Для агрегированных данных');
    console.group('Пример агрегированных данных');
    console.table([agData[0]]);
    console.groupEnd();

    console.group(
      'Примеры метрик для разных страниц за 12-07-2021 или 11-07-2021 на агрегированных данных'
    );
    console.table([
      calcAggMetricByDate(agData, 'home', 'connect', '2021-07-12'),
    ]);
    console.table([calcAggMetricByDate(agData, 'build', 'ttfb', '2021-07-12')]);
    console.table([
      calcAggMetricByDate(agData, 'settings', 'fid', '2021-07-11'),
    ]);
    console.groupEnd();

    console.group(
      'Срез по параметру browser для метрики getLogs на странице build'
    );
    compareAggMetric(agData, 'build', 'getLogs', 'browser');
    console.groupEnd();

    console.group(
      'Срез по параметру browser для метрики fid на странице settings'
    );
    compareAggMetric(agData, 'settings', 'fid', 'browser');
    console.groupEnd();

    console.groupEnd();

    console.group('Для не агрегированных данных');
    console.group('Пример не агрегированных данных');
    console.table([data[0]]);
    console.groupEnd();

    console.group('Все значения метрики fid за 11-07 и 12-07');
    console.table(getMetricByPeriod(data, 'fid', '2021-07-11', '2021-07-12'), [
      'requestId',
      'page',
      'value',
      'date',
    ]);
    console.groupEnd();

    console.group('Все метрики для сессии с id 642970762395');
    console.table(getMetricsBySession(data, '642970762395'));
    console.groupEnd();

    console.groupEnd();
  });
