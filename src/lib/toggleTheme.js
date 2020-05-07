const isDocument = typeof document !== `undefined`;

export function darkMode() {
  if (typeof document === `undefined`) return;

  localStorage.setItem('theme', 'dark');
  const root = document.documentElement.style;
  root.setProperty('--transition-ms', '400ms');
  root.setProperty('--bg-color', '#000');
  root.setProperty('--bg-color-alt', '#161616');
  root.setProperty('--border-color', '#161616');
  root.setProperty('--text-color', '#fdfdfd');
  root.setProperty('--transition-ms', '0ms');
}

export function lightMode() {
  if (typeof document === `undefined`) return;

  localStorage.setItem('theme', 'light');
  const root = document.documentElement.style;
  root.setProperty('--transition-ms', '400ms');
  root.setProperty('--bg-color', '#fff');
  root.setProperty('--bg-color-alt', '#f4f4f4');
  root.setProperty('--border-color', 'var(--grey)');
  root.setProperty('--text-color', 'var(--black)');
  root.setProperty('--transition-ms', '0ms');
}

export default async function toggleTheme() {
  if (!isDocument) return null;
  const theme = localStorage.getItem('theme');

  if (!theme) return darkMode();
  if (theme === 'dark') return lightMode();
  if (theme === 'light') return darkMode();
}
