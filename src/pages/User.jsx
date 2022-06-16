import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/User.context";

export default function User() {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <h3 className="text-center mt-5">
        Re bonjour {user.name}, voici ton espace personel !
      </h3>
    </div>
  );
}
