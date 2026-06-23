"use client";

import Link from "next/link";
import {
    LogoFacebook,
    LogoLinkedin,
    LogoGithub,
    Handset,
    Envelope,
    LocationArrow,
} from "@gravity-ui/icons";
import Image from "next/image";

function Footer() {
    return (
        <footer className="bg-linear-to-br from-slate-950 via-slate-900 to-red-950/30 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="flex gap-2 mb-2">
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
                                <h2 className="text-2xl font-bold text-red-400">
                                    Blood
                                </h2>
                                <h2 className="text-2xl font-bold text-rose-500">
                                    Connect
                                </h2>
                            </div>
                        </div>


                        <p className="text-default-600 leading-relaxed">
                            Connecting blood donors with people in need. Every
                            donation can save lives and bring hope to families.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <Link href="/">Home</Link>
                            </li>

                            <li>
                                <Link href="/donation-requests">
                                    Donation Requests
                                </Link>
                            </li>

                            <li>
                                <Link href="/search">
                                    Search Donors
                                </Link>
                            </li>

                            <li>
                                <Link href="/funding">
                                    Funding
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Support
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <Link href="/about"
                                    className="text-slate-400 hover:text-red-500 transition-colors">
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact"
                                    className="text-slate-400 hover:text-red-500 transition-colors">
                                    Contact
                                </Link>
                            </li>

                            <li>
                                <Link href="/privacy-policy"
                                    className="text-slate-400 hover:text-red-500 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link href="/terms"
                                    className="text-slate-400 hover:text-red-500 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <div className="space-y-2 text-default-600">
                            <p className="flex items-center gap-1">
                                <LocationArrow
                                    className="text-slate-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
                                </LocationArrow> Dhaka, Bangladesh</p>
                            <p className="flex items-center gap-1"><Handset
                                className="text-slate-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
                            </Handset> +880 1234-567890</p>
                            <p className="flex items-center gap-1"><Envelope
                                className="text-slate-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
                            </Envelope> support@bloodconnect.com</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-around gap-4">
                    <p className="text-sm text-default-500">
                       © 2026 BloodConnect. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="hover:text-danger transition"
                        >
                            <LogoFacebook width={22} height={22} />
                        </Link>

                        <Link
                            href="#"
                            className="hover:text-danger transition"
                        >
                            <LogoLinkedin width={22} height={22} />
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-danger transition"
                        >
                            <LogoGithub width={22} height={22} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;