import { create } from "zustand";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  currentUser: User | null;
  users: User[];
  initialized: boolean;
  initialize: () => void;
  signIn: (email: string, password: string) => User | null;
  signUp: (name: string, email: string, password: string) => User;
  signOut: () => void;
};

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      const defaultUser: User = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      };
      localStorage.setItem(USERS_KEY, JSON.stringify([defaultUser]));
      return [defaultUser];
    }
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  users: [],
  initialized: false,
  initialize: () => {
    if (get().initialized) return;
    const users = getStoredUsers();
    let currentUser: User | null = null;
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) {
        currentUser = JSON.parse(raw) as User;
      }
    } catch {
      currentUser = null;
    }
    set({ users, currentUser, initialized: true });
  },
  signIn: (email, password) => {
    const users = get().users.length ? get().users : getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password) || null;
    if (found) {
      if (typeof window !== "undefined") {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
      }
      set({ currentUser: found, users });
    }
    return found;
  },
  signUp: (name, email, password) => {
    const users = get().users.length ? get().users : getStoredUsers();
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser: User = { id: nextId, name, email, password };
    const updated = [...users, newUser];
    if (typeof window !== "undefined") {
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    }
    set({ users: updated, currentUser: newUser });
    return newUser;
  },
  signOut: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
    set({ currentUser: null });
  },
}));


