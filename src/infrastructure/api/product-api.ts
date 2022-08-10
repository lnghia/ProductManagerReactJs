import AxiosClient from "../axios/axios";
import { PaginationResponseDto } from "./dtos/pagination";
import { ProductDTO } from "./dtos/ProductDTO";
const PRODUCT_URL = "/api/products";

export const fetchProducts = async (page: number = 0, size: number = 5) => {
    try {
        let response = await AxiosClient.get(`/api/products?page=${page}&size=${size}&query=`);

        let result: PaginationResponseDto<ProductDTO> = {
            content: response.data,
            totalPages: Math.ceil(parseInt(response.headers["x-total-count"]) / size),
            totalElements: parseInt(response.headers["x-total-count"]),
          };

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

