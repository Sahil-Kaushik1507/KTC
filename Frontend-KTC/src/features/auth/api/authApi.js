import axiosInstance from "../../../api/axios.js";

export const loginUserApi = async (payload) => {
  const response = await axiosInstance.post(
    "/auth/login",
    payload
  );

  return response.data;
};