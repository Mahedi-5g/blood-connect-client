"use client";

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailLock } from 'react-icons/md';

const PersonalInfoSection = ({ formData, isEditing, handleInputChange, user }) => {

    const [districts, setDistricts] = useState([]);
    const [allUpazilas, setAllUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState("");

    useEffect(() => {
        const loadData = async () => {
            const districtRes = await fetch("/data/districts.json");
            const districtJson = await districtRes.json();

            const upazilaRes = await fetch("/data/upazilas.json");
            const upazilaJson = await upazilaRes.json();

            const districtData = districtJson[2].data;
            const upazilaData = upazilaJson[2].data;

            setDistricts(districtData);
            setAllUpazilas(upazilaData);

            const currentDistrictName = formData?.district || user?.district;

            if (currentDistrictName) {
                const matchedDistrict = districtData.find(
                    (d) => String(d.name).toLowerCase() === String(currentDistrictName).toLowerCase()
                );

                if (matchedDistrict) {
                    const distId = String(matchedDistrict.id);
                    setSelectedDistrictId(distId);

                    const initialUpazilas = upazilaData.filter(
                        (u) => String(u.district_id) === distId
                    );
                    setFilteredUpazilas(initialUpazilas);
                }
            }

        };



        loadData();
    }, [user, formData?.district]);

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

             
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">District</label>
                        <select
                            disabled={!isEditing}
                            value={selectedDistrictId}
                            className="w-full h-14 pl-11 pr-10 border border-slate-200 rounded-xl"
                            onChange={(e) => {
                                const districtId = e.target.value;
                                setSelectedDistrictId(districtId);

                                const selectedDistrict = districts.find(
                                    (d) => String(d.id) === districtId
                                );

                                handleInputChange("district", selectedDistrict?.name || "");

                                const filtered = allUpazilas.filter(
                                    (u) => String(u.district_id) === String(districtId)
                                );
                                setFilteredUpazilas(filtered);
                                handleInputChange("upazila", "");
                            }}
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
                        <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                            Upazila
                        </label>
                        <select
                            disabled={!isEditing}
                            value={formData.upazila || ""}
                            className="w-full h-14 pl-11 pr-10 border border-slate-200 rounded-xl"
                            onChange={(e) => handleInputChange("upazila", e.target.value)}
                        >
                            <option value="">Select Upazila</option>

                            {formData.upazila &&
                                !filteredUpazilas.some((u) => u.name === formData.upazila) && (
                                    <option value={formData.upazila}>{formData.upazila}</option>
                                )}

                            {filteredUpazilas.map((upazila) => (
                                <option key={upazila.id} value={upazila.name}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoSection;