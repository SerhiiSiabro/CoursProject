import { yearList } from "./index.js";
export function generateYearList() {
  const begin = 2000;
  const limit = 2050;
  for (let index = begin; index < limit; index++) {
    let element = document.createElement("option");
    element.textContent = index;
    element.value = index;
    yearList.append(element);
  }
  yearList.value = new Date().getFullYear();
}
