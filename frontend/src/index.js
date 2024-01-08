import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {IssuesContextProvider} from './context/IssuesContext'
import {AuthContextProvider} from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <IssuesContextProvider>
        <App />
      </IssuesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


