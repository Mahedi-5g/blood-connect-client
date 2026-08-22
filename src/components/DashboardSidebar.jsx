"use client";
import React from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  ArrowRightFromSquare,
  House,
  Person,
  Persons,
} from "@gravity-ui/icons";

import {
  Avatar,
  Button,
} from "@heroui/react";
import { BiDonateBlood } from "react-icons/bi";
import { LuGitPullRequestCreate } from "react-icons/lu";
import { MdOutlineDashboard, MdOutlinePlaylistPlay } from 'react-icons/md';
import Image from 'next/image';

const DashboardSidebar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const userRole = session?.user?.role?.toLowerCase() || "donor";

  const getLinkClass = (href) => {
    const isActive = pathname === href;
    return `flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${
      isActive
        ? "bg-red-500 text-white shadow-md shadow-red-500/20"
        : "text-slate-600 hover:bg-red-50 hover:text-red-600"
    }`;
  };

  const getIconClass = (href) => {
    return `size-5 ${pathname === href ? "text-white" : "text-slate-500 group-hover:text-red-600"}`;
  };

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col h-screen sticky top-0 shrink-0">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Top Home Button */}
        <div className="p-5 pb-2">
          <Link href="/" className={`${getLinkClass("/")} group`}>
            <House className={getIconClass("/")} />
            <span>Home</span>
          </Link>
        </div>

        <div className="p-5 pt-2">
          {/* Main Menu Section */}
          <div className="mb-8">
            <p className="text-xs tracking-[5px] text-slate-400 mb-4 font-bold">
              MAIN MENU
            </p>

            <div className="space-y-1.5">
              <Link href="/dashboard" className={`${getLinkClass("/dashboard")} group`}>
                <MdOutlineDashboard className={getIconClass("/dashboard")} />
                <span>Dashboard</span>
              </Link>

              <Link href="/dashboard/profile" className={`${getLinkClass("/dashboard/profile")} group`}>
                <Person className={getIconClass("/dashboard/profile")} />
                <span>My Profile</span>
              </Link>

              {/* Only Admin */}
              {userRole === "admin" && (
                <Link href="/dashboard/all-users" className={`${getLinkClass("/dashboard/all-users")} group`}>
                  <Persons className={getIconClass("/dashboard/all-users")} />
                  <span>All Users</span>
                </Link>
              )}
            </div>
          </div>

          {/* Donations Section - Role Based */}
          <div>
            <p className="text-xs tracking-[5px] text-slate-400 mb-4 font-bold">
              DONATIONS
            </p>

            <div className="space-y-1.5">
              {/* Donor Menu */}
              {userRole === "donor" && (
                <>
                  <Link href="/dashboard/my-request" className={`${getLinkClass("/dashboard/my-request")} group`}>
                    <BiDonateBlood className={getIconClass("/dashboard/my-request")} />
                    <span>My Request</span>
                  </Link>

                  <Link href="/dashboard/create-donation-request" className={`${getLinkClass("/dashboard/create-donation-request")} group`}>
                    <LuGitPullRequestCreate className={getIconClass("/dashboard/create-donation-request")} />
                    <span>Create Request</span>
                  </Link>
                </>
              )}

              {/* Volunteer and Admin */}
              {(userRole === "volunteer" || userRole === "admin") && (
                <Link href="/dashboard/all-donation-requests" className={`${getLinkClass("/dashboard/all-donation-requests")} group`}>
                  <MdOutlinePlaylistPlay className={getIconClass("/dashboard/all-donation-requests")} />
                  <span>All Requests</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Profile & Logout */}
      <div className="border-t p-5 bg-slate-50/50 shrink-0">
        <div className="flex items-center gap-3 mb-5">
          <Avatar className="w-10 h-10 border-2 rounded-full border-red-200 shrink-0">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session?.user?.name || "User"}
                height={40}
                width={40}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="font-semibold text-red-600">
                {session?.user?.name?.charAt(0) || "U"}
              </span>
            )}
          </Avatar>

          <div className="overflow-hidden min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-sm text-slate-800 truncate">
                {session?.user?.name || "User"}
              </p>
              <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded uppercase shrink-0">
                {userRole}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <Button
          color="danger"
          variant="flat"
          className="w-full text-red-600 bg-red-50 hover:bg-red-100 font-semibold"
          onPress={async () => {
            await authClient.signOut();
            router.push("/");
          }}
        >
          <ArrowRightFromSquare className="size-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;