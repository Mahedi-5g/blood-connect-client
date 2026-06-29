import React from 'react';

const StatusFilter = ({ status, setStatus }) => {
    return (
        <div className="mb-4 flex items-center gap-2">
            <span className="font-medium text-gray-700">Filter by Status:</span>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
            </select>
        </div>
    );
};

export default StatusFilter;