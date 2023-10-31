"use strict";

const tabset = document.querySelector(".tabset");
const tabsContentHolder = document.getElementsByClassName(
  ".tabs-content-holder"
);

const dateTimeStart = document.querySelector("date-time-start");
const dateTimeEnd = document.querySelector("date-time-end");

function durationBetweenDates(
  startDate = Date.now(),
  endDate = Date.now(),
  dimension = "days"
) {
  let difference = Math.abs(new Date(endDate) - new Date(startDate));

  switch (dimension) {
    case "seconds":
      return `${difference / 1000} ${dimension}`;
    case "minutes":
      return `${difference / (1000 * 60)} ${dimension}`;
    case "hours":
      return `${difference / (1000 * 60 * 60)} ${dimension}`;
    case "days":
      return `${difference / (1000 * 60 * 60 * 24)} ${dimension}`;
    default:
      console.log(`Sorry, we cant find ${dimension}`);
  }
}

console.log(dateTimeStart);
const sumFunc = () => {
  console.log("hi");
};
dateTimeStart.addEventListener("input", sumFunc);
