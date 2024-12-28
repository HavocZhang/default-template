import {defineStore} from "pinia";
import {useLocalStorage} from '@vueuse/core'
import {computed, ref} from "vue";

export const useCounterStore = defineStore('counter', () => {
    // 持久化使用useLocalStorage
    const someState = useLocalStorage('stored-state', 'initialValue')
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    function increment() {
        count.value++
    }

    function $reset() {
        count.value = 0
    }

    return {count, doubleCount, increment, $reset, someState}
})