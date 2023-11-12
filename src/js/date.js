import { dateTimeStart } from "./index.js";

export function formatDate(date) {
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

export function addExactNumberDays(number) {
  let dateStart = new Date(dateTimeStart.value);
  const formatedNewDate = new Date(
    dateStart.setDate(dateStart.getDate() + number)
  );
  return formatDate(formatedNewDate);
}

export function countTimeBetweenDates(
  firstDate,
  lastDate,
  countVatiableValue,
  measurementValue
) {
  const startDate = new Date(firstDate);
  const endDate = new Date(lastDate);
  let daysOption = 0;
  let timePeriodOption = 0;
  switch (countVatiableValue) {
    case "all-days":
      daysOption = getAllDays(startDate, endDate);
      break;
    case "working-days":
      daysOption = getWorkingDays(startDate, endDate);
      break;
    case "weekend-days":
      daysOption = getWeekendDays(startDate, endDate);
      break;
    default:
      return console.log("Wrong count variable");
  }
  switch (measurementValue) {
    case "days":
      timePeriodOption = 1;
      break;
    case "hours":
      timePeriodOption = 24;
      break;
    case "minutes":
      timePeriodOption = 24 * 60;
      break;
    case "seconds":
      timePeriodOption = 24 * 60 * 60;
      break;
    default:
      return console.log("Wrong measurement");
  }

  // множимо обрану опцію Дня та одиницю Часу:
  const multiplyOfOptions = daysOption * timePeriodOption;
  console.log(multiplyOfOptions);
  return `${multiplyOfOptions} ${measurementValue}`;
}

function getAllDays(startDate, endDate) {
  return Math.floor(Math.abs(endDate - startDate) / (24 * 60 * 60 * 1000));
}

function getWorkingDays(startDate, endDate) {
  let count = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
}

function getWeekendDays(startDate, endDate) {
  let count = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
}
