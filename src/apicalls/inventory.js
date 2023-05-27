import { axiosInstance } from ".";

export const GetInventory = () => {
  return axiosInstance("get", "/api/inventory/get");
};
