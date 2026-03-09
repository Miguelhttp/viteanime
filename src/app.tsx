import "@/styles/globals.css";
import { Routes, Route } from "react-router";

// Pages
import Home from "@/features/home/pages/home-page";
import Animes from "@/features/animes/pages/animes-page";
import AnimeDetails from "@/features/animes/pages/anime-details-page";
import Seasonal from "@/features/animes/pages/seasonal-page";
import TopAnimes from "@/features/animes/pages/top-animes-page";
import Watchlist from "@/features/animes/pages/watchlist-page";

// Layouts
import MainLayout from "@/app/layout/main-layout";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/animes" element={<Animes />} />
        <Route path="/seasonal" element={<Seasonal />} />
        <Route path="/top" element={<TopAnimes />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Route>
    </Routes>
  );
}
