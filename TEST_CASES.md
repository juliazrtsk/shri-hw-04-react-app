# Client

## Layout

| Done | Test case                                                                                                  |
| ---- | ---------------------------------------------------------------------------------------------------------- |
|      | Если выставлен `pending: {loading: true, fullscreen: true}`, на странице есть лоадер                       |
|      | Если выставлена ошибка сети `{ networkError: { message: 'error' } }`, на странице есть системное сообщение |

## /

| Done | Test case                                                                                                            |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
|      | ?При переходе на этот роут открывается страница BuildList                                                            |
|      |                                                                                                                      |
|      | ?Если настройки не заданы, на странице отсутствует список билдов                                                     |
|      | Если настройки не заданы, на странице есть кнопка Open settings                                                      |
|      | Кнопка Open settings редиректит на /settings                                                                         |
|      | По клику на кнопку Settings происходит переход на страницу Settings                                                  |
|      |                                                                                                                      |
|      | При открытии страницы отправляется запрос на получение настроек                                                      |
|      | При открытии страницы, если настройки получены, отправляется запрос на получение списка билдов                       |
|      |                                                                                                                      |
|      | Если настройки не заданы, отсутствует кнопка Run build                                                               |
|      | При клике на Run build открывается модальное окно                                                                    |
|      | Пока инпут в модальном окне пуст, кнопка запуска билда недоступна                                                    |
|      | Пока у запроса на запуск билда статус `pending: {loading: true, fullscreen: false}`, обе кнопки в модалке недоступны |
|      | При успешном завершении запроса Run build происходит редирект на страницу нового билда                               |

### Builds list

| Done | Test case                                                                     |
| ---- | ----------------------------------------------------------------------------- |
|      | Если билды есть в сторе, они отрендерены в список на странице                 |
|      |                                                                               |
|      | Если у билда статус Canceled, есть дата и отсутствует duration                |
|      | Если у билда статус Finished, есть дата и duration                            |
|      | Если у билда статус Pending, нет даты и duration                              |
|      |                                                                               |
|      | !При нажатии на кнопку Show more отправляется запрос на получение билдов      |
|      | !При получении новых билдов они должны добавиться в список билдов на странице |

## /settings

| Done | Test case                                                                                                  |
| ---- | ---------------------------------------------------------------------------------------------------------- |
|      | При переходе на этот роут открывается страница Settings                                                    |
|      | На этой странице в хэдере нет кнопок                                                                       |
|      |                                                                                                            |
|      | В инпут для интервала нельзя ввести ничего кроме чисел длиной до 3-х символов                              |
|      | !Кнопка отправки настроек недоступна, если обязательные поля пустые                                        |
|      |                                                                                                            |
|      | При клике на кнопку Save отправляется запрос на сохранение настроек с данными формы                        |
|      | ?Пока у запроса на сохранение настроек статус `pending: {loading: true, fullscreen: ?}`, кнопки недоступны |
|      | Если запрос на сохранение настроек завершился ошибкой, на странице есть сообщение                          |
|      |                                                                                                            |
|      | ?После успешного завершения запроса юзера редиректит на страницу билдов (ХЗ)                               |
|      | ?Кнопка Cancel редиректит КУДА                                                                             |

## /build/:buildId

| Done | Test case                                                                                                       |
| ---- | --------------------------------------------------------------------------------------------------------------- |
|      | При переходе на этот роут открывается страница BuildDetails                                                     |
|      | !Если переданного buildId не существует, то ЧТО                                                                 |
|      |                                                                                                                 |
|      | При открытии страницы отправляется запрос на получение buildDetails                                             |
|      | При открытии страницы отправляется запрос на получение buildLog                                                 |
|      |                                                                                                                 |
|      | Если в сторе лежат детали билда, на странице есть соответствующий компонент                                     |
|      | Если в сторе лежат логи билда, на странице есть соответствующий компонент                                       |
|      | ?Если нет лога, ТО ЧТО                                                                                          |
|      |                                                                                                                 |
|      | ?Если настройки не заданы, то ЧТО                                                                               |
|      | Если в сторе есть данные билда, то в хэдере есть кнопка Rebuild                                                 |
|      |                                                                                                                 |
|      | В хэдере есть кнопка Settings                                                                                   |
|      | По клику на кнопку Settings происходит переход на страницу Settings                                             |
|      |                                                                                                                 |
|      | При клике на кнопку Rebuild отправляется запрос на постановку билда в очередьс данными текущего открытого билда |
|      | При успешном ребилде происходит редирект на страницу нового билда                                               |
|      |                                                                                                                 |
|      | ?Что-то про отображение ошибки ребилда                                                                          |