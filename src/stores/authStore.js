import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {

    state: () => ({
        token: localStorage.getItem("token") || null
    }),

    actions: {

        login(username, password) {

            if (username === "admin" && password === "123456") {

                this.token = "fake-token"

                localStorage.setItem("token", this.token)

                return true
            }

            return false
        },

        logout() {
            this.token = null
            localStorage.removeItem("token")
        }

    }

})