const isDocument = typeof document !== `undefined`;

export function darkMode() {
  if (typeof document === `undefined`) return;

  localStorage.setItem('theme', 'dark');
  const rootStyles = document.documentElement.style;
  rootStyles.setProperty('--transition-ms', '400ms');
  rootStyles.setProperty('--bg-color', '#000');
  rootStyles.setProperty('--bg-color-alt', '#161616');
  rootStyles.setProperty('--border-color', '#161616');
  rootStyles.setProperty('--text-color', '#fdfdfd');
  rootStyles.setProperty('--transition-ms', '0ms');
  document.querySelector('html').classList.remove('togglingTheme');
}

export function lightMode() {
  if (typeof document === `undefined`) return;

  localStorage.setItem('theme', 'light');
  const rootStyles = document.documentElement.style;
  rootStyles.setProperty('--transition-ms', '400ms');
  rootStyles.setProperty('--bg-color', '#fff');
  rootStyles.setProperty('--bg-color-alt', '#f4f4f4');
  rootStyles.setProperty('--border-color', 'var(--black)');
  rootStyles.setProperty('--text-color', 'var(--black)');
  rootStyles.setProperty('--transition-ms', '0ms');
}

export default async function toggleTheme() {
  if (!isDocument) return null;
  const theme = localStorage.getItem('theme');

  if (!theme) return darkMode();
  if (theme === 'dark') return lightMode();
  if (theme === 'light') return darkMode();
}
