"use client"
import React from 'react';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import {
    ArrowRightFromSquare,
    House,
    Person,
} from "@gravity-ui/icons";

import {
    Avatar,
    Button,
} from "@heroui/react";
import { BiDonateBlood } from "react-icons/bi";
import { LuGitPullRequestCreate } from "react-icons/lu";
import { MdOutlineDashboard } from 'react-icons/md';


const DashboardSidebar = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const pathname = usePathname();

    const getLinkClass = (href) => {
        const isActive = pathname === href;
        return `flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${isActive
            ? "bg-red-500 text-white shadow-md shadow-red-500/20" 
            : "text-slate-600 hover:bg-red-50 hover:text-red-600" 
            }`;
    };

    const getIconClass = (href) => {
        return `size-5 ${pathname === href ? "text-white" : "text-slate-500 group-hover:text-red-600"}`;
    };
    return (
        <div>
            <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between h-screen">
                <div>
                    <Link href="/" className={`${getLinkClass("/")} group`}>
                        <House className={getIconClass("/")} />
                        <span>Home</span>
                    </Link>
                </div>

                <div className="p-5 pt-2">
                    {/* Main Menu */}
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
                        </div>
                    </div>

                    {/* Donation */}
                    <div>
                        <p className="text-xs tracking-[5px] text-slate-400 mb-4 font-bold">
                            DONATIONS
                        </p>

                        <div className="space-y-1.5">
                            <Link href="/dashboard/my-request" className={`${getLinkClass("/dashboard/my-request")} group`}>
                                <BiDonateBlood className={getIconClass("/dashboard/my-request")} />
                                <span>My Request</span>
                            </Link>

                            <Link href="/dashboard/create-donation-request" className={`${getLinkClass("/dashboard/create-donation-request")} group`}>
                                <LuGitPullRequestCreate className={getIconClass("/dashboard/create-donation-request")} />
                                <span>Create Request</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Profile & Logout */}
                <div className="border-t p-5 bg-slate-50/50">
                    <div className="flex items-center gap-3 mb-5">
                        <Avatar size="sm" isBordered color="danger">
                            <Avatar.Image
                                src={session?.user?.image || "/default-avatar.png"}
                                alt={session?.user?.name || "User"}
                            />
                            <Avatar.Fallback>
                                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                            </Avatar.Fallback>
                        </Avatar>

                        <div className="overflow-hidden">
                            <p className="font-semibold text-sm text-slate-800 truncate">
                                {session?.user?.name || "Loading..."}
                            </p>
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
        </div>
    );
};

export default DashboardSidebar;