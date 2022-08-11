import AxiosClient from "../axios/axios";

const PRODUCT_URL = "/api/products";

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