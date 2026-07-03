import { DashboardPlaceholder } from "@/components/dashboard/placeholder";

export default function BillingPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <DashboardPlaceholder
          title="Billing"
          description="Manage your subscription and payment methods."
        />
      </div>
    </div>
  );
}
