"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">

                {/* Left Side - Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800">
                            Welcome Back
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Sign in to manage your donations and help save lives.
                        </p>
                    </div>

                    <form className="space-y-5">
                        <Input
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            startContent={
                                <MdEmail className="text-default-400 text-lg" />
                            }
                            variant="bordered"
                            size="lg"
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            startContent={
                                <FaLock className="text-default-400 text-sm" />
                            }
                            variant="bordered"
                            size="lg"
                        />

                        <div className="flex justify-end">
                            <Link
                                href="#"
                                className="text-sm text-red-500 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            color="danger"
                            size="lg"
                            radius="full"
                            className="w-full font-semibold"
                        >
                            Login
                        </Button>
                    </form>

                    <p className="text-center text-slate-500 mt-8">
                        Don't have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="font-semibold text-red-500"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>

                {/* Right Side - Image */}
                <div className="relative hidden md:block">
                    <Image
                        src="/banner1.jpg"
                        alt="Blood Donation"
                        fill
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-10 left-10 right-10 text-white">
                        <h2 className="text-4xl font-bold mb-4">
                            Every Drop Counts
                        </h2>

                        <p className="text-lg text-white/90">
                            Join thousands of donors helping patients get
                            life-saving blood when they need it most.
                        </p>

                        <div className="mt-6 flex gap-6">
                            <div>
                                <h3 className="text-2xl font-bold">5K+</h3>
                                <p className="text-sm">Active Donors</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">2K+</h3>
                                <p className="text-sm">Lives Saved</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">60+</h3>
                                <p className="text-sm">Hospitals</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}