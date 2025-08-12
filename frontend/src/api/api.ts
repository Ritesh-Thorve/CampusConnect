import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // goes through Vite proxy in dev
  withCredentials: true
});
