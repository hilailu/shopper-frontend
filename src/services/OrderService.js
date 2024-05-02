import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/orders";

export const orderProducts = (products) => axios.post(REST_API_BASE_URL, products, { withCredentials: true });
export const getOrdersForCustomer = () => axios.get(REST_API_BASE_URL, { withCredentials: true });
