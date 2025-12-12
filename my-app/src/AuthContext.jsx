import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// импортируем Redux
import { useDispatch } from "react-redux";
import { syncFavoritesOnLogin } from "./features/favorites/favoritesSlice";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // ← МОМЕНТ СИНХРОНИЗАЦИИ FAVORITES
        dispatch(syncFavoritesOnLogin());
      }
    });

    return () => unsub();
  }, [dispatch]);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
