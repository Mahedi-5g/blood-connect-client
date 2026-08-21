import { redirect } from 'next/navigation';
import { stripe } from '../../../lib/stripe';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) {
    redirect('/funding');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['payment_intent'],
  });

  if (session.status !== 'complete') {
    redirect('/funding');
  }

  const customerName = session.customer_details?.name || 'Anonymous Donor';
  const customerEmail = session.customer_details?.email || 'N/A';
  const amountPaid = session.amount_total / 100; // Cents to USD
  const transactionId = session.payment_intent?.id || session.id;

  try {
    const {data:tokenData} = await authClient.token();
    await fetch('http://localhost:5000/api/funds', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'authorization': `Bearer ${tokenData?.token}`
       },
      body: JSON.stringify({
        userName: customerName,
        userEmail: customerEmail,
        amount: amountPaid,
        transactionId: transactionId,
        fundDate: new Date().toISOString(),
      }),
      cache: 'no-store',
    });
  } catch (err) {
    console.error('Failed to save funding data:', err);
  }

  return (
    <div className="min-h-[65vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-black text-slate-800">Donation Successful!</h1>
        <p className="text-sm text-slate-600">
          Thank you <span className="font-semibold text-slate-800">{customerName}</span> for donating{' '}
          <span className="font-bold text-emerald-600">${amountPaid.toFixed(2)}</span>.
        </p>
        <p className="text-xs text-slate-400 font-mono">Txn ID: {transactionId}</p>

        <Link
          href="/funding"
          className="inline-block w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-md transition"
        >
          View All Donors on Funding Page
        </Link>
      </div>
    </div>
  );
}