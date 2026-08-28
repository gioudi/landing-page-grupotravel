type PlayerState = 'playing' | 'paused' | 'stopped';

class TTSPlayer {
  private synth: SpeechSynthesis | null = window.speechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentSection: HTMLElement | null = null;
  private currentRate = 1;
  private resumeInterval: number | null = null;

  constructor() {
    this.loadVoices();
    this.init();
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const load = (): void => {
      this.voices = this.synth!.getVoices();
    };
    if ('onvoiceschanged' in this.synth) {
      this.synth.onvoiceschanged = load;
    }
    load();
  }

  private findVoice(): SpeechSynthesisVoice | null {
    const preferred = ['es-CO', 'es-ES', 'es-MX', 'es'];
    for (const lang of preferred) {
      const match = this.voices.find((v) => v.lang === lang);
      if (match) return match;
    }
    return this.voices.find((v) => v.lang.startsWith('es')) ?? null;
  }

  private getTextForSection(sectionEl: HTMLElement): string {
    const clone = sectionEl.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.tts-player').forEach((el) => el.remove());
    return clone.textContent?.trim().replace(/\s+/g, ' ') ?? '';
  }

  private play(sectionEl: HTMLElement): void {
    if (!this.synth) return;
    this.synth.cancel();

    const text = this.getTextForSection(sectionEl);
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = 'es-CO';
    this.currentUtterance.rate = this.currentRate;

    const voice = this.findVoice();
    if (voice) this.currentUtterance.voice = voice;

    this.currentUtterance.onboundary = (e) => {
      if (e.name === 'word' && this.currentUtterance && e.charIndex !== undefined) {
        const pct = Math.round((e.charIndex / this.currentUtterance.text.length) * 100);
        this.updateProgress(pct, sectionEl);
      }
    };
    this.currentUtterance.onend = () => this.onEnd(sectionEl);
    this.currentUtterance.onerror = (e) => {
      if (e.error !== 'canceled') this.onEnd(sectionEl);
    };

    this.synth.speak(this.currentUtterance);
    this.startResumeInterval();
    this.updateUI('playing', sectionEl);
  }

  private pause(sectionEl: HTMLElement): void {
    if (this.synth?.speaking && !this.synth.paused) {
      this.synth.pause();
      this.updateUI('paused', sectionEl);
    }
  }

  private resume(sectionEl: HTMLElement): void {
    if (this.synth?.paused) {
      this.synth.resume();
      this.updateUI('playing', sectionEl);
    }
  }

  private stop(sectionEl: HTMLElement): void {
    this.synth?.cancel();
    this.stopResumeInterval();
    this.updateUI('stopped', sectionEl);
  }

  private setRate(rate: number, sectionEl: HTMLElement): void {
    this.currentRate = rate;
    if (this.synth?.speaking) {
      this.synth.cancel();
      this.play(sectionEl);
    }
  }

  private startResumeInterval(): void {
    this.stopResumeInterval();
    this.resumeInterval = window.setInterval(() => {
      if (this.synth?.speaking) this.synth.resume();
    }, 14000);
  }

  private stopResumeInterval(): void {
    if (this.resumeInterval !== null) {
      window.clearInterval(this.resumeInterval);
      this.resumeInterval = null;
    }
  }

  private onEnd(sectionEl: HTMLElement): void {
    this.stopResumeInterval();
    this.updateUI('stopped', sectionEl);
  }

  private updateProgress(pct: number, sectionEl: HTMLElement): void {
    const bar = sectionEl.querySelector<HTMLElement>('.tts-progress-bar');
    const progress = sectionEl.querySelector<HTMLElement>('.tts-progress');
    if (bar) bar.style.width = `${pct}%`;
    if (progress) progress.setAttribute('aria-valuenow', String(pct));
  }

  private updateUI(state: PlayerState, sectionEl: HTMLElement): void {
    const player = sectionEl.querySelector<HTMLElement>('.tts-player');
    if (!player) return;

    const playBtn = player.querySelector<HTMLButtonElement>('.tts-play');
    const pauseBtn = player.querySelector<HTMLButtonElement>('.tts-pause');
    const stopBtn = player.querySelector<HTMLButtonElement>('.tts-stop');
    const status = player.querySelector<HTMLElement>('.tts-status');
    const bar = player.querySelector<HTMLElement>('.tts-progress-bar');
    const progress = player.querySelector<HTMLElement>('.tts-progress');

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

  private init(): void {
    if (!this.synth) {
      document.querySelectorAll('.tts-player').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
      return;
    }

    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Escape' || e.keyCode === 27) && this.currentSection) {
        if (this.synth?.speaking || this.synth?.paused) this.stop(this.currentSection);
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && (this.synth?.speaking || this.synth?.paused)) {
        this.synth?.pause();
      }
    });

    document.querySelectorAll<HTMLElement>('[data-tts]').forEach((section) => {
      this.bindSection(section);
    });
  }

  private bindSection(sectionEl: HTMLElement): void {
    const player = sectionEl.querySelector<HTMLElement>('.tts-player');
    if (!player) return;

    const playBtn = player.querySelector<HTMLButtonElement>('.tts-play');
    const pauseBtn = player.querySelector<HTMLButtonElement>('.tts-pause');
    const stopBtn = player.querySelector<HTMLButtonElement>('.tts-stop');
    const speedBtns = player.querySelectorAll<HTMLButtonElement>('.tts-speed-btn');

    playBtn?.addEventListener('click', () => {
      this.currentSection = sectionEl;
      if (this.synth?.paused) {
        this.resume(sectionEl);
      } else {
        this.play(sectionEl);
      }
    });

    pauseBtn?.addEventListener('click', () => this.pause(sectionEl));
    stopBtn?.addEventListener('click', () => this.stop(sectionEl));

    speedBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const speed = parseFloat(btn.dataset.speed || '1');
        speedBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.setRate(speed, sectionEl);
      });
    });
  }
}

export function initTTS(): void {
  new TTSPlayer();
}
