import variables from '@/assets/styles/element-variables.scss';
import { themeGroup, asideGroup, headerGroup } from '@/components/themeMode/theme.js';
const themeMap = themeGroup.map(item => item.value);
const asideMap = asideGroup.map(item => item.value);
const headerMap = headerGroup.map(item => item.value);

const settingsModule = {
    state: {
        menusCollapse: false,//菜单关闭展开
        settingsControl: false,//打开关闭设置
        theme: variables.theme,//主题颜色
        themeMode: 'dark',//主题模式,
        asideMode: 'left-fixed',//左侧菜单定位模式 left：左侧可滚动，left-fixed: 左侧固定
        headerMode: 'top-fixed',//头部定位模式 top：顶部可滚动，top-fixed: 顶部固定
    },
    mutations: {
        CHANGE_SETTINGS(state, {key, value}) {
            if(Object.prototype.hasOwnProperty.call(state, key)) {
                state[key] = value
            }
        },
        TOGGLE_MENUS_MODE(state, data) {
            if(themeMap.indexOf(data) !== -1 && state.themeMode !== data) {
                state.themeMode = data
            }
        },
        TOGGLE_ASIDE_MODE(state, data) {
            if(asideMap.indexOf(data) !== -1 && state.asideMode !== data) {
                state.asideMode = data
            }
        },
        TOGGLE_HEADER_MODE(state, data) {
            if(headerMap.indexOf(data) !== -1 && state.headerMode !== data) {
                state.headerMode = data
            }
        },
    },
    actions: {
        changeSettings({ commit }, data) {
            commit('CHANGE_SETTINGS', data);
        },
        toggleMeunsMode({ commit }, data) {
            commit('TOGGLE_MENUS_MODE', data);
        },
        toggleAsideMode({ commit }, data) {
            commit('TOGGLE_ASIDE_MODE', data);
        },
        toggleHeaderMode({ commit }, data) {
            commit('TOGGLE_HEADER_MODE', data);
        },
    }
}

export default settingsModule