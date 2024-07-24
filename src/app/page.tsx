"use client"
import React from 'react';
import { AuthProvider, useAuth } from './component/authContext';
import Header from './component/header';
import Customize from './component/customize';
import Login from './login/page';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Optional loading state

  return (
    <div>
      {user ? (
        <>
          <Header />
          <Customize />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
