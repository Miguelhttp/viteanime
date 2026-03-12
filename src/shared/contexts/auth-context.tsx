import { useState, type ReactNode } from "react";
import { type User, AuthContext } from "./auth-types";

interface StoredUser extends User {
  pass: string;
}

const USERS_STORAGE_KEY = "viteanime_users_db";
const SESSION_STORAGE_KEY = "viteanime_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const sessionPath = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionPath) return null;
    try {
      return JSON.parse(sessionPath);
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
  });

  const [isLoading] = useState(false);

  const login = (email: string, pass: string) => {
    try {
      const db = localStorage.getItem(USERS_STORAGE_KEY);
      if (!db) return false;

      const users: StoredUser[] = JSON.parse(db);
      const foundUser = users.find((u) => u.email === email && u.pass === pass);

      if (foundUser) {
        const publicUser: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        };
        setUser(publicUser);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(publicUser));
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  const register = (name: string, email: string, pass: string) => {
    try {
      const dbStr = localStorage.getItem(USERS_STORAGE_KEY) || "[]";
      const users: StoredUser[] = JSON.parse(dbStr);

      if (users.some((u) => u.email === email)) {
        return false; // Email já existe
      }

      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        name,
        email,
        pass,
      };

      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Loga automaticamente após registro
      const publicUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      setUser(publicUser);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(publicUser));

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
