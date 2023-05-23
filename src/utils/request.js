import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 基本网址
    withCredentials: true, // 凭证 Cookie
    timeout: 10 * 60 * 1000, // 请求超时
});
const handleCode = (code) => {
    switch (code) {
        case 400:
            ElMessage.error('请求类型错误，请检查请求参数！');
            break;
        case 404:
            ElMessage.error('请求不存在，服务器无法操作！');
            break;
        case 405:
            ElMessage.error('请求协议错误！');
            break;
        case 500:
            ElMessage.error('服务器发生错误！');
            break;
        case 502:
            ElMessage.error('服务器网关错误！');
            break;
        case 503:
            ElMessage.error('服务器暂时过载或维护！');
            break;
        case 504:
            ElMessage.error('服务器网关超时！');
            break;
        default:
            /* ElMessage.error(msg || '未知异常，请稍后再试！'); */
            break;
    }
};
const errorHandler = (error) => {
    const { response, message } = error;
    if (response && !response.data) {
        const { status, data } = response;
        handleCode(status, data.msg || message);
    } else {
        // eslint-disable-next-line no-shadow
        let { message } = error;
        if (message === 'Network Error') {
            message = '网络错误，请检查网络！';
        }
        if (message.includes('timeout')) {
            message = '请求服务超时！';
        }
        if (message.includes('Request failed with status code')) {
            const code = message.substr(message.length - 3);
            message = `服务接口${code}异常`;
        }
    }
    return Promise.reject(error);
};
// Request interceptors
service.interceptors.request.use(
    (config) => config,
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptors
service.interceptors.response.use(async (response) => response.data, errorHandler);

export default service;
