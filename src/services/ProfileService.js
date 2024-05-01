import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/profile";

export const getCustomer = () => axios.get(REST_API_BASE_URL, { withCredentials: true });
export const saveCustomer = (customer) => axios.put(REST_API_BASE_URL, customer, {withCredentials: true});
