import axios from "axios";

const BASE_URL = "http://195.54.175.196";
//
// http://195.54.175.196/reviews

const getEmployees = async (page: number) => {
  const res = await axios.get(`${BASE_URL}/reviews?limit=15&page=${page}`);

  return res;
};

const uploadFile = async (file: any, token: string) => {
  try {
    const formData = new FormData();
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const encodedFileName = encodeURIComponent(file[i].name);
        formData.append("file", file[i], encodedFileName);
      }
    }
    const res = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

const deleteRecords = async (token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res;
  } catch (err: any) {
    console.log(err);
  }
};

const login = async (name: string, password: string) => {
  try {
    const res = axios.post(`${BASE_URL}/login`, {
      name,
      password,
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

const registration = async (name: string, password: string) => {
  try {
    const res = axios.post(`${BASE_URL}/registration`, {
      name,
      password,
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

const auth = async (token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res;
  } catch (err: any) {
    console.log(err);
  }
};

const Api = {
  getEmployees,
  uploadFile,
  login,
  registration,
  auth,
  deleteRecords,
};

export default Api;
