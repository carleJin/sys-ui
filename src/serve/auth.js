import api from '@/http';

//是否登录
export const initLoginServe = () => {
    return api.ajax('GET', 'api/login/initLogin')
}
//验证码
export const captchaServe = () => {
    return api.ajax('GET', 'api/login/captcha')
}
//登录
export const loginInServe = (params) => {
    return api.ajax('POST', 'api/login/loginIn', params)
}
//退出登录 
export const loginOutServe = () => {
    return api.ajax('GET', '-')
}
//菜单路由信息
export const appInfoServe = () => {
    return api.ajax('GET', '-', {
        groupCode_eq: 3
    })
}

