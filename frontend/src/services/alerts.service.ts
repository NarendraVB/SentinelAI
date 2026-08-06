import { api } from "@/api/client";
import type { Alert } from "@/types/alert";

export async function getAlerts() {
  const { data } = await api.get<Alert[]>("/alerts");
  return data;
}

export async function getAlert(id: string) {
  const { data } = await api.get<Alert>(`/alerts/${id}`);
  return data;
}

export async function acknowledgeAlert(id: string) {
  const { data } = await api.patch<Alert>(`/alerts/${id}/acknowledge`);
  return data;
}

export async function closeAlert(id: string) {
  const { data } = await api.patch<Alert>(`/alerts/${id}/close`);
  return data;
}