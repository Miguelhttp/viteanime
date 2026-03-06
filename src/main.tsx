import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryProvider } from "@/providers/query-provider";
import { NavigationProvider } from "@/shared/hooks/use-navigation";
import App from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
