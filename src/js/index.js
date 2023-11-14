import { checkInput } from "./date-period.js";
import { countTimeBetweenDates } from "./date.js";
import { setResultToStorage, resultsFromStorage } from "./storage.js";

const tabset = document.querySelector(".tabset");
const tabsContentHolder = document.getElementsByClassName(".tab-time");

export const dateTimeStart = document.getElementById("date-time-start");
export const dateTimeEnd = document.getElementById("date-time-end");

const submitButton = document.getElementById("submitButton");
const showResult = document.getElementById("count-days-result");

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
  showResult.innerText = countedValue;
  const resultForStorage = {
    startDay,
    finishDay,
    result: countedValue,
  };

  //create table
  const newRow = document.createElement("tr");
  tableResult.append(newRow);

  let cell = document.createElement("td");
  newRow.append(cell);
  cell.innerText = resultForStorage.startDay;

  cell = document.createElement("td");
  newRow.append(cell);
  cell.innerText = resultForStorage.finishDay;

  cell = document.createElement("td");
  newRow.append(cell);
  cell.innerText = resultForStorage.result;

  setResultToStorage(resultForStorage);
}

const getTasks = () => {
  const tasks = resultsFromStorage();
  console.log(tasks);
  tasks.forEach((result) => {
    const newRow = document.createElement("tr");
    tableResult.append(newRow);

    let cell = document.createElement("td");
    newRow.append(cell);
    cell.innerText = result.startDay;

    cell = document.createElement("td");
    newRow.append(cell);
    cell.innerText = result.finishDay;

    cell = document.createElement("td");
    newRow.append(cell);
    cell.innerText = result.result;
  });
};

// Ініціалізація
getTasks();

submitButton.addEventListener("click", submit);
dateTimeStart.addEventListener("change", checkInput);
