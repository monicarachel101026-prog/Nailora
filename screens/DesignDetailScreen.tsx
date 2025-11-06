import React from 'react';
import { Page, Design } from '../types';
import { ChevronLeftIcon, HeartIcon, StarIcon } from '../components/icons';

interface DesignDetailScreenProps {
  design: Design;
  setCurrentPage: (page: Page) => void;
}

const DesignDetailScreen: React.FC<DesignDetailScreenProps> = ({ design, setCurrentPage }) => {
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="relative">
        <img src={design.imgSrc} alt={design.title} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <button onClick={() => setCurrentPage(Page.Catalog)} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl font-bold">{design.title}</h1>
          <p className="text-sm opacity-90">{design.category}</p>
        </div>
        {design.isPremium && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <StarIcon className="w-3 h-3" />
                <span>PLUS</span>
            </div>
        )}
      </div>

      <div className="p-6">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h3 className="font-bold text-nailora-purple text-lg mb-2">Deskripsi</h3>
            <p className="text-sm text-nailora-gray">{design.description || "Deskripsi untuk desain ini akan segera hadir."}</p>
            {design.artist && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-nailora-gray">Dibuat oleh: <span className="font-semibold text-nailora-purple">{design.artist}</span></p>
                </div>
            )}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white p-4 border-t border-gray-200 flex items-center gap-4 md:max-w-md lg:max-w-lg">
        <button className="p-3 bg-gray-100 rounded-lg text-nailora-pink-accent">
            <HeartIcon className="w-6 h-6" />
        </button>
        <button onClick={() => setCurrentPage(Page.Booking)} className="w-full bg-nailora-pink-accent text-white font-bold py-3 rounded-lg shadow-lg hover:bg-opacity-90">
            Booking Desain Ini
        </button>
      </div>
    </div>
  );
};

export default DesignDetailScreen;
