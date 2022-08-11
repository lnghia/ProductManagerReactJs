import AxiosClient from "../axios/axios";
import { PaginationResponseDto } from "./dtos/pagination";
import { ProductDTO } from "./dtos/ProductDTO";
import { ProductCreationDTO } from "./dtos/ProductCreationDTO";

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


export const createNewProduct = async (product: ProductCreationDTO) => {
    try {
      const response = await AxiosClient.post("/api/products", product);
  
      alert("New product has been created successfully.");
  
      return response.data;
    } catch (error: any) {
      // toast(error.response.data);
      alert(error.response.data);
  
      return null;
    }
  };
  
export const exportAllProductToCSV = async () => {
    const response = AxiosClient.get(
        `${PRODUCT_URL}/export-csv`,{headers: {'Content-Type': 'application/csv'}}
    );
    return response;
}

export const importProductFromCSVFile = async (form: FormData) => {
    const response = AxiosClient.post(
        `${PRODUCT_URL}/import-csv`, form
    );
    return response;
}
