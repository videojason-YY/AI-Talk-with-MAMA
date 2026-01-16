
import React from 'react';
import { View } from '../types';
import { ASSETS, FAMILY_MEMBERS } from '../constants';

interface ProfileViewProps {
  onNavigate: (view: View) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-light overflow-y-auto pb-32">
      {/* Top Bar */}
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-light z-10">
        <div className="text-text-main flex size-12 shrink-0 items-center justify-start cursor-pointer" onClick={() => onNavigate(View.DASHBOARD)}>
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </div>
        <h2 className="text-text-main text-xl font-extrabold leading-tight tracking-[-0.015em] flex-1 text-center">Your Space</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-xl h-12 w-12 bg-cream text-text-main">
            <span className="material-symbols-outlined text-3xl">notifications</span>
          </button>
        </div>
      </header>

      {/* Profile Card */}
      <section className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-cream flex flex-col items-center gap-4">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-sage/20" 
              style={{ backgroundImage: `url(${ASSETS.MARTHA})` }}
            />
            <div className="absolute bottom-1 right-1 bg-sage h-8 w-8 rounded-full border-4 border-white flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-text-main mb-1">Martha Stewart</h1>
            <div className="bg-sage/10 px-3 py-1 rounded-full inline-block">
              <p className="text-sage text-sm font-bold leading-normal">3 days active this week</p>
            </div>
            <p className="text-[#5e8187] text-base font-medium mt-2">Looking wonderful today!</p>
          </div>
        </div>
      </section>

      {/* Calendar Card */}
      <section className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-cream">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-text-main">Activity Calendar</h2>
            <div className="flex gap-2">
              <button className="size-10 flex items-center justify-center rounded-full bg-background-light">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <p className="text-text-main text-base font-bold flex items-center">October 2024</p>
              <button className="size-10 flex items-center justify-center rounded-full bg-background-light">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-[#5e8187] text-xs font-extrabold uppercase py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
             <div className="h-12"></div><div className="h-12"></div>
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(day => (
               <button key={day} className="h-12 w-full text-sm font-bold flex flex-col items-center justify-center relative">
                 {day === 5 ? (
                   <div className="size-10 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">{day}</div>
                 ) : (
                   <>
                     {day}
                     {[1, 3, 7, 9, 12, 15].includes(day) && <div className="size-1.5 bg-sage rounded-full mt-1"></div>}
                   </>
                 )}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* Family Contacts */}
      <section className="p-4">
        <h2 className="text-text-main text-xl font-extrabold mb-4">Family Quick-Connect</h2>
        <div className="grid grid-cols-2 gap-4">
          {FAMILY_MEMBERS.map((member, idx) => (
            <div key={idx} className="bg-cream-yellow p-4 rounded-xl flex flex-col items-center text-center gap-3 border border-primary/10 transition-transform active:scale-95">
              <div 
                className="size-20 rounded-full bg-cover bg-center border-4 border-white shadow-sm" 
                style={{ backgroundImage: `url(${member.avatarUrl})` }}
              />
              <div>
                <p className="font-bold text-text-main text-lg">{member.name}</p>
                <p className="text-xs text-[#5e8187] font-semibold uppercase tracking-wider">{member.relation}</p>
              </div>
              <button className="bg-primary w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-bold shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-xl">{idx % 2 === 0 ? 'call' : 'chat'}</span>
                {idx % 2 === 0 ? 'Call' : 'Chat'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-cream px-6 pb-8 pt-4 z-20">
        <div className="flex justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-[#5e8187]" onClick={() => onNavigate(View.DASHBOARD)}>
            <span className="material-symbols-outlined text-3xl">home</span>
            <span className="text-[10px] font-extrabold uppercase">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#5e8187]">
            <span className="material-symbols-outlined text-3xl">calendar_month</span>
            <span className="text-[10px] font-extrabold uppercase">Events</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#5e8187]">
            <span className="material-symbols-outlined text-3xl">photo_library</span>
            <span className="text-[10px] font-extrabold uppercase">Memories</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <span className="text-[10px] font-extrabold uppercase">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProfileView;
