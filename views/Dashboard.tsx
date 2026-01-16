
import React, { useState, useEffect } from 'react';
import { View, Idea } from '../types';
import { ASSETS } from '../constants';
import { getThoughtfulIdeas } from '../services/geminiService';

interface DashboardProps {
  onNavigate: (view: View) => void;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userName }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      const result = await getThoughtfulIdeas(userName);
      setIdeas(result);
      setLoadingIdeas(false);
    };
    fetchIdeas();
  }, [userName]);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-32">
      {/* Top App Bar */}
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-white z-20">
        <button className="text-text-main size-12 flex items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
        <h2 className="text-text-main text-lg font-bold flex-1 text-center font-display">AI Companion</h2>
        <button 
          className="size-12 flex items-center justify-center rounded-xl hover:bg-cream"
          onClick={() => onNavigate(View.PROFILE)}
        >
          <span className="material-symbols-outlined text-3xl">account_circle</span>
        </button>
      </header>

      {/* Header Section */}
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-text-main text-[36px] font-bold leading-tight text-center font-display mb-2">
          Good morning, {userName}
        </h1>
        <p className="text-text-muted text-center text-lg">It's a beautiful sunny day.</p>
      </div>

      {/* Intergenerational Avatars */}
      <div className="flex justify-center items-end gap-6 p-6 mb-4">
        <div className="relative group cursor-pointer" onClick={() => onNavigate(View.PROFILE)}>
          <div 
            className="w-32 h-32 rounded-full border-4 border-cream-yellow bg-center bg-cover soft-shadow transition-transform group-hover:scale-105"
            style={{ backgroundImage: `url(${ASSETS.GRANDMA_AVATAR})` }}
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-white"></div>
        </div>
        <div className="relative cursor-pointer">
          <div 
            className="w-24 h-24 rounded-full border-4 border-cream-yellow bg-center bg-cover soft-shadow"
            style={{ backgroundImage: `url(${ASSETS.GRANDCHILD_AVATAR})` }}
          />
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="grid grid-cols-2 gap-4 px-6 mb-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-cream-yellow p-5 cream-shadow border border-cream-yellow/50 cursor-pointer min-h-[160px] justify-center hover:scale-[1.02] transition-transform active:scale-95">
          <div className="relative w-fit">
            <span className="material-symbols-outlined text-primary text-4xl">chat_bubble</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-peach rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-text-main text-xl font-bold font-display">Messages</h2>
            <p className="text-text-muted text-sm font-medium">See who's called</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-cream-yellow p-5 cream-shadow border border-cream-yellow/50 cursor-pointer min-h-[160px] justify-center hover:scale-[1.02] transition-transform active:scale-95">
          <span className="material-symbols-outlined text-primary text-4xl">auto_stories</span>
          <div className="flex flex-col gap-1">
            <h2 className="text-text-main text-xl font-bold font-display">Photos</h2>
            <p className="text-text-muted text-sm font-medium">Memory lane</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-cream-yellow p-5 cream-shadow border border-cream-yellow/50 cursor-pointer min-h-[160px] justify-center hover:scale-[1.02] transition-transform active:scale-95" onClick={() => onNavigate(View.RESULT)}>
          <span className="material-symbols-outlined text-primary text-4xl">favorite</span>
          <div className="flex flex-col gap-1">
            <h2 className="text-text-main text-xl font-bold font-display">Health</h2>
            <p className="text-text-muted text-sm font-medium">Daily check-in</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-cream-yellow p-5 cream-shadow border border-cream-yellow/50 cursor-pointer min-h-[160px] justify-center hover:scale-[1.02] transition-transform active:scale-95">
          <span className="material-symbols-outlined text-primary text-4xl">lightbulb</span>
          <div className="flex flex-col gap-1">
            <h2 className="text-text-main text-xl font-bold font-display">Ideas</h2>
            <p className="text-text-muted text-sm font-medium">Things to do</p>
          </div>
        </div>
      </div>

      {/* Dynamic Gemini Ideas */}
      <div className="px-6 mb-12">
        <h3 className="text-text-main text-lg font-bold mb-4 font-display flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">eco</span>
          Suggestions for You
        </h3>
        {loadingIdeas ? (
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[1, 2].map(i => (
              <div key={i} className="min-w-[200px] h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {ideas.map((idea, idx) => (
              <div key={idx} className="min-w-[200px] flex flex-col gap-2 p-4 bg-sage/5 rounded-2xl border border-sage/10">
                <span className="material-symbols-outlined text-sage">{idea.icon}</span>
                <p className="font-bold text-text-main">{idea.title}</p>
                <p className="text-xs text-text-muted line-clamp-2">{idea.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button & Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 pb-8 pointer-events-none z-30">
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={() => onNavigate(View.CAMERA)}
            className="pointer-events-auto flex items-center justify-center rounded-full w-24 h-24 bg-primary text-white shadow-xl hover:scale-105 transition-transform active:scale-95 border-8 border-white"
          >
            <span className="material-symbols-outlined text-5xl">photo_camera</span>
          </button>
          
          <nav className="pointer-events-auto w-full bg-white rounded-full py-4 px-8 flex justify-between items-center soft-shadow border border-gray-100">
            <button className="text-primary flex flex-col items-center gap-1" onClick={() => onNavigate(View.DASHBOARD)}>
              <span className="material-symbols-outlined text-3xl">home</span>
              <span className="text-xs font-bold">Home</span>
            </button>
            <div className="w-16"></div> 
            <button className="text-text-muted flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-3xl">group</span>
              <span className="text-xs font-bold">Family</span>
            </button>
            <button className="text-text-muted flex flex-col items-center gap-1" onClick={() => onNavigate(View.PROFILE)}>
              <span className="material-symbols-outlined text-3xl">settings</span>
              <span className="text-xs font-bold">Settings</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
