import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Zap, ShieldAlert, Sparkles, Trophy, RotateCcw, ArrowRight, Sword, Flame, Eye } from 'lucide-react';
import { sound } from '../utils/audio';
import { AdConfig, Language } from '../types';
import pinImage from '../assets/pin_image.jpg';

interface PlayableAdProps {
  config: AdConfig;
  lang: Language;
  onOpenRegister: () => void;
}

type CombatAction = 'slash' | 'parry' | 'magic';

export const PlayableAd: React.FC<PlayableAdProps> = ({ config, lang, onOpenRegister }) => {
  const [bossHp, setBossHp] = useState<number>(100);
  const [combo, setCombo] = useState<number>(0);
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [shake, setShake] = useState<boolean>(false);
  const [activeVfx, setActiveVfx] = useState<CombatAction | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const serpentPhases = [
    {
      name: lang === 'fr' ? 'Phase 1 : Le Serpent des Marais' : 'Phase 1: Swamp Serpent',
      filterStyle: 'filter brightness-100 contrast-105',
      accentColor: 'text-emerald-400',
      badge: lang === 'fr' ? 'Venin Actif' : 'Poison Strike',
      description: lang === 'fr' ? "Le serpent géant crache un venin acide corrosif." : "Giant serpent sprays acid venom."
    },
    {
      name: lang === 'fr' ? 'Phase 2 : Étreinte Meurtrière' : 'Phase 2: Death Constriction',
      filterStyle: 'filter brightness-90 contrast-125 saturate-120',
      accentColor: 'text-amber-400',
      badge: lang === 'fr' ? 'Anneaux Serrés' : 'Constricting',
      description: lang === 'fr' ? "Ses anneaux massifs broient l'acier runique." : "Massive coils wrap and crush runic steel."
    },
    {
      name: lang === 'fr' ? 'Phase 3 : SERPENT SUPRÊME ÉVEILLÉ' : 'Phase 3: SUPREME SERPENT AWAKENED',
      filterStyle: 'filter brightness-110 contrast-130 saturate-150 hue-rotate-[15deg]',
      accentColor: 'text-rose-400',
      badge: lang === 'fr' ? 'RAGE TITANESQUE' : 'TITAN FURY',
      description: lang === 'fr' ? "L'avatar primordial du serpent déchaîne sa pleine fureur." : "The primal wyrm unleashes catastrophic fury."
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const triggerAction = (action: CombatAction) => {
    if (isVictory) return;

    sound.playSlash();
    setShake(true);
    setActiveVfx(action);
    setTimeout(() => {
      setShake(false);
      setActiveVfx(null);
    }, 400);

    const dmgMultiplier = 1 + combo * 0.15;
    let baseDmg = 25;
    let actionLabel = '';

    if (action === 'slash') {
      baseDmg = 30;
      actionLabel = lang === 'fr' ? 'Estoc dans la Gueule du Serpent !' : 'Blade Strike in Serpent Maw!';
    } else if (action === 'parry') {
      baseDmg = 40;
      actionLabel = lang === 'fr' ? 'Brise-Anneaux Critique !' : 'Coil Breaker Critical!';
    } else if (action === 'magic') {
      baseDmg = 35;
      actionLabel = lang === 'fr' ? 'Foudre Anti-Venin Suprême !' : 'Anti-Venom Supreme Lightning!';
    }

    const calculatedDmg = Math.round(baseDmg * dmgMultiplier);
    setLastAction(`${actionLabel} -${calculatedDmg} HP`);
    setCombo((c) => c + 1);

    setBossHp((prev) => {
      const next = Math.max(0, prev - calculatedDmg);
      if (next <= 35 && selectedPhase < 2) {
        setSelectedPhase(2);
      } else if (next <= 70 && selectedPhase < 1) {
        setSelectedPhase(1);
      }

      if (next === 0) {
        setIsVictory(true);
        sound.playVictory();
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.5 },
        });
      }
      return next;
    });
  };

  const resetPlayable = () => {
    sound.playClick();
    setBossHp(100);
    setCombo(0);
    setSelectedPhase(0);
    setLastAction(null);
    setIsVictory(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Parallax Canvas */}
      <div
        className={`relative aspect-[4/5] sm:aspect-[1/1] overflow-hidden transition-transform duration-200 ease-out ${
          shake ? 'animate-bounce' : ''
        }`}
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        }}
      >
        <img
          src={pinImage}
          alt="Serpent Géant en combat 3D"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover scale-105 transition-all duration-500 ${
            serpentPhases[selectedPhase].filterStyle
          }`}
        />

        {/* Ambient Dark Fantasy Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/60 pointer-events-none" />

        {/* Interactive Playable Ad Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-title">{serpentPhases[selectedPhase].name}</span>
          </div>

          {combo > 1 && (
            <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 px-2.5 py-1 rounded-lg font-black text-xs tracking-wider shadow-lg animate-pulse">
              COMBO x{combo}
            </div>
          )}
        </div>

        {/* Boss HP HUD */}
        <div className="absolute top-16 left-4 right-4 z-20 pointer-events-none">
          <div className="bg-slate-950/85 backdrop-blur-md rounded-2xl p-3 border border-amber-500/40 shadow-xl">
            <div className="flex items-center justify-between text-xs text-white mb-1.5 font-bold">
              <span className="flex items-center gap-1.5 text-amber-300 font-title">
                <Flame size={14} className="text-amber-400" />
                {lang === 'fr' ? 'Serpent Suprême Millénaire' : 'Supreme Millennial Serpent'}
              </span>
              <span className="font-mono text-amber-400 tabular-nums font-bold">{bossHp}% HP</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 transition-all duration-300"
                style={{ width: `${bossHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Combat FX Overlay */}
        {activeVfx && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center bg-amber-500/15">
            <div className="text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-ping font-title">
              ⚡ COUP D'ESTOC SUR LE SERPENT ⚡
            </div>
          </div>
        )}

        {/* Action feedback label */}
        {lastAction && !isVictory && (
          <div className="absolute bottom-28 inset-x-0 z-20 flex justify-center pointer-events-none">
            <div className="bg-black/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/50 text-xs font-bold text-amber-300 shadow-xl animate-fade-in">
              {lastAction}
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {isVictory && (
          <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 mb-3 shadow-[0_0_30px_rgba(245,158,11,0.6)]">
              <Trophy size={32} />
            </div>
            <h3 className="font-title text-2xl font-black text-white mb-1">
              {lang === 'fr' ? 'LE SERPENT SUPRÊME EST TERRASSÉ !' : 'THE SUPREME SERPENT IS SLAIN!'}
            </h3>
            <p className="text-xs text-slate-300 mb-4 max-w-xs">
              {lang === 'fr'
                ? "Vous avez vaincu le monstre le plus redouté de la canopée. Vos récompenses de pré-commande sont prêtes !"
                : "You crushed the most feared apex beast. Your pre-order rewards are ready!"}
            </p>

            <div className="w-full max-w-sm flex flex-col gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>{config.ctaText}</span>
              </button>
              <button
                onClick={resetPlayable}
                className="py-2.5 px-4 rounded-xl text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw size={13} />
                <span>{lang === 'fr' ? 'Affronter à nouveau le serpent' : 'Face the serpent again'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Multiple Serpent Phase Selector (Multiplied image views) */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
          {lang === 'fr' ? 'Formes du Serpent :' : 'Serpent Forms:'}
        </span>
        <div className="flex items-center gap-2">
          {serpentPhases.map((phase, i) => (
            <button
              key={i}
              onClick={() => {
                sound.playClick();
                setSelectedPhase(i);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                selectedPhase === i
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="w-4 h-4 rounded-full overflow-hidden border border-white/20">
                <img src={pinImage} alt="Mini serpent" className={`w-full h-full object-cover ${phase.filterStyle}`} />
              </div>
              <span>{phase.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Combat Controllers */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-center mb-3">
          {lang === 'fr' ? 'Attaquez le Serpent :' : 'Strike the Serpent:'}
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <button
            onClick={() => triggerAction('slash')}
            disabled={isVictory}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 border border-slate-700 hover:border-amber-400/50 flex flex-col items-center gap-1 text-center transition-all disabled:opacity-40"
          >
            <Sword size={20} className="text-amber-400" />
            <span className="text-xs font-bold text-white">
              {lang === 'fr' ? 'Tranchant' : 'Slash'}
            </span>
            <span className="text-[10px] text-amber-300 font-mono font-bold">30 DMG</span>
          </button>

          <button
            onClick={() => triggerAction('parry')}
            disabled={isVictory}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 border border-slate-700 hover:border-emerald-400/50 flex flex-col items-center gap-1 text-center transition-all disabled:opacity-40"
          >
            <ShieldAlert size={20} className="text-emerald-400" />
            <span className="text-xs font-bold text-white">
              {lang === 'fr' ? 'Contre-Anneau' : 'Coil Parry'}
            </span>
            <span className="text-[10px] text-emerald-300 font-mono font-bold">Crit 40</span>
          </button>

          <button
            onClick={() => triggerAction('magic')}
            disabled={isVictory}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 border border-slate-700 hover:border-cyan-400/50 flex flex-col items-center gap-1 text-center transition-all disabled:opacity-40"
          >
            <Zap size={20} className="text-cyan-400" />
            <span className="text-xs font-bold text-white">
              {lang === 'fr' ? 'Foudre Suprême' : 'Lightning'}
            </span>
            <span className="text-[10px] text-cyan-300 font-mono font-bold">35 DMG</span>
          </button>
        </div>

        {/* Card CTA & Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <div className="text-xs text-slate-400">
            <span className="font-bold text-white font-title">{config.gameTitle}</span>
            <span className="block text-[11px] text-emerald-400">{config.discountBonus}</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenRegister();
            }}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span>{config.ctaText}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
