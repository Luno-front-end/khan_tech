import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8080";

const getEmployees = async (page: number) => {
  const res = await axios.get(`${BASE_URL}/reviews?limit=15&page=${page}`);

  return res;
};

const Api = { getEmployees };

export default Api;
