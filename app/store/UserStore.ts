import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user_uuid: string | null;
  auth_key: string | null;
  captcha_uuid: string | null;
  captcha_expiration: number | null;
  hasHydrated: boolean;
  setUserUUID: (uuid: string) => void;
  setAuthKey: (key: string) => void;
  setCaptcha: (token: string, expiration: number) => void;
  clearCaptcha: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user_uuid: null,
      auth_key: null,
      captcha_uuid: null,
      captcha_expiration: null,
      hasHydrated: false,
      setUserUUID: (uuid: string) => set({ user_uuid: uuid }),
      setAuthKey: (key: string) => set({ auth_key: key }),
      setCaptcha: (token: string, expiration: number) =>
        set({ captcha_uuid: token, captcha_expiration: expiration }),
      clearCaptcha: () => set({ captcha_uuid: null, captcha_expiration: null }),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
