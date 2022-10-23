import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://86.216.182.28:5002/api",
  timeout: 1000,
});

export { api };
