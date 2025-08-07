const createAppointment = async (appointment) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/appointments/create`, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({ appointment }),
  });
    
  const responseData = await response.json();
    
  return responseData;
};

const appointmentsService = { createAppointment };

export default appointmentsService;
