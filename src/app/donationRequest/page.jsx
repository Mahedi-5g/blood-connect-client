"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { MapPin, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DonationRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(7);

    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleViewDetails = (id) => {
        if (!session?.user) {
            router.push(`/auth/signup?redirect=/donationRequest/${id}`);
            return;
        }

        router.push(`/donationRequest/${id}`);
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("http://localhost:5000/requests");

                if (!res.ok) {
                    throw new Error("Failed to fetch requests");
                }

                const data = await res.json();
                setRequests(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return (
            <section className="py-24">
                <div className="text-center text-lg font-semibold">
                    Loading...
                </div>
            </section>
        );
    }

    return (
        <section className="pt-10 pb-18 bg-[#fbf9f4]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-black tracking-tight">
                        Donation <span className="text-rose-500">Request</span>
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600 leading-7">
                        Browse all active blood donation requests from different districts. Find a patient in need and become a lifesaving donor by responding to urgent requests.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {requests.slice(0, visibleCount).map((request) => (
                        <div
                            key={request._id}
                            className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100/50 relative flex flex-col pt-0 pb-7 px-7 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="absolute top-0 left-0 right-0 h-28 bg-[#f9ebe0]/60 z-0" />

                            <div className="relative z-10 w-full pt-6">
                                <div className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider text-[#c05621] uppercase">
                                    <span className="w-2 h-2 rounded-full bg-[#e65100]" />
                                    {request.status}
                                </div>

                                <div className="mt-4 w-16 h-16 bg-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] flex items-center justify-center border border-gray-50">
                                    <span className="text-2xl font-black text-[#b71c1c]">
                                        {request.bloodGroup}
                                    </span>
                                </div>

                                <div className="text-center mt-6">
                                    <h3 className="text-lg font-black text-black tracking-wide uppercase">
                                        {request.recipientName}
                                    </h3>
                                    <span className="text-[10px] font-extrabold text-gray-400 tracking-widest uppercase block mt-1">
                                        RECIPIENT
                                    </span>
                                </div>

                                <div className="mt-8 space-y-4 px-1">
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 min-w-9 bg-[#f9ebe0]/70 rounded-xl flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-[#c05621]" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase block">
                                                LOCATION
                                            </span>
                                            <span className="text-sm font-bold text-black block mt-0.5">
                                                {request.recipientUpazila}, {request.recipientDistrict}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 min-w-9 bg-[#f9ebe0]/70 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-[#c05621]" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase block">
                                                DATE & TIME
                                            </span>
                                            <span className="text-sm font-bold text-black block mt-0.5">
                                                {request.donationDate} <span className="text-gray-300 mx-1 font-normal">|</span> {request.donationTime}
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
                    {visibleCount < requests.length && (
                        <Button
                            onPress={() => setVisibleCount(requests.length)}
                            className="bg-[#f0e4d7] hover:bg-[#e8dacb] text-black font-bold text-xs tracking-wider px-8 h-12 rounded-2xl border border-transparent transition"
                        >
                            Load More Requests...
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}