import React, { useContext } from "react";
import UserContext from "../contexts/User.context";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoute({ element }) {
  const { user } = useContext(UserContext);

  return user ? element : <Navigate to="/login" />;
}
