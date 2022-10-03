import throttle from 'lodash.throttle';
// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект
// с полями email и message, в которых сохраняй текущие значения полей формы.
// Пусть ключом для хранилища будет строка "feedback-form-state".
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
// Для этого добавь в проект и используй библиотеку lodash.throttle.
const LOCAL_STORAGE = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

initForm();

// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные,
//     заполняй ими поля формы.В противном случае поля должны быть пустыми.

// При сабмите формы очищай хранилище и поля формы,
//     а также выводи объект с полями email, message и текущими их значениями в консоль.
function onFormSubmit(event) {
  event.preventDefault();
  // https://www.youtube.com/watch?v=GWJhE7Licjs&ab_channel=SteveGriffith-Prof3ssorSt3v3
  const formData = new FormData(form);
  formData.forEach((value, name) => console.log(value, name));
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE);
}
function onFormInput(event) {
  let valueFilter = localStorage.getItem(LOCAL_STORAGE);
  valueFilter = valueFilter ? JSON.parse(valueFilter) : {};
  valueFilter[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(valueFilter));
}

function initForm() {
  let valueFilter = localStorage.getItem(LOCAL_STORAGE);
  if (valueFilter) {
    valueFilter = JSON.parse(valueFilter);
    //   https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    Object.entries(valueFilter).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
