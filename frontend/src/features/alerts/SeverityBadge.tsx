interface Props {
  severity: string;
}

const colors = {
  LOW: "bg-green-500/20 text-green-400",
  MEDIUM: "bg-yellow-500/20 text-yellow-400",
  HIGH: "bg-orange-500/20 text-orange-400",
  CRITICAL: "bg-red-500/20 text-red-400",
};

export default function SeverityBadge({ severity }: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        colors[severity as keyof typeof colors]
      }`}
    >
      {severity}
    </span>
  );
}