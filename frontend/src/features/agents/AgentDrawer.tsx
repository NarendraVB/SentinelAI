import { format } from "date-fns";
import { Calendar, Activity, Bot } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { useAgent } from "@/hooks/useAgents";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

interface Props {
  open: boolean;
  agentId?: string;
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

      <div className="break-all text-sm text-zinc-100">
        {value}
      </div>
    </div>
  );
}

export default function AgentDrawer({
  open,
  agentId,
  onClose,
}: Props) {
  const { data: agent, isLoading } = useAgent(agentId);

  return (
    <Drawer
      open={open}
      onOpenChange={(o) => !o && onClose()}
    >
      <DrawerContent className="ml-auto h-screen w-[520px] max-w-full rounded-none border-l border-zinc-800 bg-zinc-950">

        {isLoading || !agent ? (
          <div className="flex h-full items-center justify-center text-zinc-500">
            {isLoading ? <PageLoader /> : <ErrorState title="Agent not found" description="The requested agent could not be found." />}
          </div>
        ) : (
          <>
            <DrawerHeader className="border-b border-zinc-800">

              <DrawerTitle className="flex items-center gap-2 text-white">
                <Bot className="h-5 w-5 text-blue-400" />
                {agent.name}
              </DrawerTitle>

              <DrawerDescription>
                AI Agent Details
              </DrawerDescription>

            </DrawerHeader>

            <div className="space-y-6 p-6">

              <Field label="External ID" value={agent.external_id} />
              <Field label="Vendor" value={agent.vendor} />
              <Field label="Source" value={agent.source} />
              <Field label="Type" value={agent.agent_type} />
              <Field label="Owner" value={agent.owner} />
              <Field label="Description" value={agent.description} />

              <Field
                label="Risk Score"
                value={
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded bg-zinc-800">
                      <div
                        className="h-2 rounded bg-blue-500"
                        style={{
                          width: `${agent.current_risk_score}%`,
                        }}
                      />
                    </div>

                    <span>{agent.current_risk_score}</span>
                  </div>
                }
              />

              <Field
                label="Created"
                value={
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {format(
                      new Date(agent.created_at),
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
                      new Date(agent.updated_at),
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