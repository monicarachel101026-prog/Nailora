
import React, { useState } from 'react';
import { Page } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { ChevronLeftIcon, StarIcon, CheckCircleIcon } from '../components/icons';

interface PremiumScreenProps {
  setCurrentPage: (page: Page) => void;
  onBack: () => void;
}

interface PremiumCardProps {
    imgSrc: string;
    title: string;
    artist: string;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ imgSrc, title, artist }) => (
    <div className="relative rounded-2xl overflow-hidden group shadow-lg">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover aspect-[4/5] transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <StarIcon className="w-3 h-3" />
            <span>PLUS</span>
        </div>
        <div className="absolute bottom-0 left-0 p-3 text-white w-full">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs opacity-80">{artist}</p>
        </div>
    </div>
);

const PremiumScreen: React.FC<PremiumScreenProps> = ({ setCurrentPage, onBack }) => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const premiumDesigns = [
        { imgSrc: "https://i.ibb.co/hLqGg3G/lip-gloss.png", title: "Lip Gloss Nails", artist: "by Alya Putri" },
        { imgSrc: "https://i.ibb.co/dPGjv9W/velvet.png", title: "Velvet Nails", artist: "by Sarah Martinez" },
        { imgSrc: "https://i.ibb.co/MnvkS1z/coquette.png", title: "Coquette / Balletcore", artist: "by Emma Rodriguez" },
        { imgSrc: "https://i.ibb.co/L95tF1M/3d-embellished.png", title: "Gilded Botanicals", artist: "by Luna Chen" },
    ];
    
    const handleUpgrade = () => {
        setShowSuccessModal(true);
    };

    const handleCloseModalAndExplore = () => {
        setShowSuccessModal(false);
        setCurrentPage(Page.Catalog);
    };

    const SuccessModal = () => (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in p-4" onClick={handleCloseModalAndExplore}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm text-center p-6 text-gray-800" onClick={e => e.stopPropagation()}>
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-pulse mb-3" />
                <h3 className="text-2xl font-bold text-nailora-purple">Upgrade Berhasil!</h3>
                <p className="text-nailora-gray mt-1 mb-4">Selamat! Anda sekarang adalah anggota Nailora Plus.</p>
                <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-nailora-purple mb-3">Nikmati akses ke desain eksklusif ini:</p>
                    <div className="grid grid-cols-4 gap-2">
                        {premiumDesigns.map(design => (
                            <img key={design.title} src={design.imgSrc} alt={design.title} className="w-full h-full object-cover rounded-md aspect-square" />
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleCloseModalAndExplore}
                    className="w-full mt-6 bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90"
                >
                    Jelajahi Sekarang
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-900 text-white min-h-full pb-24">
            {showSuccessModal && <SuccessModal />}
            <div className="bg-gradient-to-b from-purple-500 to-pink-500 p-6 rounded-b-3xl relative">
                <button onClick={onBack} className="absolute top-6 left-4 p-2">
                  <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <div className="text-center pt-2">
                    <h2 className="text-xl font-bold">💎 Nailora Plus</h2>
                    <p className="text-sm opacity-90 mt-1">Buka Akses Konten Eksklusif</p>
                </div>
            </div>

            <div className="p-4">
                <p className="text-center text-gray-400 mb-4">Dapatkan akses ke desain premium dari nail artist terbaik.</p>
                 <div className="grid grid-cols-2 gap-4">
                    {premiumDesigns.map(design => (
                        <PremiumCard key={design.title} {...design} />
                    ))}
                 </div>
                <button 
                  onClick={handleUpgrade}
                  className="w-full mt-8 bg-nailora-pink-accent font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 active:scale-100"
                >
                    Upgrade Sekarang
                </button>
            </div>
            
            <BottomNavBar activePage={-1 as Page} setCurrentPage={setCurrentPage} />
        </div>
    );
};
export default PremiumScreen;
