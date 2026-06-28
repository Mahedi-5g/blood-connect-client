"use client";

import { useState, useEffect } from "react";
import { Button, Avatar } from "@heroui/react";
import { FaEdit, FaSave, FaTimes, FaMapMarkerAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { useSession } from "@/lib/auth-client";
import { GiLifeTap } from "react-icons/gi";


export default function ProfilePage() {
    const { data: session } = useSession();


    const [isEditing, setIsEditing] = useState(false);

    const user = session?.user;
    const [formData, setFormData] = useState({
        name: user?.name,
        district: user?.district,
        upazila: user?.upazila,
        phone: user?.phone,
    });

    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || "Donor",
                email: session.user.email || ""
            }));
        }
    }, [session]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // ফর্ম সাবমিট/সেভ হ্যান্ডলার
    const handleSave = async (e) => {
        e.preventDefault();

        // এখানে আপনার ডাটাবেজে ডাটা পাঠানোর এপিআই কল করতে পারেন
        // উদাহরণ: await fetch('/api/profile/update', { method: 'POST', body: JSON.stringify(formData) })

        setIsEditing(false); // ফর্ম আবার লক মোডে ফিরে যাবে
    };

    return (
        <div className="bg-slate-50 min-h-screen p-6 md:p-8">
            <form onSubmit={handleSave}>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            <span className="text-slate-900">Profile</span>{" "}
                            <span className="text-red-500">Settings</span>
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Manage your personal information and donor credentials.
                        </p>
                    </div>

                    {!isEditing ? (
                        <Button
                            color="danger"
                            radius="xl"
                            size="lg"
                            className="font-semibold shadow-md px-6"
                            onPress={() => setIsEditing(true)}
                        >
                            <FaEdit />
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                color="default"
                                radius="xl"
                                size="lg"
                                variant="bordered"
                                className="font-semibold px-6"
                                onPress={() => setIsEditing(false)}
                            >
                                <FaTimes />
                                Cancel
                            </Button>
                            <Button
                                color="success"
                                radius="xl"
                                size="lg"
                                type="submit"
                                className="font-semibold text-white shadow-md px-6 bg-green-600"
                            >
                                <FaSave />
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden border mb-8">
                    <div className="relative h-28 bg-amber-900">

                        {/* Avatar */}
                        <div className="absolute -bottom-10 left-8 z-10 gap-4">
                            <Avatar className="w-22 h-22 border-5 rounded-full border-white shadow-xl">
                                <Avatar.Image
                                    src={user?.image || "/default-avatar.png"}
                                    alt={user?.name || "User"}

                                />
                            </Avatar>

                        </div>
                        <div className="absolute bottom-0 left-32 z-10 gap-4">
                            <div className="flex flex-wrap  gap-3">
                                <h2 className="text-3xl font-bold text-white">
                                    {user?.name}
                                </h2>
                                <p className="py-1 px-2 rounded-xl bg-blue-50 mb-1 text-green-600 text-sm font-semibold">Active {user?.role}</p>
                            </div>
                        </div>

                        {/*Blood Group */}
                        <div className="absolute right-8 -bottom-10 bg-white/70 border border-red-100 rounded-2xl px-6 py-3 text-center shadow-md">
                            <p className="text-[10px] tracking-wider uppercase font-bold text-red-500">
                                Blood Group
                            </p>
                            <h2 className="text-3xl font-black text-red-600 mt-0.5">{user?.bloodGroup}</h2>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="px-8 pb-6">
                        <div className="mb-10 ml-24">

                            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-700">
                                <FaMapMarkerAlt className="text-red-400" />
                                {user?.upazila}, {user?.district}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            <div className="lg:col-span-2 space-y-6">

                                {/* Personal Info */}
                                <div className="bg-white rounded-3xl shadow-xs border p-5 md:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="text-red-500 text-lg">
                                            <FaRegUser />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Full Name</label>
                                            <input
                                                type="text"
                                                value={user?.name}
                                                disabled={!isEditing}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 disabled:bg-slate-50/80 disabled:text-slate-500 px-4 py-3 outline-none focus:border-red-500 focus:bg-white transition"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mt-2">
                                                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Email (Fixed)</label>
                                                <MdOutlineMailLock className="text-slate-400 text-sm" title="Email cannot be changed" />
                                            </div>
                                            <input
                                                type="email"
                                                value={user?.email}
                                                disabled={true}
                                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 text-slate-400 px-4 py-3 cursor-not-allowed outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 my-4">
                                        <div className="text-red-500 text-lg">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800">Address Details</h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">District</label>
                                            <input
                                                type="text"
                                                value={user?.district}
                                                disabled={!isEditing}
                                                onChange={(e) => handleInputChange("district", e.target.value)}
                                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 disabled:bg-slate-50/80 disabled:text-slate-500 px-4 py-3 outline-none focus:border-red-500 focus:bg-white transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Upazila</label>
                                            <input
                                                type="text"
                                                value={user?.upazila}
                                                disabled={!isEditing}
                                                onChange={(e) => handleInputChange("upazila", e.target.value)}
                                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 disabled:bg-slate-50/80 disabled:text-slate-500 px-4 py-3 outline-none focus:border-red-500 focus:bg-white transition"
                                            />
                                        </div>
                                    </div>


                                </div>

                            </div>

                            {/*Medical Profile*/}
                            <div className="space-y-6">
                                <div className="bg-white rounded-3xl shadow-xs border p-6">
                                    <div className="flex items-start gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 font-bold">
                                            <GiLifeTap />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">Medical Profile</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Blood Group</label>
                                            <input
                                                type="text"
                                                value={user?.bloodGroup}
                                                disabled={true}
                                                className="mt-2 w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 font-bold text-red-600"
                                            />
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

                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}