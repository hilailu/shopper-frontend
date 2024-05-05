import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/admin/vendors";

export const listVendors = () => axios.get(REST_API_BASE_URL,{ withCredentials: true });
export const createVendor = (vendor) => axios.post(REST_API_BASE_URL, vendor, { withCredentials: true });
export const getVendor = (vendorId) => axios.get(REST_API_BASE_URL + '/' + vendorId, { withCredentials: true });
export const updateVendor = (vendorId, vendor) => axios.put(REST_API_BASE_URL + '/' + vendorId, vendor, { withCredentials: true });
export const deleteVendor = (vendorId) => axios.delete(REST_API_BASE_URL + '/' + vendorId, { withCredentials: true });