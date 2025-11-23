const createAppointment = async (appointment) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/appointments/create`, {
      method: `POST`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ appointment }),
    });

    // Handle server errors (500, etc.)
    if (!response.ok && response.status >= 500) {
      throw new Error(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    // Network errors, timeouts, JSON parse errors, etc.
    if (error.message.includes(`Beim Erstellen`)) {
      throw error; // Re-throw our custom error
    }
    throw new Error(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
  }
};

const getAppointmentByToken = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/appointments/by-token/${token}`, {
    method: `GET`,
    headers: { "Content-Type": `application/json` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to fetch appointment`);
  }

  const responseData = await response.json();

  return responseData;
};

const cancelAppointmentByToken = async (token, cancellationReasonText = null, appointmentIds = null) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/appointments/cancel-by-token`, {
    method: `POST`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({
      token,
      cancellationReasonText,
      appointmentIds, // Array of specific appointment IDs to cancel
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to cancel appointment`);
  }

  const responseData = await response.json();

  return responseData;
};

const appointmentsService = {
  createAppointment,
  getAppointmentByToken,
  cancelAppointmentByToken,
};

export default appointmentsService;
