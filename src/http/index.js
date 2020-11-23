import Vue from 'vue';
import instance from './axios';
Vue.prototype.$http = instance;

export default class api {
    static getMethodType(method) {
        if(typeof method === 'string') {
            method = method.toUpperCase();
        }
        if(['PUT', 'POST','PATCH'].indexOf(method) != -1) {
            return 'data'
        } else {
            return 'params'
        }
    }
    static ajax(method, url, params, headers) {
        const methodType = this.getMethodType(method)
        return instance({ 
            method, 
            url, 
            params: methodType === 'params' ? params : null, 
            data: methodType === 'data' ? params : null, 
            headers
        })
    }
}