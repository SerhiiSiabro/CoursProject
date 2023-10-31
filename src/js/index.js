"use strict";

const tabset = document.querySelector(".tabset");
const tabsContentHolder = document.getElementsByClassName(
  ".tabs-content-holder"
);

const dateTimeStart = document.querySelector("date-time-start");
const dateTimeEnd = document.querySelector("date-time-end");

console.log(dateTimeStart);
const sumFunc = () => {
  console.log("hi");
};
dateTimeStart.addEventListener("input", sumFunc);
