interface DashboardPlaceholderProps {
  title: string;
  description: string;
}

export function DashboardPlaceholder({ title, description }: DashboardPlaceholderProps) {
  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <p className="mt-8 text-sm text-muted">Coming soon.</p>
    </div>
  );
}
