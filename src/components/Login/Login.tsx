import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CHAT_ROUTE } from "../../utils/constants";
import styles from './Login.module.css'
import React from "react";
import { FirebaseContex } from "../../contex/contex";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login: React.FC = () => {

  const { auth } = React.useContext(FirebaseContex)

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
  }
  return (
    <Box className={styles.centerContainer} >
      <NavLink to={CHAT_ROUTE}>
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          Sign in with Google
        </Button>
      </NavLink>
    </Box>
  )
}

export default Login;