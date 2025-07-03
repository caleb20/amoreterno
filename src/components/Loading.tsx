import React from 'react';
import { useApp } from '../context/AppContext';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
}

const Loading = ({ size = 'md', text = 'Cargando...' }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  } as const;

  type SizeKey = keyof typeof sizeClasses;
  const safeSize: SizeKey = (['sm', 'md', 'lg', 'xl'].includes(size) ? size : 'md') as SizeKey;

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[safeSize]} animate-spin rounded-full border-4 border-primary-200 border-t-primary`}></div>
      {text && (
        <p className="text-text-secondary text-sm">{text}</p>
      )}
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  text?: string;
}

const LoadingOverlay = ({ isVisible, text = 'Cargando...' }: LoadingOverlayProps) => {
  const { state } = useApp() as { state: { isLoading: boolean } };

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