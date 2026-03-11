import { createRouter, createWebHistory } from "vue-router"
import Login from "@/views/login/index.vue"
import Dashboard from "@/views/dashboard/index.vue"
import { authApi } from "@/api/auth"
import AppMainLayout from "@/layouts/AppMainLayout.vue"
import Hashtag from "@/views/hashtag/index.vue"
import UserManage from "@/views/user-manage/index.vue"

const routes = [
    { path: "/login", component: Login, name: "Login" },
    { 
      path: "/", 
      component: AppMainLayout,
      children: [
        { path: "", component: Dashboard, name: "Dashboard" },
        { path: "hashtag", component: Hashtag, name: "Hashtag" },
        { path: "user-manage", component: UserManage, name: "User Management" }
      ],
      meta: { requiresAuth: true } 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = authApi.getToken()

    if (to.meta.requiresAuth && !token) {
        next("/login")
    } else {
        next()
    }
})

export default router