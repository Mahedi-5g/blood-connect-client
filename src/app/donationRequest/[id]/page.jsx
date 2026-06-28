"use client";

import PrivateRoute from '@/components/PrivateRoute';
import { authClient } from '@/lib/auth-client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegLightbulb } from 'react-icons/fa6';

const DonationDetailsPage = () => {
    const params = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = authClient.useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("");

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await fetch(`http://localhost:5000/requests/${params.id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch request");
                }

                const data = await res.json();
                setRequest(data);
                setCurrentStatus(data.status);

            } catch (error) {
                console.error(error);
                toast.error("Error loading request details");
            } finally {
                setLoading(false);
            }
        };

        if (params?.id) {
            fetchRequest();
        }
    }, [params.id]);


    const handleConfirmDonation = async (e) => {
        e.preventDefault();
        if (!session?.user) return;

        setSubmitting(true);
        try {
            const res = await fetch(`http://localhost:5000/requests/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    donorName: session.user.name,
                    donorEmail: session.user.email,
                    status: "inprogress",
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            setCurrentStatus("inprogress");
            setIsOpen(false);
            toast.success(
                "Thank you! You have committed to this blood donation. Status updated to 'In Progress'."
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to confirm donation. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

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
        <PrivateRoute>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

                    <div className="bg-linear-to-r from-red-600 to-rose-700 px-8 py-10 text-white relative">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <div>
                                <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
                                    Emergency Request
                                </span>
                                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                    <span className='text-slate-200'>Blood Needed for </span>
                                    {request?.recipientName}
                                </h1>
                                <p className="mt-2 text-rose-100 font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
                                    Status: <span className="uppercase tracking-wider font-bold">{currentStatus}</span>
                                </p>
                            </div>

                            <div className="bg-white text-red-600 rounded-2xl p-4 flex flex-col items-center justify-center w-24 h-24 shadow-md border border-red-100">
                                <span className="text-2xl font-black">{request?.bloodGroup}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Group</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Date & Time</p>
                                <p className="text-lg font-semibold text-slate-800">{request?.donationDate}</p>
                                <p className="text-sm text-slate-600">{request?.donationTime}</p>
                            </div>

                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Medical Facility</p>
                                <p className="text-lg font-semibold text-slate-800">{request?.hospitalName}</p>
                                <p className="text-sm text-slate-600">{request?.fullAddress}</p>
                            </div>

                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Location Area</p>
                                <p className="text-lg font-semibold text-slate-800">{request?.recipientUpazila}, {request?.recipientDistrict}</p>
                            </div>

                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Requester Contact</p>
                                <p className="text-lg font-semibold text-slate-800">{request?.requesterName}</p>
                                <p className="text-sm text-slate-600">{request?.requesterEmail}</p>
                            </div>
                        </div>

                        <hr className="border-slate-100" />
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Case Description / Message</h3>
                            <blockquote className="border-l-4 border-red-500 bg-red-50/50 p-4 rounded-r-xl text-slate-700 italic leading-relaxed">
                                "{request?.requestMessage}"
                            </blockquote>
                        </div>

                        <div className="pt-4 flex justify-end">
                            {currentStatus === "pending" ? (
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Donate Blood Now
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="w-full sm:w-auto bg-slate-200 text-slate-400 font-bold px-8 py-3.5 rounded-xl cursor-not-allowed"
                                >
                                    Donation In Progress
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsOpen(false)}
                        ></div>

                        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative z-10 overflow-hidden transform transition-all border border-slate-100">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-slate-800">Confirm Your Donation</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 text-xl font-semibold transition"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleConfirmDonation} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Donor Name (Read Only)
                                    </label>
                                    <input
                                        type="text"
                                        value={session?.user?.name || ""}
                                        readOnly
                                        className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium focus:outline-none cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Donor Email (Read Only)
                                    </label>
                                    <input
                                        type="email"
                                        value={session?.user?.email || ""}
                                        readOnly
                                        className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium focus:outline-none cursor-not-allowed"
                                    />
                                </div>

                                <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-100 flex gap-3">
                                    <span className="text-rose-600 text-lg"><FaRegLightbulb /></span>
                                    <p className="text-xs text-rose-700 leading-relaxed">
                                        By clicking confirm, you accept responsibility to reach <strong>{request?.hospitalName}</strong> on <strong>{request?.donationDate}</strong> at <strong>{request?.donationTime}</strong>.
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-xl transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md shadow-red-600/10 transition disabled:bg-slate-400"
                                    >
                                        {submitting ? "Confirming..." : "Confirm Donation"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
};

export default DonationDetailsPage;