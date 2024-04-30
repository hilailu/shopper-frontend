import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/auth";

export const login = (creds) => axios.post(REST_API_BASE_URL + '/login', creds);
export const register = (user) => axios.post(REST_API_BASE_URL + '/register', user);