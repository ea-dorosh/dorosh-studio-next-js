const getServices = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/services`);
  const data = await response.json();
  return data;
};

const serviceService = {
  getServices,
};

export default serviceService;
