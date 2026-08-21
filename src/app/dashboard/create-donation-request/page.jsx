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
  const [userStatus, setUserStatus] = useState("active");

  const [districts, setDistricts] = useState([]);
  const [allUpazilas, setAllUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

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

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const districtRes = await fetch("/data/districts.json");
        const districtJson = await districtRes.json();

        const upazilaRes = await fetch("/data/upazilas.json");
        const upazilaJson = await upazilaRes.json();

        const districtData = districtJson[2]?.data || districtJson;
        const upazilaData = upazilaJson[2]?.data || upazilaJson;

        setDistricts(districtData);
        setAllUpazilas(upazilaData);
      } catch (error) {
        console.error("Error loading location data:", error);
        toast.error("Failed to load district & upazila list");
      }
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    const checkUserStatus = async () => {
      try {
        const {data:tokenData} = await authClient.token();
        const res = await fetch(`http://localhost:5000/users/status?email=${session.user.email}`,{
           headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${tokenData?.token}`,
        },
        });
        if (res.ok) {
          const data = await res.json();
          setUserStatus(data.status);
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

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;

    const selectedDistrictObj = districts.find(
      (d) => String(d.id) === String(selectedDistrictId)
    );
    const districtName = selectedDistrictObj ? selectedDistrictObj.name : "";

    setFormData((prev) => ({
      ...prev,
      recipientDistrict: districtName,
      recipientUpazila: "",
    }));

    const filtered = allUpazilas.filter(
      (u) => String(u.district_id) === String(selectedDistrictId)
    );
    setFilteredUpazilas(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userStatus === "blocked") {
      toast.error("Your account is blocked! You cannot create a donation request.");
      return;
    }

    setSubmitting(true);

    const requestData = {
      ...formData,
      requesterName: session?.user?.name,
      requesterEmail: session?.user?.email,
      status: "pending",
    };

    try {
      const {data:tokenData} = await authClient.token();
      const res = await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "authorization":`Bearer ${tokenData?.token}`
         },
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
        <div className="w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 to-rose-600 p-8 text-white text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Create Donation Request</h1>
            <p className="mt-2 text-sm text-red-100 font-medium">Fill up the form below to post an emergency blood requirement.</p>
          </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Recipient District</label>
                  <select 
                    required 
                    onChange={handleDistrictChange} 
                    className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none bg-white transition"
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Recipient Upazila</label>
                  <select 
                    name="recipientUpazila" 
                    required 
                    value={formData.recipientUpazila} 
                    onChange={handleChange} 
                    disabled={filteredUpazilas.length === 0}
                    className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none bg-white transition disabled:bg-slate-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map((upazila) => (
                      <option key={upazila.id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

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

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5"/> Request Message (Details)</label>
                <textarea name="requestMessage" required rows="4" value={formData.requestMessage} onChange={handleChange} placeholder="Explain why blood is urgently required..." className="w-full px-4 py-3 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none transition resize-none" />
              </div>

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