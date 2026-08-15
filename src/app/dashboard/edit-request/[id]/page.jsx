"use client";

import PrivateRoute from '@/components/PrivateRoute';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditDonationRequestPage = () => {
    const params = useParams();
    const router = useRouter();

    const [districts, setDistricts] = useState([]);
    const [allUpazilas, setAllUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        recipientName: '',
        bloodGroup: '',
        hospitalName: '',
        fullAddress: '',
        recipientDistrict: '',
        recipientUpazila: '',
        donationDate: '',
        donationTime: '',
        requestMessage: ''
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {

                const districtRes = await fetch("/data/districts.json");
                const districtJson = await districtRes.json();

                const upazilaRes = await fetch("/data/upazilas.json");
                const upazilaJson = await upazilaRes.json();

                const districtData = districtJson[2]?.data || districtJson;
                const upazilaData = upazilaJson[2]?.data || upazilaJson;

                setDistricts(districtData);
                setAllUpazilas(upazilaData);

                if (params?.id) {
                    const reqRes = await fetch(`http://localhost:5000/requests/${params.id}`);
                    if (!reqRes.ok) throw new Error("Failed to fetch request data");

                    const data = await reqRes.json();
                    
                    setFormData({
                        recipientName: data.recipientName || '',
                        bloodGroup: data.bloodGroup || '',
                        hospitalName: data.hospitalName || '',
                        fullAddress: data.fullAddress || '',
                        recipientDistrict: data.recipientDistrict || '',
                        recipientUpazila: data.recipientUpazila || '',
                        donationDate: data.donationDate || '',
                        donationTime: data.donationTime || '',
                        requestMessage: data.requestMessage || ''
                    });

                    if (data.recipientDistrict) {
                        const matchedDistrict = districtData.find(
                            (d) => String(d.name).trim().toLowerCase() === String(data.recipientDistrict).trim().toLowerCase()
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
                }
            } catch (error) {
                console.error("Initialization Error:", error);
                toast.error("Failed to load request details");
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, [params?.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrictId(districtId);

        const selectedDistrict = districts.find(
            (d) => String(d.id) === String(districtId)
        );

        setFormData((prev) => ({
            ...prev,
            recipientDistrict: selectedDistrict ? selectedDistrict.name : "",
            recipientUpazila: ""
        }));

        const filtered = allUpazilas.filter(
            (u) => String(u.district_id) === String(districtId)
        );
        setFilteredUpazilas(filtered);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { _id, ...cleanFormData } = formData;

            const res = await fetch(`http://localhost:5000/requests/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cleanFormData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to update request");
            }

            toast.success("Donation request updated successfully!");
            router.push(`/dashboard/my-request`);
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.message || "Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="py-24 text-center font-semibold text-slate-600">
                Loading Request Details...
            </div>
        );
    }

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b">
                        Edit Donation Request
                    </h2>

                    <form onSubmit={handleUpdate} className="space-y-5">
                        {/* Recipient Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                                Recipient Name
                            </label>
                            <input
                                type="text"
                                name="recipientName"
                                value={formData.recipientName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                        </div>

                        {/* Blood Group & Hospital Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Blood Group
                                </label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Hospital Name
                                </label>
                                <input
                                    type="text"
                                    name="hospitalName"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* District & Upazila Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    District
                                </label>
                                <select
                                    value={selectedDistrictId}
                                    onChange={handleDistrictChange}
                                    required
                                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
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
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Upazila
                                </label>
                                <select
                                    name="recipientUpazila"
                                    value={formData.recipientUpazila}
                                    onChange={handleChange}
                                    required
                                    disabled={!selectedDistrictId && !formData.recipientUpazila}
                                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">Select Upazila</option>

                                    {formData.recipientUpazila && 
                                     !filteredUpazilas.some((u) => u.name.toLowerCase() === formData.recipientUpazila.toLowerCase()) && (
                                        <option value={formData.recipientUpazila}>
                                            {formData.recipientUpazila}
                                        </option>
                                    )}

                                    {filteredUpazilas.map((upazila) => (
                                        <option key={upazila.id} value={upazila.name}>
                                            {upazila.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Full Address */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                                Full Address
                            </label>
                            <input
                                type="text"
                                name="fullAddress"
                                value={formData.fullAddress}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Donation Date
                                </label>
                                <input
                                    type="date"
                                    name="donationDate"
                                    value={formData.donationDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Donation Time
                                </label>
                                <input
                                    type="time"
                                    name="donationTime"
                                    value={formData.donationTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>
                        </div>
   
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">
                                Request Message / Description
                            </label>
                            <textarea
                                name="requestMessage"
                                rows="3"
                                value={formData.requestMessage}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                            ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-1/2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition disabled:bg-slate-400"
                            >
                                {submitting ? "Updating..." : "Update Donation Request"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default EditDonationRequestPage;