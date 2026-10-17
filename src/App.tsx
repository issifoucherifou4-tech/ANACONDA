/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Volume2,
  VolumeX,
  Code2,
  Sliders,
  Sparkles,
  Layers,
  Flame,
  Globe,
  Share2,
  Sun,
  Film
} from 'lucide-react';
import { StoryAd } from './components/StoryAd';
import { FeedAdCard } from './components/FeedAdCard';
import { PlayableAd } from './components/PlayableAd';
import { LandingExperience } from './components/LandingExperience';
import { PreRegisterModal } from './components/PreRegisterModal';
import { EmbedCodeModal } from './components/EmbedCodeModal';
import { AdSettingsDrawer } from './components/AdSettingsDrawer';
import { AdBanner728x90 } from './components/AdBanner728x90';
import { FilmAudioPlayer } from './components/FilmAudioPlayer';
import { AdConfig, AdFormat, DEFAULT_CONFIG, DeviceMode, Language } from './types';
import { sound } from './utils/audio';
import pinImage from './assets/pin_image.jpg';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [format, setFormat] = useState<AdFormat>('landing');
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [videoMotion, setVideoMotion] = useState<boolean>(true);
  const [luminosityMode, setLuminosityMode] = useState<'radiant' | 'vibrant' | 'natural'>('radiant');
  const [config, setConfig] = useState<AdConfig>(DEFAULT_CONFIG.fr);

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleLangChange = (newLang: Language) => {
    sound.playClick();
    setLang(newLang);
    setConfig(DEFAULT_CONFIG[newLang]);
  };

  const handleFormatChange = (newFormat: AdFormat) => {
    sound.playClick();
    setFormat(newFormat);
  };

  const handleDeviceChange = (newDevice: DeviceMode) => {
    sound.playClick();
    setDevice(newDevice);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    sound.playClick();
  };

  const toggleLuminosity = () => {
    sound.playClick();
    setLuminosityMode((prev) => {
      if (prev === 'radiant') return 'vibrant';
      if (prev === 'vibrant') return 'natural';
      return 'radiant';
    });
  };

  const getLuminosityFilter = () => {
    if (luminosityMode === 'vibrant') return 'brightness(1.35) contrast(1.08) saturate(1.22)';
    if (luminosityMode === 'radiant') return 'brightness(1.20) contrast(1.04) saturate(1.15)';
    return 'brightness(1.05) saturate(1.05)';
  };

  const getLuminosityLabel = () => {
    if (luminosityMode === 'vibrant') return lang === 'fr' ? 'Éclat Solaire (135%)' : 'Solar Burst (135%)';
    if (luminosityMode === 'radiant') return lang === 'fr' ? 'Haute Luminosité (120%)' : 'Radiant Gold (120%)';
    return lang === 'fr' ? 'Lumière Naturelle (105%)' : 'Natural Light (105%)';
  };

  return (
    <div className="min-h-screen bg-[#0d1318] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 relative overflow-hidden">
      {/* Background ambient radiant orbs for elevated beauty */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Universal Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Action) */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-amber-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark with Serpent Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.5)] bg-slate-900">
            <img src={pinImage} alt="Serpent Suprême" className="w-full h-full object-cover scale-150" />
          </div>
          <span className="font-title font-black text-lg text-white tracking-wider whitespace-nowrap text-gradient-gold">
            OPHIDIA SUPRÊME
          </span>
        </div>

        {/* Zone 2: 4-5 single-line clean text links with active states */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => handleFormatChange('story')}
            className={`transition-colors whitespace-nowrap ${
              format === 'story' ? 'text-amber-400 font-bold' : 'hover:text-white'
            }`}
          >
            {lang === 'fr' ? 'Format Story 9:16' : 'Story 9:16 Ad'}
          </button>
          <button
            onClick={() => handleFormatChange('playable')}
            className={`transition-colors whitespace-nowrap ${
              format === 'playable' ? 'text-amber-400 font-bold' : 'hover:text-white'
            }`}
          >
            {lang === 'fr' ? 'Playable 3D Ad' : '3D Playable Ad'}
          </button>
          <button
            onClick={() => handleFormatChange('feed')}
            className={`transition-colors whitespace-nowrap ${
              format === 'feed' ? 'text-amber-400 font-bold' : 'hover:text-white'
            }`}
          >
            {lang === 'fr' ? 'In-Feed Sponsorisé' : 'Sponsored Feed'}
          </button>
          <button
            onClick={() => handleFormatChange('landing')}
            className={`transition-colors whitespace-nowrap ${
              format === 'landing' ? 'text-amber-400 font-bold' : 'hover:text-white'
            }`}
          >
            {lang === 'fr' ? 'Page de Destination' : 'Landing Page'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language selector */}
          <button
            onClick={() => handleLangChange(lang === 'fr' ? 'en' : 'fr')}
            className="px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-200 hover:text-white hover:border-amber-400/50 transition-colors flex items-center gap-1.5 font-medium bg-slate-900/60"
          >
            <Globe size={13} />
            <span>{lang === 'fr' ? 'FR' : 'EN'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsEmbedOpen(true);
            }}
            className="px-4 py-2 rounded-xl gold-sheen-btn text-slate-950 font-black text-xs whitespace-nowrap shadow-lg shadow-amber-400/25 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Code2 size={14} />
            <span>{lang === 'fr' ? 'Code Publicitaire' : 'Get Ad Code'}</span>
          </button>
        </div>
      </header>

      {/* 2. Responsive Simulator Control Bar */}
      <div className="bg-slate-900/70 backdrop-blur-md border-b border-amber-500/20 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Ad Formats Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
          <button
            onClick={() => handleFormatChange('story')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              format === 'story'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone size={13} />
            <span>Story 9:16</span>
          </button>

          <button
            onClick={() => handleFormatChange('playable')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              format === 'playable'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles size={13} />
            <span>Playable 3D</span>
          </button>

          <button
            onClick={() => handleFormatChange('feed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              format === 'feed'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>In-Feed</span>
          </button>

          <button
            onClick={() => handleFormatChange('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              format === 'landing'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor size={13} />
            <span>{lang === 'fr' ? 'Site Web' : 'Landing'}</span>
          </button>
        </div>

        {/* Viewport Device Controls, Luminosity Tool & Audio */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Luminosity & Beauty Switcher */}
          <button
            onClick={toggleLuminosity}
            className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 hover:border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] active:scale-95"
            title={lang === 'fr' ? 'Cliquer pour ajuster la luminosité' : 'Click to toggle brightness level'}
          >
            <Sun size={14} className="text-amber-400 animate-spin-slow" />
            <span className="tabular-nums font-mono">{getLuminosityLabel()}</span>
          </button>

          {/* Live Video Motion Trend Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setVideoMotion(!videoMotion);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md ${
              videoMotion
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title={lang === 'fr' ? 'Activer/Désactiver l’effet vidéo tendance' : 'Toggle cinematic video motion'}
          >
            <Film size={14} className={videoMotion ? 'text-rose-400 animate-pulse' : 'text-slate-400'} />
            <span>{videoMotion ? (lang === 'fr' ? 'Mouvement Vidéo : Actif' : 'Video Motion: ON') : (lang === 'fr' ? 'Mouvement Vidéo : Pause' : 'Video Motion: OFF')}</span>
          </button>

          {/* Device Dimensions Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => handleDeviceChange('mobile')}
              aria-label="Vue Mobile 390px"
              className={`p-1.5 rounded-lg transition-colors ${
                device === 'mobile' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile (390px)"
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => handleDeviceChange('tablet')}
              aria-label="Vue Tablette 768px"
              className={`p-1.5 rounded-lg transition-colors ${
                device === 'tablet' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => handleDeviceChange('desktop')}
              aria-label="Vue Desktop 100%"
              className={`p-1.5 rounded-lg transition-colors ${
                device === 'desktop' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop (Fluid)"
            >
              <Monitor size={16} />
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Effets sonores"
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title={soundEnabled ? 'Son activé' : 'Son désactivé'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Ad Customizer Drawer Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setIsSettingsOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Sliders size={14} />
            <span className="hidden sm:inline">{lang === 'fr' ? 'Personnaliser' : 'Customize'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Stage Container with Live Luminosity Filter & Ambient Golden Halo */}
      <main
        className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300"
        style={{ filter: getLuminosityFilter() }}
      >
        {device === 'mobile' ? (
          /* Mobile Device Frame Mockup with Radiant Golden Halo */
          <div className="w-full max-w-[390px] h-[780px] bg-slate-950 rounded-[44px] p-3 shadow-[0_25px_80px_rgba(245,158,11,0.25),0_0_90px_rgba(16,185,129,0.15),0_0_0_10px_#1e293b,0_0_0_12px_rgba(245,158,11,0.3)] relative flex flex-col overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-4 inset-x-0 z-40 flex justify-center pointer-events-none">
              <div className="w-24 h-5 bg-black rounded-full border border-slate-800/60" />
            </div>

            {/* Mobile Viewport Screen */}
            <div className="relative flex-1 w-full h-full rounded-[34px] overflow-hidden bg-slate-950 flex flex-col">
              {format === 'story' && (
                <StoryAd
                  config={config}
                  lang={lang}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />
              )}
              {format === 'feed' && (
                <div className="h-full overflow-y-auto p-2">
                  <FeedAdCard
                    config={config}
                    lang={lang}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                </div>
              )}
              {format === 'playable' && (
                <div className="h-full overflow-y-auto p-1 flex items-center">
                  <PlayableAd
                    config={config}
                    lang={lang}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                </div>
              )}
              {format === 'landing' && (
                <div className="h-full overflow-y-auto">
                  <LandingExperience
                    config={config}
                    lang={lang}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                </div>
              )}
            </div>

            {/* Home indicator bar */}
            <div className="w-32 h-1 bg-slate-700/80 rounded-full mx-auto mt-2 shrink-0 pointer-events-none" />
          </div>
        ) : device === 'tablet' ? (
          /* Tablet Frame Mockup */
          <div className="w-full max-w-[760px] h-[860px] bg-slate-950 rounded-[36px] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_10px_#1e293b] relative flex flex-col overflow-hidden">
            <div className="relative flex-1 w-full h-full rounded-[24px] overflow-hidden bg-slate-950 flex flex-col">
              {format === 'story' && (
                <div className="h-full flex items-center justify-center p-4">
                  <StoryAd
                    config={config}
                    lang={lang}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                </div>
              )}
              {format === 'feed' && (
                <div className="h-full overflow-y-auto p-6 flex items-center justify-center">
                  <FeedAdCard
                    config={config}
                    lang={lang}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                </div>
              )}
              {format === 'playable' && (
                <div className="h-full overflow-y-auto p-6 flex items-center justify-center">
                  <PlayableAd
                    config={config}
                    lang={lang}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                </div>
              )}
              {format === 'landing' && (
                <div className="h-full overflow-y-auto">
                  <LandingExperience
                    config={config}
                    lang={lang}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Desktop Fluid Full-Width Responsive Stage */
          <div className="w-full max-w-7xl mx-auto py-4">
            {format === 'story' && (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                <StoryAd
                  config={config}
                  lang={lang}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />
                <div className="max-w-md space-y-4">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {lang === 'fr' ? 'Spécifications du Format' : 'Ad Format Specifications'}
                  </div>
                  <h3 className="font-title text-2xl font-black text-white">
                    {lang === 'fr' ? 'Vertical 9:16 Ultra-Immersif' : 'Ultra-Immersive Vertical 9:16'}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === 'fr'
                      ? "Ce format transforme l'image Pinterest en un mini-jeu publicitaire interactif pour TikTok, Instagram Stories et Pinterest Idea Pins. L'utilisateur peut frapper le serpent directement sur l'écran et débloquer une récompense exclusive."
                      : "Transforms the visual creative into an interactive playable story ad for TikTok, Instagram Reels, and Pinterest Idea Pins. Users directly engage by attacking the serpent and receiving rewards."}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setIsEmbedOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                    >
                      {lang === 'fr' ? 'Exporter pour TikTok / Insta' : 'Export for Social Ads'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {format === 'feed' && (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                <FeedAdCard
                  config={config}
                  lang={lang}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />
                <div className="max-w-md space-y-4">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    {lang === 'fr' ? 'Engagement Réseau & Social' : 'High Social Engagement'}
                  </div>
                  <h3 className="font-title text-2xl font-black text-white">
                    {lang === 'fr' ? 'Format Carte In-Feed Sponsorisée' : 'Responsive In-Feed Sponsored Card'}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === 'fr'
                      ? "S'intègre naturellement dans les flux d'actualité Pinterest et réseaux sociaux avec boutons d'action (aimer, sauvegarder l'épingle, partager) et appel à l'action direct."
                      : "Blends seamlessly into Pinterest feeds, newsletters, and social walls with functional engagements and direct conversion paths."}
                  </p>
                  <button
                    onClick={() => setIsEmbedOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700"
                  >
                    {lang === 'fr' ? 'Copier le tag HTML5' : 'Copy HTML5 Tag'}
                  </button>
                </div>
              </div>
            )}
            {format === 'playable' && (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                <PlayableAd
                  config={config}
                  lang={lang}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />
                <div className="max-w-md space-y-4">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {lang === 'fr' ? 'Conversion Maximale (x3 CTR)' : 'Maximum Conversion (3x CTR)'}
                  </div>
                  <h3 className="font-title text-2xl font-black text-white">
                    {lang === 'fr' ? 'Playable Ad avec Effet Gyroscope 3D' : '3D Gyroscope Playable Ad'}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === 'fr'
                      ? "L'effet de perspective réagit aux mouvements de la souris ou à l'inclinaison du smartphone. Le joueur fait des choix stratégiques qui mènent à la conversion immédiate."
                      : "Dynamic perspective tilts with mouse movements or smartphone gyroscope. Strategic choices yield instant rewards and pre-orders."}
                  </p>
                  <button
                    onClick={() => setIsEmbedOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    {lang === 'fr' ? 'Obtenir le Code DSP / MRAID' : 'Get MRAID DSP Code'}
                  </button>
                </div>
              </div>
            )}
            {format === 'landing' && (
              <LandingExperience
                config={config}
                lang={lang}
                onOpenRegister={() => setIsRegisterOpen(true)}
              />
            )}
          </div>
        )}
      </main>

      {/* 728x90 Leaderboard Ad Banner (Responsive) */}
      <div className="w-full max-w-7xl mx-auto px-4 z-10">
        <AdBanner728x90 />
      </div>

      {/* 4. Quiet Footer adhering to Constitution */}
      <footer className="bg-slate-950 border-t border-slate-800/80 px-6 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-title font-bold text-slate-300">OPHIDIA SUPRÊME : LE SERPENT TITANESQUE</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'fr' ? 'Campagne Multi-Format Réactive' : 'Responsive Multi-Format Campaign'}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsEmbedOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Share2 size={13} />
              <span>{lang === 'fr' ? 'Intégrer sur mon site' : 'Embed on my site'}</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>100% Mobile First & Responsive</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <PreRegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        config={config}
        lang={lang}
      />

      <EmbedCodeModal
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
        format={format}
        config={config}
        lang={lang}
      />

      <AdSettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        lang={lang}
      />

      {/* Floating Cinematic Film Soundtrack Player */}
      <FilmAudioPlayer />
    </div>
  );
}
