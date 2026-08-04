import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h2>

      {children}
    </section>
  );
}