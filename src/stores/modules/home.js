import { defineStore } from 'pinia';
import { setLocal, getLocal } from '@/utils/storage';
import { ref, computed } from "vue";
export const useHomeStore = defineStore({
    id: 'Home',
    state: () => {
        return {
            name: getLocal('name'),
            age: ref(0),
        };
    },
    getters: {
        getName() {
            return this.name;
        },
        getAge() {
            return computed(() => this.age);
        }
    },
    actions: {
        setName(value) {
            this.name = value;
            setLocal('name', value);
        },
        setAge(value) {
            this.age = ref(value);
        }
    },
});
