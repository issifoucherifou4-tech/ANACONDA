import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, X, Gift, Copy, Check } from 'lucide-react';
import { sound } from '../utils/audio';
import { AdConfig, Language } from '../types';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdConfig;
  lang: Language;
}

export const PreRegisterModal: React.FC<PreRegisterModalProps> = ({
  isOpen,
  onClose,
  config,
  lang,
}) => {
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'ios' | 'android' | 'pc'>('ios');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [voucherCode] = useState('OPHIDIA-LEGEND-2026');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    sound.playVictory();
    setIsSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 },
    });
  };

  const handleCopyCode = () => {
    sound.playClick();
    navigator.clipboard?.writeText(voucherCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in text-slate-100">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
              <Sparkles size={24} />
            </div>

            <h3 className="text-2xl font-black font-title text-white mb-1">
              {lang === 'fr' ? 'Pré-inscription Rapide' : 'Quick Pre-Registration'}
            </h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              {lang === 'fr'
                ? 'Recevez une notification le jour du lancement et sécurisez vos bonus exclusifs dès le niveau 1.'
                : 'Get notified upon worldwide launch and claim your exclusive starting pack.'}
            </p>

            {/* Reward Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Gift size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">
                  {lang === 'fr' ? 'Pack Fondateur Offert' : 'Free Founder Pack'}
                </div>
                <div className="text-xs text-slate-300 truncate font-medium">
                  {config.discountBonus}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'fr' ? 'Sélectionnez votre plateforme :' : 'Choose platform:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ios', label: 'iOS (App Store)' },
                    { id: 'android', label: 'Google Play' },
                    { id: 'pc', label: 'Steam PC' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPlatform(item.id as 'ios' | 'android' | 'pc')}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        platform === item.id
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="ad-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'fr' ? 'Adresse e-mail :' : 'Email address:'}
                </label>
                <input
                  id="ad-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{config.ctaText}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>

            <h3 className="text-2xl font-black font-title text-white mb-2">
              {lang === 'fr' ? 'Inscription Validée !' : 'Registration Complete!'}
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {lang === 'fr'
                ? `Merci ! Un lien de confirmation a été envoyé à ${email}. Voici votre code de déblocage pour la bêta :`
                : `Thank you! A confirmation link was sent to ${email}. Here is your beta unlock voucher:`}
            </p>

            {/* Voucher Code Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-700 mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-0.5">
                  {lang === 'fr' ? 'Code d’activation VIP' : 'VIP Activation Voucher'}
                </div>
                <div className="font-mono text-base font-bold text-amber-400 tracking-wider">
                  {voucherCode}
                </div>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
              >
                {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedCode ? (lang === 'fr' ? 'Copié' : 'Copied') : (lang === 'fr' ? 'Copier' : 'Copy')}</span>
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              {lang === 'fr' ? 'Fermer la fenêtre' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
