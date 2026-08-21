'use client'; 

import DashboardSidebar from '@/components/DashboardSidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="dashboard-layout flex">
        <DashboardSidebar />
        <main className="p-4">{children}</main>
      </div>
    </QueryClientProvider>
  );
}

