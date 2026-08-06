import { useQuery } from "@tanstack/react-query";

import {
  getAgent,
  getAgents,
} from "@/services/agents.services";

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });
}

export function useAgent(id?: string) {
  return useQuery({
    queryKey: ["agent", id],
    queryFn: () => getAgent(id!),
    enabled: !!id,
  });
}