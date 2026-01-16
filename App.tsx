
import React, { useState, useEffect } from 'react';
import { View } from './types';
import SplashScreen from './views/SplashScreen';
import Dashboard from './views/Dashboard';
import CameraView from './views/CameraView';
import ResultView from './views/ResultView';
import ProfileView from './views/ProfileView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SPLASH);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Auto-transition from Splash to Dashboard
  useEffect(() => {
    if (currentView === View.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentView(View.DASHBOARD);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const navigateTo = (view: View) => setCurrentView(view);

  const handleCapture = (imgData: string) => {
    setCapturedImage(imgData);
    navigateTo(View.RESULT);
  };

  return (
    <div className="h-full w-full max-w-md mx-auto shadow-2xl relative bg-background-light overflow-hidden flex flex-col">
      {currentView === View.SPLASH && <SplashScreen />}
      
      {currentView === View.DASHBOARD && (
        <Dashboard 
          onNavigate={navigateTo} 
          userName="Martha"
        />
      )}

      {currentView === View.CAMERA && (
        <CameraView 
          onCapture={handleCapture}
          onClose={() => navigateTo(View.DASHBOARD)}
        />
      )}

      {currentView === View.RESULT && (
        <ResultView 
          image={capturedImage}
          onBack={() => navigateTo(View.DASHBOARD)}
          onNavigate={navigateTo}
        />
      )}

      {currentView === View.PROFILE && (
        <ProfileView 
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
};

export default App;
