import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AppContext } from './context/ContextApi';
import { FirebaseProvider } from './context/FirebaseContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppContext>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </AppContext>
  </React.StrictMode>
);