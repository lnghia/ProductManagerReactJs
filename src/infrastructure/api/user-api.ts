import AxiosClient from "../axios/axios";
import { PaginationResponseDto } from "./dtos/pagination";
import { UserDto } from "./dtos/user";
import { User } from "./dtos/UserState";
const USER_URL = "/api/users";

export const fetchUsers = async (page: number = 0, size: number = 5) => {
  try {
    let response = await AxiosClient.get(
      `/api/users?page=${page}&size=${size}&query=`
    );

    let result: PaginationResponseDto<UserDto> = {
      content: response.data,
      totalPages: Math.ceil(parseInt(response.headers["x-total-count"]) / size),
      totalElements: parseInt(response.headers["x-total-count"]),
    };

    return result;
  } catch (error) {
    // toastr.error(error.response.data.errors);
    console.log(error);

    return null;
  }
};

export const getCurrentUser = async () => {
  const response = await AxiosClient.get(USER_URL + "/current-user");
  return response;
};
