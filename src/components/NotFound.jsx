"use client";

import Lottie from "lottie-react";
import notFoundAnimation from "../assets/lottie/404 error page with cat.json";

const NotFoundPage = () => {
  return (
    <div className="w-90 h-90">
      <Lottie animationData={notFoundAnimation} loop autoplay />
    </div>
  );
};

export default NotFoundPage;