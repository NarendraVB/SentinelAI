export default function PageLoader() {
  return (
    <div className="space-y-4">

      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-lg bg-zinc-800"
        />
      ))}

    </div>
  );
}