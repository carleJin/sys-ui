import Cookies from 'js-cookie';
import { baseConfig } from '@/base.config';

export const authToken = {
    tokenKey: "token",

    hasToken: function () {
        return Cookies.get(this.tokenKey);
    },

    setToken: function (token) {
        Cookies.set(this.tokenKey, token, {
            expires: baseConfig.tokenExpires()
        });
    },

    removeToken: function () {
        Cookies.remove(this.tokenKey);
    },
};