const mainNav = document.getElementById('main-nav') as HTMLElement | null;

function updateFixedNav(): void {
  if (!mainNav) return;
  if (window.scrollY > 100) {
    mainNav.classList.add('fixed-nav');
  } else {
    mainNav.classList.remove('fixed-nav');
  }
}

function astonish(): void {
  if (window.innerWidth <= 748) return;

  const windowTop = window.scrollY;
  const windowBottom = window.innerHeight * 0.8 + windowTop;

  const elements = document.querySelectorAll<HTMLElement>('.astonish:not(.animated)');
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const objectTop = rect.top + window.scrollY;
    const objectBottom = rect.height + objectTop;

    if (windowBottom > objectTop && windowTop < objectBottom) {
      const animation = el.dataset.animated || '';
      const delay = Number(el.dataset.delay) || 0;

      window.setTimeout(() => {
        el.classList.add('animated');
        if (animation) el.classList.add(animation);
      }, delay * 1000);
    }
  });
}

let timeout: number | null = null;

window.addEventListener('scroll', () => {
  updateFixedNav();

  if (timeout) window.clearTimeout(timeout);
  timeout = window.setTimeout(astonish, 10);
});

document.addEventListener('DOMContentLoaded', () => {
  updateFixedNav();
  astonish();
});
