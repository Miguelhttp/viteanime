import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
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

interface NavItem {
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

interface NavigationContextType {
  isSidebarOpen: boolean; // For Mobile Overlay
  isSidebarCollapsed: boolean; // For Desktop/Tablet
  toggleSidebarMobile: () => void;
  closeSidebarMobile: () => void;
  openSidebarMobile: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  navItems: typeof NAV_ITEMS;
  userItems: typeof USER_MENU_ITEMS;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarMobile = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [],
  );
  const closeSidebarMobile = useCallback(() => setIsSidebarOpen(false), []);
  const openSidebarMobile = useCallback(() => setIsSidebarOpen(true), []);

  const toggleSidebar = useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    [],
  );
  const setSidebarCollapsed = useCallback(
    (value: boolean) => setIsSidebarCollapsed(value),
    [],
  );

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        isSidebarCollapsed,
        toggleSidebarMobile,
        closeSidebarMobile,
        openSidebarMobile,
        toggleSidebar,
        setSidebarCollapsed,
        navItems: NAV_ITEMS,
        userItems: USER_MENU_ITEMS,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
