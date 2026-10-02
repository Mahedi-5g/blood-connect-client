'use client'
import { useState } from "react";
import { Link, Button, Label } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Dropdown } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, House, Person } from "@gravity-ui/icons";
import { ThemeToggle } from "@/components/ThemeToggle";

function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const guestLinks = [
        { name: "Home", href: "/" },
        { name: "Donation Request", href: "/donationRequest" },
        { name: "Search Donor", href: "/search-donor" },
    ];

    const userLinks = [
        { name: "Donation Request", href: "/donationRequest" },
        { name: "Search Donor", href: "/search-donor" },
        { name: "Funding", href: "/funding" },
    ];
    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-40 w-full h-20 border-b border-red-200/80 dark:border-slate-800 bg-linear-to-r from-red-100/90 via-white/90 to-rose-100/90 dark:from-slate-950/95 dark:via-neutral-900/95 dark:to-slate-950/95 backdrop-blur-lg transition-colors">
            <header className="flex h-20 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <div>
                        <Link href={"/"}>

                            <Image
                                src={"/BloodLogo.jpeg"}
                                alt="logo"
                                width={55}
                                height={55}
                                className="object-cover rounded-3xl"
                            />

                        </Link>
                    </div>
                    <div>
                        <Link href={"/"}>
                            <div>
                                <h1 className="text-2xl font-bold bg-linear-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                                    BloodConnect
                                </h1>
                                <p className="text-xs text-default-500">
                                    Save Lives Together
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <ul className="hidden items-center gap-6 md:flex">
                    {(session?.user ? userLinks : guestLinks).map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}
                                className={`font-semibold transition-colors ${pathname === item.href
                                    ? "text-red-500 dark:text-red-400"
                                    : "text-gray-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400"
                                    }`}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <ul className="hidden items-center gap-4 md:flex">
                        {session?.user ? (
                            <Dropdown placement="bottom-end">
                                <Dropdown.Trigger>
                                    <div className="cursor-pointer">
                                        <Avatar className="ring-2 ring-red-200 dark:ring-red-900/60 hover:ring-red-400 transition">
                                            <Avatar.Image
                                                src={session?.user?.image || "/default-avatar.png"}
                                                alt={session?.user?.name || "User"}
                                            />
                                            <Avatar.Fallback>
                                                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                                            </Avatar.Fallback>
                                        </Avatar>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Popover className="w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-xl">
                                    <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <Avatar size="sm">
                                                <Avatar.Image
                                                    src={session?.user?.image || "/default-avatar.png"}
                                                    alt={session?.user?.name}
                                                />
                                                <Avatar.Fallback>
                                                    {session?.user?.name?.charAt(0).toUpperCase()}
                                                </Avatar.Fallback>
                                            </Avatar>

                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {session?.user?.name}
                                                </p>

                                                <p className="text-xs text-default-500">
                                                    {session?.user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            id="dashboard"
                                            onAction={() => router.push("/dashboard")}
                                        >
                                            <div className="flex items-center gap-3">
                                                <House className="size-4" />
                                                <Label>Dashboard</Label>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            id="profile"
                                            onAction={() => router.push("/dashboard/profile")}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Person className="size-4" />
                                                <Label>Profile</Label>
                                            </div>
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            id="logout"
                                            variant="danger"
                                            onAction={async () => {
                                                await authClient.signOut();
                                                router.push("/");
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <Label>Logout</Label>
                                                <ArrowRightFromSquare className="size-4 text-danger" />
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>

                        ) : (
                            <>
                                <li>
                                    <Link href="/auth/login" className="font-medium text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400">
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <Button
                                        color="danger"
                                        radius="full"
                                        onPress={() => router.push("/auth/signup")}
                                    >
                                        Join as Donor
                                    </Button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </header>
            {isMenuOpen && (
                <div className="border-t border-red-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg md:hidden">
                    <ul className="flex flex-col gap-3 p-4">
                        {(session?.user ? userLinks : guestLinks).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onPress={() => setIsMenuOpen(false)}
                                    className={`font-semibold transition-colors block ${
                                        pathname === item.href
                                            ? "text-red-500 dark:text-red-400"
                                            : "text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="p-4 pt-0 flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800/80">
                        {session?.user ? (
                            <>
                                <div className="flex items-center gap-3 py-2">
                                    <Avatar
                                        src={session.user.image || ""}
                                        name={session.user.name}
                                    />
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                                            {session.user.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {session.user.email}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onPress={() => {
                                        setIsMenuOpen(false);
                                        router.push("/dashboard");
                                    }}
                                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                                >
                                    Dashboard
                                </Button>

                                <Button
                                    color="danger"
                                    onPress={async () => {
                                        setIsMenuOpen(false);
                                        await authClient.signOut();
                                        router.push("/");
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3 pt-2">
                                <Link 
                                    href="/auth/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-center font-medium text-slate-700 dark:text-slate-200 hover:text-red-500 py-1"
                                >
                                    Login
                                </Link>

                                <Button
                                    color="danger"
                                    onPress={() => {
                                        setIsMenuOpen(false);
                                        router.push("/auth/signup");
                                    }}
                                >
                                    Join as Donor
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;