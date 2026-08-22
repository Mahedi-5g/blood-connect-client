"use client";

import React, { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import { FiUsers, FiDollarSign } from "react-icons/fi";
import { BiDonateBlood } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";

export default function AdminVolunteerDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, totalFunding: 0, totalRequests: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: tokenData } = await authClient.token();
                const res = await fetch("http://localhost:5000/admin/stats", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch admin stats");
                }

                const data = await res.json();
                setStats({
                    totalUsers: data.totalUsers || 0,
                    totalFunding: data.totalFunding || 0,
                    totalRequests: data.totalRequests || 0,
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Spinner color="danger" label="Loading statistics..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Total Donors */}
                    <Card className="border-none shadow-sm bg-white rounded-2xl hover:scale-[1.02] transition-transform p-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl text-3xl"><FiUsers /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Donors</p>
                                <h3 className="text-3xl font-black text-slate-800 mt-1">{stats.totalUsers.toLocaleString()}</h3>
                            </div>
                        </div>
                    </Card>

                    {/*  Total Funding */}
                    <Card className="border-none shadow-sm bg-white rounded-2xl hover:scale-[1.02] transition-transform p-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl text-3xl"><FiDollarSign /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Funding</p>
                                <h3 className="text-3xl font-black text-slate-800 mt-1">${stats.totalFunding.toLocaleString()}</h3>
                            </div>
                        </div>
                    </Card>

                    {/* Blood Requests */}
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