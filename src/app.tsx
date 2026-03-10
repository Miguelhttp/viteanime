import { lazy, Suspense } from "react";
import "@/styles/globals.css";
import { Routes, Route } from "react-router";

// Layout & Core Pages (Carregamento Imediato)
import MainLayout from "@/app/layout/main-layout";
import NotFoundPage from "@/app/pages/not-found-page";
import { AuthProvider } from "@/shared/contexts/auth-context";
import { ProtectedRoute } from "@/shared/components/navigation/protected-route";

// Lazy-Loaded Pages (Divisão de Código / Performance)
const Home = lazy(() => import("@/features/home/pages/home-page"));
const Animes = lazy(() => import("@/features/animes/pages/animes-page"));
const AnimeDetails = lazy(
  () => import("@/features/animes/pages/anime-details-page"),
);
const Seasonal = lazy(() => import("@/features/animes/pages/seasonal-page"));
const TopAnimes = lazy(() => import("@/features/animes/pages/top-animes-page"));
const Watchlist = lazy(() => import("@/features/animes/pages/watchlist-page"));

// Auth Pages
const Login = lazy(() => import("@/features/auth/pages/login-page"));
const Register = lazy(() => import("@/features/auth/pages/register-page"));

// Fallback visual de Suspense enquanto baixa o chunk da página
const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-blue-500" />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/animes" element={<Animes />} />
            <Route path="/seasonal" element={<Seasonal />} />
            <Route path="/top" element={<TopAnimes />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />

            {/* Rotas de Autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas Privadas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/watchlist" element={<Watchlist />} />
            </Route>

            {/* Default 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
