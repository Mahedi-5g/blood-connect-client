"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import { AlertCircle, Calendar, Clock, MapPin, Hospital, User, Mail, MessageSquare, Droplet } from "lucide-react";

export default function CreateDonationRequest() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [userStatus, setUserStatus] = useState("active"); // 'active' অথবা 'blocked'

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  // ইউজার ব্লকড কিনা তা ব্যাকএন্ড থেকে চেক করা (Security Guardrail)
  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    const checkUserStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/status?email=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setUserStatus(data.status); // ব্যাকএন্ড থেকে 'active' বা 'blocked' আসবে
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    checkUserStatus();
  }, [session, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // এক্সট্রা সিকিউরিটি চেক: ফ্রন্টএন্ডেও ব্লকড ইউজার সাবমিট করতে পারবে না
    if (userStatus === "blocked") {
      toast.error("Your account is blocked! You cannot create a donation request.");
      return;
    }

    setSubmitting(true);

    // সাবমিশনের জন্য সম্পূর্ণ অবজেক্ট তৈরি (default status: pending)
    const requestData = {
      ...formData,
      requesterName: session?.user?.name,
      requesterEmail: session?.user?.email,
      status: "pending", // ডিফল্ট স্ট্যাটাস ব্যাকএন্ডেও হ্যান্ডেল করা হবে
    };

    try {
      const res = await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create request");
      }

      toast.success("Blood donation request created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading Session...</div>;
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 to-rose-600 p-8 text-white text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Create Donation Request </h1>
            <p className="mt-2 text-sm text-red-100 font-medium">Fill up the form below to post an emergency blood requirement.</p>
          </div>

          {/* 🚨 Blocked User Warning Alert */}
          {userStatus === "blocked" ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
              <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
                Your account has been **blocked** by the administrator. Blocked users are restricted from creating new blood donation requests.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              {/* Row 1: Requester Info (Read Only) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1"><User className="w-3.5 h-3.5"/> Requester Name</label>
                  <input type="text" value={session?.user?.name || ""} readOnly className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 text-sm font-medium outline-none cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1"><Mail className="w-3.5 h-3.5"/> Requester Email</label>
                  <input type="email" value={session?.user?.email || ""} readOnly className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 text-sm font-medium outline-none cursor-not-allowed" />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Row 2: Recipient Name & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Recipient Name</label>
                  <input type="text" name="recipientName" required value={formData.recipientName} onChange={handleChange} placeholder="Enter patient name" className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none transition" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><Droplet className="w-3.5 h-3.5 text-red-500"/> Blood Group</label>
                  <select name="bloodGroup" required value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-bold outline-none bg-white transition">
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Location (District & Upazila) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Recipient District</label>
                  <select name="recipientDistrict" required value={formData.recipientDistrict} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none bg-white transition">
                    <option value="">Select District</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    {/* আপনার অন্যান্য ডিস্ট্রিক্ট অপশন এখানে যোগ করতে পারেন */}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Recipient Upazila</label>
                  <select name="recipientUpazila" required value={formData.recipientUpazila} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none bg-white transition">
                    <option value="">Select Upazila</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Hathazari">Hathazari</option>
                    {/* আপনার অন্যান্য উপজেলা অপশন এখানে যোগ করতে পারেন */}
                  </select>
                </div>
              </div>

              {/* Row 4: Hospital & Full Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><Hospital className="w-3.5 h-3.5"/> Hospital Name</label>
                  <input type="text" name="hospitalName" required value={formData.hospitalName} onChange={handleChange} placeholder="e.g. Dhaka Medical College" className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Address Line</label>
                  <input type="text" name="fullAddress" required value={formData.fullAddress} onChange={handleChange} placeholder="e.g. Zahir Raihan Rd, Dhaka" className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none transition" />
                </div>
              </div>

              {/* Row 5: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> Donation Date</label>
                  <input type="date" name="donationDate" required value={formData.donationDate} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none transition" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Donation Time</label>
                  <input type="time" name="donationTime" required value={formData.donationTime} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none transition" />
                </div>
              </div>

              {/* Row 6: Message */}
              <div>
                <label className=" text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/> Request Message (Details)</label>
                <textarea name="requestMessage" required rows="4" value={formData.requestMessage} onChange={handleChange} placeholder="Explain why blood is urgently required..." className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none transition resize-none" />
              </div>

              {/* Request Button */}
              <div className="pt-2">
                <button type="submit" disabled={submitting} className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/10 transition disabled:bg-slate-300 disabled:cursor-not-allowed">
                  {submitting ? "Creating Request..." : "Submit Donation Request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}