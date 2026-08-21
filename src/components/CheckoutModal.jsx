'use client';

import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const CheckoutModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;


  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const { data: tokenData } = await authClient.token();

        if (!tokenData?.token) {
            throw new Error("Authentication token not found");
        }

        const res = await fetch("/api/checkout-sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData.token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data?.error || "Failed to create checkout session"
            );
        }

        if (data.url) {
            window.location.href = data.url;
        } else {
            throw new Error("Checkout URL not found");
        }

    } catch (err) {
        console.error("Checkout error:", err);
        toast.error(err.message || "Something went wrong");
        setLoading(false);
    }
};

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
        
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-black text-slate-800">Donate to Save Lives</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleDonate} className="space-y-4">
          <p className="text-sm text-slate-600">
            You will be redirected to Stripe to securely complete your payment.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 text-sm font-bold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
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