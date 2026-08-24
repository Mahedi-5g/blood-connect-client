import Link from 'next/link'

import { Button } from '@heroui/react';
import NotFoundPage from '@/components/NotFound';

export default function NotFound() {
    return (
        <section className="flex items-center h-full dark:bg-gray-50 dark:text-gray-800 mb-10">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto mt-6">
                <NotFoundPage /> 
                
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Not Found</h2>
                    <p className="my-2">Could not find requested resource.</p>
                     <Link href="/" rel="noopener noreferrer" className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"><Button className="bg-lime-400">Back to homepage</Button> </Link>
                </div>
            </div>
        </section>
    );
}