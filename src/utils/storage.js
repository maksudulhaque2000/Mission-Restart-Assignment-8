const INSTALLED_KEY = "heroio_installed_apps";
const INSTALLED_EVENT = "heroio:installed-updated";

function readInstalledIds() {
  try {
    const raw = localStorage.getItem(INSTALLED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeInstalledIds(ids) {
  localStorage.setItem(INSTALLED_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(INSTALLED_EVENT));
}

export function getInstalledIds() {
  return readInstalledIds();
}

export function isInstalled(appId) {
  return readInstalledIds().includes(appId);
}

export function installApp(appId) {
  const ids = readInstalledIds();
  if (ids.includes(appId)) return false;
  ids.push(appId);
  writeInstalledIds(ids);
  return true;
}

export function uninstallApp(appId) {
  const ids = readInstalledIds().filter((id) => id !== appId);
  writeInstalledIds(ids);
}

export function getInstalledEventName() {
  return INSTALLED_EVENT;
}
