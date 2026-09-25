import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import './index.css';

// Import Firebase config to initialize it early
import './firebase/config';
import { seedAllData } from './firebase/seedData';

// Expose database seeder on window for easy developer/admin setup
if (typeof window !== 'undefined') {
  window.__seedFirestore = seedAllData;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
