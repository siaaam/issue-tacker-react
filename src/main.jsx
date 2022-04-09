import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { IssueProvider } from './context/IssueContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <IssueProvider>
        <App />
      </IssueProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
