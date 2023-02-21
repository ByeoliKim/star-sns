import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { initializeApp } from "firebase/app";
import { BrowserRouter } from 'react-router-dom';
console.log(initializeApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);