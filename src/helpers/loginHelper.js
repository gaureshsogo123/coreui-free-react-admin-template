import { axiosInstance } from '../axiosInstance';

export const signIn = async (mobileNo, password) => {
  return axiosInstance
    .post('/crm/user/signIn', { mobileNo, password })
    .then((res) => {
      return { message: res.data.message, data: res.data.data };
    })
    .catch((err) => {
      return { error: err.message, data: {} };
    });
};
