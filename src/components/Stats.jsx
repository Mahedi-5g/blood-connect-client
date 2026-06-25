import React from 'react';
import { FaUsers, FaTint, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const Stats = () => {
    return (
        <div className='mx-6'>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 text-center">
                    <FaUsers className="mx-auto text-3xl text-red-500 mb-3" />
                    <h3 className="text-3xl font-bold">10K+</h3>
                    <p className="text-slate-500">Registered Donors</p>
                </div>

                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 text-center">
                    <FaTint className="mx-auto text-3xl text-red-500 mb-3" />
                    <h3 className="text-3xl font-bold">5K+</h3>
                    <p className="text-slate-500">Blood Donations</p>
                </div>

                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 text-center">
                    <FaHeart className="mx-auto text-3xl text-red-500 mb-3" />
                    <h3 className="text-3xl font-bold">15K+</h3>
                    <p className="text-slate-500">Lives Saved</p>
                </div>

                <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 text-center">
                    <FaMapMarkerAlt className="mx-auto text-3xl text-red-500 mb-3" />
                    <h3 className="text-3xl font-bold">64</h3>
                    <p className="text-slate-500">District Coverage</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;