import AxiosClient from "../axios/axios";

export const login = async (email: string, inputPassword: string) => {
  const response = await AxiosClient.post("/authenticate", {
    email: email,
    password: inputPassword,
  });
  const data = response.data;
  return data;
};
