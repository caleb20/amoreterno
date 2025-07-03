import React from 'react';
import { useApp } from '../context/AppContext';

// Tipado explícito para la notificación
export interface NotificationType {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

const Notification = ({ notification }: { notification: NotificationType }) => {
  const { actions } = useApp();

  const getIcon = (type: NotificationType['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeClasses = (type: NotificationType['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-error text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'info':
        return 'bg-primary text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`${getTypeClasses(notification.type)} rounded-lg p-4 shadow-lg flex items-start space-x-3 animate-slide-in`}>
      <div className="flex-shrink-0">
        {getIcon(notification.type)}
      </div>
      <div className="flex-1">
        {notification.title && (
          <h4 className="font-semibold mb-1">{notification.title}</h4>
        )}
        <p className="text-sm opacity-90">{notification.message}</p>
      </div>
      <button
        onClick={() => actions.removeNotification(notification.id)}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
};

const NotificationContainer = () => {
  const { state } = useApp();

  if (state.notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {state.notifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;