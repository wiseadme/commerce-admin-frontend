import axios, { AxiosInstance } from 'axios'

export const rest: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000,
})

export const fileApi = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000,
})
