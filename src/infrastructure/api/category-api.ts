import AxiosClient from "../axios/axios";
import { CategoryDTO } from "./dtos/CategoryDTO";

export const fetchCategories = async () => {
    try {
        let response = await AxiosClient.get(`/api/categories`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}