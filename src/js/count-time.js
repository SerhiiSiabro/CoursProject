export function countTimeBetweenDates(firstDate, lastDate) {
  const startDate = new Date(firstDate);
  const endDate = new Date(lastDate);
  const countVariable = document.getElementById("count-variable").value;
  const measurement = document.getElementById("units-measurement").value;
  let daysOption = 0;
  let timePeriodOption = 0;
  switch (countVariable) {
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
  switch (measurement) {
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
  return multiplyOfOptions;
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
  return getAllDays(startDate, endDate) - getWorkingDays(startDate, endDate);
}
