"use client";

import { Button } from "@heroui/react";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecentBloodRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("http://localhost:5000/featured-requests");

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
        <section className="py-24 bg-[#fbf9f4]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-black tracking-tight">
                        Recent Blood Requests
                    </h2>
                    <p className="mt-3 text-base text-gray-700 font-medium">
                        Help patients by responding to urgent blood requests.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {requests.map((request, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100/50 relative flex flex-col pt-0 pb-7 px-7 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Two-tone Header background effect */}
                            <div className="absolute top-0 left-0 right-0 h-28 bg-[#f9ebe0]/60 z-0" />

                            {/* Card Content Top wrapper to layer over absolute bg */}
                            <div className="relative z-10 w-full pt-6">
                                {/* Status Header Badge */}
                                <div className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider text-[#c05621] uppercase">
                                    <span className="w-2 h-2 rounded-full bg-[#e65100]" />
                                    {request.status}
                                </div>

                                {/* Floating Blood Type Badge */}
                                <div className="mt-4 w-16 h-16 bg-white rounded-2xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] flex items-center justify-center border border-gray-50">
                                    <span className="text-2xl font-black text-[#b71c1c]">
                                        {request.bloodGroup}
                                    </span>
                                </div>

                                {/* Recipient Name & Tag */}
                                <div className="text-center mt-6">
                                    <h3 className="text-lg font-black text-black tracking-wide uppercase">
                                        {request.recipientName}
                                    </h3>
                                    <span className="text-[10px] font-extrabold text-gray-400 tracking-widest uppercase block mt-1">
                                        RECIPIENT
                                    </span>
                                </div>

                                {/* Details Fields */}
                                <div className="mt-8 space-y-4 px-1">
                                    {/* Location Field */}
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

                                    {/* Date & Time Field */}
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

                                {/* Action Button */}
                                <Link href={`/donationRequest/${request._id}`}>
                                    <Button
                                        className="w-full mt-8 bg-[#e65100] text-white font-bold text-sm h-12 rounded-2xl shadow-[0_6px_20px_rgba(230,81,0,0.3)] hover:bg-[#d84315]"
                                        endContent={<span className="text-lg font-light">→</span>}
                                    >
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Button Section */}
                <div className="text-center mt-14">
                    <Link href="/donationRequest">
                        <Button
                            className="bg-[#f0e4d7] hover:bg-[#e8dacb] text-black font-bold text-xs tracking-wider px-8 h-12 rounded-2xl border border-transparent transition"
                        >
                            View All Requests
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}