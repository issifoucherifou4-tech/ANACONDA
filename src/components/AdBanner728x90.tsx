import React, { useRef, useEffect, useState } from 'react';

interface AdBannerProps {
  className?: string;
}

export const AdBanner728x90: React.FC<AdBannerProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  // Auto-scale on mobile so 728px wide banner fits screens without horizontal scroll
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      const targetWidth = Math.min(parentWidth - 32, 728);
      if (targetWidth < 728) {
        setScale(targetWidth / 728);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const srcDoc = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            background: transparent; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            width: 728px; 
            height: 90px; 
            overflow: hidden; 
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'e46b89563a29755f5dd9e5234213c874',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://bicea.org/22/e46b89563a29755f5dd9e5234213c874"></script>
      </body>
    </html>
  `;

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}
    >
      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1.5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
        <span>Espace Publicitaire · 728x90 Leaderboard</span>
      </div>

      <div
        className="flex items-center justify-center transition-transform origin-center"
        style={{
          width: `${728 * scale}px`,
          height: `${90 * scale}px`,
        }}
      >
        <div
          style={{
            width: '728px',
            height: '90px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
          className="rounded-xl overflow-hidden border border-amber-500/30 bg-slate-900/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <iframe
            title="Sponsorisé 728x90"
            srcDoc={srcDoc}
            width="728"
            height="90"
            style={{ border: 'none', width: '728px', height: '90px', display: 'block' }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};
