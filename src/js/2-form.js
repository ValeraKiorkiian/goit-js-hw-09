// Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають
// порожні рядки як значення: { email: "", message: "" }.
// Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні
// дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ
// "feedback-form-state" для зберігання даних у сховищі.
// При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення
// форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
// Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData)
// порожнє, показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з
// актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector(`.feedback-form`);
form.addEventListener(`input`, onInputEvt);
form.addEventListener(`submit`, onSubEvt);
const LOCAL_KEY = 'feedback-form-state';

function onInputEvt(event) {
  formData[event.target.name] = event.target.value;
  const localData = localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
  console.log(localData);
}

function getData() {
  const saveData = localStorage.getItem(LOCAL_KEY);
  if (saveData) {
    const parsedData = JSON.parse(saveData);
    form.email.value = parsedData.email || ``;
    form.message.value = parsedData.message || ``;
    formData.email = parsedData.email || ``;
    formData.message = parsedData.message || ``;
  }
}
getData();

function onSubEvt(event) {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert(`Fill please all fields`);
    return;
  }

  console.log(formData);
  localStorage.removeItem(LOCAL_KEY);
  formData.email = ``;
  formData.message = ``;
  form.reset();
}
