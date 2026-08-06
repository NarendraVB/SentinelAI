import { useQuery } from "@tanstack/react-query";

import { getAlert } from "@/services/alerts.service";

export function useAlert(id?: string) {
  return useQuery({
    queryKey: ["alert", id],
    queryFn: () => getAlert(id!),
    enabled: !!id,
  });
}