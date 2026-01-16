
import React from 'react';
import { View } from '../types';
import { ASSETS } from '../constants';

interface ResultViewProps {
  image?: string | null;
  onBack: () => void;
  onNavigate: (view: View) => void;
}

const ResultView: React.FC<ResultViewProps> = ({ image, onBack, onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-light overflow-y-auto pb-24">
      {/* Top Bar */}
      <div className="flex items-center p-6 justify-between">
        <button 
          onClick={onBack}
          className="bg-white p-3 rounded-full soft-shadow flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-12">Activity Result</h2>
      </div>

      {/* Hero Image Section */}
      <div className="px-6 py-4">
        <div className="relative aspect-square w-full bg-white p-3 rounded-[4rem] soft-shadow">
          <div 
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-[3.5rem]" 
            style={{ backgroundImage: `url(${image || ASSETS.HERO_WALKING})` }}
          />
        </div>
      </div>

      {/* Score Display */}
      <div className="flex flex-col items-center pt-4">
        <h1 className="text-primary text-[84px] font-extrabold leading-none tracking-tighter">95%</h1>
        <p className="text-text-muted text-xl font-semibold mt-1">Great job, Martha!</p>
        <p className="text-zinc-500 text-sm mt-1">You've almost reached your goal</p>
      </div>

      {/* Progress Doughnut */}
      <div className="px-6 py-10 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <svg className="transform -rotate-90" height="180" viewBox="0 0 100 100" width="180">
            <circle className="text-cream-yellow" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
            <circle className="text-primary" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="12.5" strokeLinecap="round" strokeWidth="12"></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">eco</span>
          </div>
        </div>
        <div className="flex gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-primary"></div>
            <span className="text-sm font-medium">Daily Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-cream-yellow"></div>
            <span className="text-sm font-medium">Remaining</span>
          </div>
        </div>
      </div>

      {/* Action Block */}
      <div className="flex flex-col gap-4 px-6 mt-4">
        <button 
          onClick={onBack}
          className="w-full bg-primary text-white py-6 rounded-full font-bold text-xl soft-shadow hover:scale-[0.98] transition-transform flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">save</span>
          Save Result
        </button>
        <button className="w-full bg-white text-zinc-800 py-6 rounded-full font-bold text-xl soft-shadow hover:scale-[0.98] transition-transform flex items-center justify-center gap-3">
          <span className="material-symbols-outlined">share</span>
          Share with Family
        </button>
      </div>

      {/* Tab Bar Spacer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-zinc-200 px-8 py-4 flex justify-between items-center rounded-t-xl z-20">
        <div className="flex flex-col items-center gap-1 text-primary cursor-pointer" onClick={() => onNavigate(View.DASHBOARD)}>
          <span className="material-symbols-outlined text-3xl fill-[1]">home</span>
          <span className="text-[10px] font-bold">HOME</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-400">
          <span className="material-symbols-outlined text-3xl">history</span>
          <span className="text-[10px] font-bold">HISTORY</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-400 cursor-pointer" onClick={() => onNavigate(View.PROFILE)}>
          <span className="material-symbols-outlined text-3xl">settings</span>
          <span className="text-[10px] font-bold">SETTINGS</span>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
