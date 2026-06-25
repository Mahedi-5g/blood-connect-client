"use client";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css"; import "swiper/css/pagination";
import { GiLifeTap } from "react-icons/gi";
import Link from "next/link";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
const Banner = () => {
    const slides = [
        "/banner3.jpg",
        "/banner2.jpg",
        "/banner1.jpg",
    ];
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-red-50 via-white to-rose-50">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <div className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2 mb-5 shadow-[inset_0_-8px_10px_rgba(239,68,68,0.15)] transition-all duration-500 hover:shadow-[inset_0_-5px_10px_rgba(239,68,68,0.3)]">

                            <span
                                className="absolute inset-0 rounded-full bg-linear-to-r from-blue-300 via-rose-400 to-red-400 bg-[length:300%_100%] animate-pulse p-[1px]"
                                style={{
                                    WebkitMask:
                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    WebkitMaskComposite: "destination-out",
                                    mask:
                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    maskComposite: "subtract",
                                }}
                            />

                            <GiLifeTap className="relative z-10 text-red-500" />
                            <AnimatedGradientText>
                                <span className="relative z-10 text-sm font-semibold text-red-600">
                                    Save Lives Through Blood Donation
                                </span>
                            </AnimatedGradientText>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-700">
                            <AnimatedGradientText> Donate Blood,</AnimatedGradientText>

                            <span className="text-red-400 block"><AnimatedGradientText>Give the Gift of Life</AnimatedGradientText></span>
                        </h1>
                        <p className="mt-6 text-lg text-default-600 max-w-xl"> Join our growing community of blood donors and help patients receive life-saving support when they need it most. Every donation can save up to three lives.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Button
                                as={Link}
                                href="/register"
                                color="danger"
                                size="lg"
                                radius="full"
                            >
                                Join as Donor
                            </Button>
                            <Button
                                as={Link}
                                href="/search"
                                variant="bordered"
                                color="danger"
                                size="lg"
                                radius="full"
                            >
                                Search Donors
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-6 right-6 z-10 bg-white/40 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-xl rounded-2xl p-4">
                            <p className="font-semibold text-red-600">
                                🚨 Emergency Request
                            </p>

                            <p className="text-sm text-slate-800">
                                O- Blood Needed
                            </p>

                            <p className="text-xs text-slate-800">
                                Dhaka Medical College
                            </p>
                        </div>
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            autoplay={{ delay: 3000, disableOnInteraction: false, }}
                            pagination={{ clickable: true }}
                            loop={true} className="rounded-3xl overflow-hidden shadow-2xl" >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <Image
                                        src={slide}
                                        alt={`Banner ${index + 1}`}
                                        width={700}
                                        height={500}
                                        className="w-full h-105 object-cover"
                                        priority
                                    />
                                </SwiperSlide>))}
                        </Swiper>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}; export default Banner;