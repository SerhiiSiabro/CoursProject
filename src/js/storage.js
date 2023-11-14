const STORAGE_KEY = "resultStorage";

export const getResultsFromStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const setResultToStorage = (result) => {
  const results = getResultsFromStorage();
  results.push(result);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
};
