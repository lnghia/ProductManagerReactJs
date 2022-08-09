import AxiosClient from "../axios/axios";
import { PaginationResponseDto } from "./dtos/pagination";
import { UserDto } from "./dtos/user";

export const fetchUsers = async () => {
  try {
    let response: PaginationResponseDto<UserDto> = await AxiosClient.get(
      "/users"
    );

    return response;
  } catch (error) {
    // toastr.error(error.response.data.errors);
    console.log(error);

    return [];
  }
};
