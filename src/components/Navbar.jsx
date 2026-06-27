'use client'
import { useState } from "react";
import { Link, Button, Label } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Dropdown } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, House, Person } from "@gravity-ui/icons";

function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const guestLinks = [
        { name: "Home", href: "/" },
        { name: "Donation Request", href: "/donationRequest" },
        { name: "Search Donor", href: "/searchDonor" },
    ];

    const userLinks = [
        { name: "Donation Request", href: "/donationRequest" },
        { name: "Search Donor", href: "/searchDonor" },
        { name: "Funding", href: "/funding" },
    ];
    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-40 w-full h-20 border-b border-red-200 bg-linear-to-r from-red-100 via-white to-rose-100 backdrop-blur-lg">
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
                                src={"/bloodLogo.jpeg"}
                                alt="logo"
                                width={55}
                                height={55}
                                className="object-cover rounded-3xl"
                            />

                        </Link>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                            BloodConnect
                        </h1>
                        <p className="text-xs text-default-500">
                            Save Lives Together
                        </p>
                    </div>
                </div>
                <ul className="hidden items-center gap-6 md:flex">
                    {(session?.user ? userLinks : guestLinks).map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="hidden items-center gap-4 md:flex">
                    {session?.user ? (
                        <Dropdown placement="bottom-end">
                            <Dropdown.Trigger>
                                <div className="cursor-pointer">
                                    <Avatar className="ring-2 ring-red-200 hover:ring-red-400 transition">
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

                            <Dropdown.Popover className="w-64 rounded-2xl">
                                <div className="px-4 py-4 border-b">
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
                                            <p className="font-semibold">
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
                                <Link href="/auth/login">
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
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-3 p-4">
                        {(session?.user ? userLinks : guestLinks).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onPress={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {session?.user ? (
                        <>
                            <Avatar
                                src={session.user.image || ""}
                                name={session.user.name}
                            />

                            <Button
                                onPress={() => router.push("/dashboard")}
                            >
                                Dashboard
                            </Button>

                            <Button
                                color="danger"
                                onPress={async () => {
                                    await authClient.signOut();
                                    router.push("/");
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">Login</Link>

                            <Button
                                color="danger"
                                onPress={() => router.push("/auth/signup")}
                            >
                                Join as Donor
                            </Button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;