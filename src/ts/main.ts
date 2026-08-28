import '../../sass/style.scss';
import { initTheme } from './theme';
import { initI18n } from './i18n';
import { initTTS } from './tts-player';
import './navigation';
import './smooth-scroll';
import './scroll-effects';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initTTS();
});
