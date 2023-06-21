
import React from 'react';
import AppRouter from '../AppRouter/AppRouter';
import NavBar from '../NavBar/NavBar';
import styles from './App.module.css';
import { FirebaseContex } from '../../contex/contex';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../Loader/Loader';

function App() {

  const { auth } = React.useContext(FirebaseContex);
  const [user, loading] = useAuthState(auth);

  return loading ?
    (
      <div className={styles.app__loader}><Loader /></div>
    )
    :
    (
      <div className={styles.app}>
        <NavBar />
        <AppRouter />
      </div>
    );
}

export default App;
