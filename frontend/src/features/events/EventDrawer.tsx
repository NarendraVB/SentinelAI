import { format } from "date-fns";
import { Calendar, FileText } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { useEvent } from "@/hooks/useEvents";

interface Props {
  open: boolean;
  eventId?: string;
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

      <div className="break-all rounded-lg bg-zinc-900 p-3 text-sm text-zinc-100">
        {value}
      </div>
    </div>
  );
}

export default function EventDrawer({
  open,
  eventId,
  onClose,
}: Props) {
  const { data, isLoading } = useEvent(eventId);

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="ml-auto h-screen w-[650px] max-w-full rounded-none border-l border-zinc-800 bg-zinc-950">

        {isLoading || !data ? (
          <div className="flex h-full items-center justify-center text-zinc-500">
            Loading...
          </div>
        ) : (
          <>
            <DrawerHeader className="border-b border-zinc-800">

              <DrawerTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-blue-400" />
                Runtime Event
              </DrawerTitle>

              <DrawerDescription>
                Event Details
              </DrawerDescription>

            </DrawerHeader>

            <div className="space-y-6 overflow-y-auto p-6">

              <Field
                label="Event Type"
                value={data.event_type}
              />

              <Field
                label="Agent"
                value={data.agent_id}
              />

              <Field
                label="Prompt"
                value={data.prompt}
              />

              <Field
                label="Response"
                value={data.response}
              />

              <Field
                label="Risk Score"
                value={data.risk_score}
              />

              <Field
                label="Created"
                value={
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {format(
                      new Date(data.created_at),
                      "dd MMM yyyy HH:mm"
                    )}
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