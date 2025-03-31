import React from "react";

const SkeletonMessage: React.FC = () => (
  <div className="flex items-start justify-start animate-pulse">
    <div className="w-10 h-10 rounded-full bg-gray-500 mr-4"></div>
    <div className="w-full max-w-2xl p-4 rounded-lg shadow-md bg-gray-700">
      <div className="w-32 h-5 bg-gray-600 rounded mb-3"></div>
      <div className="w-64 h-7 bg-gray-600 rounded"></div>
    </div>
  </div>
);

export default SkeletonMessage;
