import Cookies from 'js-cookie';

const tokenExpires = function() {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
}
//token管理
export const authToken = {
    tokenKey: "token",

    hasToken: function () {
        return Cookies.get(this.tokenKey);
    },

    setToken: function (token) {
        Cookies.set(this.tokenKey, token, {
            expires: tokenExpires()
        });
    },

    removeToken: function () {
        Cookies.remove(this.tokenKey);
    },
};

//菜单处理
export const menusFormat = function(data) {
    let menus = [], routes = [];
    if(data) {
        data.forEach(v => {
            let menu = {
                ...v,
                title: v.menuDirName,
                icon: v.menuDirIcon,
                path: '/index'
            }

            if(v.children && v.children.length) {
                const item = menusFormat(v.children);
                menu.children = item.menus;
                routes = [...routes, ...menu.routes]
            } else {
                if(v.type === 'link') {
                    routes.push({
                        type: v.type,
                        title: v.title,
                        name: v.name,
                        redirect: v.redirect,
                        path: v.path,
                        component: v.component
                    })
                }
            }
            menus.push(menu)
        })
    }
    return { menus, routes }
}