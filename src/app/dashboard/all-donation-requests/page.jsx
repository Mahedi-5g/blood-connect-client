'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RequestsTable from './RequestsTable';
import FilterStatus from './FilterStatus';

const AllBloodDonationRequests = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const { data: requests = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['all-blood-donation-requests', filterStatus],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/all-requests?status=${filterStatus}`);
            return res.data;
        },
    });

    const handleStatusChange = (status) => {
        setFilterStatus(status);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(requests.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        All Blood Donation Requests 🩸
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Manage and review blood donation requests from all users.
                    </p>
                </div>

                <FilterStatus filterStatus={filterStatus} setfilterStatus={handleStatusChange} />
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
                    <span className="ml-3 text-slate-600 font-semibold">Loading requests...</span>
                </div>
            ) : isError ? (
                <div className="text-red-500 text-center p-4 bg-red-50 rounded-xl font-medium">
                    Failed to fetch donation requests. Please try again.
                </div>
            ) : (
                <>
                    <RequestsTable requests={currentRequests} refetch={refetch} />

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 pt-4">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${currentPage === page
                                            ? 'bg-red-600 text-white shadow-md'
                                            : 'bg-white border text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllBloodDonationRequests;