"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Edit, Trash2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function DonationRequestsTable({ requests, onStatusChange, onDeleteSuccess }) {
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`http://localhost:5000/requests/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete request");
      
      onDeleteSuccess(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider">
                <th className="p-4 pl-6">Recipient Name</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Location</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Donor Info</th>
                <th className="p-4 pr-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 pl-6 font-bold text-slate-900">{request.recipientName}</td>
                  <td className="p-4">
                    <span className="inline-block bg-red-50 text-red-600 font-black px-2.5 py-1 rounded-md text-xs">
                      {request.bloodGroup}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </td>
                  <td className="p-4 text-xs">
                    <div>{request.donationDate}</div>
                    <div className="text-slate-400 mt-0.5">{request.donationTime}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider
                      ${request.status === "pending" ? "bg-amber-50 text-amber-600" : ""}
                      ${request.status === "inprogress" ? "bg-blue-50 text-blue-600" : ""}
                      ${request.status === "done" ? "bg-green-50 text-green-600" : ""}
                      ${request.status === "canceled" ? "bg-rose-50 text-rose-600" : ""}
                    `}>
                      {request.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs max-w-40 truncate">
                    {request.status === "inprogress" && request.donorName ? (
                      <div>
                        <p className="font-bold text-slate-800">{request.donorName}</p>
                        <p className="text-slate-400 truncate">{request.donorEmail}</p>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic font-normal">—</span>
                    )}
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-center gap-2">
                      {request.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => onStatusChange(request._id, "done")}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Mark as Done"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onStatusChange(request._id, "canceled")}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Mark as Canceled"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <Link
                        href={`/donationRequest/${request._id}`}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/edit-request/${request._id}`}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(request._id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative z-10 p-6 text-center space-y-4 border border-slate-100">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Are you absolutely sure?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This action cannot be undone. This will permanently delete your blood donation request.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}