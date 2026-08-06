interface Props {
  status: string;
}

const colors = {
  OPEN: "bg-red-500/20 text-red-400",
  ACKNOWLEDGED: "bg-yellow-500/20 text-yellow-400",
  CLOSED: "bg-green-500/20 text-green-400",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        colors[status as keyof typeof colors]
      }`}
    >
      {status}
    </span>
  );
}