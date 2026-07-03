import { getCurrentUser, getUserBookingPage } from "@/lib/queries/user";
import { EditBookingPageForm } from "@/components/dashboard/edit-booking-page-form";

export default async function BookingPagesPage() {
  const user = await getCurrentUser();
  const page = user?.id ? await getUserBookingPage(user.id) : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-heading text-2xl font-semibold">Booking Pages</h1>
        <p className="mt-1 text-sm text-muted">
          Manage your public booking page.
        </p>

        {page ? (
          <div className="mt-8">
            <EditBookingPageForm page={page} />
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted">No booking page found.</p>
        )}
      </div>
    </div>
  );
}
