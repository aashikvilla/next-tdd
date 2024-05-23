import { rest } from 'msw'
import { API_URL } from '@/app/apiService/AxiosSetUp'
import { mockLoginApi } from './login'

export const handlers = [
  rest.post(`${API_URL}auth/login`, mockLoginApi)
]
