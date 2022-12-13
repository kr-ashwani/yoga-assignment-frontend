import React from 'react';
import './AppLoading.css';
import { useAuth } from '../../context/AuthContext';

const AppLoading = () => {
  const { loading } = useAuth();

  if (loading) return <div className="appLoading">loading...</div>;
};

export default AppLoading;
