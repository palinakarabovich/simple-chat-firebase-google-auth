import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../../utils/constants";
import React from "react";
import { FirebaseContex } from "../../contex/contex";
import { useAuthState } from 'react-firebase-hooks/auth';

const AppRouter = () => {
  const { auth } = React.useContext(FirebaseContex);
  const [user] = useAuthState(auth);
  console.log(user)
  return user ?
    (
      <Routes>
        {privateRoutes.map(({ path, Component }, index) => <Route path={path} element={Component} exact={true} key={index} />)}
        <Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
      </Routes>
    )
    :
    (
      <Routes>
        {publicRoutes.map(({ path, Component }, index) => <Route path={path} element={Component} exact={true} key={index} />)}
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    )
}

export default AppRouter;