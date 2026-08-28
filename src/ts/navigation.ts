const menuButton = document.getElementById('menu-button') as HTMLButtonElement | null;
const navLinks = document.getElementById('nav-links') as HTMLElement | null;

function isMenuOpen(): boolean {
  return menuButton?.classList.contains('change') ?? false;
}

function closeMenu(): void {
  if (!menuButton || !navLinks) return;
  menuButton.classList.remove('change');
  menuButton.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('nav-open');
}

function toggleMenu(): void {
  if (!menuButton || !navLinks) return;
  const open = isMenuOpen();
  menuButton.classList.toggle('change', !open);
  menuButton.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('nav-open', !open);
}

if (menuButton) {
  menuButton.addEventListener('click', toggleMenu);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.keyCode === 27) {
    if (isMenuOpen()) closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMenuOpen()) closeMenu();
});
