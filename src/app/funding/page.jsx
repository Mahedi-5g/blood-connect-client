'use client';

import React, { useState, useEffect } from 'react';
import { HeartHandshake, PlusCircle, Search, ShieldCheck } from 'lucide-react';
import PaginationPage from '@/components/Pagination';
import CheckoutModal from '@/components/CheckoutModal';

export default function FundingPage() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchFunds = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/funds', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        setFunds(data);
      }
    } catch (err) {
      console.error('Error fetching funds:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  // Pagination Calculation
  const totalPages = Math.ceil(funds.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFunds = funds.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-red-50 text-red-600 rounded-xl">
              <HeartHandshake className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Organization Funding
            </h1>
          </div>
          <p className="text-sm text-slate-500 font-medium pl-10">
            View all public contributions or make a donation to support medical aid and blood drives.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/20 transition duration-150 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Give Fund
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-100 overflow-hidden space-y-4">
        <div className="p-6 pb-2 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Donor History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-y border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Donor Details</th>
                <th className="p-4">Fund Amount</th>
                <th className="p-4">Funding Date</th>
                <th className="p-4 pr-6">Transaction Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-slate-400">
                    Loading funds history...
                  </td>
                </tr>
              ) : currentFunds.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-slate-400">
                    No funding records available.
                  </td>
                </tr>
              ) : (
                currentFunds.map((fund) => (
                  <tr key={fund._id || fund.transactionId} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-slate-800">{fund.userName}</div>
                      <div className="text-xs text-slate-400 font-normal">{fund.userEmail}</div>
                    </td>
                    <td className="p-4 font-black text-emerald-600">
                      ${parseFloat(fund.amount || 0).toFixed(2)}
                    </td>
                    <td className="p-4 text-slate-600">
                      {new Date(fund.fundDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 pr-6">
                      <span className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200/50">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        {fund.transactionId}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100">
            <PaginationPage
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}