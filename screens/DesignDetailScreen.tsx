
import React, { useState } from 'react';
import { Page, Design, User } from '../types';
import { ChevronLeftIcon, HeartIcon, ShareIcon } from '../components/icons';

interface DesignDetailScreenProps {
  design: Design;
  user: User;
  setCurrentPage: (page: Page) => void;
}

const DesignDetailScreen: React.FC<DesignDetailScreenProps> = ({ design, user, setCurrentPage }) => {
  
  const handleMainAction = () => {
      // Regular booking flow for everyone
      setCurrentPage(Page.Booking);
  };

  return (
    <div className="bg-white min-h-full pb-24">
      {/* Image Section */}
      <div className="relative h-[50vh] bg-gray-100 group">
        <img src={design.imgSrc} alt={design.title} className="w-full h-full object-cover transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30"></div>
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pt-6">
             <button onClick={() => setCurrentPage(Page.Catalog)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
             <button onClick={() => alert("Bagikan link")} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                <ShareIcon className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-6 -mt-6 bg-white rounded-t-3xl relative z-10">
         <div className="flex justify-between items-start mb-2">
             <div>
                <h1 className="text-2xl font-bold text-nailora-purple font-quicksand">{design.title}</h1>
                <p className="text-sm text-nailora-gray flex items-center gap-1 mt-1">
                    by <span className="font-semibold text-nailora-pink-accent underline">{design.artist || 'Unknown Artist'}</span>
                </p>
             </div>
             <div className="flex flex-col items-center bg-pink-50 px-3 py-2 rounded-xl">
                <HeartIcon className="w-5 h-5 text-nailora-pink-accent fill-current" />
                <span className="text-xs font-bold text-nailora-purple mt-1">{design.likes || 0}</span>
             </div>
         </div>

         {/* Specs Grid */}
         <div className="grid grid-cols-3 gap-3 my-6">
            <div className="bg-gray-50 p-3 rounded-xl text-center">
                <p className="text-[10px] text-nailora-gray uppercase font-bold tracking-wider mb-1">Warna</p>
                <p className="text-sm font-semibold text-nailora-purple">{design.dominantColor}</p>
            </div>
             <div className="bg-gray-50 p-3 rounded-xl text-center">
                <p className="text-[10px] text-nailora-gray uppercase font-bold tracking-wider mb-1">Gaya</p>
                <p className="text-sm font-semibold text-nailora-purple">{design.style}</p>
            </div>
             <div className="bg-gray-50 p-3 rounded-xl text-center">
                <p className="text-[10px] text-nailora-gray uppercase font-bold tracking-wider mb-1">Panjang</p>
                <p className="text-sm font-semibold text-nailora-purple">{design.length}</p>
            </div>
         </div>

        {/* Description */}
        <div className="mb-8">
            <h3 className="font-bold text-nailora-purple text-lg mb-2">Detail Desain</h3>
            <p className="text-sm text-nailora-gray leading-relaxed">
                {design.description || "Tidak ada deskripsi untuk desain ini."}
            </p>
        </div>
      </div>
      
      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white p-4 border-t border-gray-200 md:max-w-md lg:max-w-lg shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
            <button className="p-3.5 border border-gray-300 rounded-xl text-nailora-gray hover:bg-gray-50 transition-colors">
                <HeartIcon className="w-6 h-6" />
            </button>
            <button 
                onClick={handleMainAction} 
                className="flex-grow bg-nailora-pink-accent text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-opacity-90 flex items-center justify-center gap-2 transition-colors"
            >
                <span>Booking Desain Ini</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Mulai 100K</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default DesignDetailScreen;
