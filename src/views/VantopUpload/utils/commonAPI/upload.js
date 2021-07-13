import axios from 'axios';
import { getToken } from '@/util/auth';
import { Message } from 'element-ui';

let instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_GW,
    timeout: 1000 * 30
});

// request拦截器
// instance.interceptors.request.use(
//     config => config,
//     error => Promise.reject(error)
// ),

// respone拦截器
instance.interceptors.response.use(
    response =>
        // const { code, } = response.data;
        // if (code === '000000' || code === 'A00006') {
        //     return response;
        // }
        response,
    error => {
        // 返回错误处理
        const msg = error.message.includes('timeout')
            ? '服务器响应超时，请稍后重试'
            : '未知错误';
        Message({
            message: msg,
            type: 'error',
            duration: 1000 * 5
        });
        return Promise.reject(new Error(error));
    }
);

/**
 *@params {文件下载的请求参数}
 *@url {请求url不需要考虑网关gw自动拼接}
 *@downFileName {自定义下载的文件名称}
 *@msg {下载成功之后的提示}
 *@cb {回调函数}
 *@method {请求格式}
 */
export async function comonUpLoad(url, params) {
    instance.defaults.headers['Authorization'] = 'bearer ' + getToken();
    // 头部加入语言参数
    instance.defaults.headers['x-ca-language'] = 'zh_CN';
    // 加入请求的唯一ID
    instance.defaults.headers['x-ca-reqid'] =
        Math.random() + new Date().getTime();
    // 加入请求的时间戳
    instance.defaults.headers['x-ca-reqtime'] = new Date().getTime();
    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return instance({
        url: url,
        data: params,
        method: 'post'
    });
}
