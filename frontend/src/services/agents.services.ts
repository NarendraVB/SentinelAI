import { api } from "@/api/client";

export interface Agent {
  id: string;
  external_id: string;
  name: string;
  description: string;
  vendor: string;
  source: string;
  agent_type: string;
  owner: string;
  status: string;
  current_risk_score: number;
  last_seen: string | null;
  created_at: string;
  updated_at: string;
}

export async function getAgents() {
  const { data } = await api.get<Agent[]>("/agents");
  return data;
}

export async function getAgent(id: string) {
  const { data } = await api.get<Agent>(`/agents/${id}`);
  return data;
}