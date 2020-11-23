/**
 * @key docTitle 网页默认 title
 * @key tokenExpires token失效时长
 * @key NProgress 顶部进度条[https://github.com/rstacruz/nprogress]
*/
export const baseConfig = {
    docTitle: 'vue-alain',
    tokenExpires: () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    NProgress: { minimum: 0.8, easing: 'ease', speed: 300, showSpinner: false }
}

/**
 * @key responseError axios请求出错提示
*/
export const axiosConfig = {
    responseError: {
        options: {
            title: '错误',
            message: '接口错误请联系管理员!',
            position: 'bottom-right'
        }
    }
}

/**
 * 测试用用户信息
*/
export const userConfig = {
    access_token: "e003ada9-7e1d-4ba8-b4c7-de0f81c18894",
    animal_user: false,
    dept_id: 21,
    expires_in: 25572,
    license: "made by jfcloud",
    refresh_token: "8a82c8e0-a48a-4475-a8da-f491e932ec33",
    scope: "server",
    tenant_id: 3,
    token_type: "bearer",
    unitId: 3,
    user_id: 94,
    username: "操作用户",
}
