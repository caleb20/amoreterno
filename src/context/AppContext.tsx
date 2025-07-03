import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  theme: 'light',
  language: 'es',
  user: null,
  notifications: [],
  isLoading: false,
  error: null
};

// Action types
const ActionTypes = {
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_USER: 'SET_USER',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case ActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    setTheme: (theme) => {
      dispatch({ type: ActionTypes.SET_THEME, payload: theme });
      localStorage.setItem('theme', theme);
    },
    setLanguage: (language) => {
      dispatch({ type: ActionTypes.SET_LANGUAGE, payload: language });
      localStorage.setItem('language', language);
    },
    setUser: (user) => {
      dispatch({ type: ActionTypes.SET_USER, payload: user });
    },
    addNotification: (notification) => {
      const id = Date.now();
      dispatch({ 
        type: ActionTypes.ADD_NOTIFICATION, 
        payload: { ...notification, id } 
      });
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        actions.removeNotification(id);
      }, 5000);
    },
    removeNotification: (id) => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
    },
    setLoading: (isLoading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
    },
    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },
    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    }
  };

  const value = {
    state,
    actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 