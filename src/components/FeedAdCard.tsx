import React, { useState } from 'react';
import { Heart, Bookmark, Share2, Star, ExternalLink, Sparkles, Shield, ChevronDown, Check, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { sound } from '../utils/audio';
import { AdConfig, Language } from '../types';
import pinImage from '../assets/pin_image.jpg';

interface FeedAdCardProps {
  config: AdConfig;
  lang: Language;
  onOpenRegister: () => void;
}

export const FeedAdCard: React.FC<FeedAdCardProps> = ({ config, lang, onOpenRegister }) => {
  const [likes, setLikes] = useState<number>(34280);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [hasSaved, setHasSaved] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const serpentAngles = [
    {
      title: lang === 'fr' ? "Le Duel du Serpent Géant" : "The Titan Serpent Duel",
      cropClass: "scale-100 object-center",
      caption: lang === 'fr' ? "Vue globale : la guerrière dompte le Léviathan de la canopée" : "Global view: huntress tames canopy Leviathan"
    },
    {
      title: lang === 'fr' ? "La Gueule Béante du Serpent" : "The Serpent's Gaping Maw",
      cropClass: "scale-135 object-top",
      caption: lang === 'fr' ? "Zoom extrême : crochets venimeux et sang du reptile" : "Close-up: razor venom fangs and blood spray"
    },
    {
      title: lang === 'fr' ? "L'Étreinte Musculaire du Python" : "Muscular Python Constriction",
      cropClass: "scale-140 object-bottom",
      caption: lang === 'fr' ? "Zoom corps : anneaux géants broyeurs d'armure" : "Body focus: massive crushing coils"
    },
    {
      title: lang === 'fr' ? "L'Épée dans les Anneaux" : "Blade Through Serpent Head",
      cropClass: "scale-120 object-center filter contrast-125",
      caption: lang === 'fr' ? "Le coup de grâce : l'acier runique transperce la mâchoire" : "Finishing blow: runic steel through the jaw"
    }
  ];

  const handleLike = () => {
    sound.playClick();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleSave = () => {
    sound.playClick();
    setHasSaved((prev) => !prev);
  };

  const handleShare = () => {
    sound.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setActiveImageIndex((prev) => (prev + 1) % serpentAngles.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setActiveImageIndex((prev) => (prev === 0 ? serpentAngles.length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-card-glow rounded-3xl overflow-hidden shadow-2xl transition-all border border-amber-400/30">
      {/* Feed Header */}
      <div className="p-4 flex items-center justify-between border-b border-amber-500/20 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-amber-400 p-0.5 bg-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <img src={pinImage} alt="Avatar Serpent" className="w-full h-full object-cover rounded-full scale-125" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white font-title">{config.gameTitle}</span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {lang === 'fr' ? 'Sponsorisé Suprême' : 'Supreme Sponsored'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>{config.genre}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                <Star size={11} fill="currentColor" /> {config.ratingScore}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1.5"
        >
          {copiedLink ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">{lang === 'fr' ? 'Copié !' : 'Copied!'}</span>
            </>
          ) : (
            <>
              <Share2 size={13} />
              <span>{lang === 'fr' ? 'Partager' : 'Share'}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Interactive Serpent Carousel */}
      <div className="relative group overflow-hidden bg-slate-950 select-none">
        <div className="relative aspect-[4/5] sm:aspect-[1/1] overflow-hidden">
          <img
            src={pinImage}
            alt={serpentAngles[activeImageIndex].title}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              serpentAngles[activeImageIndex].cropClass
            }`}
          />

          {/* Carousel Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95 shadow-lg"
            aria-label="Image précédente du serpent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all active:scale-95 shadow-lg"
            aria-label="Image suivante du serpent"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicator Dots */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {serpentAngles.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  setActiveImageIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIndex === i ? 'bg-amber-400 w-4' : 'bg-white/40'
                }`}
                aria-label={`Aller au plan de serpent ${i + 1}`}
              />
            ))}
          </div>

          {/* Exclusive Badge */}
          <div className="absolute top-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-lg">
            <Sparkles size={14} className="text-amber-400" />
            <span>{config.badgeText}</span>
          </div>

          {/* Active Serpent Angle Caption Strip */}
          <div className="absolute bottom-16 inset-x-0 p-3 bg-black/65 backdrop-blur-sm border-t border-white/10 text-xs text-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-amber-400" />
              <span className="font-bold text-white">{serpentAngles[activeImageIndex].title}</span>
            </div>
            <span className="text-[11px] text-slate-400">
              {activeImageIndex + 1} / {serpentAngles.length}
            </span>
          </div>

          {/* Overlay CTA Strip */}
          <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs font-bold text-emerald-400 truncate">
                {config.discountBonus}
              </div>
              <div className="text-[11px] text-slate-300">
                {lang === 'fr' ? 'Sortie prévue :' : 'Release:'} {config.releaseDate}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onOpenRegister();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs whitespace-nowrap shadow-lg shadow-amber-400/25 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>{config.ctaText}</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>

        {/* Thumbnail Selector Strip: Multiplying the serpent image! */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
          {serpentAngles.map((angle, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setActiveImageIndex(idx);
              }}
              className={`flex-1 min-w-[70px] h-14 rounded-xl overflow-hidden border-2 transition-all relative ${
                activeImageIndex === idx ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={pinImage} alt={angle.title} className={`w-full h-full object-cover ${angle.cropClass}`} />
              <div className="absolute inset-0 bg-black/20" />
            </button>
          ))}
        </div>
      </div>

      {/* Feed Interaction Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                hasLiked ? 'text-rose-500' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Heart size={18} fill={hasLiked ? 'currentColor' : 'none'} />
              <span className="tabular-nums font-mono">{likes.toLocaleString()}</span>
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                hasSaved ? 'text-amber-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bookmark size={18} fill={hasSaved ? 'currentColor' : 'none'} />
              <span>{hasSaved ? (lang === 'fr' ? 'Enregistré' : 'Saved') : (lang === 'fr' ? 'Enregistrer l’Épingle' : 'Save Pin')}</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Shield size={13} className="text-emerald-400" />
            <span>Pegi 16 · Mobile & PC</span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="space-y-1.5">
          <h4 className="font-title font-bold text-base text-white">
            {config.tagline}
          </h4>
          <p className={`text-xs text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
            {lang === 'fr'
              ? "Le Serpent Titanesque a régné sur la jungle primaire pendant des ères entières. Équipez la lame runique légendaire, évitez ses anneaux broyeurs d'os et terrassez la bête pour libérer le monde des ténèbres ophidiennes."
              : "The Titan Serpent has reigned over the primal jungle for endless eons. Wield the legendary runic blade, dodge its bone-crushing coils, and vanquish the supreme beast to cleanse the jungle."}
          </p>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 pt-1"
          >
            <span>{isExpanded ? (lang === 'fr' ? 'Voir moins' : 'Show less') : (lang === 'fr' ? 'En savoir plus sur le serpent...' : 'Read more about the serpent...')}</span>
            <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Unboxed Metadata Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>{config.reviewCount}</span>
            <span aria-hidden="true">·</span>
            <span>Unreal Engine 5</span>
          </div>
          <span className="text-amber-400/80 font-mono font-medium">#SerpentSuprême #TitanHunt</span>
        </div>
      </div>
    </div>
  );
};
