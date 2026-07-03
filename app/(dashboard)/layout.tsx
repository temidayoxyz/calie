import { getCurrentUser } from "@/lib/queries/user";
import { DashboardShell } from "@/components/dashboard/shell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return <DashboardShell userName={user?.name}>{children}</DashboardShell>;
}
