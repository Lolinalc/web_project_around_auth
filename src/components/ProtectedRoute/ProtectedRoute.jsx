import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
