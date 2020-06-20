import axios from "axios";
import LocalStorageService from "./LocalStorageService";
import {message} from "antd";

const localStorageService = LocalStorageService.getService();

const http = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
});

// Add a request interceptor
http.interceptors.request.use(
    (config) => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

http.interceptors.response.use(function (res) {
    console.log(res);
    return res;
}, (err) => {
    console.log(err);
    Promise.reject(err)
});

export default http;
