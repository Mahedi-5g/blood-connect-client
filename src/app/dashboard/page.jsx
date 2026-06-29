"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import DonationRequestsTable from "@/components/DonationRequestsTable";
import { PiHandWaving } from "react-icons/pi";
import AdminVolunteerDashboard from "@/components/dashboard/AdminDashboard";
import { Card, Spinner } from "@heroui/react";

export default function DashboardHome() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // 🎯 ডোনর রিকোয়েস্টের জন্য মূল নোড

  const userRole = session?.user?.role?.toLowerCase() || "donor";

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) { 
      router.push("/auth/login"); 
      return; 
    }

  
    if (userRole === "donor") {
      const fetchRecentRequests = async () => {
        try {
          const res = await fetch(`http://localhost:5000/my-requests?email=${session.user.email}&limit=3`);
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setRequests(data);
        } catch (error) {
          console.error(error);
          toast.error("Error loading recent requests");
        } finally { 
          setLoading(false); 
        }
      };
      fetchRecentRequests();
    } else {
      setLoading(false); // অ্যাডমিন বা ভলান্টিয়ার হলে ডোনর লোডিং ফলস করে দেবে
    }
  }, [session, isPending, router, userRole]);

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
    } catch (error) { 
      console.error(error); 
      toast.error("Failed to update status"); 
    }
  };

  const handleDeleteSuccess = (deletedId) => {
    setRequests((prev) => prev.filter((req) => req._id !== deletedId));
    toast.success("Donation request deleted successfully");
  };

  // প্রথম গ্লোবাল লোডিং চেক
  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 🏠 কমন ওয়েলকাম ব্যানার */}
        <div className="bg-linear-to-r from-slate-500 to-slate-400 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl flex items-center gap-2 text-slate-200">
            Welcome back, {session?.user?.name}! <PiHandWaving className="text-amber-300" />
          </h1>
          <p className="mt-2 text-slate-200 font-medium capitalize">
            Role: {userRole} | Thank you for being a lifesaver.
          </p>
        </div>

        {/* 👑 অ্যাডমিন বা ভলান্টিয়ার ড্যাশবোর্ড */}
        {(userRole === "admin" || userRole === "volunteer") && (
          <AdminVolunteerDashboard />
        )}

        {/* 🩸 ডোনর ড্যাশবোর্ড কন্টেন্ট */}
        {userRole === "donor" && (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner color="danger" label="Loading requests..." />
              </div>
            ) : requests.length > 0 ? (
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
            ) : (
              <Card className="p-10 text-center bg-white border border-dashed rounded-3xl">
                <p className="text-slate-500 font-medium">You haven't made any blood donation requests yet.</p>
                <Link href="/dashboard/create-donation-request" className="mt-4 inline-flex items-center justify-center px-5 h-10 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition mx-auto">
                  Create First Request
                </Link>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}