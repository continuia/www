import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setUser: (user: any | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      showAuthModal: false,
      setShowAuthModal: (show) => set({ showAuthModal: show }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      // Optional: only persist specific fields
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);