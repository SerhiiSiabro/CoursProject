import { countTimeBetweenDates, generateYearList } from "./date.js";
import { setResultToStorage, getResultsFromStorage } from "./storage.js";
import { chengeTab } from "./tab.js";
import { getCountriesData, getHolidayData } from "./api.js";
import { addExactNumberDays } from "./date.js";

const buttonWeek = document.getElementById("button-week");
const buttonMonth = document.getElementById("button-month");
export const tabButtonTime = document.querySelector(".tab-button-time");
export const tabButtonCountry = document.querySelector(".tab-button-country");
export const dateTimeStart = document.getElementById("date-time-start");
export const dateTimeEnd = document.getElementById("date-time-end");
const submitButton = document.getElementById("submitButton");
const resultOfColculation = document.getElementById("count-days-result");
const countryList = document.getElementById("country-list");
export const yearList = document.getElementById("year-list");
const holidayList = document.getElementById("holiday-list");
const directionArrow = document.getElementById("direction-arrow");

function submit() {
  dateTimeStart.style.background = "";
  dateTimeEnd.style.background = "";
  let startDay = dateTimeStart.value;
  let finishDay = dateTimeEnd.value;
  let countVatiableValue = document.getElementById("count-variable").value;
  const measurementValue = document.getElementById("units-measurement").value;
  if (!startDay || !finishDay) {
    dateTimeStart.style.background = "red";
    dateTimeEnd.style.background = "red";
    return;
  }
  const countedValue = countTimeBetweenDates(
    startDay,
    finishDay,
    countVatiableValue,
    measurementValue
  );
  resultOfColculation.innerText = countedValue;
  const resultForStorage = {
    startDay,
    finishDay,
    result: countedValue,
  };

  setResultToStorage(resultForStorage);
  tableResult.innerHTML = "";
  getTasks();
}

const getTasks = () => {
  const tasks = getResultsFromStorage();
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
  dateTimeStart.max = dateTimeEnd.value;
}

function rotateTable() {
  const direction = directionArrow.getAttribute("date-direction");
  directionArrow.setAttribute("date-direction", direction === "<" ? ">" : "<");
  directionArrow.classList.toggle("direction-arrow-reverse");
  let tbody = holidayList;
  let rows = [...tbody.querySelectorAll("tr")];
  rows.sort((a, b) => {
    switch (direction) {
      case "<":
        return new Date(a.cells[0].textContent) >
          new Date(b.cells[0].textContent)
          ? 1
          : -1;
      case ">":
        return new Date(b.cells[0].textContent) <
          new Date(a.cells[0].textContent)
          ? -1
          : 1;
      default:
        break;
    }
  });
  rows.forEach((element) => {
    tbody.appendChild(element);
  });
}

// Ініціалізація
getTasks();
generateYearList();

const fillCountriesSelect = async () => {
  // Беремо дані з запиту
  const data = await getCountriesData();

  // Проходимось по кожному елементу(країні) і додаємо відповідний option у select
  data.forEach((country) => {
    const option = document.createElement("option");
    option.textContent = country.country_name;
    option.value = country["iso-3166"];

    countryList.append(option);
  });
};

const createTable = async () => {
  yearList.disabled = false;
  document.getElementById("tab-country-table").hidden = false;
  let year = yearList.value;
  let countryCode = countryList.value;
  const data = await getHolidayData(countryCode, year);
  let listHolidays = JSON.parse(JSON.stringify(data));
  // Малюємо таблицю вже з цим списком свят
  holidayList.innerHTML = "";
  listHolidays.response.holidays.forEach((result) => {
    let newRow = document.createElement("tr");
    holidayList.append(newRow);

    let cell = document.createElement("td");
    newRow.append(cell);
    cell.innerText = result.date.iso;

    cell = document.createElement("td");
    newRow.append(cell);
    cell.innerText = result.name;
  });
};

fillCountriesSelect();

submitButton.addEventListener("click", submit);
dateTimeStart.addEventListener("change", checkInput);
dateTimeEnd.addEventListener("change", checkInput);
buttonWeek.addEventListener("click", addWeek);
buttonMonth.addEventListener("click", addMonth);
tabButtonTime.addEventListener("click", chengeTab);
tabButtonCountry.addEventListener("click", chengeTab);
countryList.addEventListener("change", createTable);
yearList.addEventListener("change", createTable);
directionArrow.addEventListener("click", rotateTable);
