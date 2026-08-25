# SPEC: FIX-007 - Text-to-Speech Player

**Status:** Draft
**Author:** Son of Ivaldi
**Date:** 2026-08-25
**Branch:** fix/form-and-tts

---

## Problem

1.3 billion people with visual impairments, reading disabilities, or low literacy cannot consume text content on this site. No text-to-speech functionality exists. WCAG 2.2 AA requires content to be accessible through multiple modalities.

---

## Why

| Requirement | Why it matters |
|---|---|
| FR-11: TTS Player | Core accessibility feature mandated by SPEC |
| TTS-01: Per-section click | Users need to choose which content to hear |
| TTS-02: Spanish voice | Site is in Spanish, must use Spanish voice |
| TTS-03: Play/Pause/Stop | Users need full playback control |
| TTS-04: Speed control | Different users process speech at different speeds |
| TTS-05: Progress bar | Users need visual feedback on reading position |
| TTS-06: ARIA labels | Screen readers must identify all controls |
| TTS-08: Progressive enhancement | Graceful fallback if browser lacks support |
| TTS-09: Zero backend | Web Speech API only, no server needed |
| TTS-10: Hidden from SR | Player visually hidden when not focused |
| A11Y-11: TTS accessible | Player itself must be accessible |
| A11Y-12: ARIA live regions | State changes must be announced |

---

## Solution

### Architecture

| Aspect | Decision |
|---|---|
| **API** | Web Speech API (`window.speechSynthesis`) |
| **Voice** | `es-CO` → `es-ES` → `es-*` fallback chain |
| **Pattern** | Singleton (one player instance per section) |
| **Speed** | 4 presets: 1x, 1.25x, 1.5x, 2x |
| **Progress** | `onboundary` event with `charIndex` / text length |
| **Keyboard** | Tab navigation, Enter/Space activation, Escape to stop |
| **ARIA** | `aria-live="polite"` for status, `role="progressbar"` |
| **Fallback** | Button hidden if `speechSynthesis` not supported |
| **Chrome bug** | `setInterval` resume every 14s during playback |

### HTML Structure

```html
<div class="tts-player" role="region" aria-label="Reproductor de texto">
  <button class="tts-btn tts-play" aria-label="Escuchar esta seccion">
    <i class="fas fa-volume-up" aria-hidden="true"></i> Escuchar
  </button>
  <button class="tts-btn tts-pause" aria-label="Pausar lectura" disabled>
    <i class="fas fa-pause" aria-hidden="true"></i>
  </button>
  <button class="tts-btn tts-stop" aria-label="Detener lectura" disabled>
    <i class="fas fa-stop" aria-hidden="true"></i>
  </button>
  <div class="tts-speed" role="group" aria-label="Velocidad de lectura">
    <button class="tts-speed-btn active" data-speed="1">1x</button>
    <button class="tts-speed-btn" data-speed="1.25">1.25x</button>
    <button class="tts-speed-btn" data-speed="1.5">1.5x</button>
    <button class="tts-speed-btn" data-speed="2">2x</button>
  </div>
  <div class="tts-progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
    <div class="tts-progress-bar"></div>
  </div>
  <div aria-live="polite" class="sr-only" id="tts-status"></div>
</div>
```

### JavaScript Logic

```javascript
// tts.js — Singleton TTS Player
class TTSPlayer {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.currentUtterance = null;
    this.currentSection = null;
    this.currentRate = 1;
    this.resumeInterval = null;

    this.loadVoices();
    this.bindEvents();
  }

  loadVoices() {
    const load = () => { this.voices = this.synth.getVoices(); };
    if ('onvoiceschanged' in this.synth) {
      this.synth.onvoiceschanged = load;
    }
    load();
  }

  findVoice() {
    const preferred = ['es-CO', 'es-ES', 'es-MX', 'es'];
    for (const lang of preferred) {
      const match = this.voices.find(v => v.lang === lang);
      if (match) return match;
    }
    return this.voices.find(v => v.lang.startsWith('es')) || null;
  }

  getTextForSection(sectionEl) {
    const clone = sectionEl.cloneNode(true);
    clone.querySelectorAll('.tts-player').forEach(el => el.remove());
    return clone.textContent.trim();
  }

  play(sectionEl) {
    this.synth.cancel();
    const text = this.getTextForSection(sectionEl);
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = 'es-CO';
    this.currentUtterance.rate = this.currentRate;

    const voice = this.findVoice();
    if (voice) this.currentUtterance.voice = voice;

    this.currentUtterance.onboundary = (e) => this.onBoundary(e, sectionEl);
    this.currentUtterance.onend = () => this.onEnd(sectionEl);
    this.currentUtterance.onerror = (e) => {
      if (e.error !== 'canceled') this.onEnd(sectionEl);
    };

    this.synth.speak(this.currentUtterance);
    this.startResumeInterval();
    this.updateUI('playing', sectionEl);
  }

  pause(sectionEl) {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.updateUI('paused', sectionEl);
    }
  }

  resume(sectionEl) {
    if (this.synth.paused) {
      this.synth.resume();
      this.updateUI('playing', sectionEl);
    }
  }

  stop(sectionEl) {
    this.synth.cancel();
    this.stopResumeInterval();
    this.updateUI('stopped', sectionEl);
  }

  setRate(rate, sectionEl) {
    this.currentRate = rate;
    if (this.synth.speaking) {
      this.synth.cancel();
      this.play(sectionEl);
    }
  }

  startResumeInterval() {
    this.stopResumeInterval();
    this.resumeInterval = setInterval(() => {
      if (this.synth.speaking) this.synth.resume();
    }, 14000);
  }

  stopResumeInterval() {
    if (this.resumeInterval) {
      clearInterval(this.resumeInterval);
      this.resumeInterval = null;
    }
  }

  onBoundary(e, sectionEl) {
    if (e.name === 'word' && this.currentUtterance) {
      const pct = Math.round((e.charIndex / this.currentUtterance.text.length) * 100);
      const bar = sectionEl.querySelector('.tts-progress-bar');
      const progress = sectionEl.querySelector('.tts-progress');
      if (bar) bar.style.width = pct + '%';
      if (progress) progress.setAttribute('aria-valuenow', pct);
    }
  }

  onEnd(sectionEl) {
    this.stopResumeInterval();
    this.updateUI('stopped', sectionEl);
  }

  updateUI(state, sectionEl) {
    const player = sectionEl.querySelector('.tts-player');
    if (!player) return;

    const playBtn = player.querySelector('.tts-play');
    const pauseBtn = player.querySelector('.tts-pause');
    const stopBtn = player.querySelector('.tts-stop');
    const status = player.querySelector('#tts-status');
    const bar = player.querySelector('.tts-progress-bar');
    const progress = player.querySelector('.tts-progress');

    switch (state) {
      case 'playing':
        if (status) status.textContent = 'Leyendo en voz alta.';
        if (playBtn) playBtn.setAttribute('aria-pressed', 'true');
        if (pauseBtn) pauseBtn.disabled = false;
        if (stopBtn) stopBtn.disabled = false;
        break;
      case 'paused':
        if (status) status.textContent = 'Lectura pausada.';
        if (pauseBtn) pauseBtn.disabled = true;
        break;
      case 'stopped':
        if (status) status.textContent = 'Lectura detenida.';
        if (playBtn) playBtn.setAttribute('aria-pressed', 'false');
        if (pauseBtn) pauseBtn.disabled = true;
        if (stopBtn) stopBtn.disabled = true;
        if (bar) bar.style.width = '0%';
        if (progress) progress.setAttribute('aria-valuenow', '0');
        break;
    }
  }
}
```

### CSS Styles

| File | ITCSS Layer | Purpose |
|---|---|---|
| `_tts-player.scss` | Components | Player layout, buttons, progress bar |

---

## Design Pattern Used

**Singleton** - One TTS player instance manages all sections. Only one section can play at a time.

**Strategy** - Voice selection uses a fallback chain strategy: es-CO → es-ES → es-*.

**Observer** - `onboundary`, `onend`, `onstart` events update the UI state.

---

## POO / SOLID / DRY

| Principle | Application |
|---|---|
| **S**ingle Responsibility | TTSPlayer class handles only speech synthesis |
| **O**pen/Closed | New voices can be added without modifying core logic |
| **I**nterface Segregation | Public API: play(), pause(), stop(), setRate() |
| **D**ependency Inversion | Depends on Web Speech API interface, not concrete voice |

---

## CSS Architecture

| File | ITCSS Layer | Purpose |
|---|---|---|
| `_tts-player.scss` | Components | Player UI: buttons, progress bar, speed selector |

---

## SEO Impact

Improved accessibility signals to search engines. ARIA landmarks help crawlers understand content structure.

---

## Performance Impact

Web Speech API is built into the browser. Zero additional network requests. Zero additional file weight beyond the TTS player code (~3KB).

---

## Security

No security risks. Web Speech API runs entirely in the browser. No data is sent to any server.

---

## What We Avoid

1. **No autoplay** — speech only starts on user click (WCAG 1.4.2)
2. **No keyboard traps** — user can Tab out of player at any time
3. **No backend dependency** — works entirely offline
4. **No broken accessibility** — ARIA labels on all controls
5. **No Chrome auto-pause** — resume interval handles the 15s bug
6. **No screen reader conflicts** — `aria-live` announces state changes

---

## Acceptance Criteria

- [ ] "Escuchar" button present under each content section
- [ ] Click play reads section text in Spanish voice
- [ ] Pause freezes at current position
- [ ] Resume continues from paused position
- [ ] Stop cancels and resets progress to 0
- [ ] Speed control switches rate (1x, 1.25x, 1.5x, 2x)
- [ ] Progress bar shows reading position as percentage
- [ ] `aria-live="polite"` announces state changes
- [ ] Keyboard-only: Tab through all controls, Enter/Space to activate
- [ ] Escape key stops playback
- [ ] Player hidden gracefully if browser does not support Speech API
- [ ] Chrome 15s auto-pause bug handled
- [ ] Only one section plays at a time

---

## Status

**Awaiting Jör's approval before implementation.**
