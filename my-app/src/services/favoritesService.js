const FAVORITES_KEY = "favorites";

export function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(item) {
  const favorites = getFavorites();

  if (!favorites.find(f => f.id === item.id)) {
    favorites.push(item);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  return favorites;
}

export function removeFavorite(id) {
  let favorites = getFavorites();
  favorites = favorites.filter(f => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(f => f.id === id);
}
