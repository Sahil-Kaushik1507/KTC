import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      // Prevent unnecessary refetch
      refetchOnWindowFocus: false,

      // Retry failed APIs once
      retry: 1,

      // Cache freshness
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function QueryProvider({
  children,
}) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Devtools */}
      <ReactQueryDevtools
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}