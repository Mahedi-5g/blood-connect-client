'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const CheckoutModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDonate = async (e) => {
    e.preventDefault();

    const donationAmount = Number(amount);

    if (!donationAmount || donationAmount <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch("http://localhost:5000/api/checkout-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({ amount: donationAmount }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
        
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-black text-slate-800">Donate to Save Lives</h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleDonate} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-bold text-slate-700 mb-1">
              Donation Amount ($USD)
            </label>
            <input
              id="amount"
              type="number"
              min="1"
              step="any"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (e.g. 20)"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800"
            />
          </div>

          <p className="text-xs text-slate-500">
            You will be redirected to Stripe to securely complete your payment.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 text-sm font-bold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-3 text-sm font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg disabled:opacity-50 transition flex items-center justify-center"
            >
              {loading ? 'Processing...' : 'Proceed to Pay'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;