# Яндекс ШРИ 2021: React

## Описание

Интерфейс веб-приложения CI сервера.

- [Макеты](<https://www.figma.com/file/vA6BJJ3AiWar3Q3bq30eyG/SHRI-homework-(specification)?node-id=0%3A1>)
- [API CI сервера](./src/api/api.json) (wip)

### Страницы

- `/` — список сборок (корневой адрес приложения)
- `/build/{number}` — детали сборки
- `/settings` — настройки

## Запуск и сборка проекта

Чтобы запустить приложение для разработки на [http://localhost:3000](http://localhost:3000):

```shell
$ git clone https://github.com/juliazrtsk/shri-hw-04-react-app.git
$ cp .env.template .env
$ npm ci && npm run start
```

Для сборки проекта:

```shell
$ npm run build
```

Для запуска тестов:

```shell
$ npm run test
```

Для извлечения скриптов сборки. Необратимая операция.

```shell
$ npm run eject
```

## Зависимости

[wip] Описание зависимостей, которые я добавила помимо тех, что по дефолту добавляются с CRA:

- prop-types — для прописывания интерфейса у компонентов и валидации пропсов
- classnames — для сборки нескольких классов в одну строку и для добавления класса к компоненту в зависимости от условия
- link-module-alias — для указания alias-ов к путям в проекте
- dayjs — для форматирования даты и длительности
- react-syntax-highlighter — для рендера логов сборки

## Структура проекта

Node.js: **v16.3.0**

```
src
├── public                  # Static files
├── api                     # Api description and mock json-s
├── components              # React atom components
├── localization            # Config with keys for future localization
├── pages                   # React pages components
├── _variables.css          # CSS variables
├── index.css               # Common project styles
└── index.js                # Entry point
```

## Сбор метрик

Информация о метриках доступна по роуту `'/metrics'`.
Реализация:

1. [Анализ](./src/metrics/stats.js)
2. [Сбор](./src/metrics/index.js)
3. [Счётчик](./src/metrics/send.js)

### Метрики

- Connect
- Time to first byte

### Срезы

- env
- platform

## Дополнительно

- Хэш коммита сделала кликабельным — по клику длинный хэш разворачивается, по дефолту виден только сокращённый вариант с многоточием.
  На мой взгляд, это помогает не перегружать карточку с информацией о сборке (но я уберу, если это неуместное добавление).
