import { checkInput } from "./date-period.js";
import { countTimeBetweenDates } from "./date.js";
import { setResultToStorage, getResultsFromStorage } from "./storage.js";
import { chengeTab } from "./chengeTab.js";
import { generateYearList, yearList } from "./countryTab.js";
import { getCountriesData, getHolidayData } from "./api.js";

export const tabButtonTime = document.querySelector(".tab-button-time");
export const tabButtonCountry = document.querySelector(".tab-button-country");

export const dateTimeStart = document.getElementById("date-time-start");
export const dateTimeEnd = document.getElementById("date-time-end");

const submitButton = document.getElementById("submitButton");
const showResult = document.getElementById("count-days-result");

const countryList = document.getElementById("country-list");
const countryListValue = document.getElementById("country-list").value;
const holidayList = document.querySelector("holiday-list");

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
    getCountriesData()
      .then((data) => {
        data.forEach((key) => {
          let county = key.country_name;
          let newOption = document.createElement("option");
          newOption.textContent = county;
          newOption.value = county;
          countryList.append(newOption);
        });
      })
      .then(() => {
        console.log(countryListValue);
        getHolidayData(countryListValue, yearList);
      });
  } catch (error) {
    console.log("error");
  }
};
handledowloadedPage();
getCountriesData();
getHolidayData(2020, "Australia");

submitButton.addEventListener("click", submit);
dateTimeStart.addEventListener("change", checkInput);

tabButtonTime.addEventListener("click", chengeTab);
tabButtonCountry.addEventListener("click", chengeTab);
