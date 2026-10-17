import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Heart,
  MessageCircle,
  Sparkles,
  Maximize2,
  Flame,
  Check,
  RotateCcw,
  Film,
  Music
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Language } from '../types';
import pinImage from '../assets/pin_image.jpg';

interface VideoTrendingSectionProps {
  lang: Language;
  onOpenRegister: () => void;
}

export const VideoTrendingSection: React.FC<VideoTrendingSectionProps> = ({
  lang,
  onOpenRegister,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [progress, setProgress] = useState<number>(35);
  const [likes, setLikes] = useState<number>(182400);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showCinemaModal, setShowCinemaModal] = useState<boolean>(false);

  const videoReels = [
    {
      id: 'reel-1',
      title: lang === 'fr' ? 'Le Coup de Grâce au Serpent (Ralenti 4K)' : 'The Fatal Serpent Strike (4K Slow-Mo)',
      views: '2.4M',
      tag: lang === 'fr' ? '#1 Tendance Gaming' : '#1 Trending Gaming',
      motionClass: 'animate-video-kenburns',
      focusArea: 'object-center',
      audioName: 'Ophidia Battle - Orchestral Drop',
      duration: '0:18',
      desc: lang === 'fr'
        ? "Regardez la lame runique percer les écailles sous 120 images par seconde. Les étincelles et le venin jaillissent dans la jungle."
        : "Watch the runic blade pierce the scales at 120 FPS. Sparks and venom spray through the canopy."
    },
    {
      id: 'reel-2',
      title: lang === 'fr' ? 'POV : La Gueule Béante du Titan' : 'POV: Gaping Maw of the Titan Wyrm',
      views: '1.8M',
      tag: lang === 'fr' ? 'Tendance TikTok / Reels' : 'Trending Viral Reel',
      motionClass: 'animate-video-pan',
      focusArea: 'object-top',
      audioName: 'Venomous Roar - Bass Boosted',
      duration: '0:15',
      desc: lang === 'fr'
        ? "Immersion à la première personne face aux crochets géants du monstre. Esquive de dernière fraction de seconde."
        : "First-person perspective facing the colossal venom fangs. Split-second reaction dodge."
    },
    {
      id: 'reel-3',
      title: lang === 'fr' ? "L'Étreinte Mortelle des Anneaux" : 'The Deadly Constricting Coils',
      views: '1.2M',
      tag: lang === 'fr' ? 'Cinématique Unreal Engine 5' : 'Unreal Engine 5 Cinematic',
      motionClass: 'animate-video-kenburns',
      focusArea: 'object-bottom',
      audioName: 'Ancient Jungle Awakening - Epic Mix',
      duration: '0:22',
      desc: lang === 'fr'
        ? "Les muscles puissants du serpent broient l'armure de la guerrière avant le contre-choc magique."
        : "Muscular coils crush the warrior armor before the counter magical surge breaks the beast."
    }
  ];

  // Auto-progress video seekbar
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1.2 * speed;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const togglePlay = () => {
    sound.playClick();
    if (!isPlaying) {
      sound.playSlash();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleSound = () => {
    sound.playClick();
    const next = !soundOn;
    setSoundOn(next);
    sound.enabled = next;
  };

  const handleLike = () => {
    sound.playClick();
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      sound.playVictory();
    } else {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  const handleShare = () => {
    sound.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cycleSpeed = () => {
    sound.playClick();
    if (speed === 1) setSpeed(0.5);
    else if (speed === 0.5) setSpeed(1.5);
    else setSpeed(1);
  };

  const activeReel = videoReels[activeReelIndex];

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3 shadow-lg">
          <Film size={14} className="text-amber-400 animate-pulse" />
          <span className="text-gradient-gold">
            {lang === 'fr' ? 'TENDANCE VIDÉO & MOTION REELS' : 'TRENDING VIDEO & MOTION REELS'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-rec-blink" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white font-title text-balance mb-3 text-gradient-gold">
          {lang === 'fr'
            ? 'L’Image Prend Vie : Format Vidéo Viral'
            : 'Images Brought to Life: Viral Video Format'}
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          {lang === 'fr'
            ? "Découvrez l'affrontement du serpent titanesque sous forme d'extraits vidéo cinématiques 4K avec mouvements de caméra, étincelles et son immersif."
            : "Experience the titan serpent clash in dynamic 4K cinematic video reels with camera drift, lens flares, and immersive sound."}
        </p>
      </div>

      {/* Main Video Trending Studio Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center: The Master Cinematic Video Player */}
        <div className="lg:col-span-8">
          <div className="relative rounded-3xl overflow-hidden glass-card-glow border border-amber-400/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.2)] bg-black aspect-video select-none group">
            {/* The Living Motion Image acting as video */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={pinImage}
                alt={activeReel.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${activeReel.focusArea} transition-all duration-1000 ${
                  isPlaying ? activeReel.motionClass : 'scale-105'
                } filter brightness-110 contrast-105 saturate-115`}
              />

              {/* Anamorphic Lens Flare Sweep on Video Playback */}
              {isPlaying && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-[80px] h-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent blur-md animate-flare" />
                </div>
              )}

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />
              <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Video Top HUD (REC indicator, quality, viral tag) */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-rec-blink" />
                  <span className="font-mono">REC</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-amber-400 font-mono">4K 60FPS</span>
                </div>
                <div className="bg-amber-500/20 backdrop-blur-md border border-amber-400/40 px-3 py-1.5 rounded-full text-xs font-bold text-amber-300">
                  {activeReel.tag}
                </div>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={toggleSound}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95 shadow-md"
                  aria-label="Son vidéo"
                >
                  {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={() => setShowCinemaModal(true)}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95 shadow-md"
                  aria-label="Plein écran vidéo"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* TikTok / Reels Style Right Action Floating Bar */}
            <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center gap-4 pointer-events-auto">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className="flex flex-col items-center gap-1 group/btn"
              >
                <div
                  className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                    isLiked
                      ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.6)]'
                      : 'bg-black/60 text-white group-hover/btn:bg-black/80'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </div>
                <span className="text-[11px] font-bold text-white font-mono drop-shadow">
                  {likes.toLocaleString()}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all">
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
                </div>
                <span className="text-[11px] font-bold text-white font-mono drop-shadow">
                  {copied ? 'Copié' : 'Partager'}
                </span>
              </button>

              {/* Sound Disc Vinyl Animation */}
              <div className="w-11 h-11 rounded-full border-2 border-amber-400 p-0.5 bg-black overflow-hidden shadow-lg animate-spin-slow">
                <img src={pinImage} alt="Audio Cover" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            {/* Big Center Play/Pause Trigger */}
            <button
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 bg-black/40'
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-amber-400/90 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.6)] active:scale-95 transition-all">
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" fill="currentColor" />}
              </div>
            </button>

            {/* Bottom Video Controls & Timeline Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 space-y-2 pointer-events-auto">
              {/* Scrub Timeline */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setProgress(pos * 100);
                  sound.playClick();
                }}
                className="w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer relative overflow-hidden transition-all group/bar"
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                </div>
              </div>

              {/* Controls Strip */}
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1 hover:text-amber-400 transition-colors"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                  </button>

                  {/* Audio Equalizer waveform bars */}
                  <div className="flex items-end gap-0.5 h-4">
                    <span className={`w-1 bg-amber-400 rounded-full ${isPlaying ? 'animate-[audioWave_0.8s_ease-in-out_infinite]' : 'h-1.5'}`} />
                    <span className={`w-1 bg-amber-400 rounded-full ${isPlaying ? 'animate-[audioWave_0.5s_ease-in-out_infinite_0.2s]' : 'h-3'}`} />
                    <span className={`w-1 bg-amber-400 rounded-full ${isPlaying ? 'animate-[audioWave_0.9s_ease-in-out_infinite_0.4s]' : 'h-2'}`} />
                    <span className={`w-1 bg-amber-400 rounded-full ${isPlaying ? 'animate-[audioWave_0.6s_ease-in-out_infinite_0.1s]' : 'h-4'}`} />
                  </div>

                  <span className="font-mono text-[11px] text-slate-300">
                    00:{Math.floor((progress * 0.18)).toString().padStart(2, '0')} / {activeReel.duration}
                  </span>

                  <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold truncate max-w-[200px]">
                    <Music size={12} />
                    <span className="truncate">{activeReel.audioName}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed Controller */}
                  <button
                    onClick={cycleSpeed}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono font-bold text-amber-400 transition-colors"
                  >
                    {speed}x
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenRegister();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1"
                  >
                    <span>Jouer au Jeu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Trending Video Reels Playlist */}
        <div className="lg:col-span-4 space-y-3.5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{lang === 'fr' ? 'Extraits Vidéos Tendances (Reels)' : 'Trending Video Reels'}</span>
            <span className="text-amber-400 font-mono">3 Vidéos 4K</span>
          </div>

          {videoReels.map((reel, idx) => (
            <div
              key={reel.id}
              onClick={() => {
                sound.playClick();
                setActiveReelIndex(idx);
                setProgress(0);
                setIsPlaying(true);
              }}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center gap-3.5 border ${
                activeReelIndex === idx
                  ? 'bg-slate-900 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              {/* Thumbnail with Video Play Badge */}
              <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 border border-slate-700">
                <img
                  src={pinImage}
                  alt={reel.title}
                  className={`w-full h-full object-cover ${reel.focusArea} scale-125 filter brightness-105`}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    activeReelIndex === idx ? 'bg-amber-400 text-slate-950' : 'bg-black/60 text-white'
                  }`}>
                    {activeReelIndex === idx && isPlaying ? (
                      <span className="w-2 h-2 bg-slate-950 rounded-sm" />
                    ) : (
                      <Play size={14} fill="currentColor" className="ml-0.5" />
                    )}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 px-1 rounded bg-black/80 font-mono text-[9px] text-white">
                  {reel.duration}
                </div>
              </div>

              {/* Title & Stats */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold mb-0.5">
                  <Flame size={12} />
                  <span>{reel.views} vues</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-emerald-400">{reel.tag}</span>
                </div>

                <h4 className="font-title font-bold text-sm text-white truncate mb-1">
                  {reel.title}
                </h4>

                <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">
                  {reel.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Call to action for full cinematic */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-transparent border border-amber-500/30 text-xs">
            <div className="font-bold text-white mb-1 flex items-center gap-1.5 font-title">
              <Sparkles size={14} className="text-amber-400" />
              <span>{lang === 'fr' ? 'Bande-Annonce Complète 4K' : 'Full 4K Cinematic Trailer'}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
              {lang === 'fr'
                ? 'Vivez la bataille complète du serpent géant avec doublage intégral et effets spéciaux next-gen.'
                : 'Experience the entire colossal duel with full voice acting and next-gen VFX.'}
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setShowCinemaModal(true);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Play size={13} fill="currentColor" className="text-amber-400" />
              <span>{lang === 'fr' ? 'Lancer la Vidéo Complète' : 'Launch Full Video'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Cinema Modal */}
      {showCinemaModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setShowCinemaModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-3xl border border-amber-400/40 overflow-hidden shadow-[0_0_100px_rgba(245,158,11,0.3)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-black/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-rec-blink" />
                <span className="font-title font-bold text-white text-base text-gradient-gold">
                  {activeReel.title}
                </span>
                <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Cinématique Plein Écran
                </span>
              </div>

              <button
                onClick={() => setShowCinemaModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video relative overflow-hidden bg-black flex items-center justify-center">
              <img
                src={pinImage}
                alt={activeReel.title}
                className="w-full h-full object-cover animate-video-kenburns filter brightness-110 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between text-white">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                    OPHIDIA SUPRÊME · VIDÉO CINÉMATIQUE
                  </div>
                  <h3 className="font-title text-xl sm:text-2xl font-black">{activeReel.title}</h3>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setShowCinemaModal(false);
                    onOpenRegister();
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition-all"
                >
                  Jouer Maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
