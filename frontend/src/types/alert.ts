export interface Alert {
  title: string;
  event_id: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  reason: string;
  risk_score: number;
  created_at: string;
  id: string;
  status: "OPEN" | "ACKNOWLEDGED" | "CLOSED";
  incident_id: string | null;
  updated_at: string;
}