import type { ReactNode } from "react";

type AdminMetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
};

export function AdminMetricCard({
  title,
  value,
  description,
  icon,
}: AdminMetricCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-neutral-600">{description}</p>
    </div>
  );
}
