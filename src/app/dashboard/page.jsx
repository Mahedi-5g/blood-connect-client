'use client'
import { useSession } from "@/lib/auth-client";
import React from "react";
const DonorDashboardPage = () => {
      const {data:session,isPending}=useSession()

      if(isPending){
        return <div>Loading...</div>
      }

      const user = session?.user;

    return (
       

        <div className="p-5">
            <h1 className="text-3xl font-semibold">
                Welcome back,<span className="text-rose-500 text-4xl font-bold">{user?.name}</span>
            </h1>
        </div>
    );
};

export default DonorDashboardPage;