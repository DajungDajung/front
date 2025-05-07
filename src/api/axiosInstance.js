import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': '123123',
  }
})
