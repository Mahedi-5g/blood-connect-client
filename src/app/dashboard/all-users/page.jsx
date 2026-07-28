'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import StatusFilter from './StatusFilter';
import UsersTable from './UsersTable';

const AllUsersPage = () => {
    const [status, setStatus] = useState('all');

    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users', status],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users?status=${status}`);
            return res.data;
        },
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">All Users 👤</h1>
            
            <StatusFilter status={status} setStatus={setStatus} />

           
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600">Loading users...</span>
                </div>
            ) : isError ? (
                <div className="text-red-500 text-center p-4 bg-red-50 rounded">
                    Failed to fetch users. Please try again.
                </div>
            ) : (
                
                <UsersTable users={users} refetch={refetch} />
            )}
        </div>
    );
};

export default AllUsersPage;