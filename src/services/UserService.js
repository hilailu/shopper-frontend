import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/admin/users";

export const getAllUsers = () => axios.get(REST_API_BASE_URL, { withCredentials: true });
export const updateUserRole = (userRole) => axios.post(REST_API_BASE_URL, userRole, { withCredentials: true });