"use client"
import React, { useState } from 'react';
import Header from './component/header';
import Customize from './component/customize';

const App: React.FC = () => {

    return (
        <div>
            <Header  />
            <Customize />
        </div>
    );
};

export default App;
