import { useQuery } from "@tanstack/react-query";

import {
  getEvent,
  getEvents,
} from "@/services/events.service";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
}

export function useEvent(id?: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id!),
    enabled: !!id,
  });
}