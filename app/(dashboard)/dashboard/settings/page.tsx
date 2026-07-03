import { requireUser } from "@/lib/queries/user";
import { SettingsForms } from "@/components/dashboard/settings-forms";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-heading text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Manage your profile and preferences.
        </p>

        <div className="mt-8">
          <SettingsForms initialName={user.name ?? ""} initialEmail={user.email ?? ""} />
        </div>
      </div>
    </div>
  );
}
