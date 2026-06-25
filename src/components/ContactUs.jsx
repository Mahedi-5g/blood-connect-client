"use client";

import { Button, Input, TextArea } from "@heroui/react";

export default function ContactUs() {
    return (
        <section className="py-24 bg-[#fbf9f4]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-black tracking-tight">
                        Contact Us
                    </h2>
                    <p className="mt-3 text-base text-gray-700 font-medium">
                        Have questions or need assistance? Reach out to us.
                    </p>
                </div>

                {/* Main Content Box */}
                <div className="grid max-w-5xl grid-cols-1 mx-auto md:grid-cols-12 gap-8 bg-white p-8 md:p-12 rounded-[32px] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] border border-gray-100/50">
                    
                    {/* Left Column: Info */}
                    <div className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-6 space-y-8">
                        <div>
                            <h3 className="text-3xl font-black text-black tracking-tight leading-tight">
                                Let's Save Lives Together
                            </h3>
                            <p className="mt-4 text-gray-600 font-medium leading-relaxed">
                                Our team is ready to assist donors and recipients. Feel free to contact us anytime.
                            </p>
                        </div>

                        {/* Contact Info Items */}
                        <div className="space-y-5">
                            {/* Address */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 min-w-10 bg-[#f9ebe0]/70 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#c05621]">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-bold text-black">Fake address, Dhaka, Bangladesh</span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 min-w-10 bg-[#f9ebe0]/70 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#c05621]">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-bold text-black">123456789</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 min-w-10 bg-[#f9ebe0]/70 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#c05621]">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-bold text-black">contact@business.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <form 
                        onSubmit={(e) => e.preventDefault()} 
                        className="md:col-span-7 flex flex-col gap-5 bg-[#faf8f5] p-6 md:p-8 rounded-2xl border border-gray-100"
                    >
                        <Input
                            type="text"
                            label="Full Name"
                            labelPlacement="outside"
                            placeholder="Leroy Jenkins"
                            variant="bordered"
                            radius="xl"
                            classNames={{
                                label: "font-black text-gray-500 tracking-wider text-[11px] uppercase mb-1",
                                inputWrapper: "bg-white border-gray-200/80 data-[hover=true]:border-gray-400 focus-within:!border-[#e65100] h-12",
                                input: "font-medium text-black placeholder:text-gray-400",
                            }}
                        />

                        <Input
                            type="email"
                            label="Email Address"
                            labelPlacement="outside"
                            placeholder="leroy@jenkins.com"
                            variant="bordered"
                            radius="xl"
                            classNames={{
                                label: "font-black text-gray-500 tracking-wider text-[11px] uppercase mb-1",
                                inputWrapper: "bg-white border-gray-200/80 data-[hover=true]:border-gray-400 focus-within:!border-[#e65100] h-12",
                                input: "font-medium text-black placeholder:text-gray-400",
                            }}
                        />

                        <TextArea
                            label="Message"
                            labelPlacement="outside"
                            placeholder="Type your message here..."
                            variant="bordered"
                            radius="xl"
                            minRows={4}
                            classNames={{
                                label: "font-black text-gray-500 tracking-wider text-[11px] uppercase mb-1",
                                inputWrapper: "bg-white border-gray-200/80 data-[hover=true]:border-gray-400 focus-within:!border-[#e65100] py-3",
                                input: "font-medium text-black placeholder:text-gray-400",
                            }}
                        />

                        <Button 
                            type="submit"
                            className="w-full mt-2 bg-[#e65100] text-white font-bold text-sm h-12 rounded-xl shadow-[0_6px_20px_rgba(230,81,0,0.25)] hover:bg-[#d84315] transition"
                        >
                            Submit Message
                        </Button>
                    </form>

                </div>
            </div>
        </section>
    );
}