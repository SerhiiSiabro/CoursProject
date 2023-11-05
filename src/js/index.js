"use strict";

const tabset = document.querySelector(".tabset");
const tabsContentHolder = document.getElementsByClassName(
  ".tabs-content-holder"
);

const dateTimeStart = document.getElementById("date-time-start");
const dateTimeEnd = document.getElementById("date-time-end");
const buttonWeek = document.getElementById("button-week");
const buttonMonth = document.getElementById("button-month");

function setTodayDate() {
  const today = new Date();
  return formatDate(today);
}
function formatDate(date) {
  const year = date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}

function addWeek() {
  let dateStart = new Date(dateTimeStart.value);
  const formatedNewDate = new Date(dateStart.setDate(dateStart.getDate() + 7));
  dateTimeEnd.value = formatDate(formatedNewDate);
}

function addMonth() {
  let dateStart = new Date(dateTimeStart.value);
  const formatedNewDate = new Date(dateStart.setDate(dateStart.getDate() + 30));
  dateTimeEnd.value = formatDate(formatedNewDate);
}

dateTimeStart.value = setTodayDate();
dateTimeEnd.value = setTodayDate();
buttonWeek.addEventListener("click", addWeek);
buttonMonth.addEventListener("click", addMonth);
