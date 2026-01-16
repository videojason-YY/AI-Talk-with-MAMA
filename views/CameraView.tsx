
import React, { useRef, useState, useEffect } from 'react';

interface CameraViewProps {
  onCapture: (imgData: string) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Camera access denied:", err);
        setHasPermission(false);
      }
    };
    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        onCapture(canvas.toDataURL('image/jpeg'));
      }
    }
  };

  if (hasPermission === false) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
        <span className="material-symbols-outlined text-6xl text-red-400">no_photography</span>
        <h2 className="text-2xl font-bold">Camera Access Needed</h2>
        <p className="text-text-muted">Please enable camera permissions to take photos for your family.</p>
        <button onClick={onClose} className="bg-primary text-white px-8 py-3 rounded-full font-bold">Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-black relative overflow-hidden flex flex-col">
      <video 
        ref={videoRef}
        autoPlay 
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale-0"
      />

      <div className="relative h-full w-full flex flex-col justify-between p-6 pointer-events-none">
        <div className="flex justify-between items-start pointer-events-auto">
          <button className="flex items-center justify-center p-4 bg-white/90 rounded-xl shadow-lg text-slate-800 border-2 border-slate-100">
            <span className="material-symbols-outlined">flash_off</span>
          </button>
          <button onClick={onClose} className="flex items-center justify-center p-4 bg-white/90 rounded-xl shadow-lg text-slate-800 border-2 border-slate-100">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-64 h-64 border-[6px] border-white/80 rounded-xl shadow-2xl relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-primary rounded-tl-sm"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-primary rounded-tr-sm"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-primary rounded-bl-sm"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-primary rounded-br-sm"></div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between pb-4 pointer-events-auto">
          <div className="w-16 h-16 rounded-xl border-4 border-white bg-cream-yellow overflow-hidden shadow-xl">
             {/* Thumbnail placeholder */}
          </div>
          <div className="relative flex items-center justify-center">
            <button 
              onClick={takePhoto}
              className="bg-primary w-24 h-24 rounded-full shutter-ring flex items-center justify-center shadow-2xl active:scale-95 transition-transform border-4 border-white"
            >
              <span className="material-symbols-outlined !text-4xl text-white">photo_camera</span>
            </button>
          </div>
          <div className="w-16 h-16"></div>
        </div>
      </div>

      <div className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-white/95 px-6 py-2 rounded-full border-2 border-primary shadow-lg">
          <p className="text-primary font-bold text-lg leading-tight uppercase tracking-wider">Tap green button to snap</p>
        </div>
      </div>

      <div className="bg-cream-yellow/30 py-4 px-10 flex justify-between items-center border-t border-slate-200">
        <div className="text-center w-full">
          <span className="text-slate-600 text-sm font-medium tracking-widest uppercase">Simple Mode Active</span>
        </div>
      </div>
    </div>
  );
};

export default CameraView;
