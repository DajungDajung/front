import axios, { AxiosInstance, Method } from 'axios';
const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_BACK_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': '1233123',
  },
});

interface AuthRequestOptions<T = any> {
  method: Method;
  url: string;
  data?: T;
  navigate: (path: string) => void;
}

/**
 * Sends an HTTP request with auth handling.
 * @template R - expected response data type
 * @template B - request body type
 * @param options - request options
 * @returns Promise<R>
 */
export async function authRequest<R = any, B = any>(
  options: AuthRequestOptions<B>,
): Promise<R> {
  const { method, url, data, navigate } = options;
  try {
    const response = await axiosInstance.request<R>({ method, url, data });
    return response.data;
  } catch (error: any) {
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
}

export default axiosInstance;
