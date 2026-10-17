import React from 'react';
import { X, Sliders, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';
import { AdConfig, DEFAULT_CONFIG, Language } from '../types';

interface AdSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdConfig;
  onChangeConfig: (newConfig: AdConfig) => void;
  lang: Language;
}

export const AdSettingsDrawer: React.FC<AdSettingsDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  lang,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    sound.playClick();
    onChangeConfig(DEFAULT_CONFIG[lang]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 text-slate-100 flex flex-col shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sliders size={18} />
            </div>
            <div>
              <h3 className="font-title font-bold text-base text-white">
                {lang === 'fr' ? 'Personnaliser la Publicité' : 'Customize Ad Creative'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'fr' ? 'Modifiez les textes et le Call To Action' : 'Edit headlines, perks & CTA'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4 flex-1">
          {/* Game Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'fr' ? 'Titre Principal :' : 'Main Title:'}
            </label>
            <input
              type="text"
              value={config.gameTitle}
              onChange={(e) => onChangeConfig({ ...config, gameTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'fr' ? 'Slogan / Accroche :' : 'Tagline / Hook:'}
            </label>
            <textarea
              rows={2}
              value={config.tagline}
              onChange={(e) => onChangeConfig({ ...config, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Badge Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'fr' ? 'Badge Promotionnel :' : 'Promotional Badge:'}
            </label>
            <input
              type="text"
              value={config.badgeText}
              onChange={(e) => onChangeConfig({ ...config, badgeText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* CTA Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'fr' ? 'Texte du Bouton CTA :' : 'CTA Button Text:'}
            </label>
            <input
              type="text"
              value={config.ctaText}
              onChange={(e) => onChangeConfig({ ...config, ctaText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Bonus / Perk */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'fr' ? 'Bonus offert aux joueurs :' : 'Player Bonus Offer:'}
            </label>
            <input
              type="text"
              value={config.discountBonus}
              onChange={(e) => onChangeConfig({ ...config, discountBonus: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Target URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'fr' ? 'Lien de destination :' : 'Destination URL:'}
            </label>
            <input
              type="url"
              value={config.destinationUrl}
              onChange={(e) => onChangeConfig({ ...config, destinationUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw size={14} />
            <span>{lang === 'fr' ? 'Réinitialiser' : 'Reset defaults'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md"
          >
            {lang === 'fr' ? 'Appliquer' : 'Apply changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
