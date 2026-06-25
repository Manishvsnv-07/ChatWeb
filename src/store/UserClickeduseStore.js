import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useClickedUserStore = create(
  persist(
    (set) => ({
      clickedUser: null,
      isLoading: false,
      setClickedUser: (user) => set({ clickedUser: user }),
      setLoading: (val) => set({ isLoading: val }),
      clearClickedUser: () => set({ clickedUser: null }),
    }),
    { name: 'clicked-user-storage' }
  )
)

export default useClickedUserStore