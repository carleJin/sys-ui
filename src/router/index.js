import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes';
Vue.use(VueRouter);
import store from '@/store';
import { baseConfig, userConfig } from '@/base.config';
// 引入页面顶部进度条插件
import NProgress from 'nprogress';
// 进度条配置
NProgress.configure({...baseConfig.NProgress});

import { authToken } from '@/utils/auth';
// import { appInfoServe } from '@/serve/auth';

const asyncMenus = require('@/menu.json');
const asyncRoutes = require('@/routes.json');

//路由白名单
const whiteList = ['/login', '/error/404'];
//路由实例
const router = new VueRouter({
    // mode: 'history',
    routes
});

const load = (path) => {
    // return resolve => require([`../views/${path}.vue`], resolve) 
    return () => import(`../views/${path}.vue`) 
};
const loadDocs = (path) => {
    // return resolve => require([`../components/${path}.vue`], resolve) 
    return () => import(`../components/${path}.vue`) 
};

const loadRoutes = (arr, parent = []) => {
    let groups = [];
    arr.forEach(route => {
        let group = {
            path: route.path,
            name: route.name,
            meta: {
                title: route.title,
                parent
            },
            component: load(route.component) 
        }
        if(route.redirect) group.redirect = route.redirect;

        if(route.children) {
            if(route.type === 'layout') {
                group.children = loadRoutes(route.children, [...parent, route]);
            } else {
                groups = [...groups, ...loadRoutes(route.children, [...parent, route])];
            }
        }
        groups.push(group);
    })
    return groups
}
//创建路由
export const createRoutes = (arr) => {
    const groups = loadRoutes(arr)
    
    return [
        {
            path: '/',
            component: loadDocs('layout/index'),
            redirect: '/home',
            children: groups
        },{
            path: '/home',
            component: load('home/index'),
            children: groups
        },{
            path: '*',
            redirect: '/error/404'
        }
    ]
}
//将创建好的路由加入路由实例
export const addRoutes = (data) => {
    router.addRoutes(createRoutes(data))
}


router.beforeEach((to, from , next) => {
    NProgress.start();
    document.title = (to.meta && to.meta.title) ? to.meta.title : baseConfig.docTitle;
    //是否在白名单里
    if(whiteList.indexOf(to.path) !== -1) {
        console.log('--在白名单里--');
        next()
    } else {
        console.log('--不在白名单里--');
        if(authToken.hasToken()) {
            console.log('--有token--');
            if(store.getters.routes) {
                console.log('--已设置routes--');
                next()
            } else {
                console.log('--未设置routes--');
                //获取 用户信息，路由及权限
                // appInfoServe().then(() => {
                //     store.dispatch('setMenus', asyncMenus);
                //     store.dispatch('setRoutes', asyncRoutes).then(() => {
                //         next({ ...to, replace: true })
                //     });
                // }).catch(() => {
                //     next({path: '/login'});
                //     NProgress.done();
                // })
                store.dispatch('setToken', userConfig.access_token);
                store.dispatch('setUser', {...userConfig});
                store.dispatch('setMenus', asyncMenus);
                store.dispatch('setRoutes', asyncRoutes).then(() => {
                    next({ ...to, replace: true })
                });
            }
        } else {
            console.log('--无token--', to.path);
            if(to.path !== '/' && to.path !== '/login') {
                next({
                    path: '/login', 
                    query: {
                        redirect: to.path
                    }
                });
            } else {
                next({
                    path: '/login'
                })
            }
            NProgress.done();
        }
    }
}) 

router.afterEach(() => {
    NProgress.done();
})

export default router;
