import { tabButtonCountry, tabButtonTime } from "./index.js";

export function chengeTab(event) {
  const tabTime = document.querySelector(".tab-time");
  const tabCountry = document.querySelector(".tab-country");
  if (event.currentTarget.classList[0] === "tab-button-time") {
    tabButtonTime.classList.add("active-button");
    tabButtonCountry.classList.remove("active-button");
    tabTime.classList.add("active");
    tabCountry.classList.remove("active");
  } else if (event.currentTarget.classList[0] === "tab-button-country") {
    tabButtonTime.classList.remove("active-button");
    tabButtonCountry.classList.add("active-button");
    tabCountry.classList.add("active");
    tabTime.classList.remove("active");
  }
}
