import { useQuery } from "@tanstack/react-query";

import {
  getIncident,
  getIncidents,
} from "@/services/incidents.service";

export function useIncidents() {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: getIncidents,
  });
}

export function useIncident(id?: string) {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => getIncident(id!),
    enabled: !!id,
  });
}