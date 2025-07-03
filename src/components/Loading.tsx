import React from 'react';
import { useApp } from '../context/AppContext';

const Loading = ({ size = 'md', text = 'Cargando...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary-200 border-t-primary`}></div>
      {text && (
        <p className="text-text-secondary text-sm">{text}</p>
      )}
    </div>
  );
};

const LoadingOverlay = ({ isVisible, text = 'Cargando...' }) => {
  const { state } = useApp();

  if (!isVisible && !state.isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg p-8 shadow-lg">
        <Loading size="lg" text={text} />
      </div>
    </div>
  );
};

const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`animate-spin rounded-full border-2 border-primary-200 border-t-primary ${className}`}></div>
  );
};

export { Loading, LoadingOverlay, LoadingSpinner };
export default Loading; 