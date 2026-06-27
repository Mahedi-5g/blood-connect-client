"use client";

import React, { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {Label, Radio, RadioGroup } from "@heroui/react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCompass,
    FaLock,
    FaUndo,
    FaCamera,
    FaChevronDown
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoIosWarning } from "react-icons/io";


const labelClass = "text-[#334155] font-bold text-sm mb-2 tracking-tight block";
const wrapperClass = "w-full h-14 bg-white border border-slate-200 focus-within:border-red-400 focus-within:ring-[4px] focus-within:ring-red-500/10 rounded-xl transition-all duration-200 flex items-center px-4 gap-3";
const inputClass = "text-slate-800 text-sm font-medium placeholder:text-slate-400 w-full bg-transparent outline-none border-none p-0 focus:ring-0";
const selectClass = "w-full h-14 bg-white border border-slate-200 focus:border-red-400 focus:ring-[4px] focus:ring-red-500/10 rounded-xl transition-all duration-200 flex items-center px-4 gap-3 appearance-none cursor-pointer text-slate-800 text-sm font-medium outline-none";

export default function SignUpPage() {
    const [districts, setDistricts] = useState([]);
    const [allUpazilas, setAllUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

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
        };

        loadData();
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        district: "",
        upazila: "",
        password: "",
        confirmPassword: ""
    });

    const [selectedBlood, setSelectedBlood] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [role,setRole] = useState("donor")

    const fileInputRef = useRef(null);
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAvatarClick = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImageFile(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const uploadImageToImageBB = async () => {
        if (!imageFile) return "";

        const formData = new FormData();

        formData.append("image", imageFile);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();

        if (!data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.display_url;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const selectedDistrict = districts.find(
            (d) => String(d.id) === String(formData.district)
        );

        if (!formData.name || !formData.email || !formData.phone) {
            setError("Please fill in all required fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (!selectedBlood) {
            setError("Please select your blood group.");
            return;
        }

        setLoading(true);
        const imageUrl = await uploadImageToImageBB();

        const { error: authError } = await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            role:role,
            image: imageUrl,
            data: {
                phone: formData.phone,
                gender: formData.gender,
                district: selectedDistrict?.name || "",
                upazila: formData.upazila,
                bloodGroup: selectedBlood
            }
        });

        setLoading(false);

        if (authError) {
            setError(authError.message || "Registration failed. Please try again.");
        } else {
            window.location.href = "/dashboard";
        }
    };

    return (
        <section className="py-16 bg-[#fbf9f4] min-h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white rounded-[32px] p-8 md:p-12 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] border border-gray-100">

                {/* Title Content */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-[#de3b3b] tracking-tight">
                        Join the Lifesaving Community
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 font-medium">
                        Create an account to become a donor and save lives
                    </p>
                </div>

                {/* Profile Photo Uploader */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-28 h-28 bg-[#fdf6f0] rounded-full flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
                            {imagePreview ? (
                                <Image src={imagePreview} alt="Profile preview" width={112} height={112} className="w-full h-full object-cover" />
                            ) : (
                                <FaUser className="w-10 h-10 text-gray-300" />
                            )}
                        </div>
                        <div className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                            <FaCamera className="w-3 h-3 text-gray-500" />
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                    <span className="text-xs font-bold text-gray-700 mt-3 tracking-wide">Profile Photo</span>
                </div>

                {/* Error Box */}
                {error && (
                    <div className=" flex gap-2 mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100">
                        <IoIosWarning /> {error}
                    </div>
                )}

                {/* Form Elements */}
                <form onSubmit={handleRegister} className="space-y-6">

                    {/* Full Name & Email Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Full Name</label>
                            <div className={wrapperClass}>
                                <FaUser className="text-slate-400 text-base shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Email Address</label>
                            <div className={wrapperClass}>
                                <FaEnvelope className="text-slate-400 text-base shrink-0" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className={inputClass}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phone Number & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Phone Number</label>
                            <div className={wrapperClass}>
                                <FaPhone className="text-slate-400 text-base shrink-0" />
                                <input
                                    type="tel"
                                    placeholder="+880 1XXX XXXXXX"
                                    className={inputClass}
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Gender</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                                    <FaUser />
                                </span>
                                <select
                                    className={`${selectClass} pl-11`}
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange("gender", e.target.value)}
                                >
                                    <option value="" disabled hidden>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                                    <FaChevronDown />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* District & Upazila */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>District</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                                    <FaMapMarkerAlt />
                                </span>
                                <select
                                    value={formData.district}
                                    className="w-full h-14 pl-11 pr-10 border border-slate-200 rounded-xl"
                                    onChange={(e) => {
                                        const districtId = e.target.value;


                                        handleInputChange("district", districtId);

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
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                                    <FaChevronDown />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Upazila</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
                                    <FaCompass />
                                </span>
                                <select
                                    value={formData.upazila}
                                    className="w-full h-14 pl-11 pr-10 border border-slate-200 rounded-xl"
                                    onChange={(e) =>
                                        handleInputChange("upazila", e.target.value)
                                    }
                                >
                                    <option value="">Select Upazila</option>

                                    {filteredUpazilas.map((upazila) => (
                                        <option
                                            key={upazila.id}
                                            value={upazila.name}
                                        >
                                            {upazila.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                                    <FaChevronDown />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Blood Group Grid Field */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Blood Group</label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {bloodGroups.map((bg) => (
                                <button
                                    key={bg}
                                    type="button"
                                    onClick={() => setSelectedBlood(bg)}
                                    className={`h-11 rounded-xl border font-bold text-sm transition-all duration-200 ${selectedBlood === bg
                                        ? "bg-[#de3b3b] text-white border-[#de3b3b] shadow-sm scale-95 cursor-pointer"
                                        : "bg-white text-gray-800 border-gray-200 hover:border-gray-300 cursor-pointer"
                                        }`}
                                >
                                    {bg}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Password Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Password</label>
                            <div className={wrapperClass}>
                                <FaLock className="text-slate-400 text-base shrink-0" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className={inputClass}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Confirm Password</label>
                            <div className={wrapperClass}>
                                <FaUndo className="text-slate-400 text-base shrink-0" />
                                <input
                                    type="password"
                                    placeholder="Re-enter your password"
                                    className={inputClass}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* role base signup */}
                    <div className="flex flex-col gap-4">
                        <Label className={labelClass}>Subscription plan</Label>
                        <RadioGroup defaultValue="donor" name="role" onChange={value =>setRole(value)} orientation="horizontal">
                            <Radio value="donor">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Blood Donor
                                </Radio.Content>
                            </Radio>
                            <Radio value="volunteer">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Volunteer
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Core Submission Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-2xl bg-linear-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-red-200 transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? "Creating Account..." : "Complete Registration"}
                    </button>
                </form>

                {/* Switch Page Navigation */}
                <div className="text-center mt-6">
                    <p className="text-xs font-semibold text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-[#de3b3b] hover:underline font-bold ml-1"
                        >
                            Login here
                        </Link>
                    </p>
                </div>

            </div>
        </section>
    );
}