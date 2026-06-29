"use client";

import { useState, useEffect } from "react";
import { Avatar } from "@heroui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import ProfileHeaderSection from "@/components/profile/ProfileHeader";
import PersonalInfoSection from "@/components/profile/PersonalInfo";
import MedicalProfileSection from "@/components/profile/MedicalProfile";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = session?.user;
    const [formData, setFormData] = useState({
        name: "",
        district: "",
        upazila: "",
        bloodGroup: "",
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
                district: session.user.district || "",
                upazila: session.user.upazila || "",
                bloodGroup: session.user.bloodGroup || "",
            });
        }
    }, [session]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                `http://localhost:5000/user/update-profile?email=${session?.user?.email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        bloodGroup: formData.bloodGroup,
                        district: formData.district,
                        upazila: formData.upazila,
                    }),
                }
            );

            if (!res.ok) throw new Error("Failed to update profile");

            const data = await res.json();

            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                toast.success("Profile updated successfully! ");
                setIsEditing(false);
                window.location.reload();
            } else {
                toast.error("No changes were made.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while saving profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen p-6 md:p-8">
            <form onSubmit={handleSave}>

                <ProfileHeaderSection
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    loading={loading}
                ></ProfileHeaderSection>

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden border mb-8">
                    <div className="relative h-28 bg-linear-to-r from-slate-800 to-amber-950">

                        <div className="absolute -bottom-10 left-8 z-10 gap-4">
                            <Avatar className="w-20 h-20 border-4 rounded-full border-white shadow-xl text-xl">
                                <Avatar.Image
                                    src={user?.image || "/default-avatar.png"}
                                    name={user?.name}
                                />
                            </Avatar>
                        </div>

                        <div className="absolute bottom-2 left-32 z-10">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                                    {user?.name || "Donor"}
                                </h2>
                                <p className="py-0.5 px-2 rounded-lg bg-green-500 text-white text-xs font-bold capitalize">Active {user?.role || "user"}</p>
                            </div>
                        </div>

                        {/* Blood Group Badge */}
                        <div className="absolute right-8 -bottom-10 bg-white border border-red-100 rounded-2xl px-6 py-2 text-center shadow-md min-w-[100px]">
                            <p className="text-[10px] tracking-wider uppercase font-bold text-red-500">
                                Blood Group
                            </p>
                            <h2 className="text-2xl font-black text-red-600 mt-0.5">{user?.bloodGroup || "N/A"}</h2>
                        </div>
                    </div>

                    <div className="px-8 pb-6 pt-14">
                        <div className="mb-6 flex items-center gap-1.5 text-sm text-slate-500">
                            <FaMapMarkerAlt className="text-red-500" />
                            <span>{user?.upazila || "Update Upazila"}, {user?.district || "Update District"}</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            <PersonalInfoSection
                                formData={formData}
                                isEditing={isEditing}
                                handleInputChange={handleInputChange}
                                user={user}>
                            </PersonalInfoSection>
                            <MedicalProfileSection
                                formData={formData}
                                isEditing={isEditing}
                                handleInputChange={handleInputChange}
                            >
                            </MedicalProfileSection>

                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}