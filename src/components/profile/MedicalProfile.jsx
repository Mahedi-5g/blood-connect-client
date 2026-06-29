"use client";

import { GiLifeTap } from 'react-icons/gi';

const MedicalProfileSection = ({ formData, isEditing, handleInputChange }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xs border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 text-lg">
                        <GiLifeTap />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Medical Profile</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Blood Group</label>
                        <select
                            disabled={!isEditing}
                            value={formData.bloodGroup}
                            required
                            onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 disabled:bg-slate-50/80 px-4 py-3 font-bold text-red-600 outline-none focus:border-red-500 text-sm transition"
                        >
                            <option value="">Select Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50/60 border border-dashed border-slate-200 mt-6">
                        <h4 className="font-bold text-sm text-slate-800">Eligible to Donate</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            Your account is in good standing. You are ready to save lives.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalProfileSection;