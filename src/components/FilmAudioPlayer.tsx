import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Disc3,
  Sliders,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Music,
  Flame,
  Radio
} from 'lucide-react';
import { sound, FILM_TRACKS, FilmTheme } from '../utils/audio';

export const FilmAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sound.isMusicPlaying);
  const [volume, setVolumeState] = useState<number>(0.55);
  const [currentTrack, setCurrentTrack] = useState<FilmTheme>('epic');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    // Keep in sync with sound engine state
    const timer = setInterval(() => {
      setIsPlaying(sound.isMusicPlaying);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const handleTogglePlay = () => {
    sound.playClick();
    const playing = sound.toggleFilmMusic();
    setIsPlaying(playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolumeState(val);
    sound.setVolume(val);
  };

  const handleSelectTrack = (theme: FilmTheme) => {
    sound.playClick();
    setCurrentTrack(theme);
    sound.setTrack(theme);
    if (!isPlaying) {
      sound.startFilmMusic();
      setIsPlaying(true);
    }
  };

  const activeTrackInfo = FILM_TRACKS.find((t) => t.id === currentTrack) || FILM_TRACKS[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-auto select-none">
      {/* Expanded Track & Volume Control Tray */}
      {isExpanded && (
        <div className="mb-2 w-80 sm:w-96 rounded-2xl glass-card-glow border border-amber-400/40 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)] animate-fade-in backdrop-blur-2xl bg-slate-950/90 text-slate-100">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Disc3 size={18} className="text-amber-400 animate-spin-slow" />
              <span className="font-title font-bold text-xs uppercase tracking-wider text-gradient-gold">
                Bande Originale du Film
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Audio HD 4K
            </span>
          </div>

          {/* Track Selector */}
          <div className="space-y-1.5 mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Choisir le Thème Musical :
            </div>
            {FILM_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(track.id)}
                className={`w-full text-left p-2 rounded-xl border text-xs transition-all flex items-center justify-between ${
                  currentTrack === track.id
                    ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="font-title font-bold truncate text-[11px]">{track.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">{track.subtitle}</div>
                </div>
                {currentTrack === track.id && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Volume Slider */}
          <div className="space-y-1 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <Volume2 size={13} className="text-amber-400" />
                <span>Volume Symphonique :</span>
              </span>
              <span className="font-mono text-amber-400 font-bold">{Math.round(volume * 100)}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>
      )}

      {/* Main Docked Floating Pill Player */}
      <div className="flex items-center gap-2 p-1.5 pl-3 rounded-full glass-card-glow border border-amber-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.25)] bg-slate-950/90 backdrop-blur-2xl">
        {/* Animated Equalizer Waveform */}
        <div className="flex items-end gap-0.5 h-4 w-5">
          <span className={`w-1 bg-amber-400 rounded-full transition-all ${isPlaying ? 'animate-[audioWave_0.8s_ease-in-out_infinite]' : 'h-1.5'}`} />
          <span className={`w-1 bg-amber-300 rounded-full transition-all ${isPlaying ? 'animate-[audioWave_0.5s_ease-in-out_infinite_0.2s]' : 'h-2.5'}`} />
          <span className={`w-1 bg-amber-500 rounded-full transition-all ${isPlaying ? 'animate-[audioWave_0.9s_ease-in-out_infinite_0.4s]' : 'h-1.5'}`} />
        </div>

        {/* Track Label */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex flex-col text-left pr-2 max-w-[150px] sm:max-w-[200px]"
        >
          <div className="flex items-center gap-1">
            <span className="font-title font-bold text-xs text-white truncate text-gradient-gold">
              {activeTrackInfo.title.split('·')[0]}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 truncate">
            {isPlaying ? '▶ Musique de Film en cours' : '❚❚ Musique en pause'}
          </span>
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          onClick={handleTogglePlay}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center shadow-lg active:scale-95 transition-all shrink-0"
          title={isPlaying ? 'Mettre en pause' : 'Lancer la musique de film'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
        </button>

        {/* Expand / Collapse Tray Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-7 h-7 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 shrink-0 transition-colors"
          title="Réglages de la musique"
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>
    </div>
  );
};
