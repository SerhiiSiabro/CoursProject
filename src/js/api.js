const API_URL = "https://calendarific.com/api/v2/";
const API_KEY = "ju8CNLk7m20z5YCS3hnJmHWXrHHiVujW";

export const getCountriesData = async () => {
  const response = await fetch(`${API_URL}countries?api_key=${API_KEY}`);

  if (!response.ok) {
    if (response.code === 404) {
      throw new Error("Please search for a valid countrie");
    }

    throw new Error("Something went wrong");
  }

  const data = await response.json();
  return data.response.countries;
};

export const getHolidayData = async (country, year) => {
  const response = await fetch(
    `${API_URL}holidays?&api_key=${API_KEY}&country=${country}&year=${year}`
  );
  if (!response.ok) {
    if (response.code === 404) {
      throw new Error("Please search for a valid holiday");
    }

    throw new Error("Something went wrong");
  }
  const data = await response.json();
  return data;
};
