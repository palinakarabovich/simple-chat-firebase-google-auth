import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/constants";
import Chat from "./Chat/Chat";
import Login from "./Login/Login";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />
  }
]

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Component: <Chat />
  }
]