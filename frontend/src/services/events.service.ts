import { api } from "@/api/client";

export interface Event {
  id: string;
  agent_id: string;
  event_type: string;
  prompt: string;
  response: string;
  risk_score: number;
  created_at: string;
}

export async function getEvents() {
  const { data } = await api.get<Event[]>("/events");
  return data;
}

export async function getEvent(id: string) {
  const { data } = await api.get<Event>(`/events/${id}`);
  return data;
}