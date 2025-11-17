import axios from "axios";

const api = axios.create({
  baseURL: "https://zany-zebra-v7976wrv45624wq-5000.app.github.dev/api", 
});

export default api;
