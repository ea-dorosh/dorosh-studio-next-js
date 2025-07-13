const getCompany = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/public/company`);
  const data = await response.json();
  return data;
};

const companyService = {
  getCompany,
};

export default companyService;