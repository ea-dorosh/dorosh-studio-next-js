const fetchTimeSlots = async (date, servicesWithEmployees) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar?date=${date.format(`YYYY-MM-DD`)}`;

  const response = await fetch(apiUrl, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(servicesWithEmployees),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return { daysToHighlight: data };
};

/**
 * Fetch nearest available time slots for multiple employee combinations
 * @param {number} serviceId - Service ID for which we're checking employee combinations
 * @param {Array<{key: string, employeeIds: number[]}>} employeeCombinations - Employee combinations to check
 * @param {Array<{serviceId: number, employeeIds: number[]}>} otherServices - Other services to consider (for 2-service scenarios)
 * @returns {Promise<Object>} - Object with key -> { date, time } or null
 */
const fetchNearestSlots = async (serviceId, employeeCombinations, otherServices = []) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar/nearest-slot`;

  const response = await fetch(apiUrl, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({
      serviceId,
      employeeCombinations,
      otherServices,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

const calendarService = {
  fetchTimeSlots,
  fetchNearestSlots,
};

export default calendarService;
