
export const formattedTime = (parsedTime) => {
  if (parsedTime) {
    return parsedTime.slice(0, 5)
  } else {
    return `no time`
  }
};

export const formatTimeToString = (timeStr) =>{
  const [hours, minutes, seconds] = timeStr.split(`:`).map(Number);
    
  let formattedTime = ``;

  if (hours > 0) {
    formattedTime += hours === 1 ? `${hours} Stunde` : `${hours} Stunden`;
  }

  if (minutes > 0) {
    if (formattedTime) formattedTime += ' ';
    formattedTime += `${minutes} Min.`;
  }

  if (!formattedTime && seconds > 0) {
    formattedTime = `${seconds} Sek.`;
  }

  return formattedTime;
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', { 
    style: `currency`, 
    currency: `EUR`,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};