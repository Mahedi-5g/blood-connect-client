"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Filter } from "lucide-react";
import DonationRequestsTable from "@/components/DonationRequestsTable"; 
import PaginationPage from "@/components/Pagination";

export default function MyDonationRequests() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) { router.push("/auth/login"); return; }

    const fetchAllRequests = async () => {
      setLoading(true);
      try {
        const {data:tokenData} = await authClient.token();
        const res = await fetch(`http://localhost:5000/my-requests-full?email=${session.user.email}&status=${statusFilter}&page=${currentPage}&limit=${itemsPerPage}`,{
           headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${tokenData?.token}`,
        },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRequests(data.requests || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) { 
        console.error(error); 
        toast.error("Error loading requests"); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchAllRequests();
  }, [session, isPending, router, statusFilter, currentPage]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const {data:tokenData} = await authClient.token();
      const res = await fetch(`http://localhost:5000/requests/${id}`, {
        method: "PATCH",
         headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
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
    if (requests.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isPending) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Session...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-10 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Donation Requests</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and track all blood donation requests posted by you.</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={statusFilter} 
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} 
              className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer pr-4"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center font-semibold text-slate-500">
            Loading requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center font-semibold text-slate-500">
            No Donation Requests Found
          </div>
        ) : (
          <div className="space-y-4">
            <DonationRequestsTable 
              requests={requests} 
              onStatusChange={handleStatusChange} 
              onDeleteSuccess={handleDeleteSuccess} 
            />

            {/* Pagination Component */}
            <PaginationPage 
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}