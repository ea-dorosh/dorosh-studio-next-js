const fetchTimeSlots = async (date, servicesWithEmployees) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar?date=${date.format(`YYYY-MM-DD`)}`;

  const response = await fetch(apiUrl, {
    method: `POST`,
    headers: {"Content-Type": `application/json`},
    body: JSON.stringify(servicesWithEmployees),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return { daysToHighlight: data };
};

const calendarService = {fetchTimeSlots};

export default calendarService;