import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { AuthProvider } from './context/auth-context';
import { AuthGate } from './components/AuthGate';
import './App.scss';

render(
  <AuthProvider>
    <AuthGate>
      <App />
    </AuthGate>
  </AuthProvider>,
  document.getElementById('root')
);
