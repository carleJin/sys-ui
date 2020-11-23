const getters = {
    user: state => state.auth.user,
    token: state => state.auth.token,
    menus: state => state.auth.menus,
    routes: state => state.auth.routes,
    
    menusCollapse: state => state.settings.menusCollapse,
    settingsControl: state => state.settings.settingsControl,
    themeMode: state => state.settings.themeMode,
    asideMode: state => state.settings.asideMode,
    headerMode: state => state.settings.headerMode,
}

export default getters