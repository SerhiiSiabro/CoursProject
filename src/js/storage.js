const STORAGE_KEY = "resultStorage";

export const resultsFromStorage =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export const setResultToStorage = (result) => {
  const results = resultsFromStorage;
  results.push(result);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
};
