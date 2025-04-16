import axios from "axios";
import qs from "qs"; // 正确引入 qs 库

const request = axios.create({
    baseURL:'/api', // 确保环境变量已配置
    timeout: 10000,
});

request.interceptors.request.use(
    (config) => {
        if (config.method?.toLowerCase() === "post") {
            config.data = qs.stringify(config.data); // 使用 qs 序列化数据
            config.headers["Content-Type"] = "application/x-www-form-urlencoded"; // 必须设置请求头
        }
        return config;
    },
    (error) => Promise.reject(error)
);

request.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("请求错误:", error.message);
        return Promise.reject(error);
    }
);

export default request;