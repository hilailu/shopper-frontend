import axios from "axios";

const REST_API_BASE_URL_ADMIN = "http://localhost:8080/admin/orders";
const REST_API_BASE_URL_USER = "http://localhost:8080/orders";

export const orderProducts = (products) => axios.post(REST_API_BASE_URL_USER, products, { withCredentials: true });
export const getOrdersForCustomer = () => axios.get(REST_API_BASE_URL_USER, { withCredentials: true });

export const getAllOrders = () => axios.get(REST_API_BASE_URL_ADMIN, { withCredentials: true });
export const updateOrderStatus = (orderStatus) => axios.post(REST_API_BASE_URL_ADMIN, orderStatus, { withCredentials: true });
