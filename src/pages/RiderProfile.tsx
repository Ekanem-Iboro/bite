import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRideStore } from "@/store/useRideStore";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import AppFooter from "@/components/layout/AppFooter";

type RatingForm = {
  rating: number;
};

const RiderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { riders, updateRiderRating } = useRideStore();
  const rider = useMemo(
    () => riders.find((r) => r.id === Number(id)) ?? riders[0],
    [id, riders],
  );

  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<RatingForm>({
    defaultValues: { rating: 5 },
  });

  if (!rider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-3 text-center">
          <p className="text-sm text-muted-foreground">Rider not found.</p>
          <Button variant="hero" onClick={() => navigate("/dashboard")}>
            Back to dashboard
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (data: RatingForm) => {
    updateRiderRating(rider.id, Number(data.rating));
    setSubmitted(true);
    reset({ rating: 5 });
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-xs text-muted-foreground hover:text-primary">
              ← Back to dashboard
            </Link>
            <p className="font-heading text-sm font-semibold text-foreground">
              Rider profile
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6">
        <section className="rounded-3xl border border-border bg-card card-elevated p-5 flex flex-col md:flex-row gap-6">
          <img
            src={rider.image}
            alt={rider.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border border-border"
          />
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-foreground">
                {rider.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {rider.vehicle} driver · Lagos
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Rating</p>
                <p className="font-semibold text-foreground text-sm">
                  {rider.rating.toFixed(1)} ★
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {rider.ratingCount} ratings
                </p>
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Trips completed</p>
                <p className="font-semibold text-foreground text-sm">
                  {rider.totalTrips}
                </p>
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Total distance</p>
                <p className="font-semibold text-foreground text-sm">
                  {rider.totalKm} km
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              This profile uses demo data only and does not represent a real driver. All
              ratings and stats are simulated for this application.
            </p>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card card-elevated p-5 space-y-3">
            <h2 className="font-heading text-base font-semibold">Rate this rider</h2>
            <p className="text-xs text-muted-foreground">
              Your rating updates the average rating and total ratings count for this
              rider.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-xs">
              <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                Select a rating
              </label>
              <select
                className="w-full border border-border rounded-lg px-2 py-1 bg-background text-foreground text-xs"
                {...register("rating", { valueAsNumber: true })}
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} star{value > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <Button type="submit" size="sm" variant="hero" className="w-full">
                Submit rating
              </Button>
              {submitted && (
                <p className="text-[11px] text-success mt-1">Thanks for your rating!</p>
              )}
            </form>
          </div>
        </aside>
      </main>

      <AppFooter />
    </div>
  );
};

export default RiderProfile;


