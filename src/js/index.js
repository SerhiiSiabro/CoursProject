import { checkInput } from "./date-period.js";
import { countTimeBetweenDates } from "./date.js";
import { setResultToStorage, getResultsFromStorage } from "./storage.js";
import { chengeTab } from "./chengeTab.js";
import { generateYearList } from "./countryTab.js";
import { getCountriesData, getHolidayData } from "./api.js";

export const tabButtonTime = document.querySelector(".tab-button-time");
export const tabButtonCountry = document.querySelector(".tab-button-country");
export const dateTimeStart = document.getElementById("date-time-start");
export const dateTimeEnd = document.getElementById("date-time-end");
const submitButton = document.getElementById("submitButton");
const resultOfColculation = document.getElementById("count-days-result");
const countryList = document.getElementById("country-list");
export const yearList = document.getElementById("year-list");
let yearListValue = document.getElementById("year-list").value;
const holidayList = document.getElementById("holiday-list");

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
tabButtonTime.addEventListener("click", chengeTab);
tabButtonCountry.addEventListener("click", chengeTab);
countryList.addEventListener("change", createTable);
yearList.addEventListener("change", createTable);
