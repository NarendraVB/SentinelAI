interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingsCard({
  title,
  description,
  children,
}: SettingsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          {description}
        </p>
      </div>

      <div className="space-y-6 p-6">
        {children}
      </div>
    </div>
  );
}