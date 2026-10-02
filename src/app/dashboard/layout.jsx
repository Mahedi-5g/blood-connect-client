'use client'; 

import DashboardSidebar from '@/components/DashboardSidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="dashboard-layout flex min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-6 pt-20 lg:pt-6">{children}</main>
      </div>
    </QueryClientProvider>
  );
}

