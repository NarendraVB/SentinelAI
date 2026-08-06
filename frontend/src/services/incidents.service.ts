import { api } from "@/api/client";

export interface Incident {
  id: string;
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: string;
  created_at: string;
  updated_at: string;
}

export async function getIncidents() {
  const { data } = await api.get<Incident[]>("/incidents");
  return data;
}

export async function getIncident(id: string) {
  const { data } = await api.get<Incident>(`/incidents/${id}`);
  return data;
}