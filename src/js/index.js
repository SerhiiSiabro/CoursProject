import { checkInput } from "./date-period.js";
import { countTimeBetweenDates } from "./date.js";

const tabset = document.querySelector(".tabset");
const tabsContentHolder = document.getElementsByClassName(".tab-time");

export const dateTimeStart = document.getElementById("date-time-start");
export const dateTimeEnd = document.getElementById("date-time-end");

const submitButton = document.getElementById("submitButton");
const result = document.getElementById("count-days-result");

function submit() {
  let startDay = dateTimeStart.value;
  let finishDay = dateTimeEnd.value;
  let countVatiableValue = document.getElementById("count-variable").value;
  const measurementValue = document.getElementById("units-measurement").value;
  const countedValue = countTimeBetweenDates(
    startDay,
    finishDay,
    countVatiableValue,
    measurementValue
  );
  result.innerText = countedValue;
}

submitButton.addEventListener("click", submit);
dateTimeStart.addEventListener("change", checkInput);
