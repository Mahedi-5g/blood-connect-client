import React from 'react';
import UserRow from './UserRow';

const UsersTable = ({ users, refetch }) => {
    if (users.length === 0) {
        return <div className="text-center p-8 text-gray-500">No users found.</div>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">#</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">Avatar</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">Name</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">Email</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">Role</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-gray-500">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                        <UserRow 
                            key={user._id} 
                            user={user} 
                            index={index} 
                            refetch={refetch} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;