import { Rest } from '@shared/plugins/rest'
import axios from 'axios'

export const fileApi = new Rest(axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
}))
