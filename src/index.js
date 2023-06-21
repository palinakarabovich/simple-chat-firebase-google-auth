import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './utils/constants';
import { FirebaseContex } from './contex/contex';
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// const fireStore = app.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContex.Provider value={{
        auth
      }}>
        <App />
      </FirebaseContex.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
