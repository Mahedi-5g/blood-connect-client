"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Search, Droplet, MapPin, Mail, Phone, User, Inbox } from "lucide-react";

export default function SearchDonorsPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // সার্চ ফর্ম স্টেট
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      const { bloodGroup, district, upazila } = searchParams;
      // কোয়েরি প্যারামিটারসহ ব্যাকএন্ডে রিকোয়েস্ট পাঠানো হচ্ছে
      const res = await fetch(
        `http://localhost:5000/search-donors?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}`
      );

      if (!res.ok) throw new Error("Failed to fetch donors data");

      const data = await res.json();
      setDonors(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while searching donors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title Section */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            Find Available <span className="text-red-600">Blood Donors</span> 🩸
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Search for life-saving donors near your location by selecting the blood group, district, and upazila.
          </p>
        </div>

        {/* 🔍 Search Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            {/* Blood Group */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-red-500" /> Blood Group
              </label>
              <select
                name="bloodGroup"
                required
                value={searchParams.bloodGroup}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-bold outline-none bg-white transition"
              >
                <option value="">Select Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> District
              </label>
              <select
                name="district"
                required
                value={searchParams.district}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none bg-white transition"
              >
                <option value="">Select District</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Upazila
              </label>
              <select
                name="upazila"
                required
                value={searchParams.upazila}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-slate-200 focus:border-red-500 rounded-xl text-slate-800 text-sm font-medium outline-none bg-white transition"
              >
                <option value="">Select Upazila</option>
                <option value="Mirpur">Mirpur</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Hathazari">Hathazari</option>
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/15 transition flex items-center justify-center gap-2 disabled:bg-slate-300"
              >
                <Search className="w-4 h-4" />
                {loading ? "Searching..." : "Search Donors"}
              </button>
            </div>
          </form>
        </div>

        {/* 📊 Donors List Result Section */}
        <div className="pt-4">
          {!hasSearched ? (
            // ১. ডিফল্ট ভিউ (সার্চ করার আগে)
            <div className="text-center p-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl max-w-lg mx-auto">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-400 font-medium">
                Results will appear here after you submit the search form.
              </p>
            </div>
          ) : loading ? (
            // ২. লোডিং স্টেট
            <div className="text-center py-12 font-bold text-slate-600">
              Searching for potential lifesavers...
            </div>
          ) : donors.length === 0 ? (
            // ৩. নো ডাটা ফাউন্ড স্টেট
            <div className="text-center p-12 bg-white border border-slate-100 rounded-3xl max-w-lg mx-auto shadow-sm space-y-2">
              <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Donors Found</h3>
              <p className="text-xs text-slate-400">
                Try searching with a different location or blood group.
              </p>
            </div>
          ) : (
            // ৪. ডোনর কার্ড লিস্ট গ্রিড
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 px-2">
                Found {donors.length} Matching {donors.length === 1 ? "Donor" : "Donors"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor) => (
                  <div
                    key={donor._id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-slate-200/80 transition relative overflow-hidden group"
                  >
                    {/* Blood Group Tag */}
                    <div className="absolute top-0 right-0 bg-red-50 text-red-600 font-black px-4 py-2 rounded-bl-xl text-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                      {donor.bloodGroup}
                    </div>

                    <div className="space-y-4">
                      {/* Name & Avatar Placeholder */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-bold uppercase">
                          {donor.name?.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                            {donor.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium capitalize">
                            Status: {donor.status || "Active"}
                          </p>
                        </div>
                      </div>

                      <hr className="border-slate-100" />

                      {/* Location & Contact Info */}
                      <div className="space-y-2 text-xs font-semibold text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{donor.upazila}, {donor.district}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{donor.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}