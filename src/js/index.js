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
const showResult = document.getElementById("count-days-result");

const countryList = document.getElementById("country-list");
const countryListValue = document.getElementById("country-list").value;
export const yearList = document.getElementById("year-list");
const holidayList = document.querySelector("holiday-list");

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
  showResult.innerText = countedValue;
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

const handledowloadedPage = async () => {
  try {
    getCountriesData().then((data) => {
      data.forEach((key) => {
        let county = key.country_name;
        let newOption = document.createElement("option");
        newOption.textContent = county;
        newOption.value = county;
        countryList.append(newOption);
      });
    });
  } catch (error) {
    console.log("error");
  }
  createTable();
};
async function createTable() {
  try {
    const country = countryListValue;
    const year = yearList.value;
    if (!country || !year) {
      return;
    }
    let holidaysList = await getHolidayData(country, year);
    while (holidayList.firstElementChild) {
      holidayList.firstElementChild.remove();
    }

    holidaysList = holidaysList.map((holiday) => ({
      name: holiday.name,
      iso: holiday.date.iso.slice(0, 10),
    }));

    holidaysList.sort(sortByProperty("iso", isSortingDown));
    holidaysList.forEach((holiday) => {
      console.log(holiday);
      let newRow = document.createElement("tr");
      holidayList.append(newRow);

      let cell = document.createElement("td");
      newRow.append(cell);
      cell.innerText = holiday.iso;

      cell = document.createElement("td");
      newRow.append(cell);
      cell.innerText = holiday.name;
    });
  } catch (error) {
    console.log("errorCreateTable");
  }
}
handledowloadedPage();
getCountriesData();
// createTable();

submitButton.addEventListener("click", submit);
dateTimeStart.addEventListener("change", checkInput);

tabButtonTime.addEventListener("click", chengeTab);
tabButtonCountry.addEventListener("click", chengeTab);

countryList.addEventListener("change", createTable);
yearList.addEventListener("change", createTable);
