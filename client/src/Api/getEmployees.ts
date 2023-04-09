import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8080";

const getEmployees = async () => {
  const res = await axios.get(`${BASE_URL}/reviews?limit=15&ignore=0`);

  //   console.log(employees);
  return res;
};

const Api = { getEmployees };

export default Api;
