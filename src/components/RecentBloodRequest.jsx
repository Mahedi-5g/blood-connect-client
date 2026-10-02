"use client";

import { Button } from "@heroui/react";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoadingAnimation from "./LoadingAnimation";

export default function RecentBloodRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-requests`);

                if (!res.ok) {
                    throw new Error("Failed to fetch requests");
                }

                const data = await res.json();
                setRequests(data);
            } catch (error) {
                console.error("Fetch requests error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);


    const handleViewDetails = (requestId) => {
        if (!user) {
            const redirectUrl = `/donationRequest/${requestId}`;
            router.push(
                `/auth/login?redirect=${encodeURIComponent(redirectUrl)}`
            );
            return;
        }

        router.push(`/donationRequest/${requestId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingAnimation></LoadingAnimation>
            </div>
        );
    }

    return (
        <section className="py-12 md:py-24 bg-[#fbf9f4] dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight">
                        Recent Blood Requests
                    </h2>
                    <p className="mt-3 text-base text-gray-700 dark:text-slate-300 font-medium">
                        Help patients by responding to urgent blood requests.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {requests.map((request) => (
                        <div
                            key={request._id}
                            className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] dark:shadow-none border border-gray-100/50 dark:border-slate-800 relative flex flex-col pt-0 pb-7 px-7 hover:shadow-xl dark:hover:border-slate-700 transition-all duration-300"
                        >
                            <div className="absolute top-0 left-0 right-0 h-28 bg-[#f9ebe0]/60 dark:bg-red-950/30 z-0" />

                            <div className="relative z-10 w-full pt-6">
                                <div className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider text-[#c05621] dark:text-rose-400 uppercase">
                                    <span className="w-2 h-2 rounded-full bg-[#e65100] dark:bg-rose-500" />
                                    {request.status}
                                </div>

                                <div className="mt-4 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] flex items-center justify-center border border-gray-50 dark:border-slate-700">
                                    <span className="text-2xl font-black text-[#b71c1c] dark:text-rose-400">
                                        {request.bloodGroup}
                                    </span>
                                </div>

                                <div className="text-center mt-6">
                                    <h3 className="text-lg font-black text-black dark:text-white tracking-wide uppercase">
                                        {request.recipientName}
                                    </h3>
                                    <span className="text-[10px] font-extrabold text-gray-400 dark:text-slate-500 tracking-widest uppercase block mt-1">
                                        RECIPIENT
                                    </span>
                                </div>

                                <div className="mt-8 space-y-4 px-1">
                                    <div className="flex items-start gap-4">
                                        <div className="w-[#24px] h-9 min-w-9 bg-[#f9ebe0]/70 dark:bg-red-950/40 rounded-xl flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-[#c05621] dark:text-rose-400" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 tracking-widest uppercase block">
                                                LOCATION
                                            </span>
                                            <span className="text-sm font-bold text-black dark:text-slate-200 block mt-0.5">
                                                {request.recipientUpazila}, {request.recipientDistrict}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 min-w-9 bg-[#f9ebe0]/70 dark:bg-red-950/40 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-[#c05621] dark:text-rose-400" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 tracking-widest uppercase block">
                                                DATE & TIME
                                            </span>
                                            <span className="text-sm font-bold text-black dark:text-slate-200 block mt-0.5">
                                                {request.donationDate} <span className="text-gray-300 dark:text-slate-600 mx-1 font-normal">|</span> {request.donationTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onPress={() => handleViewDetails(request._id)}
                                    className="w-full mt-8 bg-[#e65100] text-white font-bold text-sm h-12 rounded-2xl shadow-[0_6px_20px_rgba(230,81,0,0.3)] hover:bg-[#d84315]"
                                    endContent={<span className="text-lg font-light">→</span>}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    <Link href="/donationRequest">
                        <Button
                            className="bg-[#f0e4d7] hover:bg-[#e8dacb] text-black dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 font-bold text-xs tracking-wider px-8 h-12 rounded-2xl border border-transparent dark:border-slate-700 transition"
                        >
                            View All Requests
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}