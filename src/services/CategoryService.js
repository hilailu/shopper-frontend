import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/admin/categories";

export const listCategories = () => axios.get(REST_API_BASE_URL,{ withCredentials: true });
export const createCategory = (category) => axios.post(REST_API_BASE_URL, category, { withCredentials: true });
export const getCategory = (categoryId) => axios.get(REST_API_BASE_URL + '/' + categoryId, { withCredentials: true });
export const updateCategory = (categoryId, category) => axios.put(REST_API_BASE_URL + '/' + categoryId, category, { withCredentials: true });
export const deleteCategory = (categoryId) => axios.delete(REST_API_BASE_URL + '/' + categoryId, { withCredentials: true });
