import { api } from "@/api/client";
import type { Health } from "@/types/health";

export async function getHealth() {
    const { data } = await api.get<Health>("/health");
    return data;
}