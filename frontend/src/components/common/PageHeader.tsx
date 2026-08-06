interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-1 text-sm text-zinc-400">
        {description}
      </p>
    </div>
  );
}