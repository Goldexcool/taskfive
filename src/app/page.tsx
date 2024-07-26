"use client";
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './component/authContext';
import Header from './component/header';
import Customize from './component/customize';
import Login from './login/page';
import { CustomizeProvider } from './component/customizeContext';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<'link' | 'profile'>('link');



  return (
    <div>
      {user ? (
        <>
          <Header activeSection={activeSection} setActiveSection={setActiveSection} />
          <CustomizeProvider>
            <Customize activeSection={activeSection} />
          </CustomizeProvider>
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
