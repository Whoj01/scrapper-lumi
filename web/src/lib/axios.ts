import axios from "axios";

export const api = axios.create({
  baseURL: typeof window === 'undefined' ? 'http://lumi-test-server-1:3333/' : 'http://localhost:3333/'
})