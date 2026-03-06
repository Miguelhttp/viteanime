import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("sm");

  useEffect(() => {
    const handlers = [
      { name: "2xl", query: "(min-width: 1536px)" },
      { name: "xl", query: "(min-width: 1280px)" },
      { name: "lg", query: "(min-width: 1024px)" },
      { name: "md", query: "(min-width: 768px)" },
      { name: "sm", query: "(min-width: 0px)" },
    ];

    // Função para atualizar o breakpoint
    const updateBreakpoint = () => {
      const current = handlers.find((h) => window.matchMedia(h.query).matches);
      if (current) setBreakpoint(current.name as Breakpoint);
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === "sm",
    isTablet: breakpoint === "md",
    isDesktop: ["lg", "xl", "2xl"].includes(breakpoint),
  };
}
