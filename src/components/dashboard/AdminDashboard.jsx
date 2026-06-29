"use client";

import React, { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react"; // 🎯 CardBody বাদ দেওয়া হয়েছে
import { FiUsers, FiDollarSign } from "react-icons/fi";
import { BiDonateBlood } from "react-icons/bi";

export default function AdminVolunteerDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, totalFunding: 0, totalRequests: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/admin/stats")
            .then((res) => res.json())
            .then((data) => {
                setStats({
                    totalUsers: data.totalUsers || 0,
                    totalFunding: data.totalFunding || 0,
                    totalRequests: data.totalRequests || 0,
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching stats:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-8">
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Spinner color="danger" label="Loading statistics..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* কার্ড ১: Total Donors */}
                    <Card className="border-none shadow-sm bg-white rounded-2xl hover:scale-[1.02] transition-transform p-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl text-3xl"><FiUsers /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Donors</p>
                                <h3 className="text-3xl font-black text-slate-800 mt-1">{stats.totalUsers.toLocaleString()}</h3>
                            </div>
                        </div>
                    </Card>

                    {/* কার্ড ২: Total Funding */}
                    <Card className="border-none shadow-sm bg-white rounded-2xl hover:scale-[1.02] transition-transform p-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl text-3xl"><FiDollarSign /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Funding</p>
                                <h3 className="text-3xl font-black text-slate-800 mt-1">${stats.totalFunding.toLocaleString()}</h3>
                            </div>
                        </div>
                    </Card>

                    {/* কার্ড ৩: Blood Requests */}
                    <Card className="border-none shadow-sm bg-white rounded-2xl hover:scale-[1.02] transition-transform p-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-3xl"><BiDonateBlood /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blood Requests</p>
                                <h3 className="text-3xl font-black text-slate-800 mt-1">{stats.totalRequests.toLocaleString()}</h3>
                            </div>
                        </div>
                    </Card>

                </div>
            )}
        </div>
    );
}