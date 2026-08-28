export type Locale = 'es' | 'en' | 'de';

export interface Translations {
  [key: string]: string;
}

export const LOCALES: Locale[] = ['es', 'en', 'de'];
export const DEFAULT_LOCALE: Locale = 'es';

const dictionary: Record<Locale, Translations> = {
  es: {
    'meta.title': 'Grupo Travel | Agencia de Viajes en Bogotá, Colombia',
    'meta.description':
      'Grupo Travel es tu agencia de viajes en Bogotá. Paquetes turísticos, reservaciones y vacaciones a los mejores destinos. ¡Viaja con nosotros y disfruta!',
    'nav.menuAria': 'Navegación principal',
    'nav.about': 'Acerca de',
    'nav.packages': 'Reservaciones',
    'nav.contact': 'Contacto',
    'lang.label': 'Idioma',
    'lang.es': 'Español',
    'lang.en': 'Inglés',
    'lang.de': 'Alemán',
    'hero.imgAlt': 'Ciudad de Bogotá',
    'hero.sub1': 'Viaja con nosotros',
    'hero.sub2': 'Disfruta de unas vacaciones inolvidables',
    'a11y.skip': 'Saltar al contenido',
    'about.title': 'Acerca de Grupo Travel',
    'about.imgAlt': 'Paisaje turístico',
    'about.p1':
      'Grupo Travel es tu agencia de viajes en Bogotá. Diseñamos experiencias únicas para que descubras los mejores destinos del mundo con total comodidad y confianza.',
    'about.p2':
      'Desde playas paradisíacas hasta ciudades llenas de historia, creamos paquetes personalizados que se ajustan a tu presupuesto y a tus gustos. Reservas fáciles, precios justos y acompañamiento en cada paso.',
    'about.p3':
      'Nuestro equipo de expertos te acompaña antes, durante y después de tu viaje. Viaja tranquilo: nosotros nos encargamos de todo.',
    'packages.title': 'Explorar nuevos paquetes',
    'packages.intro':
      'Descubre nuestras opciones de viaje a los destinos más buscados del mundo. Paquetes todo incluido, vuelos, hoteles y tours con los mejores precios del mercado.',
    'packages.cta': 'Planifica tu viaje',
    'contact.title': 'Contacto',
    'contact.firstName': 'Nombre:',
    'contact.lastName': 'Apellido:',
    'contact.email': 'Email:',
    'contact.message': 'Mensaje:',
    'contact.submit': 'Enviar',
    'contact.success': 'Mensaje enviado. Te contactaremos pronto.',
    'contact.imgAlt': 'Destino de vacaciones',
    'contact.formAria': 'Formulario de contacto',
    'tts.listen': 'Escuchar',
    'tts.pause': 'Pausar',
    'tts.stop': 'Detener',
    'tts.speed': 'Velocidad de lectura',
    'tts.playAria': 'Escuchar esta sección',
    'tts.pauseAria': 'Pausar lectura',
    'tts.stopAria': 'Detener lectura',
    'tts.progressAria': 'Progreso de lectura',
    'tts.regionAbout': 'Reproductor de texto - Acerca de',
    'tts.regionPackages': 'Reproductor de texto - Paquetes',
    'tts.regionContact': 'Reproductor de texto - Contacto',
    'tts.status.playing': 'Leyendo en voz alta.',
    'tts.status.paused': 'Lectura pausada.',
    'tts.status.stopped': 'Lectura detenida.',
    'footer.note': '© 2026 Grupo Travel. Tu agencia de viajes de confianza.',
    'footer.fb': 'Síguenos en Facebook',
    'footer.ig': 'Síguenos en Instagram',
    'footer.li': 'Síguenos en LinkedIn',
  },
  en: {
    'meta.title': 'Grupo Travel | Travel Agency in Bogotá, Colombia',
    'meta.description':
      'Grupo Travel is your travel agency in Bogotá. Tour packages, reservations, and vacations to the best destinations. Travel with us and enjoy!',
    'nav.menuAria': 'Main navigation',
    'nav.about': 'About',
    'nav.packages': 'Reservations',
    'nav.contact': 'Contact',
    'lang.label': 'Language',
    'lang.es': 'Spanish',
    'lang.en': 'English',
    'lang.de': 'German',
    'hero.imgAlt': 'City of Bogotá',
    'hero.sub1': 'Travel with us',
    'hero.sub2': 'Enjoy an unforgettable vacation',
    'a11y.skip': 'Skip to content',
    'about.title': 'About Grupo Travel',
    'about.imgAlt': 'Tourist landscape',
    'about.p1':
      'Grupo Travel is your travel agency in Bogotá. We craft unique experiences so you can discover the world\'s best destinations with total comfort and confidence.',
    'about.p2':
      'From paradisiacal beaches to cities full of history, we create personalized packages that fit your budget and tastes. Easy bookings, fair prices, and support at every step.',
    'about.p3':
      'Our team of experts supports you before, during, and after your trip. Travel with peace of mind: we take care of everything.',
    'packages.title': 'Explore new packages',
    'packages.intro':
      'Discover our travel options to the world\'s most sought-after destinations. All-inclusive packages, flights, hotels, and tours at the best market prices.',
    'packages.cta': 'Plan your trip',
    'contact.title': 'Contact',
    'contact.firstName': 'First name:',
    'contact.lastName': 'Last name:',
    'contact.email': 'Email:',
    'contact.message': 'Message:',
    'contact.submit': 'Send',
    'contact.success': 'Message sent. We will contact you soon.',
    'contact.imgAlt': 'Vacation destination',
    'contact.formAria': 'Contact form',
    'tts.listen': 'Listen',
    'tts.pause': 'Pause',
    'tts.stop': 'Stop',
    'tts.speed': 'Reading speed',
    'tts.playAria': 'Listen to this section',
    'tts.pauseAria': 'Pause reading',
    'tts.stopAria': 'Stop reading',
    'tts.progressAria': 'Reading progress',
    'tts.regionAbout': 'Text player - About',
    'tts.regionPackages': 'Text player - Packages',
    'tts.regionContact': 'Text player - Contact',
    'tts.status.playing': 'Reading aloud.',
    'tts.status.paused': 'Reading paused.',
    'tts.status.stopped': 'Reading stopped.',
    'footer.note': '© 2026 Grupo Travel. Your trusted travel agency.',
    'footer.fb': 'Follow us on Facebook',
    'footer.ig': 'Follow us on Instagram',
    'footer.li': 'Follow us on LinkedIn',
  },
  de: {
    'meta.title': 'Grupo Travel | Reisebüro in Bogotá, Kolumbien',
    'meta.description':
      'Grupo Travel ist Ihr Reisebüro in Bogotá. Reisepakete, Reservierungen und Urlaub zu den besten Reisezielen. Reisen Sie mit uns und genießen Sie!',
    'nav.menuAria': 'Hauptnavigation',
    'nav.about': 'Über uns',
    'nav.packages': 'Reservierungen',
    'nav.contact': 'Kontakt',
    'lang.label': 'Sprache',
    'lang.es': 'Spanisch',
    'lang.en': 'Englisch',
    'lang.de': 'Deutsch',
    'hero.imgAlt': 'Stadt Bogotá',
    'hero.sub1': 'Reise mit uns',
    'hero.sub2': 'Genieße einen unvergesslichen Urlaub',
    'a11y.skip': 'Zum Inhalt springen',
    'about.title': 'Über Grupo Travel',
    'about.imgAlt': 'Touristische Landschaft',
    'about.p1':
      'Grupo Travel ist Ihre Reiseagentur in Bogotá. Wir gestalten einzigartige Erlebnisse, damit Sie die besten Reiseziele der Welt in vollem Komfort und Vertrauen entdecken.',
    'about.p2':
      'Von paradiesischen Stränden bis zu geschichtsträchtigen Städten erstellen wir personalisierte Pakete, die zu Ihrem Budget und Ihren Wünschen passen. Einfache Buchungen, faire Preise und Betreuung in jedem Schritt.',
    'about.p3':
      'Unser Expertenteam begleitet Sie vor, während und nach Ihrer Reise. Reisen Sie beruhigt: Wir kümmern uns um alles.',
    'packages.title': 'Neue Pakete entdecken',
    'packages.intro':
      'Entdecken Sie unsere Reisemöglichkeiten zu den meistgesuchten Reisezielen der Welt. All-inclusive-Pakete, Flüge, Hotels und Touren zu den besten Preisen auf dem Markt.',
    'packages.cta': 'Planen Sie Ihre Reise',
    'contact.title': 'Kontakt',
    'contact.firstName': 'Vorname:',
    'contact.lastName': 'Nachname:',
    'contact.email': 'E-Mail:',
    'contact.message': 'Nachricht:',
    'contact.submit': 'Senden',
    'contact.success': 'Nachricht gesendet. Wir melden uns bald bei Ihnen.',
    'contact.imgAlt': 'Urlaubsreiseziel',
    'contact.formAria': 'Kontaktformular',
    'tts.listen': 'Anhören',
    'tts.pause': 'Pause',
    'tts.stop': 'Stopp',
    'tts.speed': 'Lesegeschwindigkeit',
    'tts.playAria': 'Diesen Abschnitt anhören',
    'tts.pauseAria': 'Lesen pausieren',
    'tts.stopAria': 'Lesen stoppen',
    'tts.progressAria': 'Lesefortschritt',
    'tts.regionAbout': 'Text-Player - Über uns',
    'tts.regionPackages': 'Text-Player - Pakete',
    'tts.regionContact': 'Text-Player - Kontakt',
    'tts.status.playing': 'Liest laut vor.',
    'tts.status.paused': 'Lesen pausiert.',
    'tts.status.stopped': 'Lesen gestoppt.',
    'footer.note': '© 2026 Grupo Travel. Ihre vertrauenswürdige Reiseagentur.',
    'footer.fb': 'Folge uns auf Facebook',
    'footer.ig': 'Folge uns auf Instagram',
    'footer.li': 'Folge uns auf LinkedIn',
  },
};

function resolve(locale: Locale, key: string): string | undefined {
  const value = dictionary[locale]?.[key];
  return typeof value === 'string' ? value : undefined;
}

function applyAttributes(el: Element, locale: Locale): void {
  const spec = el.getAttribute('data-i18n-attr');
  if (!spec) return;
  spec.split(';').forEach((part) => {
    const [attr, key] = part.split(':');
    if (!attr || !key) return;
    const value = resolve(locale, key);
    if (value !== undefined) el.setAttribute(attr, value);
  });
}

let currentLocale: Locale = DEFAULT_LOCALE;

function localeToTag(locale: Locale): string {
  switch (locale) {
    case 'es':
      return 'es-CO';
    case 'de':
      return 'de-DE';
    default:
      return 'en-US';
  }
}

function applyMeta(documentTitle: string, description: string, locale: Locale): void {
  if (document.title) document.title = documentTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', description);
  for (const prop of ['og:title', 'twitter:title']) {
    const el = document.querySelector(`meta[property="${prop}"], meta[name="${prop}"]`);
    if (el) el.setAttribute('content', documentTitle);
  }
  for (const prop of ['og:description', 'twitter:description']) {
    const el = document.querySelector(`meta[property="${prop}"], meta[name="${prop}"]`);
    if (el) el.setAttribute('content', description);
  }
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', localeToTag(locale).replace('-', '_'));
}

function render(locale: Locale): void {
  document.documentElement.lang = localeToTag(locale).split('-')[0];
  const documentTitle = resolve(locale, 'meta.title') ?? '';
  const description = resolve(locale, 'meta.description') ?? '';
  applyMeta(documentTitle, description, locale);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')!;
    const text = resolve(locale, key);
    if (text !== undefined) el.textContent = text;
    applyAttributes(el, locale);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-attr]').forEach((el) => {
    if (el.hasAttribute('data-i18n')) return;
    applyAttributes(el, locale);
  });

  window.dispatchEvent(new CustomEvent('i18n:change', { detail: { locale } }));
}

function detectLocale(): Locale {
  const stored = window.localStorage.getItem('lang');
  if (stored && (LOCALES as string[]).includes(stored)) return stored as Locale;

  const htmlLang = document.documentElement.lang;
  if (htmlLang && (LOCALES as string[]).includes(htmlLang)) return htmlLang as Locale;

  const nav = (navigator.language || '').toLowerCase();
  for (const loc of LOCALES) {
    if (nav.startsWith(loc)) return loc;
  }
  return DEFAULT_LOCALE;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function getText(key: string): string {
  return resolve(currentLocale, key) ?? '';
}

export function ttsLang(): string {
  return localeToTag(currentLocale);
}

export function setLanguage(locale: Locale): void {
  if (!(LOCALES as string[]).includes(locale)) return;
  currentLocale = locale;
  window.localStorage.setItem('lang', locale);
  render(locale);
}

export function initI18n(): void {
  currentLocale = detectLocale();
  render(currentLocale);

  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((btn) => {
    const locale = btn.dataset.lang as Locale;
    btn.addEventListener('click', () => setLanguage(locale));
    btn.setAttribute('aria-pressed', String(locale === currentLocale));
  });
}
