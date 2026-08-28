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
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.destinations': 'Destinos',
    'nav.packages': 'Paquetes',
    'nav.contact': 'Contacto',
    'meta.title.dest': 'Destinos Turísticos | Grupo Travel Bogotá',
    'meta.desc.dest':
      'Descubre los destinos turísticos que Grupo Travel ofrece desde Bogotá: Cartagena, San Andrés, Medellín, Santa Marta, París y Cancún. ¡Reserva tu viaje hoy!',
    'meta.title.pkg': 'Paquetes Turísticos | Grupo Travel Bogotá',
    'meta.desc.pkg':
      'Explora los paquetes turísticos de Grupo Travel: vuelos, hoteles y tours todo incluido a los mejores precios. ¡Planifica tu viaje y disfruta!',
    'lang.label': 'Idioma',
    'lang.es': 'Español',
    'lang.en': 'Inglés',
    'lang.de': 'Alemán',
    'hero.imgAlt': 'Ciudad de Bogotá',
    'dest.heroImgAlt': 'Destinos turísticos',
    'pkg.heroImgAlt': 'Paquetes turísticos',
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
    'dest.heroTitle': 'Nuestros Destinos',
    'dest.heroSub': 'Los mejores destinos del mundo, al alcance de tu presupuesto',
    'dest.intro':
      'Viaja con Grupo Travel a los destinos más buscados. Cada ciudad ofrece experiencias únicas, cultura, playas y aventura. Elige tu próximo destino y déjanos planificar todo por ti.',
    'dest.dest1': 'Cartagena',
    'dest.dest1d':
      'Ciudad amurallada, playas caribeñas y una vida nocturna vibrante. Ideal para escapadas románticas y descanso.',
    'dest.dest2': 'San Andrés',
    'dest.dest2d':
      'Mar de siete colores y paradisíacas playas. Perfecto para buceo, relajación y aventuras acuáticas.',
    'dest.dest3': 'Medellín',
    'dest.dest3d':
      'Ciudad de la eterna primavera, rodeada de montañas. Cultura, gastronomía y paisajes únicos.',
    'dest.dest4': 'Santa Marta',
    'dest.dest4d':
      'La puerta al Parque Tayrona y a la Sierra Nevada. Naturaleza, playas y patrimonio histórico.',
    'dest.dest5': 'París',
    'dest.dest5d':
      'La ciudad del amor: la Torre Eiffel, el Louvre y sus encantadoras calles. Un clásico imperdible.',
    'dest.dest6': 'Cancún',
    'dest.dest6d':
      'Playas de arena blanca, aguas turquesa y una vibrante zona hotelera. Perfecto para todo incluido.',
    'dest.cta': 'Ver paquetes disponibles',
    'pkg.heroTitle': 'Paquetes Turísticos',
    'pkg.heroSub': 'Vuelos, hoteles y tours en paquetes todo incluido',
    'pkg.intro':
      'Nuestros paquetes combinan vuelos, alojamiento, traslados y tours para que disfrutes sin preocupaciones. Precios justos y acompañamiento en cada paso.',
    'pkg.pkg1': 'Cartagena Todo Incluido',
    'pkg.pkg1d': '4 días y 3 noches con hotel 4 estrellas, desayuno y tour por la ciudad amurallada.',
    'pkg.pkg1v': 'Desde $1,250,000 COP',
    'pkg.pkg2': 'San Andrés Aventura',
    'pkg.pkg2d': '5 días con vuelo redondo, hotel frente al mar y recorrido por la isla.',
    'pkg.pkg2v': 'Desde $1,650,000 COP',
    'pkg.pkg3': 'Medellín Escapada',
    'pkg.pkg3d': '3 días con hotel boutique, traslados aeropuerto y tour por el Pueblito Paisa.',
    'pkg.pkg3v': 'Desde $850,000 COP',
    'pkg.pkg4': 'Santa Marta Premium',
    'pkg.pkg4d': '4 días con acceso al Parque Tayrona, transporte y hotel con vista al mar.',
    'pkg.pkg4v': 'Desde $1,200,000 COP',
    'pkg.pkg5': 'París Romántico',
    'pkg.pkg5d': '6 días con vuelo, hotel céntrico, tour de la ciudad y paseo por el Sena.',
    'pkg.pkg5v': 'Desde $6,800,000 COP',
    'pkg.pkg6': 'Cancún Todo Incluido',
    'pkg.pkg6d': '5 días en resort todo incluido con playa privada y traslados.',
    'pkg.pkg6v': 'Desde $3,200,000 COP',
    'pkg.cta': 'Reservar este paquete',
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
    'tts.regionDest': 'Reproductor de texto - Destinos',
    'tts.regionPkg': 'Reproductor de texto - Paquetes',
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
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.destinations': 'Destinations',
    'nav.packages': 'Packages',
    'nav.contact': 'Contact',
    'meta.title.dest': 'Tourist Destinations | Grupo Travel Bogotá',
    'meta.desc.dest':
      'Discover the tourist destinations Grupo Travel offers from Bogotá: Cartagena, San Andrés, Medellín, Santa Marta, Paris, and Cancún. Book your trip today!',
    'meta.title.pkg': 'Travel Packages | Grupo Travel Bogotá',
    'meta.desc.pkg':
      'Explore Grupo Travel travel packages: flights, hotels, and all-inclusive tours at the best prices. Plan your trip and enjoy!',
    'lang.label': 'Language',
    'lang.es': 'Spanish',
    'lang.en': 'English',
    'lang.de': 'German',
    'hero.imgAlt': 'City of Bogotá',
    'dest.heroImgAlt': 'Tourist destinations',
    'pkg.heroImgAlt': 'Travel packages',
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
    'dest.heroTitle': 'Our Destinations',
    'dest.heroSub': 'The best destinations in the world, within your budget',
    'dest.intro':
      'Travel with Grupo Travel to the most sought-after destinations. Each city offers unique experiences, culture, beaches, and adventure. Choose your next destination and let us plan it all for you.',
    'dest.dest1': 'Cartagena',
    'dest.dest1d':
      'A walled city, Caribbean beaches, and vibrant nightlife. Ideal for romantic getaways and relaxation.',
    'dest.dest2': 'San Andrés',
    'dest.dest2d':
      'A sea of seven colors and paradisiacal beaches. Perfect for diving, relaxation, and water adventures.',
    'dest.dest3': 'Medellín',
    'dest.dest3d':
      'City of eternal spring, surrounded by mountains. Culture, gastronomy, and unique landscapes.',
    'dest.dest4': 'Santa Marta',
    'dest.dest4d':
      'The gateway to Tayrona Park and the Sierra Nevada. Nature, beaches, and historical heritage.',
    'dest.dest5': 'Paris',
    'dest.dest5d':
      'The city of love: the Eiffel Tower, the Louvre, and its charming streets. A must-see classic.',
    'dest.dest6': 'Cancún',
    'dest.dest6d':
      'White sand beaches, turquoise waters, and a vibrant hotel zone. Perfect for all-inclusive stays.',
    'dest.cta': 'View available packages',
    'pkg.heroTitle': 'Travel Packages',
    'pkg.heroSub': 'Flights, hotels, and tours in all-inclusive packages',
    'pkg.intro':
      'Our packages combine flights, accommodation, transfers, and tours so you can enjoy worry-free. Fair prices and support at every step.',
    'pkg.pkg1': 'Cartagena All-Inclusive',
    'pkg.pkg1d': '4 days and 3 nights with a 4-star hotel, breakfast, and a tour of the walled city.',
    'pkg.pkg1v': 'From $1,250,000 COP',
    'pkg.pkg2': 'San Andrés Adventure',
    'pkg.pkg2d': '5 days with round-trip flight, beachfront hotel, and an island tour.',
    'pkg.pkg2v': 'From $1,650,000 COP',
    'pkg.pkg3': 'Medellín Escape',
    'pkg.pkg3d': '3 days with a boutique hotel, airport transfers, and a Pueblito Paisa tour.',
    'pkg.pkg3v': 'From $850,000 COP',
    'pkg.pkg4': 'Santa Marta Premium',
    'pkg.pkg4d': '4 days with Tayrona Park access, transportation, and a sea-view hotel.',
    'pkg.pkg4v': 'From $1,200,000 COP',
    'pkg.pkg5': 'Romantic Paris',
    'pkg.pkg5d': '6 days with flight, central hotel, city tour, and a Seine river cruise.',
    'pkg.pkg5v': 'From $6,800,000 COP',
    'pkg.pkg6': 'Cancún All-Inclusive',
    'pkg.pkg6d': '5 days at an all-inclusive resort with a private beach and transfers.',
    'pkg.pkg6v': 'From $3,200,000 COP',
    'pkg.cta': 'Book this package',
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
    'tts.regionDest': 'Text player - Destinations',
    'tts.regionPkg': 'Text player - Packages',
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
    'nav.home': 'Start',
    'nav.about': 'Über uns',
    'nav.destinations': 'Reiseziele',
    'nav.packages': 'Pakete',
    'nav.contact': 'Kontakt',
    'meta.title.dest': 'Reiseziele | Grupo Travel Bogotá',
    'meta.desc.dest':
      'Entdecken Sie die Reiseziele, die Grupo Travel ab Bogotá anbietet: Cartagena, San Andrés, Medellín, Santa Marta, Paris und Cancún. Buchen Sie Ihre Reise noch heute!',
    'meta.title.pkg': 'Reisepakete | Grupo Travel Bogotá',
    'meta.desc.pkg':
      'Entdecken Sie die Reisepakete von Grupo Travel: Flüge, Hotels und All-inclusive-Touren zu den besten Preisen. Planen Sie Ihre Reise und genießen Sie!',
    'lang.label': 'Sprache',
    'lang.es': 'Spanisch',
    'lang.en': 'Englisch',
    'lang.de': 'Deutsch',
    'hero.imgAlt': 'Stadt Bogotá',
    'dest.heroImgAlt': 'Reiseziele',
    'pkg.heroImgAlt': 'Reisepakete',
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
    'dest.heroTitle': 'Unsere Reiseziele',
    'dest.heroSub': 'Die besten Reiseziele der Welt, passend zu Ihrem Budget',
    'dest.intro':
      'Reisen Sie mit Grupo Travel zu den meistgesuchten Reisezielen. Jede Stadt bietet einzigartige Erlebnisse, Kultur, Strände und Abenteuer. Wählen Sie Ihr nächstes Ziel und wir planen alles für Sie.',
    'dest.dest1': 'Cartagena',
    'dest.dest1d':
      'Umwallte Stadt, karibische Strände und ein pulsierendes Nachtleben. Ideal für romantische Ausflüge und Erholung.',
    'dest.dest2': 'San Andrés',
    'dest.dest2d':
      'Ein Meer aus sieben Farben und paradiesische Strände. Perfekt zum Tauchen, Entspannen und für Wasserabenteuer.',
    'dest.dest3': 'Medellín',
    'dest.dest3d':
      'Stadt des ewigen Frühlings, umgeben von Bergen. Kultur, Gastronomie und einzigartige Landschaften.',
    'dest.dest4': 'Santa Marta',
    'dest.dest4d':
      'Das Tor zum Tayrona-Park und zur Sierra Nevada. Natur, Strände und historisches Erbe.',
    'dest.dest5': 'Paris',
    'dest.dest5d':
      'Die Stadt der Liebe: der Eiffelturm, der Louvre und seine charmanten Straßen. Ein Muss.',
    'dest.dest6': 'Cancún',
    'dest.dest6d':
      'Weiße Sandstrände, türkisfarbenes Wasser und eine lebendige Hotelzone. Perfekt für All-inclusive.',
    'dest.cta': 'Verfügbare Pakete ansehen',
    'pkg.heroTitle': 'Reisepakete',
    'pkg.heroSub': 'Flüge, Hotels und Touren in All-inclusive-Paketen',
    'pkg.intro':
      'Unsere Pakete kombinieren Flüge, Unterkunft, Transfers und Touren, damit Sie sorgenfrei genießen können. Faire Preise und Betreuung in jedem Schritt.',
    'pkg.pkg1': 'Cartagena All Inclusive',
    'pkg.pkg1d': '4 Tage und 3 Nächte mit 4-Sterne-Hotel, Frühstück und Stadtführung durch die Altstadt.',
    'pkg.pkg1v': 'Ab 1.250.000 COP',
    'pkg.pkg2': 'San Andrés Abenteuer',
    'pkg.pkg2d': '5 Tage mit Hin- und Rückflug, Hotel am Meer und Inselrundfahrt.',
    'pkg.pkg2v': 'Ab 1.650.000 COP',
    'pkg.pkg3': 'Medellín Auszeit',
    'pkg.pkg3d': '3 Tage mit Boutique-Hotel, Flughafentransfer und Pueblito-Paisa-Tour.',
    'pkg.pkg3v': 'Ab 850.000 COP',
    'pkg.pkg4': 'Santa Marta Premium',
    'pkg.pkg4d': '4 Tage mit Zugang zum Tayrona-Park, Transport und Hotel mit Meerblick.',
    'pkg.pkg4v': 'Ab 1.200.000 COP',
    'pkg.pkg5': 'Romantisches Paris',
    'pkg.pkg5d': '6 Tage mit Flug, zentralem Hotel, Stadtführung und Seine-Rundfahrt.',
    'pkg.pkg5v': 'Ab 6.800.000 COP',
    'pkg.pkg6': 'Cancún All Inclusive',
    'pkg.pkg6d': '5 Tage im All-inclusive-Resort mit Privatstrand und Transfers.',
    'pkg.pkg6v': 'Ab 3.200.000 COP',
    'pkg.cta': 'Dieses Paket buchen',
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
    'tts.regionDest': 'Text-Player - Reiseziele',
    'tts.regionPkg': 'Text-Player - Pakete',
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

function pageMeta(locale: Locale): { title: string; desc: string } {
  const ns = document.documentElement.getAttribute('data-i18n-meta');
  if (ns) {
    const title = resolve(locale, `meta.title.${ns}`);
    const desc = resolve(locale, `meta.desc.${ns}`);
    if (title || desc) return { title: title ?? '', desc: desc ?? '' };
  }
  return {
    title: resolve(locale, 'meta.title') ?? '',
    desc: resolve(locale, 'meta.description') ?? '',
  };
}

function render(locale: Locale): void {
  document.documentElement.lang = localeToTag(locale).split('-')[0];
  const meta = pageMeta(locale);
  applyMeta(meta.title, meta.desc, locale);

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
