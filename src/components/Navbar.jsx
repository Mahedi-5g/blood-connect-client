'use client'
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <ul className="hidden items-center gap-4 md:flex">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/donationRequest">Donation Request</Link>
                    </li>
                    <li>
                        <Link href="/searchDonor">Search Donor</Link>
                    </li>
                </ul>
                <ul className="hidden items-end gap-4 md:flex">
                    <li>
                        <Link className='mb-1' href="/auth/login">Login</Link>
                    </li>
                    <li>
                        <Button variant="danger">Join as Donor</Button>
                    </li>
                </ul>
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/donationRequest">Donation Request</Link>
                        </li>
                        <li>
                            <Link href="/searchDonor">Search Donor</Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-2 p-4">
                    <li>
                        <Link className='mb-1' href="/auth/login">Login</Link>
                    </li>
                    <li>
                        <Button variant="danger">Join as Donor</Button>
                    </li>
                </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;