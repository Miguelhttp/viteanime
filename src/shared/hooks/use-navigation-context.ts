import { createContext, useContext } from "react";
import {
  Home,
  Compass,
  User,
  LogOut,
  Sparkles,
  Trophy,
  Bookmark,
  BookOpen,
  Info,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Animes", path: "/animes", icon: Compass },
  { label: "Mangás", path: "/mangas", icon: BookOpen },
  { label: "Temporada", path: "/seasonal", icon: Sparkles },
  { label: "Top Animes", path: "/top", icon: Trophy },
  { label: "Minha Lista", path: "/watchlist", icon: Bookmark },
  { label: "Sobre", path: "/about", icon: Info },
];

export const USER_MENU_ITEMS = [
  { label: "Perfil", path: "/profile", icon: User, disabled: true },
  { label: "Sair", path: "/logout", icon: LogOut, disabled: true },
];

export interface NavigationContextType {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebarMobile: () => void;
  closeSidebarMobile: () => void;
  openSidebarMobile: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  navItems: typeof NAV_ITEMS;
  userItems: typeof USER_MENU_ITEMS;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
