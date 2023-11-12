"use strict";

const tabset = document.querySelector(".tabset");
const tabsContentHolder = document.getElementsByClassName(
  ".tabs-content-holder"
);

const dateTimeStart = document.getElementById("date-time-start");
const dateTimeEnd = document.getElementById("date-time-end");
const buttonWeek = document.getElementById("button-week");
const buttonMonth = document.getElementById("button-month");

function formatDate(date) {
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

function addExactNumberDays(number) {
  let dateStart = new Date(dateTimeStart.value);
  const formatedNewDate = new Date(
    dateStart.setDate(dateStart.getDate() + number)
  );
  return formatDate(formatedNewDate);
}

function addWeek() {
  dateTimeEnd.value = addExactNumberDays(7);
}

function addMonth() {
  dateTimeEnd.value = addExactNumberDays(30);
}

function checkInput() {
  dateTimeEnd.disabled = false;
  // кінцева дата не може бути раніше ніж початкова
  dateTimeEnd.min = dateTimeStart.value;
}
buttonWeek.addEventListener("click", addWeek);
buttonMonth.addEventListener("click", addMonth);
dateTimeStart.addEventListener("change", checkInput);
