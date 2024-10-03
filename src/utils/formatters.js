
export const formattedTime = (parsedTime) => parsedTime.slice(0, 5);

export const formatTimeToString = (timeStr) =>{
  const [hours, minutes, seconds] = timeStr.split(`:`).map(Number);
    
  let formattedTime = ``;

  // Add hours to the formatted string
  if (hours > 0) {
    formattedTime += hours === 1 ? `${hours} Stunde` : `${hours} Stunden`;
  }

  // Add minutes to the formatted string
  if (minutes > 0) {
    if (formattedTime) formattedTime += ' ';
    formattedTime += `${minutes} Min.`;
  }

  // If there are no hours or minutes, show 0 minutes (if the string is only seconds)
  if (!formattedTime && seconds > 0) {
    formattedTime = `${seconds} Sek.`;
  }

  return formattedTime;
}
