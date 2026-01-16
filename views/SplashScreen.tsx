
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between p-8 overflow-hidden bg-background-light">
      {/* Decorative Top Element */}
      <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-cream/20 rounded-full blur-3xl"></div>
      
      {/* Central Brand Identity */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-sage/10 hand-drawn-border animate-pulse"></div>
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[100px] text-sage/40 absolute" style={{ fontVariationSettings: "'FILL' 1, 'wght' 200" }}>
              favorite
            </span>
            <span className="material-symbols-outlined text-[70px] text-sage translate-x-4 translate-y-4" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              chat_bubble
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-[#101810] tracking-tight text-[42px] font-bold leading-tight">
            Evergreen AI
          </h1>
          <p className="text-sage font-medium text-lg mt-2 tracking-wide">
            Your thoughtful companion
          </p>
        </div>
      </div>

      {/* Bottom Accent Graphics */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[150%] h-[120px] left-[-25%] fill-cream/40" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* Footer Loading / Status */}
      <div className="relative z-10 mb-12 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-sage animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-sage/40 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-sage/20 animate-bounce [animation-delay:-0.3s]"></div>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#101810]/40 font-semibold">
          Gentle Care Since 2024
        </span>
      </div>
    </div>
  );
};

export default SplashScreen;
