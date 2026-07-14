import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { api, ApiRequestError } from "@/lib/api";
import { toast } from "sonner";

interface Booking {
  _id: string;
  serviceRequested: string;
  preferredTimeSlot: string;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const statusLabel: Record<Booking["status"], string> = {
  new: "Received",
  contacted: "We've contacted you",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const Account = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const { data: bookings } = useQuery<Booking[]>({
    queryKey: ["my-bookings"],
    queryFn: () => api.get<Booking[]>("/me/bookings"),
  });

  async function handleSaveProfile() {
    setSaving(true);
    try {
      await api.patch("/me/profile", { name, phone });
      await refreshUser();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : "Couldn't update profile");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground mt-1">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/account/orders">My Orders</Link>
            </Button>
            <Button variant="outline" className="rounded-full" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile */}
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Profile</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl" />
              </div>
              <Button onClick={handleSaveProfile} disabled={saving} className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">My Bookings</h2>
            {!bookings?.length && <p className="text-muted-foreground text-sm">No bookings yet — book a free visit to get started.</p>}
            <div className="space-y-4">
              {bookings?.map((b) => (
                <div key={b._id} className="border border-border/60 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-foreground">{b.serviceRequested}</p>
                    <Badge variant="secondary">{statusLabel[b.status]}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{b.preferredTimeSlot}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
