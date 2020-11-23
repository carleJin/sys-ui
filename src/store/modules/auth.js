import { addRoutes } from '@/router';
import { authToken } from '@/utils/auth';

const authModule = {
    /**
     * 思路：本例中获取 [token, user] 数据是登录接口 与获取 [menus，routes] 数据的接口是分开的，
     *      在路由拦截里面没有对 [token, user] 数据进行再次获取以解决 “刷新问题”。
     * 解决办法：可以将 [token, user] 存储在浏览器，
     *          或者在路由拦截里面将获取 [token, user] 的接口（此接口和登录接口不要重复）也调用一次(同时调用多个函数可参考 Promise.all() 用法)。
     * 推荐：登录获取 [token] ，将token存储在浏览器，
     *      登录成功后再调用接口(整合为一个接口最好)获取 [user，menus，routes] 数据信息，这样好解决刷新问题。
    */
    state: {
        token: authToken.hasToken(),
        user: null,//登录信息
        menus: [],//菜单
        routes: null,//异步路由
    },
    mutations: {
        SET_TOKEN(state, data) {
            state.token = data
        },
        SET_USER(state, data) {
            state.user = data
        },
        SET_MUENS(state, data) {
            state.menus = data
        },
        SET_ROUTES(state, data) {
            state.routes = data
        },
        RESET_AUTH_STATE(state) {
            authToken.removeToken();
            state.token = null;
            state.user = null;
            state.menus = [];
            state.routes = null;
        }
    },
    actions: {
        setToken({ commit }, data) {
            commit('SET_TOKEN', data);
        },
        setUser({ commit }, data) {
            commit('SET_USER', data);
        },
        setMenus({ commit }, data) {
            commit('SET_MUENS', data);
        },
        setRoutes({ commit }, data) {
            commit('SET_ROUTES', data);
            addRoutes(data)
        },
        resetAuthState({ commit }) {
            commit('RESET_AUTH_STATE');
        }
    }
}

export default authModule