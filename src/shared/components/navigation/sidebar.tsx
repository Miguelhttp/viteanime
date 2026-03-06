import { Link, useLocation } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigation } from "@/shared/hooks/use-navigation";

export function Sidebar() {
  const { pathname } = useLocation();
  const {
    navItems,
    isSidebarCollapsed,
    toggleSidebar,
    isSidebarOpen,
    closeSidebarMobile,
  } = useNavigation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={closeSidebarMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full flex-col border-r border-white/5 bg-zinc-950/80 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isSidebarOpen ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0"} ${isSidebarCollapsed ? "lg:w-20" : "lg:w-64"} `}
      >
        <div className="flex h-20 items-center justify-between px-6">
          {(!isSidebarCollapsed || isSidebarOpen) && (
            <Link
              to="/"
              onClick={closeSidebarMobile}
              className="bg-linear-to-r from-white to-zinc-500 bg-clip-text text-2xl font-black tracking-tighter text-transparent"
            >
              VITEANIME
            </Link>
          )}
          {isSidebarCollapsed && !isSidebarOpen && (
            <Link to="/" className="mx-auto text-xl font-black text-white">
              V
            </Link>
          )}
        </div>

        <nav className="flex-1 space-y-1.5 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebarMobile}
                title={
                  isSidebarCollapsed && !isSidebarOpen ? item.label : undefined
                }
                className={`group relative flex items-center gap-4 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                }`}
              >
                <div className="flex min-w-[24px] items-center justify-center">
                  <Icon
                    className={`h-5 w-5 ${isActive ? "" : "opacity-70 group-hover:opacity-100"}`}
                  />
                </div>
                {(!isSidebarCollapsed || isSidebarOpen) && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}
                {(!isSidebarCollapsed || isSidebarOpen) &&
                  item.badge &&
                  !isActive && (
                    <span className="rounded-full bg-zinc-800/50 px-2 py-0.5 text-[10px] text-zinc-500 group-hover:text-zinc-400">
                      {item.badge}
                    </span>
                  )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={toggleSidebar}
          className="absolute top-24 -right-3 hidden h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-400 shadow-lg transition-transform hover:scale-110 hover:text-white lg:flex"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>
    </>
  );
}
