import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Sword, Trophy, ArrowUp, CheckCircle, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { AdConfig, Language } from '../types';
import pinImage from '../assets/pin_image.jpg';

interface StoryAdProps {
  config: AdConfig;
  lang: Language;
  onOpenRegister: () => void;
}

interface DamageNumber {
  id: number;
  x: number;
  y: number;
  amount: number;
  critical: boolean;
}

export const StoryAd: React.FC<StoryAdProps> = ({ config, lang, onOpenRegister }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [bossHp, setBossHp] = useState<number>(100);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([]);
  const [isSlashing, setIsSlashing] = useState<boolean>(false);
  const [slashAngle, setSlashAngle] = useState<number>(30);
  const containerRef = useRef<HTMLDivElement>(null);

  const storySlides = [
    {
      title: lang === 'fr' ? "1. L'Embuscade du Serpent" : "1. The Serpent Ambush",
      subtitle: lang === 'fr' ? "Le prédateur géant surgit des ténèbres" : "Giant apex predator strikes from canopy",
      zoomClass: "scale-100 object-center",
      accent: "text-emerald-400"
    },
    {
      title: lang === 'fr' ? "2. La Morsure Béante du Titan" : "2. The Titan's Deadly Maw",
      subtitle: lang === 'fr' ? "Crochets acérés et venin corrupteur" : "Razor fangs and corrosive reptile venom",
      zoomClass: "scale-125 object-top",
      accent: "text-rose-400"
    },
    {
      title: lang === 'fr' ? "3. L'Épée dans les Anneaux" : "3. Impalement of the Beast",
      subtitle: lang === 'fr' ? "Frappe décisive au cœur des écailles" : "Decisive blade pierce through scales",
      zoomClass: "scale-135 object-center",
      accent: "text-amber-400"
    }
  ];

  // Auto progression across the 3 story slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % storySlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [storySlides.length]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    sound.playClick();
  };

  const handleBattleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isVictory) return;

    sound.playSlash();
    if (navigator.vibrate) {
      try { navigator.vibrate(30); } catch {}
    }

    setIsSlashing(true);
    setSlashAngle(Math.floor(Math.random() * 60) - 30);
    setTimeout(() => setIsSlashing(false), 300);

    const rect = containerRef.current?.getBoundingClientRect();
    const clientX = e.clientX || 180;
    const clientY = e.clientY || 300;
    const x = rect ? clientX - rect.left : 180;
    const y = rect ? clientY - rect.top : 300;

    const isCrit = Math.random() > 0.4;
    const dmg = isCrit ? 35 : 25;

    const newNum: DamageNumber = {
      id: Date.now() + Math.random(),
      x,
      y,
      amount: dmg,
      critical: isCrit,
    };

    setDamageNumbers((prev) => [...prev.slice(-4), newNum]);
    setTimeout(() => {
      setDamageNumbers((prev) => prev.filter((n) => n.id !== newNum.id));
    }, 900);

    setBossHp((prev) => {
      const nextHp = Math.max(0, prev - dmg);
      if (nextHp === 0 && !isVictory) {
        setIsVictory(true);
        sound.playVictory();
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
        });
      }
      return nextHp;
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setBossHp(100);
    setIsVictory(false);
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setActiveSlide((prev) => (prev === 0 ? storySlides.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setActiveSlide((prev) => (prev + 1) % storySlides.length);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleBattleTap}
      className="relative w-full h-full max-w-[420px] aspect-[9/16] mx-auto overflow-hidden rounded-3xl shadow-2xl bg-slate-950 select-none cursor-pointer border border-slate-800"
    >
      {/* Background Snake Creative with Multi-Slide Focal Zoom */}
      <img
        src={pinImage}
        alt="Serpent Géant Titanesque en plein combat"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out animate-video-kenburns ${
          storySlides[activeSlide].zoomClass
        } ${isSlashing ? 'filter brightness-135 contrast-125' : 'filter brightness-112 contrast-105 saturate-115'}`}
      />

      {/* Atmospheric Luminous Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-black/45 pointer-events-none" />
      <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none" />

      {/* Story Slide Progress Bars */}
      <div className="absolute top-3 left-4 right-4 z-30 flex gap-1.5 pointer-events-auto">
        {storySlides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              setActiveSlide(idx);
            }}
            className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20 transition-all hover:bg-white/40"
          >
            <div
              className={`h-full transition-all duration-300 ${
                activeSlide === idx
                  ? 'bg-amber-400 w-full'
                  : activeSlide > idx
                  ? 'bg-white w-full'
                  : 'w-0'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Top Bar Header */}
      <div className="absolute top-7 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2.5">
          {/* Multiple Serpent Avatar Stamps */}
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-slate-900 shadow-lg relative">
            <img src={pinImage} alt="Serpent Avatar" className="w-full h-full object-cover scale-150" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white text-xs font-black tracking-wide drop-shadow font-title">
                SERPENT SUPRÊME
              </span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider bg-black/60 px-1 rounded">
                PROMO
              </span>
            </div>
            <div className="text-[11px] text-slate-300 drop-shadow flex items-center gap-1">
              <span>{storySlides[activeSlide].title}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSound}
            aria-label="Activer ou couper le son"
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center border border-white/10 active:scale-95 transition-transform"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </div>

      {/* Slide Navigation Triggers (Left / Right) */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 text-white/80 hover:text-white flex items-center justify-center pointer-events-auto backdrop-blur-sm"
        aria-label="Photo précédente du serpent"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 text-white/80 hover:text-white flex items-center justify-center pointer-events-auto backdrop-blur-sm"
        aria-label="Photo suivante du serpent"
      >
        <ChevronRight size={18} />
      </button>

      {/* Interactive Quick Time Event Boss Bar */}
      <div className="absolute top-20 left-4 right-4 z-20 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md rounded-2xl p-3 border border-amber-500/40 shadow-xl">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Sword size={14} className="text-amber-400" />
              <span>{lang === 'fr' ? 'Léviathan Serpent Suprême' : 'Supreme Serpent Leviathan'}</span>
            </div>
            <span className="font-mono text-[11px] text-amber-300 tabular-nums font-bold">
              {bossHp} / 100 HP
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                bossHp > 50
                  ? 'bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500'
                  : 'bg-gradient-to-r from-amber-500 to-rose-600'
              }`}
              style={{ width: `${bossHp}%` }}
            />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-300">
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Sparkles size={11} className="text-amber-400" />
              {lang === 'fr' ? 'Touchez l’image pour frapper le serpent !' : 'Tap image to strike the serpent!'}
            </span>
            <span className="text-emerald-400 font-bold">{config.badgeText}</span>
          </div>
        </div>
      </div>

      {/* Multiple Serpent Snapshot Thumbnails Bar */}
      <div className="absolute top-36 left-4 z-20 flex items-center gap-1.5 pointer-events-auto">
        {storySlides.map((slide, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              setActiveSlide(i);
            }}
            className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${
              activeSlide === i ? 'border-amber-400 scale-105 shadow-md' : 'border-white/20 opacity-60'
            }`}
          >
            <img src={pinImage} alt="Angle serpent" className={`w-full h-full object-cover ${slide.zoomClass}`} />
          </button>
        ))}
      </div>

      {/* Slash Particle Effect */}
      {isSlashing && (
        <div
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden"
          style={{ transform: `rotate(${slashAngle}deg)` }}
        >
          <div className="w-[130%] h-2.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_25px_#f59e0b] animate-slash" />
        </div>
      )}

      {/* Pop-up Damage Numbers */}
      {damageNumbers.map((dmg) => (
        <div
          key={dmg.id}
          className="absolute z-30 font-black pointer-events-none text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] animate-bounce"
          style={{
            left: `${dmg.x}px`,
            top: `${dmg.y - 30}px`,
            color: dmg.critical ? '#f59e0b' : '#ef4444',
          }}
        >
          {dmg.critical ? `CRITIQUE! -${dmg.amount}` : `-${dmg.amount}`}
        </div>
      ))}

      {/* Victory Overlay Modal */}
      {isVictory && (
        <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in pointer-events-auto">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 mb-3 shadow-[0_0_35px_rgba(245,158,11,0.5)]">
            <Trophy size={32} />
          </div>

          <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-1 font-title">
            {lang === 'fr' ? 'SERPENT VAINCU !' : 'SERPENT SLAIN!'}
          </h3>
          <p className="text-xs text-amber-300 font-bold mb-3">
            {lang === 'fr' ? 'Trophée Suprême Débloqué' : 'Supreme Trophy Unlocked'}
          </p>

          <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-3.5 mb-5 w-full text-left">
            <div className="text-[11px] text-slate-400 mb-1">
              {lang === 'fr' ? 'Votre butin suprême :' : 'Your supreme spoils:'}
            </div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle size={14} />
              <span>{config.discountBonus}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onOpenRegister();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/30 hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              <span>{config.ctaText}</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw size={14} />
              <span>{lang === 'fr' ? 'Rejouer le combat contre le serpent' : 'Replay serpent battle'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Drawer (Ad Call To Action) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pointer-events-auto">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
          <span className="font-title font-black text-base text-white tracking-wide truncate max-w-[240px]">
            {config.gameTitle}
          </span>
          <span className="text-amber-400 font-bold tabular-nums">★ {config.ratingScore}</span>
        </div>

        <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
          {config.tagline}
        </p>

        {/* Unboxed Metadata (Rule: No pill capsules) */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
          <span>{config.genre}</span>
          <span aria-hidden="true">·</span>
          <span>{config.releaseDate}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-semibold">Gratuit</span>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onOpenRegister();
          }}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>{config.ctaText}</span>
          <ArrowUp size={16} className="rotate-45" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 mt-2">
          <span>{lang === 'fr' ? 'Glissez pour affronter le Serpent Suprême' : 'Swipe up to face the Supreme Serpent'}</span>
          <ArrowUp size={12} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
};
