"use client"
import ErrorPage from '@/components/Error'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }) {
    useEffect(() => {
    }, [error])

    return (
        <section className="flex items-center h-full dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <ErrorPage></ErrorPage>
                    <h2 className="text-2xl font-semibold">Error Page</h2>
                    <p className="my-2">Could not find requested data</p>
                    <Link href="/" rel="noopener noreferrer" className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"><Button className="bg-lime-400">Back to homepage</Button> </Link>
                    
                </div>
            </div>
        </section>
    )
}