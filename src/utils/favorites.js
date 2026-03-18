const FAVORITE_KEY = "heroio_favorite_apps";
const FAVORITE_EVENT = "heroio:favorites-updated";

function readFavoriteIds() {
  try {
    const raw = localStorage.getItem(FAVORITE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavoriteIds(ids) {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(FAVORITE_EVENT));
}

export function getFavoriteIds() {
  return readFavoriteIds();
}

export function isFavorite(appId) {
  return readFavoriteIds().includes(appId);
}

export function toggleFavorite(appId) {
  const ids = readFavoriteIds();
  if (ids.includes(appId)) {
    const next = ids.filter((id) => id !== appId);
    writeFavoriteIds(next);
    return false;
  }
  writeFavoriteIds([...ids, appId]);
  return true;
}

export function getFavoriteEventName() {
  return FAVORITE_EVENT;
}
