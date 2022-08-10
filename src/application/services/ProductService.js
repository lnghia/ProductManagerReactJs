import axios from "axios";
import AxiosClient from "../../infrastructure/axios/axios";

// const PRODUCTS_REST_API_URL = 'http://localhost:8080/api/products';

// const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyQGxvY2FsaG9zdC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjYwMTI4OTU0fQ.jyoj7qy91Qzu-QBZNsZm55Gs_j644fE5icjpdiouLf1wf14gv-qFoG6mZy7CrFkNbo1JW5nOqLi6hVXalQE9_g';

// const authAxios = axios.create({
//     baseURL: PRODUCTS_REST_API_URL,
//     headers: {
//         Authorization: `Bearer ${accessToken}`,
//     },
// });


export const fetchProducts = async () => {
    try {
        let response = await AxiosClient.get("/api/products");
        return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createProduct = async (product) => {
    try {
        let response = await AxiosClient.post("/api/products", product);
        let data = response.data;
        return data;
    } catch (error) {
        return null;
    }
}

