import axios from 'axios';
const { VITE_BACK_URL } = import.meta.env

console.log(VITE_BACK_URL)

const axiosInstance = axios.create({
  baseURL: VITE_BACK_URL,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'ngrok-skip-browser-warning': '1233123',
  },
});

export const authRequest = async ({method, url, data, navigate}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      const goToLogin = window.confirm(
        '로그인이 필요합니다. 로그인하시겠습니까?',
      );
      if (goToLogin) navigate('/signin');
    }
    throw error;
  }
};

export default axiosInstance;
