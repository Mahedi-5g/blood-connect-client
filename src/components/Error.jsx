"use client";
import Lottie from 'lottie-react';
import errorPage from "../assets/lottie/Page Not Found Animation.json"

const ErrorPage = () => {
    return (
        <div className="h-72 w-72 md:h-80 md:w-80">
            <Lottie animationData={errorPage} loop autoplay />
        </div>
    );
};

export default ErrorPage;