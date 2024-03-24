export const getFormattedDate = (language, date, options) => {
    let defaultOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
  
    if (options) {
      defaultOptions = options;
    }
  
    return new Intl.DateTimeFormat(language, defaultOptions).format(new Date(date));
  };