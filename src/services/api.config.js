import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL || 'http://intranet.urgencesante.fr:8090/api',
  timeout: 1000,
})

export { api }
