"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
            callbackURL: "/dashboard",
        }, {
            onRequest: () => {
                setLoading(true);
            },
            onSuccess: () => {
                setLoading(false);
                router.push("/dashboard"); 
            },
            onError: (ctx) => {
                setLoading(false);
                setError(ctx.error.message || "Something went wrong!");
            }
        });
    };

    const wrapperClass =
        "mt-2 w-full flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3";
    const labelClass = "text-[#334155] font-bold text-sm mb-2 tracking-tight block";
    const inputClass = "text-slate-800 text-sm font-medium placeholder:text-slate-400 w-full bg-transparent outline-none border-none p-0 focus:ring-0";

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-rose-50 flex items-center justify-center px-4 py-10">
            <div className="max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">

                {/* Left Side - Form */}
                <div className="p-8 flex flex-col justify-center">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800">Welcome Back</h1>
                        <p className="mt-3 text-slate-500">
                            Sign in to manage your donations and help save lives.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-xl text-sm font-medium border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="mb-5">
                            <label className={labelClass}>Email Address</label>
                            <div className={wrapperClass}>
                                <FaEnvelope className="text-slate-400 text-base" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className={inputClass}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className={labelClass}>Password</label>
                            <div className={wrapperClass}>
                                <FaLock className="text-slate-400 text-base" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter your password"
                                    className={inputClass}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 rounded-2xl bg-linear-to-r from-red-400 to-red-500 text-white font-semibold shadow-lg hover:shadow-red-200 transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center"
                            type="submit"
                            isLoading={loading}
                            isDisabled={loading}
                        >
                            {loading ? "Loging in..." : "Login"}
                        </Button>
                    </form>

                    <p className="text-center text-slate-500 mt-8">
                        Don't have an account?{" "}
                        <Link href="/auth/signup" className="font-semibold text-red-500">
                            Register Now
                        </Link>
                    </p>
                </div>

                {/* Right Side - Image */}
                <div className="relative hidden md:block w-full h-full min-h-150">
                    <Image
                        src="/login.jpg"
                        alt="Blood Donation"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10 text-white z-10">
                        <h2 className="text-4xl font-bold mb-4">Every Drop Counts</h2>
                        <p className="text-lg text-white/90">
                            Join thousands of donors helping patients get life-saving blood when they need it most.
                        </p>
                        <div className="mt-6 flex gap-6">
                            <div>
                                <h3 className="text-2xl font-bold">5K+</h3>
                                <p className="text-sm text-white/80">Active Donors</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">2K+</h3>
                                <p className="text-sm text-white/80">Lives Saved</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">60+</h3>
                                <p className="text-sm text-white/80">Hospitals</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}