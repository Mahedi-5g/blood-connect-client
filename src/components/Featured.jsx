import { FaSearch } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function FeaturedSection() {
    const features = [
        {
            icon: <FaSearch size={28} />,
            title: "Find Donors Easily",
            description:
                "Search donors by blood group, district, and upazila to quickly find help when needed.",
        },
        {
            icon: <MdBloodtype size={28} />,
            title: "Instant Blood Requests",
            description:
                "Create emergency blood requests and connect with donors efficiently.",
        },
        {
            icon: <FaHeart size={28} />,
            title: "Save Lives Together",
            description:
                "Every donation can save multiple lives and create a stronger community.",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-slate-800">
                        Why Choose
                        <span className="text-red-500"> BloodConnect?</span>
                    </h2>

                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                        We make blood donation faster, safer, and more accessible
                        for everyone.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl border border-red-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-slate-800 mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-slate-500">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}