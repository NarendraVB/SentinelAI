import { api } from "@/api/client";
import type { Metrics } from "@/types/metrics";

export async function getMetrics() {
    const { data } = await api.get<Metrics>("/metrics");
    return data;
}