import { useForm } from "react-hook-form";

import Section from "@/components/layout/Section";

import SettingsCard from "./SettingsCard";

interface SettingsForm {
  apiUrl: string;
  refreshInterval: number;
  darkMode: boolean;
  realtime: boolean;
}

export default function SettingsPage() {
  const { register, handleSubmit } = useForm<SettingsForm>({
    defaultValues: {
      apiUrl: "http://127.0.0.1:8000",
      refreshInterval: 10,
      darkMode: true,
      realtime: true,
    },
  });

  function onSubmit(data: SettingsForm) {
    console.log(data);
  }

  return (
    <Section
      title="Settings"
      description="Configure SentinelAI dashboard preferences."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <SettingsCard
          title="API Configuration"
          description="Backend connectivity."
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Backend URL
            </label>

            <input
              {...register("apiUrl")}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Refresh Interval (seconds)
            </label>

            <input
              type="number"
              {...register("refreshInterval", {
                valueAsNumber: true,
              })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Dashboard"
          description="Display preferences."
        >
          <label className="flex items-center gap-3 text-zinc-200">
            <input
              type="checkbox"
              {...register("darkMode")}
            />
            Enable Dark Mode
          </label>

          <label className="flex items-center gap-3 text-zinc-200">
            <input
              type="checkbox"
              {...register("realtime")}
            />
            Enable Realtime Updates
          </label>
        </SettingsCard>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </Section>
  );
}