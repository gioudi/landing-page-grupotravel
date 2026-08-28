import '../../sass/style.scss';
import { initI18n } from './i18n';
import { initTTS } from './tts-player';
import './navigation';
import './smooth-scroll';
import './scroll-effects';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initTTS();
});
