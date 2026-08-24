"use client";


import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/sandyLoading.json"

const LoadingAnimation = () => {
  return (
    <div className="w-fit h-fit">
      <Lottie animationData={loadingAnimation} loop autoplay />
    </div>
  );
};

export default LoadingAnimation;