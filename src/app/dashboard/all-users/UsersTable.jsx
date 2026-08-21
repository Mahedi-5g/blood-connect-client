'use client';

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MoreVertical, ShieldCheck, UserCheck, Lock, Unlock } from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const UsersTable = ({ users, refetch }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleAction = async (userId, updateData, successMessage) => {
        try {
            const {data:tokenData} = await authClient.token();
            const res = await axios.patch(`http://localhost:5000/users/update-role-status/${userId}`,{
                headers: {
                        "Content-Type": "application/json",
                        "authorization":`Bearer ${tokenData?.token}`
                    },
            }, updateData);
            if (res.data.modifiedCount > 0 || res.data.acknowledged) {
                toast.success(successMessage);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to perform action');
        } finally {
            setOpenMenuId(null);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <th className="p-4">User</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-8 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50 transition">
                                    {/* Avatar & Name */}
                                    <td className="p-4 flex items-center gap-3">
                                        <Image
                                            src={user.avatar || user.image || "https://i.ibb.co/mR4qB81/user.png"}
                                            alt={user.name}
                                            height={40}
                                            width={40}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                        <span className="font-semibold text-gray-800">{user.name}</span>
                                    </td>

                                    {/* Email */}
                                    <td className="p-4 text-gray-600">{user.email}</td>

                                    {/* Role */}
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'volunteer' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                                            user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>

                                    {/* Action Dropdown Menu */}
                                    <td className="p-4 text-center relative">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === user._id ? null : user._id)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition"
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-500" />
                                        </button>

                                        {openMenuId === user._id && (
                                            <div className="absolute right-4 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 text-left py-2">
                                                
                                                {/* Block / Unblock Action */}
                                                {user.status === 'active' ? (
                                                    <button
                                                        onClick={() => handleAction(user._id, { status: 'blocked' }, 'User blocked successfully')}
                                                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Lock className="w-4 h-4" /> Block User
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAction(user._id, { status: 'active' }, 'User unblocked successfully')}
                                                        className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                                                    >
                                                        <Unlock className="w-4 h-4" /> Unblock User
                                                    </button>
                                                )}

                                                {/* Make Volunteer Action */}
                                                {user.role === 'donor' && (
                                                    <button
                                                        onClick={() => handleAction(user._id, { role: 'volunteer' }, 'User is now a Volunteer')}
                                                        className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                                                    >
                                                        <UserCheck className="w-4 h-4" /> Make Volunteer
                                                    </button>
                                                )}

                                                {/* Make Admin Action */}
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleAction(user._id, { role: 'admin' }, 'User is now an Admin')}
                                                        className="w-full px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 flex items-center gap-2"
                                                    >
                                                        <ShieldCheck className="w-4 h-4" /> Make Admin
                                                    </button>
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

export default UsersTable;