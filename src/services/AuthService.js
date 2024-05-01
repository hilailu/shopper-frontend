import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/auth/";

export const login = (creds) => axios.post(REST_API_BASE_URL + 'login', creds, {withCredentials: true});
export const register = (user) => axios.post(REST_API_BASE_URL + 'register', user, {withCredentials: true});
export const logout = (data) => axios.post(REST_API_BASE_URL + 'logout', data, {withCredentials: true});
export const redirect = () => axios.get(REST_API_BASE_URL, {withCredentials: true});

