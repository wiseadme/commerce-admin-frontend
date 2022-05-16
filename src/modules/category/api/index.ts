import axios from 'axios'
import { Rest } from '@shared/plugins/rest'

export const rest = new Rest(axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 10000
}))
