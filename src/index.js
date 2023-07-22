import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { AppContext } from './context/contextApi';
import { FirebaseProvider } from './context/FirebaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContext>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </AppContext>
  </React.StrictMode>
);