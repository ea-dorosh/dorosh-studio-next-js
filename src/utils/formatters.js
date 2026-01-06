/**
 * Formats time to a more readable format without seconds.
 * @param {string} parsedTime - The time in 'HH:MM:SS' or "2025-04-02 12:30:00" format to format.
 * @returns {string} - The formatted time in 'HH:MM' format or 'no time' if parsedTime is falsy.
 */
export const formattedTime = (parsedTime) => {
  if (!parsedTime) return `Fehler`;

  const timeString = parsedTime.includes(` `)
    ? parsedTime.split(` `)[1]
    : parsedTime;

  const [hours, minutes] = timeString.split(`:`);

  return `${hours}:${minutes}`;
};

/**
 * Formats a time string into a more readable format with hours and minutes.
 * @param {string} timeStr - The time string in 'HH:MM:SS' format to format.
 * @returns {string} - The formatted time string, e.g., '1 Stunde 15 Min.' or '45 Sek.' if no hours or minutes.
 */
export const formatTimeToString = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(`:`).map(Number);

  let formattedTime = ``;

  if (hours > 0) {
    formattedTime += hours === 1 ? `${hours} Std.` : `${hours} Std.`;
  }

  if (minutes > 0) {
    if (formattedTime) formattedTime += ` `;
    formattedTime += `${minutes} Min.`;
  }

  if (!formattedTime && seconds > 0) {
    formattedTime = `${seconds} Sek.`;
  }

  return formattedTime;
}

/**
 * Formats a price to the Euro currency format.
 * @param {number} price - The price amount to format.
 * @returns {string} - The formatted price in Euro, e.g., '1.000 €'.
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat(`de-DE`, {
    style: `currency`,
    currency: `EUR`,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Formats a price range from employees array.
 * If all prices are the same, returns single price. Otherwise returns range.
 * @param {Array} employees - Array of employees with price property.
 * @returns {string} - The formatted price range, e.g., '40€' or '40€ - 50€'.
 */
export const formatPriceRange = (employees) => {
  if (!employees || employees.length === 0) {
    return `0€`;
  }

  const prices = employees
    .map((employee) => employee.price || 0)
    .filter((price) => price > 0);

  if (prices.length === 0) {
    return `0€`;
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (minPrice === maxPrice) {
    return `${minPrice}€`;
  }

  return `${minPrice}€ - ${maxPrice}€`;
};

/**
 * Formats an ISO date string to a more readable format.
 * @param {string} dateString - The date in 'YYYY-MM-DD' format to format.
 * @returns {string} - The formatted date, e.g., '01. Jan 21'.
 */
export const formatIsoDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: `short`,
    year: `2-digit`,
    day: `2-digit`,
  };
  const formattedDate = date.toLocaleDateString(`en-GB`, options);
  const [day, month, year] = formattedDate.split(` `);

  return `${day}. ${month} ${year}`;
};

/**
 * Formats a date to a more readable format.
 * @param {string} dateString - The date in 'dayjs' format.
 * @returns {string} - The formatted date, e.g., 'June 2025', 'Jan-Feb 2025'.
 */
export const formatMonthYear = (start) => {
  const end = start.add(6, `days`);

  // Check if the months are different
  if (start.month() === end.month()) {
    return start.format(`MMMM YYYY`); // Same month
  } else {
    // Return the abbreviated months and the year
    return `${start.format(`MMM`)}-${end.format(`MMM`)} ${start.year()}`;
  }
};
