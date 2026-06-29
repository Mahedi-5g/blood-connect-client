import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // টোস্ট এবং কনফার্মেশনের জন্য

const ActionDropdown = ({ user, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // অ্যাকশন হ্যান্ডলার ফাংশন
    const handleAction = async (url, body, successMessage) => {
        setIsOpen(false);
        
        // কনফার্মেশন অ্যালার্ট
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to proceed with this action?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!'
        });

        if (!confirm.isConfirmed) return;

        try {
            setLoading(true);
            const res = await axios.patch(`http://localhost:5000${url}`, body);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Success!', successMessage, 'success');
                refetch(); // ডাটা রিফেচ করা হচ্ছে
            }
        } catch (error) {
            Swal.fire('Error!', 'Something went wrong.', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
                className="p-1 rounded-full hover:bg-gray-200 focus:outline-none disabled:opacity-50"
            >
                svg 🟢 {/* আপনি এখানে তিন ডট আইকন বসাতে পারেন */}
                <span className="font-bold text-lg">⋮</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
                    {/* Status Rules */}
                    {user.status === 'active' && (
                        <button
                            onClick={() => handleAction(`/users/status/${user._id}`, { status: 'blocked' }, 'User has been blocked.')}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            Block User
                        </button>
                    )}
                    {user.status === 'blocked' && (
                        <button
                            onClick={() => handleAction(`/users/status/${user._id}`, { status: 'active' }, 'User has been unblocked.')}
                            className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                        >
                            Unblock User
                        </button>
                    )}

                    {/* Role Rules */}
                    {user.role === 'donor' && (
                        <>
                            <button
                                onClick={() => handleAction(`/users/role/${user._id}`, { role: 'volunteer' }, 'User is now a volunteer.')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Make Volunteer
                            </button>
                            <button
                                onClick={() => handleAction(`/users/role/${user._id}`, { role: 'admin' }, 'User is now an admin.')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Make Admin
                            </button>
                        </>
                    )}

                    {user.role === 'volunteer' && (
                        <button
                            onClick={() => handleAction(`/users/role/${user._id}`, { role: 'admin' }, 'User is now an admin.')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Make Admin
                        </button>
                    )}

                    {user.role === 'admin' && (
                        <span className="block px-4 py-2 text-xs text-gray-400 italic">No actions available</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionDropdown;