"use client";

import { FaMapMarkerAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailLock } from 'react-icons/md';

const PersonalInfoSection = ({ formData, isEditing, handleInputChange, user }) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xs border p-5 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b pb-3">
                    <FaRegUser className="text-red-500 text-lg" />
                    <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            disabled={!isEditing}
                            required
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 disabled:bg-slate-50/80 disabled:text-slate-500 px-4 py-3 outline-none focus:border-red-500 focus:bg-white transition text-sm font-medium"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Email (Fixed)</label>
                            <MdOutlineMailLock className="text-slate-400 text-sm" title="Email cannot be changed" />
                        </div>
                        <input
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 text-slate-400 px-4 py-3 cursor-not-allowed outline-none text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 border-b pb-3 pt-2">
                    <FaMapMarkerAlt className="text-red-500 text-lg" />
                    <h3 className="text-lg font-bold text-slate-800">Address Details</h3>
                </div>

                {/* Location Input Fix with Select Dropdown */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">District</label>
                        <select
                            disabled={!isEditing}
                            value={formData.district}
                            required
                            onChange={(e) => handleInputChange("district", e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 disabled:bg-slate-50/80 disabled:text-slate-500 px-4 py-3 outline-none focus:border-red-500 focus:bg-white transition text-sm font-medium"
                        >
                            <option value="">Select District</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Upazila</label>
                        <select
                            disabled={!isEditing}
                            value={formData.upazila}
                            required
                            onChange={(e) => handleInputChange("upazila", e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 disabled:bg-slate-50/80 disabled:text-slate-500 px-4 py-3 outline-none focus:border-red-500 focus:bg-white transition text-sm font-medium"
                        >
                            <option value="">Select Upazila</option>
                            <option value="Mirpur">Mirpur</option>
                            <option value="Dhanmondi">Dhanmondi</option>
                            <option value="Hathazari">Hathazari</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoSection;