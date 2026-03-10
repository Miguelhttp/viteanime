import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "viteanime_users_db";
const SESSION_STORAGE_KEY = "viteanime_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega a sessão ativa ao iniciar o app
  useEffect(() => {
    const sessionPath = localStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionPath) {
      try {
        const activeUser = JSON.parse(sessionPath);
        setUser(activeUser);
      } catch (e) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, pass: string) => {
    try {
      const db = localStorage.getItem(USERS_STORAGE_KEY);
      if (!db) return false;

      const users: any[] = JSON.parse(db);
      const foundUser = users.find((u) => u.email === email && u.pass === pass);

      if (foundUser) {
        const publicUser = {
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
      const users: any[] = JSON.parse(dbStr);

      if (users.some((u) => u.email === email)) {
        return false; // Email já existe
      }

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        pass,
      };

      users.push(newUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Loga automaticamente após registro
      const publicUser = {
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
