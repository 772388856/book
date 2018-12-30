import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('./views/home/')
        },
        {
            path: '/lists/:type/:id',
            name: 'lists',
            component: () =>
                import ('./views/lists/')
        },
        {
            path: '/book/:id',
            name: 'book',
            component: () =>
                import ('./views/book/')
        },
        {
            path: '/catalog/:id',
            name: 'catalog',
            component: () =>
                import ('./views/catalog/')
        },
        {
            path: '/read/:id/:read',
            name: 'read',
            component: () =>
                import ('./views/read/')
        }
    ]
})