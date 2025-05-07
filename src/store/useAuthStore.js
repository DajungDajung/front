import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLoginStore = create(persist((set) => ({
  isLogined: false,
  setLogIn: () => set((state) => ({ isLogined: true })),
  setLogOut: () => set((state) => ({ isLogined: false })),
})))
