import { dateTimeStart, dateTimeEnd } from "./index.js";

const buttonWeek = document.getElementById("button-week");
const buttonMonth = document.getElementById("button-month");

export function formatDate(date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

export function addExactNumberDays(number) {
  let dateStart = new Date(dateTimeStart.value);
  const formatedNewDate = new Date(
    dateStart.setDate(dateStart.getDate() + number)
  );
  return formatDate(formatedNewDate);
}

export function addWeek() {
  dateTimeEnd.value = addExactNumberDays(7);
}

export function addMonth() {
  dateTimeEnd.value = addExactNumberDays(30);
}

export function checkInput() {
  dateTimeEnd.disabled = false;
  // кінцева дата не може бути раніше ніж початкова
  dateTimeEnd.min = dateTimeStart.value;
}
buttonWeek.addEventListener("click", addWeek);
buttonMonth.addEventListener("click", addMonth);
