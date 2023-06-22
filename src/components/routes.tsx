
import React from "react";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/constants";
import Chat from "./Chat/Chat";
import Login from "./Login/Login";
import { routesValues } from "../types/types";

export const publicRoutes : Array<routesValues>= [
  {
    path: LOGIN_ROUTE,
    Component: <Login/>
  }
]

export const privateRoutes : Array<routesValues>  = [
  {
    path: CHAT_ROUTE,
    Component: <Chat/>
  }
]