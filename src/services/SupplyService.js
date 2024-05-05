import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/admin/supplies";

export const listSupplies = () => axios.get(REST_API_BASE_URL,{ withCredentials: true });
export const createSupply = (supply) => axios.post(REST_API_BASE_URL, supply, { withCredentials: true });
export const getSupply = (supplyId) => axios.get(REST_API_BASE_URL + '/' + supplyId, { withCredentials: true });
export const updateSupply = (supplyId, supply) => axios.put(REST_API_BASE_URL + '/' + supplyId, supply, { withCredentials: true });
export const deleteSupply = (supplyId) => axios.delete(REST_API_BASE_URL + '/' + supplyId, { withCredentials: true });