import { addRoutes } from '@/router';
import { authToken } from '@/utils/auth';

const authModule = {
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
            const menus = [
                {
                    title: '首页',
                    icon: 'el-icon-house',
                    path: '/home'
                },
                ...data
            ];
            state.menus = menus
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