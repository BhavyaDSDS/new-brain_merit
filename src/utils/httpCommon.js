import axios from "axios";

// const base_url ="http://0.0.0.0:8000/";
// const base_url = "http://bmerit.careerkraft.in:1337/";
// const base_url = "http://3.111.188.119:1337/";
const base_url = "http://216.48.183.9:1337/";  //for elasticSearch

const api = axios.create({
  baseURL: base_url,
  headers: { "Content-type": "application/json" },
});

export const apiPrivate = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;

