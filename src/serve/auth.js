import api from '@/http';

//登录信息
export const loginServe = () => {
    return api.ajax('GET', 'auth/oauth/token', {
        username: '操作用户',
        password: '123456',
        grant_type: 'password',
        code: null,
        scope: 'server',
        _allow_anonymous: true
    }, {
        Authorization: 'Basic amZjbG91ZDpqZmNsb3Vk', 
        TENANT_ID: '3'
    })
}
//退出登录 
export const loginOutServe = () => {
    return api.ajax('GET', 'auth/oauth/loginout')
}
//菜单路由信息
export const appInfoServe = () => {
    return api.ajax('GET', 'admin/user/appInfo', {
        groupCode_eq: 3
    })
}

