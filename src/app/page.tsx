"use client";
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './component/authContext';
import Header from './component/header';
import Customize from './component/customize';
import Login from './login/page';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<'link' | 'profile'>('link');

  if (loading) return <p>Loading...</p>; // Consider adding a spinner or animation
  // if (error) return <p>Error: {error.message}</p>; // Display any authentication error

  return (
    <div>
      {user ? (
        <>
          <Header activeSection={activeSection} setActiveSection={setActiveSection} />
          <Customize activeSection={activeSection} />
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
