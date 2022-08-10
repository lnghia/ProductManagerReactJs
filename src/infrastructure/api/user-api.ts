import AxiosClient from "../axios/axios";
import { PaginationResponseDto } from "./dtos/pagination";
import { UserDto } from "./dtos/user";
import { User } from './dtos/UserState';
const USER_URL = "/api/users";

export const fetchUsers = async () => {
  try {
    const response: PaginationResponseDto<UserDto> = await AxiosClient.get(
      "/users"
    );

    return response;
  } catch (error) {
    // toastr.error(error.response.data.errors);
    console.log(error);

    return [];
  }
};

export const getCurrentUser = async () => {
    const response = await AxiosClient.get(USER_URL + "/current-user");
    return response;
};
