import { useState, useCallback, type ReactNode } from "react";
import {
  NAV_ITEMS,
  USER_MENU_ITEMS,
  NavigationContext,
} from "./use-navigation-context";

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
