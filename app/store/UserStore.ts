import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user_uuid: string | null
  auth_key: string | null
  captcha_uuid: string | null
  captcha_expiration: number | null
  setUserUUID: (uuid: string) => void
  setAuthKey: (key: string) => void
  setCaptcha: (token: string, expiration: number) => void
  clearCaptcha: () => void
}

const customStorage = {
  getItem: (name: string): any => {
    const storedValue = localStorage.getItem(name)
    return storedValue ? JSON.parse(storedValue) : null
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name)
  }
}

const UserStore = create<UserState>()(
  persist(
    (set) => ({
      user_uuid: null,
      auth_key: null,
      captcha_uuid: null,
      captcha_expiration: null,
      setUserUUID: (uuid: string) => set({ user_uuid: uuid }),
      setAuthKey: (key: string) => set({ auth_key: key }),
      setCaptcha: (token: string, expiration: number) =>
        set({ captcha_uuid: token, captcha_expiration: expiration }),
      clearCaptcha: () => set({ captcha_uuid: null, captcha_expiration: null })
    }),
    {
      name: 'user-storage',
      storage: customStorage
    }
  )
)

export default UserStore
