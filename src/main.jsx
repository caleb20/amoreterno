import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import "./styles/tailwind.css";
import App from './App.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { AppProvider } from './context/AppContext.jsx';
import NotificationContainer from './components/Notification.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
        <NotificationContainer />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
); 