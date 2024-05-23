import axios from 'axios';
export const API_URL = 'https://demo9689581.mockable.io/';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
