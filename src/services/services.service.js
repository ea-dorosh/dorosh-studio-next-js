import ERRORS from "@/constants/errors";

const getServices = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/services`);
  const data = await response.json();
  return data;
};

const createService = async (service) => {
  if (service.bufferTime === "") {
    service.bufferTime = null;
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ service }),
    });

    if(response.status === ERRORS.VALIDATION_ERROR) {
      const data = await response.json();
      throw new Error(JSON.stringify(data.errors));
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteService = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}api/services/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
};

const serviceService = {
  getServices,
  createService,
  deleteService,
};

export default serviceService;
