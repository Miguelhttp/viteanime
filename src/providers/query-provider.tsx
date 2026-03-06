import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5, // 5 minutes
      gcTime: 60 * 1000 * 10, // antes era cacheTime
      refetchOnWindowFocus: false,
      retry: 1,
    },    
    mutations: {
      retry: 1,
    }, // mutations -> retry: 1 -> 1 tentativa
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { queryClient };
