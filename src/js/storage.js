const STORAGE_KEY = "resultStorage";

const getResultsFromStorage = () => {
  const results = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return results;
};

export const setResultToStorage = (result) => {
  const results = getResultsFromStorage();
  results.push(result);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
};
