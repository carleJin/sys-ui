import axios from 'axios';
import store from '../store';
import router from '../router';
import { Notification } from 'element-ui';
import { authToken } from '@/utils/auth';
import { axiosConfig } from '@/base.config';

const instance = axios.create({
    timeout: 6000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

instance.interceptors.request.use(
    config => {
        // console.log('拦截成功', config.headers);
        // if(!config.headers['Authorization']) {
        //     config.headers['Authorization'] = `Bearer ${authToken.hasToken()}`;
        // }
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
        
        if (res.code !== 20000) {
            // 58000:未登录
            if (res.code === 58000) {
                store.dispatch('resetAuthState').then(() => {
                    if(router.history.current.path !== '/login') {
                        location.reload()
                    }
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