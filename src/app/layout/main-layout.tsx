import { Outlet } from "react-router";
import { Sidebar } from "@/shared/components/navigation/sidebar";
import { Topbar } from "@/shared/components/navigation/topbar";
import { useNavigation } from "@/shared/hooks/use-navigation";

export default function MainLayout() {
  const { isSidebarCollapsed } = useNavigation();

  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden bg-zinc-950 text-zinc-50">
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-500 ease-in-out ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Topbar />

        <main className="flex-1 px-4 pt-4 pb-12 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
