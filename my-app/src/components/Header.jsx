import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function Header() {
  const { user } = useAuth();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!user) return;

    const r = ref(db, `users/${user.uid}/photo`);
    onValue(r, (snap) => {
      if (snap.exists()) setPhoto(snap.val());
    });
  }, [user]);

  return (
    <header
      style={{
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "#f7f7f7",
        borderBottom: "1px solid #ccc",
      }}
    >
      {photo && (
        <img
          src={photo}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
      <h2>My App</h2>
    </header>
  );
}
