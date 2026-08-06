import { useQuery } from "@tanstack/react-query";

import { getAlerts } from "@/services/alerts.service";

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: getAlerts,
  });
}