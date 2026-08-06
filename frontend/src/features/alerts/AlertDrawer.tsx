import { format } from "date-fns";
import { ShieldAlert, Calendar, Activity, XCircle } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { useAlert } from "@/hooks/useAlert";
import { useAlertMutations } from "@/hooks/useAlertMutations";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

interface AlertDrawerProps {
  open: boolean;
  alertId?: string;
  onClose: () => void;
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <div className="text-sm text-zinc-100 break-all">
        {value}
      </div>
    </div>
  );
}

export default function AlertDrawer({
  open,
  alertId,
  onClose,
}: AlertDrawerProps) {
  const { data: alert, isLoading } = useAlert(alertId);

  const { acknowledge, close } = useAlertMutations();

  return (
    <Drawer open={open} onOpenChange={(value) => !value && onClose()}>
      <DrawerContent className="ml-auto h-screen w-[520px] max-w-full rounded-none border-l border-zinc-800 bg-zinc-950">
        {isLoading || !alert ? (
          <div className="flex h-full items-center justify-center text-zinc-500">
            Loading...
          </div>
        ) : (
          <>
            <DrawerHeader className="border-b border-zinc-800">
              <DrawerTitle className="flex items-center gap-2 text-white">
                <ShieldAlert className="h-5 w-5 text-red-400" />
                {alert.title}
              </DrawerTitle>

              <DrawerDescription>
                AI Runtime Security Alert
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">

              <div className="flex gap-3">
                <SeverityBadge severity={alert.severity} />
                <StatusBadge status={alert.status} />
              </div>

              <Field
                label="Reason"
                value={alert.reason}
              />

              <Field
                label="Risk Score"
                value={
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded bg-zinc-800">
                      <div
                        className="h-2 rounded bg-red-500"
                        style={{
                          width: `${alert.risk_score}%`,
                        }}
                      />
                    </div>

                    <span>{alert.risk_score}</span>
                  </div>
                }
              />

              <Field
                label="Event ID"
                value={alert.event_id}
              />

              <Field
                label="Incident ID"
                value={alert.incident_id ?? "-"}
              />

              <Field
                label="Created"
                value={
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {format(
                      new Date(alert.created_at),
                      "dd MMM yyyy HH:mm"
                    )}
                  </div>
                }
              />

              <Field
                label="Updated"
                value={
                  <div className="flex items-center gap-2">
                    <Activity size={16} />
                    {format(
                      new Date(alert.updated_at),
                      "dd MMM yyyy HH:mm"
                    )}
                  </div>
                }
              />
            </div>

            <div className="flex gap-3 border-t border-zinc-800 p-6">
              <Button
                className="flex-1"
                disabled={
                  acknowledge.isPending ||
                  alert.status !== "OPEN"
                }
                onClick={() =>
                  acknowledge.mutate(alert.id)
                }
              >
                Acknowledge
              </Button>

              <Button
                variant="destructive"
                className="flex-1"
                disabled={
                  close.isPending ||
                  alert.status === "CLOSED"
                }
                onClick={() =>
                  close.mutate(alert.id)
                }
              >
                <XCircle className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}