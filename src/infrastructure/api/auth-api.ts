import AxiosClient from "../axios/axios";

export const login = async (email: string, inputPassword: string) => {
  let response = await AxiosClient.post("/login", {
    username: email,
    password: inputPassword,
  });
  let data = response.data.data;

  return data;
};
