'use client'; // এটি অবশ্যই দিতে হবে যেহেতু প্রোভাইডার ক্লায়েন্ট সাইড স্টেট মেইনটেইন করে

import DashboardSidebar from '@/components/DashboardSidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="dashboard-layout">
        <DashboardSidebar />
        <main className="p-4">{children}</main>
      </div>
    </QueryClientProvider>
  );
}

