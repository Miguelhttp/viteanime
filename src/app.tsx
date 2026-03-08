import "@/styles/globals.css";
import { Routes, Route } from "react-router";

// Pages
import Home from "@/features/home/pages/home-page";
import Animes from "@/features/animes/pages/animes-page";
import AnimeDetails from "@/features/animes/pages/anime-details-page";

// Layouts
import MainLayout from "@/app/layout/main-layout";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/animes" element={<Animes />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Route>
    </Routes>
  );
}
