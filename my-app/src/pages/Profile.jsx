// pages/Profile.jsx
import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <section style={{ textAlign: "center" }}>
      <h1>Profile</h1>

      <p><b>Email:</b> {user.email}</p>
      <p><b>UID:</b> {user.uid}</p>

    </section>
  );
}
