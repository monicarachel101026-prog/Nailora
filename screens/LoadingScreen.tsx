import React from 'react';
import { NailoraLogo } from '../components/icons';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-pink-100 to-white">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 border-4 border-nailora-pink border-t-transparent rounded-full animate-spin"></div>
        <NailoraLogo className="w-16 h-16" />
      </div>
      <p className="mt-4 text-nailora-purple font-semibold">Memuat...</p>
    </div>
  );
};

export default LoadingScreen;
