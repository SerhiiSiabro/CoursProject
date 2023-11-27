const translations = {
  en: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" },
  ua: { days: "днів", hours: "годин", minutes: "хвилин", seconds: "секунд" },
};

export const translate = (key, language) => {
  return translations[language][key];
};
