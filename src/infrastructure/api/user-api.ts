import { UserCreationDto } from "./dtos/UserCreationDto";
import AxiosClient from "../axios/axios";
import { PaginationResponseDto } from "./dtos/pagination";
import { UserDto } from "./dtos/user";
const USER_URL = "/api/users";

export const fetchUsers = async (page = 0, size = 5) => {
  try {
    const response = await AxiosClient.get(
      `/api/users?page=${page}&size=${size}&query=`
    );

    const result: PaginationResponseDto<UserDto> = {
      content: response.data,
      totalPages: Math.ceil(parseInt(response.headers["x-total-count"]) / size),
      totalElements: parseInt(response.headers["x-total-count"]),
    };

    return result;
  } catch (error: any) {
    // toast(error.response.data);
    console.log(error.response.data);

    return null;
  }
};

export const getCurrentUser = async () => {
  const response = await AxiosClient.get(USER_URL + "/current-user");
  return response;
};

export const createNewUser = async (user: UserCreationDto) => {
  try {
    const response = await AxiosClient.post("/api/users", user);

    alert("New user has been created successfully.");

    return response.data;
  } catch (error: any) {
    // toast(error.response.data);
    alert(error.response.data);

    return null;
  }
};
