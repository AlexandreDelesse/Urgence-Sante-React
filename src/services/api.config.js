import axios from "axios";

const api = axios.create({
  baseURL: "http://intranet.urgencesante.fr:8080/api",
  timeout: 1000,
});

export { api };
