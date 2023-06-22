import { Auth, User } from "firebase/auth";
import { FieldValue, Firestore, Timestamp } from "firebase/firestore";
import React from "react";

export interface contextValues {
  auth: Auth,
  db: Firestore
} 

export interface messageValues {
  uid: string,
  displayName: string,
  photoURL: string,
  text: string,
  createdAt: Timestamp | FieldValue;
  id: number
}

export interface messageProps {
  message: messageValues,
   user: User | null | undefined,
   similarName: boolean
}

export interface routesValues {
  path: string,
  Component: React.JSX.Element
}
