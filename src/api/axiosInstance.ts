import axios, { Method } from 'axios';
const { VITE_BACK_URL } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: VITE_BACK_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': '1233123',
  },
});

interface AuthRequestProps {
  method: Method;
  url: string;
  data?: any;
  navigate: (path: string) => void;
}

export const authRequest = async ({
  method,
  url,
  data,
  navigate,
}: AuthRequestProps) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error: any) {
    console.error('API 요청 실패 : ', error);

    if (error.response?.status === 400) {
      const goToLogin = window.confirm(
        '로그인이 필요합니다. 로그인하시겠습니까?',
      );
      if (goToLogin) {
        navigate('/signin');
      }
    }
    throw error;
  }
};

export default axiosInstance;
