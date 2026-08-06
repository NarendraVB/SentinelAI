import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function usePolling(interval = 10000) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setInterval(() => {
      queryClient.invalidateQueries();
    }, interval);

    return () => clearInterval(timer);
  }, [interval, queryClient]);
}