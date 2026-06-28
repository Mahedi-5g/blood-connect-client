"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import DonationRequestsTable from "@/components/DonationRequestsTable"; 
import { PiHandWaving } from "react-icons/pi";

export default function DashboardHome() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) { router.push("/auth/login"); return; }

    const fetchRecentRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/my-requests?email=${session.user.email}&limit=3`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error(error);
        toast.error("Error loading recent requests");
      } finally { setLoading(false); }
    };
    fetchRecentRequests();
  }, [session, isPending, router]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setRequests((prev) => prev.map((req) => req._id === id ? { ...req, status: newStatus } : req));
      toast.success(`Donation marked as ${newStatus}`);
    } catch (error) { console.error(error); toast.error("Failed to update status"); }
  };

  const handleDeleteSuccess = (deletedId) => {
    setRequests((prev) => prev.filter((req) => req._id !== deletedId));
    toast.success("Donation request deleted successfully");
  };

  if (isPending || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="bg-linear-to-r from-slate-500 to-slate-400 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl flex text-slate-200">Welcome back, {session?.user?.name}!<PiHandWaving /> </h1>
          <p className="mt-2 text-slate-200 font-medium">Role: Registered Donor | Thank you for being a lifesaver.</p>
        </div>

        {requests.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Your Recent Donation Requests (Max 3)</h2>
            
            <DonationRequestsTable 
              requests={requests} 
              onStatusChange={handleStatusChange} 
              onDeleteSuccess={handleDeleteSuccess} 
            />

            <div className="pt-2 flex justify-center">
              <Link href="/dashboard/my-request" className="inline-flex items-center justify-center px-6 h-11 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs tracking-wider uppercase rounded-xl transition">
                View My All Requests
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}