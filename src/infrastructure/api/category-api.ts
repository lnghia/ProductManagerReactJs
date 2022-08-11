import AxiosClient from "../axios/axios";
import { CategoryCreationDTO } from "./dtos/CategoryCreationDTO";

export const fetchCategories = async () => {
    try {
        let response = await AxiosClient.get(`/api/categories`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createNewCategory = async (category: CategoryCreationDTO) => {
    try {
      const response = await AxiosClient.post("/api/categories", category);
  
      alert("New category has been created successfully.");
  
      return response.data;
    } catch (error: any) {
      // toast(error.response.data);
      alert(error.response.data);
  
      return null;
    }
  };