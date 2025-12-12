import { db } from "../firebase";
import { auth } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const LS_KEY = "favorites";

// ---- LOCAL STORAGE ----

export function getLocalFavorites() {
  return JSON.parse(localStorage.getItem(LS_KEY)) || [];
}

export function saveLocalFavorites(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

// ---- FIREBASE FAVORITES ----

export async function getServerFavorites() {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = doc(db, "favorites", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return [];

  return snap.data().items || [];
}

export async function addServerFavorite(item) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "favorites", user.uid);
  await setDoc(ref, { items: arrayUnion(item) }, { merge: true });
}

export async function removeServerFavorite(itemId) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "favorites", user.uid);
  await updateDoc(ref, { items: arrayRemove({ id: itemId }) });
}

// ---- UNIVERSAL ----

export function getFavorites() {
  return getLocalFavorites();
}

export function addFavorite(item) {
  const list = getLocalFavorites();
  const updated = [...list, item];
  saveLocalFavorites(updated);

  if (auth.currentUser) addServerFavorite(item);

  return updated;
}

export function removeFavorite(id) {
  const list = getLocalFavorites();
  const updated = list.filter((item) => item.id !== id);
  saveLocalFavorites(updated);

  if (auth.currentUser) removeServerFavorite(id);

  return updated;
}

export async function mergeFavoritesOnLogin() {
  const local = getLocalFavorites();
  const server = await getServerFavorites();

  const merged = [...server];

  local.forEach((item) => {
    if (!merged.some((m) => m.id === item.id)) {
      merged.push(item);
      addServerFavorite(item);
    }
  });

  saveLocalFavorites(merged);

  return merged;
}
