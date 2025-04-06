import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-200 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-400"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
