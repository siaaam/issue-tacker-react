import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { IssueProvider } from './context/IssueContext';

ReactDOM.render(
  <React.StrictMode>
    <IssueProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </IssueProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
