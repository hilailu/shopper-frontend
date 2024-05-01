import axios from "axios";

const REST_API_BASE_URL_ADMIN = "http://localhost:8080/admin/products";
const REST_API_BASE_URL_CATALOG = "http://localhost:8080/catalog";

export const listProducts = () => axios.get(REST_API_BASE_URL_ADMIN,{ withCredentials: true });
export const createProduct = (product) => axios.post(REST_API_BASE_URL_ADMIN, product, { withCredentials: true });
export const getProduct = (productId) => axios.get(REST_API_BASE_URL_ADMIN + '/' + productId, { withCredentials: true });
export const updateProduct = (productId, product) => axios.put(REST_API_BASE_URL_ADMIN + '/' + productId, product, { withCredentials: true });
export const deleteProduct = (productId) => axios.delete(REST_API_BASE_URL_ADMIN + '/' + productId, { withCredentials: true });

export const showCatalog = () => axios.get(REST_API_BASE_URL_CATALOG,{ withCredentials: true });
export const filterCatalog = (params) => axios.get(REST_API_BASE_URL_CATALOG,{ params: params, withCredentials: true });



