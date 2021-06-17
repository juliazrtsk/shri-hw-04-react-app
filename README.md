# Яндекс ШРИ 2021: React

## Описание

Интерфейс веб-приложения CI сервера.
- [Макеты](https://www.figma.com/file/vA6BJJ3AiWar3Q3bq30eyG/SHRI-homework-(specification)?node-id=0%3A1)
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
