import React from 'react';

const SkeletonPage = () => (
  <div className="min-h-screen bg-primary-50 animate-pulse">
    <div className="h-20 md:h-24 bg-surface shadow-primary w-full mb-8" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-12 bg-white rounded-lg mb-6 w-1/2" />
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg h-80 w-full" />
        ))}
      </div>
      <div className="h-16 bg-white rounded-2xl shadow-lg mb-8" />
      <div className="h-96 bg-white rounded-2xl shadow-lg mb-8" />
      <div className="h-40 bg-white rounded-2xl shadow-lg mb-8" />
    </div>
  </div>
);

export default SkeletonPage;
