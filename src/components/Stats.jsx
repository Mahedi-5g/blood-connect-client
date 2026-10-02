import React from 'react';
import { FaUsers, FaTint, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const Stats = () => {
    return (
        <div className='py-10 bg-linear-to-br from-red-50 via-white to-red-50 dark:from-slate-950 dark:via-neutral-900 dark:to-slate-950 transition-colors'>
            <div className="mx-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 dark:border-slate-800 text-center shadow-xs">
                    <FaUsers className="mx-auto text-3xl text-red-500 dark:text-red-400 mb-3" />
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">10K+</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Registered Donors</p>
                </div>

                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 dark:border-slate-800 text-center shadow-xs">
                    <FaTint className="mx-auto text-3xl text-red-500 dark:text-red-400 mb-3" />
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">5K+</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Blood Donations</p>
                </div>

                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 dark:border-slate-800 text-center shadow-xs">
                    <FaHeart className="mx-auto text-3xl text-red-500 dark:text-red-400 mb-3" />
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">15K+</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Lives Saved</p>
                </div>

                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-3xl border border-red-100 dark:border-slate-800 text-center shadow-xs">
                    <FaMapMarkerAlt className="mx-auto text-3xl text-red-500 dark:text-red-400 mb-3" />
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">64</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">District Coverage</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;