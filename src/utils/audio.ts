/**
 * Web Audio API synthesizer for interactive ad feedback & Procedural Cinematic Film Soundtrack.
 * No external audio files required, instant playback without network latency or CORS blockers.
 */

export type FilmTheme = 'epic' | 'tribal' | 'dark';

export interface SoundTrackInfo {
  id: FilmTheme;
  title: string;
  subtitle: string;
  bpm: number;
}

export const FILM_TRACKS: SoundTrackInfo[] = [
  {
    id: 'epic',
    title: "L'Éveil d'Ophidia · Thème Symphonique",
    subtitle: "Orchestre de cuivres, taikos et cordes épiques",
    bpm: 96,
  },
  {
    id: 'tribal',
    title: "Traque dans la Canopée · Tambours de Guerre",
    subtitle: "Percussions primitives, shakers et cors de combat",
    bpm: 108,
  },
  {
    id: 'dark',
    title: "La Rage du Serpent Titan · Requiem Sombre",
    subtitle: "Basses profondes, nappes de violoncelles et tension mystique",
    bpm: 82,
  },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public isMusicPlaying: boolean = false;
  public musicVolume: number = 0.55;
  public currentTheme: FilmTheme = 'epic';

  private masterMusicGain: GainNode | null = null;
  public analyser: AnalyserNode | null = null;

  // Music sequencer state
  private musicTimer: number | null = null;
  private currentStep: number = 0;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  public initCtx(): AudioContext | null {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.ctx && !this.masterMusicGain) {
      this.masterMusicGain = this.ctx.createGain();
      this.masterMusicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterMusicGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  // --- Sound Effects (SFX) ---

  public playSlash() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Friction / blade sweep
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.16);
      filter.Q.setValueAtTime(3, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.7, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.15);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      noise.start(now);
      osc.start(now);
      noise.stop(now + 0.2);
      osc.stop(now + 0.2);
    } catch {}
  }

  public playHiss() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin(i / 15);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2800, now);
      filter.frequency.linearRampToValueAtTime(1600, now + 0.3);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.36);
    } catch {}
  }

  public playVictory() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    } catch {}
  }

  public playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  // --- Procedural Movie Soundtrack Engine ---

  public setVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.masterMusicGain && this.ctx) {
      this.masterMusicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  public setTrack(theme: FilmTheme) {
    this.currentTheme = theme;
    if (this.isMusicPlaying) {
      this.stopFilmMusic();
      this.startFilmMusic();
    }
  }

  public toggleFilmMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopFilmMusic();
      return false;
    } else {
      this.startFilmMusic();
      return true;
    }
  }

  public startFilmMusic() {
    this.initCtx();
    if (!this.ctx || !this.masterMusicGain) return;
    this.stopFilmMusic();

    this.isMusicPlaying = true;
    this.currentStep = 0;

    // Start continuous orchestral bass drone
    this.startBassDrone();

    const bpm = this.currentTheme === 'tribal' ? 108 : this.currentTheme === 'dark' ? 80 : 96;
    const stepDurationMs = (60 / bpm / 2) * 1000; // 8th note steps

    this.musicTimer = window.setInterval(() => {
      this.executeFilmStep();
      this.currentStep = (this.currentStep + 1) % 32;
    }, stepDurationMs);
  }

  public stopFilmMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.droneOsc) {
      try {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      } catch {}
      this.droneOsc = null;
    }
  }

  private startBassDrone() {
    if (!this.ctx || !this.masterMusicGain) return;
    const now = this.ctx.currentTime;

    const baseFreq = this.currentTheme === 'dark' ? 55 : this.currentTheme === 'tribal' ? 65.41 : 73.42; // A1 or C2 or D2

    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = 'sawtooth';
    this.droneOsc.frequency.setValueAtTime(baseFreq, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.linearRampToValueAtTime(0.25, now + 1.5);

    this.droneOsc.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.masterMusicGain);

    this.droneOsc.start(now);
  }

  private executeFilmStep() {
    if (!this.ctx || !this.masterMusicGain) return;
    const now = this.ctx.currentTime;
    const step = this.currentStep;

    // 1. Cinematic Taiko / War Drum on strong beats
    const isTaikoBeat =
      this.currentTheme === 'tribal'
        ? step % 4 === 0 || step === 6 || step === 14 || step === 22 || step === 30
        : step % 4 === 0 || step === 10 || step === 26;

    if (isTaikoBeat) {
      this.playTaikoDrum(now, step === 0 || step === 16);
    }

    // 2. War Shaker / Percussive clicks (tribal rhythm)
    if (this.currentTheme === 'tribal' && step % 2 === 1) {
      this.playJungleRattle(now);
    }

    // 3. Brass Horn & French Horn Fanfares
    if (this.currentTheme === 'epic') {
      const brassPattern: Record<number, number> = {
        0: 146.83, // D3
        4: 174.61, // F3
        8: 220.0,  // A3
        12: 196.0, // G3
        16: 146.83,// D3
        20: 174.61,// F3
        24: 261.63,// C4
        28: 220.0  // A3
      };
      if (brassPattern[step]) {
        this.playEpicBrassHorn(now, brassPattern[step]);
      }
    } else if (this.currentTheme === 'dark') {
      const darkBrass: Record<number, number> = {
        0: 110.0,  // A2
        8: 103.83, // G#2 (dissonant tension)
        16: 116.54,// Bb2
        24: 110.0  // A2
      };
      if (darkBrass[step]) {
        this.playEpicBrassHorn(now, darkBrass[step], 1.8);
      }
    }

    // 4. Ethereal High Strings / Harp Arpeggio
    if (step % 2 === 0) {
      const arpeggioNotes =
        this.currentTheme === 'dark'
          ? [220, 261.63, 311.13, 440]
          : [293.66, 349.23, 440.0, 523.25, 587.33];
      const note = arpeggioNotes[(step / 2) % arpeggioNotes.length];
      this.playStringsNote(now, note);
    }
  }

  private playTaikoDrum(time: number, isAccent: boolean) {
    if (!this.ctx || !this.masterMusicGain) return;

    // Sub-bass thump
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    const startFreq = isAccent ? 130 : 100;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.35);

    const amp = isAccent ? 0.8 : 0.55;
    gain.gain.setValueAtTime(amp, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc.connect(gain);
    gain.connect(this.masterMusicGain);

    osc.start(time);
    osc.stop(time + 0.45);

    // Crack / skin slap transient
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    noise.connect(noiseGain);
    noiseGain.connect(this.masterMusicGain);
    noise.start(time);
    noise.stop(time + 0.06);
  }

  private playJungleRattle(time: number) {
    if (!this.ctx || !this.masterMusicGain) return;
    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterMusicGain);

    noise.start(time);
    noise.stop(time + 0.035);
  }

  private playEpicBrassHorn(time: number, freq: number, duration: number = 1.1) {
    if (!this.ctx || !this.masterMusicGain) return;

    // Double detuned oscillator for rich brass ensemble sound
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 1.006, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, time);
    filter.frequency.exponentialRampToValueAtTime(1400, time + 0.3);
    filter.frequency.exponentialRampToValueAtTime(400, time + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.32, time + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterMusicGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.1);
    osc2.stop(time + duration + 0.1);
  }

  private playStringsNote(time: number, freq: number) {
    if (!this.ctx || !this.masterMusicGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc.connect(gain);
    gain.connect(this.masterMusicGain);

    osc.start(time);
    osc.stop(time + 0.45);
  }
}

export const sound = new SoundEngine();
