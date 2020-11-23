import axios from 'axios';
import store from '../store';
import { Notification } from 'element-ui';
import { authToken } from '@/utils/auth';
import { axiosConfig } from '@/base.config';

const instance = axios.create({
    timeout: 6000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json;charset=UTF-8',
    }
})

instance.interceptors.request.use(
    config => {
        // console.log('拦截成功', config.headers);
        if(!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${authToken.hasToken()}`;
        }
        return config;
    }, 
    error => {
        // console.log('拦截失败', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // console.log('响应成功', response);
        const res = response.data

        // 接口调用失败 code !== 0
        if (res.code !== null && res.code !== undefined && res.code !== 0) {
            // 50008:令牌非法；50012:其他客户端登录；50014:令牌过期；
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                store.dispatch('resetAuthState').then(() => {
                    location.reload()
                })
            }

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    }, 
    error => {
        // console.log('响应失败', error);
        Notification.error(axiosConfig.responseError.options)
        return Promise.reject(error);
    }
);

export default instance