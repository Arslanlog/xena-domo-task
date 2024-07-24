import axios from "axios";
const BASE_URL = "http://localhost:9000";
const http = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export default http;