'use client';

import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // 🔹 মডালের ভেতরে handleDonate / handleSubmit হিসেবে বসান
  const handleDonate = async (e) => {
    e.preventDefault(); // Form submit refresh আটকানোর জন্য
    setLoading(true);

    try {
      const res = await fetch('/api/checkout_sessions', { method: 'POST' });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('Checkout error:', data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
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

        {/* 🔹 Form-এর onSubmit-এ handleDonate জুড়ে দিন */}
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