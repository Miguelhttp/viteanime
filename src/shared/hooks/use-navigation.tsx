import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Home, Compass, Heart, User, LogOut } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Animes", path: "/animes", icon: Compass },
  { label: "Favoritos", path: "/favorites", icon: Heart, badge: "Em breve" },
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
