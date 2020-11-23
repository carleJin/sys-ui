const routes = [
    {
        path: '/error/404',
        name: 'Error404',
        component: () => import('../views/error/404.vue')
    },{
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    }
];

export default routes