import Link from "next/link";
import {
  LayoutDashboard,
  Clock,
  FileText,
  Calendar,
  QrCode,
  Plug,
  Settings,
  CreditCard,
} from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/availability", label: "Availability", icon: Clock },
  { href: "/dashboard/booking-pages", label: "Booking Pages", icon: FileText },
  { href: "/dashboard/meetings", label: "Meetings", icon: Calendar },
  { href: "/dashboard/qr", label: "QR Center", icon: QrCode },
  { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

export function DashboardSidebar({
  pathname,
  userName,
  onNavigate,
}: {
  pathname: string;
  userName?: string | null;
  onNavigate?: () => void;
}) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link href="/dashboard">
          <Logo size="sm" />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Dashboard">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-fast",
                isActive
                  ? "bg-foreground/5 font-medium text-foreground"
                  : "text-muted hover:bg-foreground/5 hover:text-foreground"
              )}
              onClick={onNavigate}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        {userName && (
          <p className="mb-2 truncate px-3 text-xs text-muted">{userName}</p>
        )}
        <SignOutButton />
      </div>
    </aside>
  );
}
