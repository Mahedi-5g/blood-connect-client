'use client';

import React from 'react';

const FilterStatus = ({ filterStatus, setfilterStatus }) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter STATUS:</span>
            <select
                value={filterStatus}
                onChange={(e) => setfilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-red-500 transition shadow-xs"
            >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
            </select>
        </div>
    );
};

export default FilterStatus;