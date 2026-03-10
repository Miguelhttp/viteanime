import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/shared/contexts/auth-context";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  // Se não estiver logado, redireciona para o Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se logado, renderiza as rotas filhas
  return <Outlet />;
}
