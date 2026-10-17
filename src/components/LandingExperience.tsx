import React, { useState } from 'react';
import { Play, Sparkles, Shield, Flame, Users, ChevronRight, CheckCircle2, Award, Zap, Star, Eye, Maximize2, X, Download } from 'lucide-react';
import { sound } from '../utils/audio';
import { AdConfig, Language } from '../types';
import pinImage from '../assets/pin_image.jpg';
import { AdBanner728x90 } from './AdBanner728x90';
import { VideoTrendingSection } from './VideoTrendingSection';

interface LandingExperienceProps {
  config: AdConfig;
  lang: Language;
  onOpenRegister: () => void;
}

export const LandingExperience: React.FC<LandingExperienceProps> = ({ config, lang, onOpenRegister }) => {
  const [activeTab, setActiveTab] = useState<'gameplay' | 'lore' | 'arsenal'>('gameplay');
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [selectedSerpentView, setSelectedSerpentView] = useState<string | null>(null);

  // Bestiary Cards multiplying the serpent image with focal crops
  const serpentAnatomyCards = [
    {
      title: lang === 'fr' ? 'La Gueule Béante du Serpent' : "The Serpent's Gaping Maw",
      crop: 'scale-150 object-top',
      filter: 'brightness-105',
      stat: '900 mm',
      statLabel: lang === 'fr' ? 'Ouverture max' : 'Max Jaw Spread',
      desc: lang === 'fr'
        ? "Des crochets venimeux capables de perforer l'acier forgé et de sécréter une neurotoxine paralysante instantanée."
        : "Venom fangs capable of puncturing forged steel and injecting instant paralyzing neurotoxins."
    },
    {
      title: lang === 'fr' ? "L'Étreinte Mortelle du Python" : 'Constricting Death Coils',
      crop: 'scale-140 object-bottom',
      filter: 'contrast-120',
      stat: '4 200 kg',
      statLabel: lang === 'fr' ? 'Pression au cm²' : 'Crush Pressure',
      desc: lang === 'fr'
        ? "Des anneaux musculaires gigantesques qui enserrent leur proie et brisent os et boucliers en quelques secondes."
        : "Gigantic muscular coils that entrap prey, shattering bone and shield within seconds."
    },
    {
      title: lang === 'fr' ? "L'Impact Décisif de la Lame" : 'The Decisive Blade Strike',
      crop: 'scale-130 object-center',
      filter: 'saturate-130',
      stat: '1 250 DMG',
      statLabel: lang === 'fr' ? 'Point Critique' : 'Critical Point',
      desc: lang === 'fr'
        ? "L'unique faiblesse du titan : la voûte du palais où l'acier runique de la chasseresse peut pénétrer."
        : "The apex predator's single vulnerability: the palate roof where runic steel can pierce."
    },
    {
      title: lang === 'fr' ? 'Le Regard du Prédateur Ancien' : 'Gaze of the Primal Predator',
      crop: 'scale-160 object-top-left',
      filter: 'brightness-95 contrast-125',
      stat: '360°',
      statLabel: lang === 'fr' ? 'Perception Thermique' : 'Thermal Perception',
      desc: lang === 'fr'
        ? "Des fosses thermosensibles qui détectent le moindre battement de cœur à travers la brume épaisse de la jungle."
        : "Infrared heat-sensing pits detecting the faintest heartbeat across thick jungle mist."
    }
  ];

  // Gallery of serpent visual variations multiplying the image across the page
  const serpentGalleryShots = [
    {
      name: lang === 'fr' ? 'Affiche Suprême Officielle' : 'Official Supreme Artwork',
      style: 'filter brightness-100',
      label: '4K Ultra-HD'
    },
    {
      name: lang === 'fr' ? 'Mode Nuit de Sang' : 'Blood Moon Mode',
      style: 'filter brightness-90 contrast-130 hue-rotate-[330deg] saturate-150',
      label: 'Événement Sombre'
    },
    {
      name: lang === 'fr' ? 'Vision Thermique Anti-Serpent' : 'Thermal Huntress Vision',
      style: 'filter invert-[0.1] contrast-150 saturate-200 hue-rotate-[90deg]',
      label: 'Scanner Tactique'
    },
    {
      name: lang === 'fr' ? 'Brume d’Émeraude Toxique' : 'Toxic Emerald Canopy',
      style: 'filter brightness-95 saturate-140 hue-rotate-[45deg]',
      label: 'Zone Marais'
    },
    {
      name: lang === 'fr' ? 'Impact Électrique Saphir' : 'Sapphire Lightning Burst',
      style: 'filter brightness-110 contrast-125 hue-rotate-[180deg]',
      label: 'Attaque Runique'
    },
    {
      name: lang === 'fr' ? 'Légende Dorée des Anciens' : 'Golden Ancient Relic',
      style: 'filter sepia-[0.6] brightness-105 contrast-115',
      label: 'Codex Mythique'
    }
  ];

  const features = [
    {
      icon: <Flame className="text-amber-400" size={24} />,
      title: lang === 'fr' ? 'Duel de Boss Titanesque' : 'Colossal Titan Boss Duels',
      desc: lang === 'fr'
        ? "Affrontez le serpent géant mesurant plus de 18 mètres, avec localisation précise des impacts et démembrement cinématique."
        : "Battle an 18-meter colossal serpent featuring precise anatomical hitboxes and procedural coil wraps."
    },
    {
      icon: <Shield className="text-emerald-400" size={24} />,
      title: lang === 'fr' ? 'Canopée Primitive Sans Chargement' : 'Seamless Primal Canopy',
      desc: lang === 'fr'
        ? "Explorez la jungle tropicale, les ruines ophidiennes et le nid du grand reptile sans aucun écran de chargement."
        : "Explore lush tropical rainforests, forgotten serpentine ruins, and monster lairs with zero loading screens."
    },
    {
      icon: <Users className="text-cyan-400" size={24} />,
      title: lang === 'fr' ? 'Traque Coopérative Cross-Play' : 'Cross-Play Co-op Raids',
      desc: lang === 'fr'
        ? "Chassez le grand serpent en escouade de 4 joueurs simultanés sur Mobile (iOS & Android) et PC 4K."
        : "Hunt the supreme serpent with up to 4 allies seamlessly synchronized between Mobile and PC."
    }
  ];

  const weapons = [
    {
      name: lang === 'fr' ? "Lame Fendeuse de Serpent" : "Serpent-Cleaver Blade",
      type: lang === 'fr' ? "Épée forgée en acier météorique" : "Meteorite Steel Sword",
      damage: "1 480 ATK",
      passive: lang === 'fr' ? "+50% Dégâts critiques sur la tête du serpent" : "+50% Critical damage on serpent head"
    },
    {
      name: lang === 'fr' ? "Lance Harpon Anti-Anneaux" : "Coil-Breaker Harpoon",
      type: lang === 'fr' ? "Arme d'estoc longue portée" : "Heavy Piercing Lance",
      damage: "1 220 ATK",
      passive: lang === 'fr' ? "Brise instantanément l'étreinte du python" : "Instantly severs constricting coils"
    },
    {
      name: lang === 'fr' ? "Dague Spectrale de Venin" : "Venomous Spectral Dagger",
      type: lang === 'fr' ? "Lame courte enchantée" : "Enchanted Shortblade",
      damage: "990 ATK",
      passive: lang === 'fr' ? "Immunité totale contre les toxines reptiliennes" : "Immunity against all reptile toxins"
    }
  ];

  return (
    <div className="w-full bg-[#0d1318] text-slate-100 relative overflow-hidden">
      {/* Radiant Sunbeam & Ambient Light Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-sunbeam" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Hero Section Featuring the Giant Serpent */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-amber-500/20">
        {/* Background Visual Layer with High Luminosity */}
        <div className="absolute inset-0 z-0">
          <img
            src={pinImage}
            alt="Le Serpent Géant Titanesque et la Guerrière"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 filter brightness-105 contrast-105 saturate-115 animate-video-kenburns"
          />
          {/* Luminous soft ambient gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1318]/95 via-[#0d1318]/65 to-transparent/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1318] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(245,158,11,0.2),transparent_60%)] pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Supreme Badge Header */}
            <div className="flex items-center gap-3 text-xs font-bold text-amber-300">
              <Sparkles size={16} className="text-amber-400" />
              <span className="uppercase tracking-widest text-gradient-gold font-mono">{config.badgeText}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-200 font-mono">{config.releaseDate}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-emerald-300 font-semibold">{lang === 'fr' ? 'COMBAT DU SERPENT' : 'SERPENT CLASH'}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none font-title text-balance text-gradient-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {config.gameTitle}
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed font-normal drop-shadow">
              {config.tagline}
            </p>

            {/* Proof Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <Star size={16} className="text-amber-400" fill="currentColor" />
                <span className="text-base font-bold tabular-nums font-mono">{config.ratingScore}</span>
                <span className="text-slate-400">/ 5.0</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-emerald-400" />
                <span className="font-bold text-slate-200">185 000+</span>
                <span>{lang === 'fr' ? 'Guerriers prêts au combat' : 'Hunters ready for the hunt'}</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Award size={16} className="text-amber-400" />
                <span>{lang === 'fr' ? 'Boss Suprême 18 Mètres' : '18m Supreme Boss'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenRegister();
                }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base tracking-wide shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{config.ctaText}</span>
                <ChevronRight size={18} />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setShowTrailer(true);
                }}
                className="px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-amber-400/50 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Play size={16} fill="currentColor" className="text-amber-400" />
                <span>{lang === 'fr' ? 'Cinématique du Serpent (4K)' : 'Watch Serpent Reveal (4K)'}</span>
              </button>
            </div>

            {/* Bonus Perk Strip */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2.5 max-w-xl">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span className="font-semibold">{config.discountBonus}</span>
            </div>
          </div>

          {/* Multiple Serpent Zoom Stamps on Hero */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 backdrop-blur-xl shadow-2xl relative">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-title">
                <Flame size={14} />
                <span>{lang === 'fr' ? 'Instantané du Combat' : 'Live Combat Snapshot'}</span>
              </div>

              {/* Main focal view */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative group cursor-pointer" onClick={() => setShowTrailer(true)}>
                <img src={pinImage} alt="Serpent Titan combat" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Multiple mini Serpent crops side-by-side */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl overflow-hidden border border-slate-700 h-16 relative">
                  <img src={pinImage} alt="Morsure serpent" className="w-full h-full object-cover scale-150 object-top" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-black/80 px-1 rounded text-white font-bold">Morsure</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700 h-16 relative">
                  <img src={pinImage} alt="Anneaux serpent" className="w-full h-full object-cover scale-150 object-bottom" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-black/80 px-1 rounded text-white font-bold">Anneaux</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700 h-16 relative">
                  <img src={pinImage} alt="Estoc épée" className="w-full h-full object-cover scale-150 object-center" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-black/80 px-1 rounded text-white font-bold">Lame</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trending Video Reels Section (Tendance Vidéo aux Images) */}
      <VideoTrendingSection lang={lang} onOpenRegister={onOpenRegister} />

      {/* 3. Dedicated Section: BESTIAIRE & ANATOMIE DU SERPENT TITANESQUE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 font-mono">
            {lang === 'fr' ? 'OBSERVATION DU PRÉDATEUR APEX' : 'APEX PREDATOR SURVEILLANCE'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-title text-balance">
            {lang === 'fr'
              ? 'L’Anatomie du Serpent Titanesque'
              : 'Anatomy of the Titan Serpent'}
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Découvrez en gros plan les mécanismes mortels de la bête avant de vous engager dans la canopée.'
              : 'Examine close-up views of the colossal beast’s lethality before entering the rainforest.'}
          </p>
        </div>

        {/* 4 Multiplied Serpent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serpentAnatomyCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 group flex flex-col shadow-xl"
            >
              {/* Image slot cropped specifically on that serpent detail */}
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-950">
                <img
                  src={pinImage}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${card.crop} ${card.filter}`}
                />
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-right">
                  <div className="text-[9px] text-slate-400 uppercase font-mono">{card.statLabel}</div>
                  <div className="text-xs font-black text-amber-400 font-mono">{card.stat}</div>
                </div>
              </div>

              {/* Text info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-title font-bold text-base text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                  <span>{lang === 'fr' ? 'Point d’Impact Tactique' : 'Tactical Hit Zone'}</span>
                  <span>#{idx + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. New Dedicated Section: GALERIE COMPLÈTE DU SERPENT SUPRÊME */}
      <section className="py-20 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1 font-mono">
                {lang === 'fr' ? 'ARCHIVES VISUELLES DU COMBAT' : 'COMBAT VISUAL ARCHIVES'}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-title">
                {lang === 'fr' ? 'Galerie du Serpent en 6 Variations' : 'Serpent Gallery: 6 Visual Renders'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {lang === 'fr'
                ? 'L’image du serpent géant reproduite à travers différents filtres environnementaux et atmosphériques.'
                : 'The titan serpent visual rendered across various environmental lighting conditions.'}
            </p>
          </div>

          {/* 6 Multiplied Serpent Render Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serpentGalleryShots.map((shot, i) => (
              <div
                key={i}
                onClick={() => setSelectedSerpentView(shot.name)}
                className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-400/80 transition-all shadow-lg flex flex-col"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-slate-950">
                  <img
                    src={pinImage}
                    alt={shot.name}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-115 ${shot.style}`}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-amber-300 truncate">
                    {shot.label}
                  </div>
                </div>
                <div className="p-2.5 text-center">
                  <div className="text-xs font-bold text-white truncate font-title">{shot.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Full-Width Parallax Serpent Banner with High Luminosity */}
      <section className="relative py-28 px-6 overflow-hidden border-y border-amber-500/25">
        <div className="absolute inset-0 z-0">
          <img
            src={pinImage}
            alt="Le Serpent en Pleine Largeur"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-105 contrast-105 saturate-120"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1318] via-[#0d1318]/50 to-[#0d1318]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1318]/90 via-transparent to-[#0d1318]/90" />
          <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-lg">
            <Flame size={14} className="text-amber-400" />
            <span className="text-gradient-gold">{lang === 'fr' ? 'LÉGENDE SUPRÊME DE LA JUNGLE' : 'SUPREME JUNGLE LEGEND'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-title text-balance leading-tight drop-shadow-lg">
            {lang === 'fr'
              ? '« Seule celle qui ne craint ni le venin ni les anneaux tranchera la tête du Léviathan. »'
              : '« Only she who fears neither venom nor coils shall sever the Leviathan’s head. »'}
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Un affrontement immersif conçu pour les écrans tactiles mobiles et les moniteurs ultra-larges.'
              : 'An adrenaline-fueled confrontation crafted for mobile touchscreens and ultra-wide displays.'}
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                sound.playClick();
                onOpenRegister();
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-2xl hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span>{config.ctaText}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="font-title font-bold text-lg text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5.b Responsive 728x90 Leaderboard Ad Section */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <AdBanner728x90 />
      </div>

      {/* 6. Weapons & Lore */}
      <section className="py-16 px-6 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1 font-mono">
                {lang === 'fr' ? 'FORGE ANTI-TITAN' : 'TITAN FORGE'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-title">
                {lang === 'fr' ? "L'Arsenal Pour Vaincre le Serpent" : "Weapons to Vanquish the Serpent"}
              </h2>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('gameplay');
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'gameplay' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'fr' ? 'Armes Mythiques' : 'Mythic Weapons'}
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('lore');
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'lore' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'fr' ? 'La Légende' : 'The Legend'}
              </button>
            </div>
          </div>

          {activeTab === 'gameplay' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {weapons.map((wep, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{wep.type}</span>
                    <span className="font-mono text-amber-400 font-bold">{wep.damage}</span>
                  </div>
                  <h4 className="font-title font-bold text-white text-lg mb-2">
                    {wep.name}
                  </h4>
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-slate-800 font-medium">
                    <Zap size={13} />
                    <span>{wep.passive}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 max-w-3xl">
              <h3 className="font-title text-xl font-bold text-white mb-3">
                {lang === 'fr' ? "L'Éveil du Léviathan de Saphir" : "Awakening of the Sapphire Leviathan"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {lang === 'fr'
                  ? "Quand la lune de sang s'est alignée avec la canopée, le serpent titan a brisé ses chaînes runiques. Seule l'héritière aux cheveux d'améthyste a osé plonger son épée au plus profond de sa gueule infernale."
                  : "When the blood moon aligned with the forest canopy, the titan serpent fractured its runic chains. Only the amethyst-haired huntress dared thrust her blade into its infernal maw."}
              </p>
              <div className="text-xs text-slate-500">
                {lang === 'fr' ? 'Chronique des Chasseurs · Volume III' : 'Hunter Chronicles · Volume III'}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Pre-Registration Banner CTA Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <div className="p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl relative overflow-hidden">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 font-mono">
            {lang === 'fr' ? 'ACCÈS BÊTA FERMÉE DU SERPENT' : 'SERPENT CLOSED BETA ACCESS'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-title mb-4">
            {lang === 'fr' ? 'Défiez le Serpent Suprême en Premier' : 'Face the Supreme Serpent First'}
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
            {lang === 'fr'
              ? "Pré-commandez gratuitement dès aujourd'hui pour débloquer le pack de départ anti-venin et recevoir votre accès anticipé."
              : "Pre-register free today to secure your anti-venom starter pack and exclusive early access."}
          </p>

          <button
            onClick={() => {
              sound.playClick();
              onOpenRegister();
            }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-xl shadow-amber-400/25 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>{config.ctaText}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Desktop Lightbox & 4K Image Theater */}
      {selectedSerpentView && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedSerpentView(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl border border-amber-400/40 overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.25)] flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <span className="font-title font-bold text-white text-base text-gradient-gold">
                  {selectedSerpentView}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Affichage Haute Définition PC (4K)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pinImage}
                  download="Ophidia-Supreme-Wallpaper.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Download size={14} />
                  <span>{lang === 'fr' ? 'Télécharger l’image' : 'Download HD Image'}</span>
                </a>

                <button
                  onClick={() => setSelectedSerpentView(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto bg-black flex items-center justify-center p-4">
              <img
                src={pinImage}
                alt={selectedSerpentView}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl filter brightness-105 contrast-105"
              />
            </div>
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="font-title font-bold text-white text-sm">
                {lang === 'fr' ? 'Bande-Annonce Officielle · Le Serpent Suprême' : 'Official Cinematic Trailer · The Supreme Serpent'}
              </span>
              <button
                onClick={() => setShowTrailer(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video relative overflow-hidden bg-black">
              <img src={pinImage} alt="Trailer preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mb-4 shadow-xl animate-pulse">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </div>
                <h4 className="font-title font-bold text-xl text-white mb-1">
                  {config.gameTitle}
                </h4>
                <p className="text-xs text-slate-300 max-w-md">
                  {lang === 'fr'
                    ? "Combat à mort contre le serpent géant dans la canopée ophidienne. Réalisé sur moteur Unreal Engine 5."
                    : "Lethal confrontation against the titan serpent in the canopy. Rendered in Unreal Engine 5."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
