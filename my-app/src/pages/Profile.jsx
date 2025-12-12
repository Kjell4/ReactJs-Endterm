import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, set, onValue } from "firebase/database";
import { useEffect, useState, useRef } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef();

  if (!user) return <Navigate to="/login" />;

  useEffect(() => {
    const photoRef = ref(db, `users/${user.uid}/photo`);
    onValue(photoRef, (snap) => {
      if (snap.exists()) setPhoto(snap.val());
    });
  }, [user.uid]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const worker = new Worker(
      new URL("../imageWorker.js", import.meta.url),
      { type: "module" }
    );

    worker.postMessage(file);

    worker.onmessage = (msg) => {
      if (msg.data.error) {
        console.error(msg.data.error);
        worker.terminate();
        return;
      }

      const blob = msg.data;

      // Показываем фото сразу
      const url = URL.createObjectURL(blob);
      setPhoto(url);

      // Конвертируем в Base64 для Firebase
      const reader = new FileReader();
      reader.onload = () => {
        set(ref(db, `users/${user.uid}/photo`), reader.result);
      };
      reader.readAsDataURL(blob);

      worker.terminate();
    };
  };

  return (
    <section style={{ textAlign: "center" }}>
      <h1>Профиль</h1>

      <p><b>Email:</b> {user.email}</p>
      <p><b>UID:</b> {user.uid}</p>

      <h3>Фото профиля</h3>
      {photo ? (
        <img
          src={photo}
          alt="profile"
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
          }}
        />
      ) : (
        <p>Фото ещё не загружено</p>
      )}

      <br />

      {/* Скрытый input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUpload}
        style={{ display: "none" }}
      />

      {/* Кнопка загрузки */}
      <button
        onClick={() => fileInputRef.current.click()}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Загрузить фото
      </button>
    </section>
  );
}