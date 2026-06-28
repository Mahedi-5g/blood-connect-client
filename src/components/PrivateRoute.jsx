"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

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
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!session?.user) return null;

    return children;
}