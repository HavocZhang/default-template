import {createRouter, createWebHistory} from 'vue-router'

import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import LoginView from './views/LoginView.vue'
import NotFound from "./components/NotFound.vue";
import UserSettings from "./views/UserSettings.vue";
import UserEmailsSubscriptions from "./views/UserEmailsSubscriptions.vue";
import UserProfile from "./views/UserProfile.vue";
import UserProfilePreview from "./views/UserProfilePreview.vue";
import {useUserStore} from "./store/user.ts";

const routes = [
    {path: '/', component: HomeView, meta: {isAdmin: true, requiresAuth: true, name: 'HomeView', fix: 123, bug: "123"}},
    {path: '/about', component: AboutView},
    {
        path: '/settings',
        // 你也可以在顶级路由就配置命名视图
        component: UserSettings,
        children: [{
            path: 'emails',
            component: UserEmailsSubscriptions
        }, {
            path: 'profile',
            components: {
                default: UserProfile,
                helper: UserProfilePreview
            }
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach(async (to) => {
    const userStore = useUserStore()
    if (!userStore.isAuthenticated && to.name !== 'Login') {
        return {name: 'Login'};
    }
    // const canAccess = await canUserAccess(to)
    // if (!canAccess) return '/login'
})