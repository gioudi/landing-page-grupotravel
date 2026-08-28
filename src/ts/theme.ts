export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

export function getTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute('content', theme === 'dark' ? '#111111' : '#f8f9fa');
  }

  const toggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
  if (toggle) toggle.setAttribute('aria-pressed', String(theme === 'dark'));
}

export function setTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function initTheme(): void {
  applyTheme(getTheme());

  document.querySelector<HTMLButtonElement>('.theme-toggle')?.addEventListener('click', () => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}
