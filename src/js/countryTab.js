const yearList = document.getElementById("year-list");

export function generateYearList() {
  const begin = new Date(2000, 0).getFullYear();
  const limit = 2050;
  for (let index = begin; index < limit; index++) {
    let element = document.createElement("option");
    element.textContent = index;
    element.value = index;
    yearList.append(element);
  }
  yearList.value = new Date().getFullYear();
}
