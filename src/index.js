import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './utils/constants';
import { FirebaseContex } from './contex/contex';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContex.Provider value={{
        auth,
        db
      }}>
        <App />
      </FirebaseContex.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
