import React, { useState } from 'react';
import { X, Copy, Check, Code, Smartphone, Globe, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';
import { AdConfig, AdFormat, Language } from '../types';

interface EmbedCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  format: AdFormat;
  config: AdConfig;
  lang: Language;
}

export const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({
  isOpen,
  onClose,
  format,
  config,
  lang,
}) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<'iframe' | 'gam' | 'vanilla'>('iframe');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.origin;

  const getSnippets = () => {
    const iframeSnippet = `<!-- Code Publicitaire Responsive (Format: ${format.toUpperCase()}) -->
<div style="position: relative; width: 100%; max-width: ${format === 'story' ? '420px' : '640px'}; margin: 0 auto; aspect-ratio: ${format === 'story' ? '9/16' : '4/5'}; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
  <iframe
    src="${currentUrl}/?embed=true&format=${format}"
    title="${config.gameTitle} - Ad Unit"
    width="100%"
    height="100%"
    frameborder="0"
    scrolling="no"
    allow="autoplay; accelerometer; gyroscope"
    style="border: none; width: 100%; height: 100%;"
  ></iframe>
</div>`;

    const gamSnippet = `<!-- Google Ad Manager / MRAID 3.0 Mobile Tag -->
<script type="text/javascript">
  var adConfig = {
    creativeId: "ophidia_serpent_2026",
    campaign: "awaken_jungle_titan",
    format: "${format}",
    clickUrl: "%%CLICK_URL_UNESC%%${encodeURIComponent(config.destinationUrl)}",
    trackingPixel: "%%VIEW_URL_UNESC%%"
  };
</script>
<div id="gam-ad-container-${format}" class="ad-responsive-container">
  <iframe src="${currentUrl}/?format=${format}&gam=1" style="width:100%; height:100%; border:none;"></iframe>
</div>`;

    const vanillaSnippet = `<!-- HTML5 Responsive Ad Card Embed -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Plus+Jakarta+Sans:wght@500;700&display=swap">
<div class="ophidia-ad-banner" style="background:#0b0f12; color:#fff; border-radius:18px; padding:16px; font-family:'Plus Jakarta Sans',sans-serif; max-width:480px; margin:auto;">
  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
    <span style="font-family:'Cinzel',serif; font-size:16px; font-weight:700;">${config.gameTitle}</span>
    <span style="background:#f59e0b; color:#000; font-size:10px; font-weight:700; padding:2px 8px; border-radius:6px;">${config.badgeText}</span>
  </div>
  <a href="${config.destinationUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-align:center; background:#f59e0b; color:#0b0f12; padding:12px 16px; border-radius:12px; font-weight:700; text-decoration:none; margin-top:14px;">
    ${config.ctaText}
  </a>
</div>`;

    return { iframeSnippet, gamSnippet, vanillaSnippet };
  };

  const { iframeSnippet, gamSnippet, vanillaSnippet } = getSnippets();
  const currentCode =
    activeSnippetTab === 'iframe'
      ? iframeSnippet
      : activeSnippetTab === 'gam'
      ? gamSnippet
      : vanillaSnippet;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard?.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in text-slate-100">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Code size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-title text-white">
              {lang === 'fr' ? 'Exporter le Code Publicitaire' : 'Export Responsive Ad Code'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'fr'
                ? `Format actif : ${format.toUpperCase()} (100% Mobile & Responsive)`
                : `Active format: ${format.toUpperCase()} (100% Mobile & Responsive)`}
            </p>
          </div>
        </div>

        {/* Snippet format selector tabs */}
        <div className="flex items-center gap-2 my-4 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveSnippetTab('iframe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSnippetTab === 'iframe'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Globe size={14} />
            <span>Responsive iFrame</span>
          </button>

          <button
            onClick={() => setActiveSnippetTab('gam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSnippetTab === 'gam'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Smartphone size={14} />
            <span>Google Ad Manager / MRAID</span>
          </button>

          <button
            onClick={() => setActiveSnippetTab('vanilla')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSnippetTab === 'vanilla'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Terminal size={14} />
            <span>HTML5 Vanilla Card</span>
          </button>
        </div>

        {/* Code display block */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-60 mb-5">
          <pre>{currentCode}</pre>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {lang === 'fr'
              ? 'Prêt à être intégré dans un site web, application ou campagne DSP.'
              : 'Ready to be integrated into any web page, CMS, or DSP network.'}
          </span>

          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            {copied ? <Check size={15} className="text-emerald-950" /> : <Copy size={15} />}
            <span>{copied ? (lang === 'fr' ? 'Copié dans le presse-papier !' : 'Copied!') : (lang === 'fr' ? 'Copier le Code' : 'Copy Embed Code')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
