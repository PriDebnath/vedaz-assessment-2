
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
    token: string;
    setToken: (token: string) => void;
    clearToken: () => void;
}

const store = create<Store>()

const key = "token"

export const useAuthStore = store(
    persist(
        (set) => ({
            token: "",
            setToken: (token: string) => set({ token: token }),
            clearToken: () => {
                localStorage.removeItem(key);
                set({ token: "" });
            },
        }),
        {
            name: key
        })
)
