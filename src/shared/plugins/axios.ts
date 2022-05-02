import axios, { AxiosInstance } from 'axios'

export const rest: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // baseURL: 'http://localhost:5000',
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000,
})
