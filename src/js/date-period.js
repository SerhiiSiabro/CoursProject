import { dateTimeStart, dateTimeEnd } from "./index.js";
import { addExactNumberDays } from "./date.js";

const buttonWeek = document.getElementById("button-week");
const buttonMonth = document.getElementById("button-month");

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
