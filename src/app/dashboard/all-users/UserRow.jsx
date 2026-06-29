import React from 'react';
import ActionDropdown from './ActionDropdown';
import Image from 'next/image';

const UserRow = ({ user, index, refetch }) => {
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
            <td className="px-6 py-4">
                <img
                    src={user.image || "https://via.placeholder.com/150"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                />
            </td>
            <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
            <td className="px-6 py-4 text-sm">
                {/* Role Badge */}
                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'volunteer' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.role}
                </span>
            </td>
            <td className="px-6 py-4 text-sm">
                {/* Status Badge */}
                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                </span>
            </td>
            <td className="px-6 py-4 text-right text-sm font-medium">
                <ActionDropdown user={user} refetch={refetch} />
            </td>
        </tr>
    );
};

export default UserRow;