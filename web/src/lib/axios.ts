import axios from "axios";

export const api = axios.create({
  baseURL: typeof window === 'undefined' ? 'http://server:3333/' : 'http://localhost:3333/'
})