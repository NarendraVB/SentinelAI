import { format } from "date-fns";
import { Calendar, Activity } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { useIncident } from "@/hooks/useIncidents";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

interface Props {
  open: boolean;
  incidentId?: string;
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
      <p className="text-xs uppercase text-zinc-500">
        {label}
      </p>

      <div className="text-sm text-zinc-100 break-all">
        {value}
      </div>
    </div>
  );
}

export default function IncidentDrawer({
  open,
  incidentId,
  onClose,
}: Props) {
  const { data, isLoading } = useIncident(incidentId);

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="ml-auto h-screen w-[520px] max-w-full rounded-none border-l border-zinc-800 bg-zinc-950">

        {isLoading || !data ? (
          <div className="flex h-full items-center justify-center text-zinc-500">
            {isLoading ? <PageLoader /> : <ErrorState title="Incident not found" description="The requested incident could not be found." />}
          </div>
        ) : (
          <>
            <DrawerHeader className="border-b border-zinc-800">

              <DrawerTitle className="text-white">
                {data.title}
              </DrawerTitle>

              <DrawerDescription>
                AI Security Incident
              </DrawerDescription>

            </DrawerHeader>

            <div className="space-y-6 p-6">

              <div className="flex gap-3">
                <SeverityBadge severity={data.severity} />
                <StatusBadge status={data.status} />
              </div>

              <Field
                label="Incident ID"
                value={data.id}
              />

              <Field
                label="Created"
                value={
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {format(new Date(data.created_at), "dd MMM yyyy HH:mm")}
                  </div>
                }
              />

              <Field
                label="Updated"
                value={
                  <div className="flex items-center gap-2">
                    <Activity size={16} />
                    {format(new Date(data.updated_at), "dd MMM yyyy HH:mm")}
                  </div>
                }
              />

            </div>
          </>
        )}

      </DrawerContent>
    </Drawer>
  );
}