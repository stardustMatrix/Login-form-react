
import React, { createContext, useReducer, useEffect } from 'react';


const initialState = {
  isAuthenticated: false,
  user: null,
};


const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      const user = { username };
      dispatch({ type: 'LOGIN', payload: user });
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
    }
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};