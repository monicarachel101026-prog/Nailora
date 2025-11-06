import React from 'react';
import { NailoraLogo } from '../components/icons';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-nailora-pink-light to-white p-8 text-center">
      <div className="flex-grow flex flex-col items-center justify-center animate-fade-in">
        <NailoraLogo className="w-32 h-32" />
        <div className="flex space-x-2 mt-8">
            <span className="w-2.5 h-2.5 bg-nailora-pink rounded-full animate-pulse delay-0"></span>
            <span className="w-2.5 h-2.5 bg-nailora-pink rounded-full animate-pulse delay-200"></span>
            <span className="w-2.5 h-2.5 bg-nailora-pink rounded-full animate-pulse delay-400"></span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;