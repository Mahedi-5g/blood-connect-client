'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { MoreVertical, Eye, Edit3, Trash2, CheckCircle2, XCircle } from 'lucide-react';

const RequestsTable = ({ requests, refetch, role }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    // ১. Status Update Handler (Admin & Volunteer both can access)
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.patch(`http://localhost:5000/requests/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                toast.success(`Request status updated to ${newStatus}`);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to update status');
        } finally {
            setOpenMenuId(null);
        }
    };

    // ২. Delete Request Handler (Only Admin)
    const handleDelete = async (id) => {
        setOpenMenuId(null);
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this donation request!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`http://localhost:5000/requests/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success('Donation request deleted successfully');
                    refetch();
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete request');
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <th className="p-4">Recipient</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Date & Time</th>
                            <th className="p-4">Blood Group</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-8 text-slate-500">
                                    No blood donation requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id} className="hover:bg-slate-50/60 transition">
                                    {/* Recipient Info */}
                                    <td className="p-4">
                                        <div className="font-bold text-slate-800">{req.recipientName}</div>
                                        <div className="text-xs text-slate-400 font-normal">{req.requesterEmail}</div>
                                    </td>

                                    {/* Location */}
                                    <td className="p-4">
                                        <div>{req.recipientUpazila}, {req.recipientDistrict}</div>
                                        <div className="text-xs text-slate-400 font-normal">{req.hospitalName}</div>
                                    </td>

                                    {/* Date & Time */}
                                    <td className="p-4">
                                        <div>{req.donationDate}</div>
                                        <div className="text-xs text-slate-400 font-normal">{req.donationTime}</div>
                                    </td>

                                    {/* Blood Group */}
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 text-xs font-black bg-red-100 text-red-600 rounded-lg">
                                            {req.bloodGroup}
                                        </span>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                                            req.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                            req.status === 'inprogress' ? 'bg-blue-100 text-blue-700' :
                                            req.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                                            'bg-rose-100 text-rose-700'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>

                                    {/* Action Menu */}
                                    <td className="p-4 text-center relative">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === req._id ? null : req._id)}
                                            className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>

                                        {openMenuId === req._id && (
                                            <div className="absolute right-4 mt-1 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-30 text-left py-2 space-y-1">
                                                
                                                {/* In-progress থাকলে Done / Cancel করার সুযোগ (Volunteer & Admin both can update status) */}
                                                {req.status === 'inprogress' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusChange(req._id, 'done')}
                                                            className="w-full px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" /> Mark as Done
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(req._id, 'canceled')}
                                                            className="w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                                        >
                                                            <XCircle className="w-4 h-4" /> Cancel Request
                                                        </button>
                                                    </>
                                                )}

                                                {/* View Details Link (Available for all) */}
                                                <Link
                                                    href={`/donation-requests/${req._id}`}
                                                    className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                                                >
                                                    <Eye className="w-4 h-4" /> View Details
                                                </Link>

                                                {/* ONLY ADMIN CAN EDIT AND DELETE */}
                                                {role === 'admin' && (
                                                    <>
                                                        <Link
                                                            href={`/dashboard/edit-donation-request/${req._id}`}
                                                            className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <Edit3 className="w-4 h-4 text-slate-500" /> Edit Request
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(req._id)}
                                                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100 mt-1 pt-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Delete Request
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestsTable;