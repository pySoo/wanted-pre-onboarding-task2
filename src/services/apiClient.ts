import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from '@/constants/config';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
