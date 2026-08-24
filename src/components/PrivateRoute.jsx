"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";

export default function PrivateRoute({ children }) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace(`/auth/signup?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [session, isPending, pathname, router]);

    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                    <LoadingAnimation></LoadingAnimation>
                </div>
        );
    }

    if (!session?.user) return null;

    return children;
}