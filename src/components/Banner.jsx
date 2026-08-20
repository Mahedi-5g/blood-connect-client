"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GiLifeTap } from "react-icons/gi";
import Link from "next/link";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { FaHeart, FaSearch } from "react-icons/fa";

const Banner = () => {
    const slides = [
        "/banner3.jpg",
        "/banner2.jpg",
        "/banner1.jpg",
    ];

    return (
        <section className="relative overflow-hidden bg-linear-to-br from-red-50 via-white to-rose-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">

                    <div className="text-center lg:text-left">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 mb-5 shadow-[inset_0_-8px_10px_rgba(239,68,68,0.15)] transition-all duration-500 hover:shadow-[inset_0_-5px_10px_rgba(239,68,68,0.3)]">

                            <span
                                className="absolute rounded-full bg-linear-to-r from-blue-300 via-rose-400 to-red-400 bg-size-[300%_100%] animate-pulse p-px"
                                style={{
                                    WebkitMask:
                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    WebkitMaskComposite: "destination-out",
                                    mask:
                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    maskComposite: "subtract",
                                }}
                            />

                            <GiLifeTap className="relative z-10 text-red-500 text-lg sm:text-xl" />

                            <AnimatedGradientText>
                                <span className="relative z-10 text-xs sm:text-sm font-semibold text-red-600">
                                    Save Lives Through Blood Donation
                                </span>
                            </AnimatedGradientText>
                        </div>


                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold lg:font-bold leading-tight text-slate-700">

                            <AnimatedGradientText>
                                Donate Blood,
                            </AnimatedGradientText>

                            <span className="text-red-400 block">
                                <AnimatedGradientText>
                                    Give the Gift of Life
                                </AnimatedGradientText>
                            </span>

                        </h1>


                        {/* Description */}
                        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-default-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Join our growing community of blood donors and help
                            patients receive life-saving support when they need
                            it most. Every donation can save up to three lives.
                        </p>


                        {/* Buttons */}
                        <div className="flex  items-center justify-center lg:justify-start gap-4 mt-7 sm:mt-8 sm:w-auto">
                            <Button
                                as={Link}
                                href="/auth/signup"
                                size="lg"
                                radius="full"
                                startContent={<FaHeart className="text-white text-base animate-pulse" />}
                                className="w-full sm:w-auto px-8 py-6 font-semibold text-gray-600 bg-linear-to-r from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100  border border-rose-200/80 shadow-sm  hover:shadow-[0_6px_24px_rgba(225,29,72,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-none"
                            >
                                Join as Donor
                            </Button>
                            <Button
                                as={Link}
                                href="/auth/search-donor"
                                size="lg"
                                radius="full"
                                startContent={<FaSearch className="text-rose-600 text-sm transition-transform group-hover:scale-110" />}
                                className="group w-full sm:w-auto px-8 py-6 font-semibold text-slate-800 bg-linear-to-r from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100 border border-rose-200/80 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                            >
                                Search Donors
                            </Button>

                        </div>
                    </div>

                    <div className="relative w-full">

                        {/* Emergency Request Card */}
                        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 z-10 bg-white/50 backdrop-blur-xl backdrop-saturate-150 border border-white/50 shadow-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-47.5 sm:max-w-57.5">

                            <p className="font-semibold text-red-600 text-xs sm:text-sm md:text-base">
                                🚨 Emergency Request
                            </p>

                            <p className="text-xs sm:text-sm text-slate-800 mt-1">
                                O- Blood Needed
                            </p>

                            <p className="text-[10px] sm:text-xs text-slate-800 mt-1">
                                Dhaka Medical College
                            </p>

                        </div>


                        {/* Swiper */}
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            loop={true}
                            className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                        >

                            {slides.map((slide, index) => (
                                <SwiperSlide key={index}>

                                    <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 xl:h-120">

                                        <Image
                                            src={slide}
                                            alt={`Banner ${index + 1}`}
                                            fill
                                            priority={index === 0}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover"
                                        />

                                    </div>

                                </SwiperSlide>
                            ))}

                        </Swiper>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Banner;