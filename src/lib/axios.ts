import axios from "axios";

const API_BASE_URL = "https://api.jikan.moe/v4";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptors -> São middlewares que interceptam as requisições e respostas
// No caso, estamos interceptando as respostas e logando os erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    throw error;
  }
);