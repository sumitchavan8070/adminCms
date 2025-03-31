// // src/Components/PrivateRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function PrivateRoute({ children }) {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   return isAuthenticated ? children : <Navigate to="/login" />;
// }

// export default PrivateRoute;
// src/Components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children, allowedRoles }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute;
