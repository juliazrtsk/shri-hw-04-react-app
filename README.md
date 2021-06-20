# Яндекс ШРИ 2021: React

## Описание

Интерфейс веб-приложения CI сервера.

- [Макеты](<https://www.figma.com/file/vA6BJJ3AiWar3Q3bq30eyG/SHRI-homework-(specification)?node-id=0%3A1>)
- [API CI сервера](./src/api/api.json) (wip)

### Страницы

- `/` — список билдов (корневой адрес приложения)
- `/build/{number}` — детали билда
- `/settings` — настройки

## Запуск и сборка проекта

Чтобы запустить приложение для разработки на [http://localhost:3000](http://localhost:3000):

```shell
$ npm i && npm run start
```

Для сборки проекта:

```shell
$ npm run build
```

Для извлечения скриптов сборки. Необратимая операция.

```shell
$ npm run eject
```

## Зависимости

[wip] Описание зависимостей, которые я добавила помимо тех, что по дефолту добавляются с CRA:

- prop-types
- classnames
- link-module-alias

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
