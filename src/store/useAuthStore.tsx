import { create } from "zustand";
import {
  loginApi,
  registerApi,
  fetchUserProfile,
  logoutApi,
  type User,
} from "../api/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  loginWithToken: (token: string, user: User) => void; // For social/OTP/One-tap login
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  showAuthModal: false,
  setShowAuthModal: (show) => set({ showAuthModal: show }),

  loginWithToken: (token, user) => {
    localStorage.setItem("auth_token", token);
    set({ user, isAuthenticated: true, showAuthModal: false });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { token, user } = await loginApi(email, password);
      localStorage.setItem("auth_token", token);
      set({ user, isAuthenticated: true, showAuthModal: false });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email, password, firstName, lastName) => {
    set({ isLoading: true });
    try {
      const { token, user } = await registerApi(
        email,
        password,
        firstName,
        lastName
      );
      localStorage.setItem("auth_token", token);
      set({ user, isAuthenticated: true, showAuthModal: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("auth_token");
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  updateUser: (userData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),

  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("No token");
      const user = await fetchUserProfile();
      set({ user, isAuthenticated: true });
    } catch {
      localStorage.removeItem("auth_token");
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
