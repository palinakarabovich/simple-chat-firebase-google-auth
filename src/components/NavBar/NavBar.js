import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { FirebaseContex } from "../../contex/contex";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {

  const { auth } = React.useContext(FirebaseContex);
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color={"secondary"}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Simple Chat
        </Typography>
        {
          user
          && <Button color="inherit" onClick={handleLogout}>Sign out</Button>
        }
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default NavBar;