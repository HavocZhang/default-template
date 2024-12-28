import {defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core'
import {computed} from "vue";

export const useUserStore = defineStore('user', () => {
    // 持久化使用useLocalStorage
    const token = useLocalStorage<string>('token', "")
    const isAuthenticated = computed(() => token.value !== "")

    function login(params: { username: string, password: string }) {
        console.log(params)
        return "1234567890"
    }

    return {isAuthenticated, token, login}
})