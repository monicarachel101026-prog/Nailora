
import React from 'react';
import { Page } from '../types';
import { ChevronLeftIcon, CrownIcon, CheckCircleIcon, SparklesIcon, UploadIcon, TrashIcon } from '../components/icons';

interface PremiumScreenProps {
  setCurrentPage: (page: Page) => void;
  onSubscribeClick: () => void;
  onTrialClick: () => void;
}

const FeatureItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
        <div className="text-yellow-300">{icon}</div>
        <span className="text-white font-medium text-sm">{text}</span>
    </div>
);

const PremiumScreen: React.FC<PremiumScreenProps> = ({ setCurrentPage, onSubscribeClick, onTrialClick }) => {
  return (
    <div className="bg-gray-900 min-h-full relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-purple-600 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[50%] bg-pink-600 rounded-full blur-[100px] opacity-50"></div>
      </div>

      {/* Header */}
      <div className="p-4 relative z-10 flex items-center justify-between">
        <button onClick={() => setCurrentPage(Page.Dashboard)} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
          <ChevronLeftIcon className="w-6 h-6"/>
        </button>
        <button onClick={() => setCurrentPage(Page.PremiumHelpCenter)} className="text-xs text-white/70 underline hover:text-white">
            Bantuan
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start px-6 pt-2 relative z-10 text-center pb-24">
          <div className="mb-4 animate-bounce-slow">
            <CrownIcon className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 font-quicksand">Nailora Plus</h1>
          <p className="text-gray-300 text-xs mb-6">Upgrade sekarang untuk fitur tanpa batas.</p>

          {/* Features Grid */}
          <div className="w-full space-y-2 mb-6">
             <FeatureItem icon={<CrownIcon className="w-5 h-5"/>} text="Akses Semua Desain Premium" />
             <FeatureItem icon={<SparklesIcon className="w-5 h-5"/>} text="AI Personal Nail Stylist" />
             <FeatureItem icon={<CheckCircleIcon className="w-5 h-5"/>} text="Tutorial Premium Step-by-step" />
             <FeatureItem icon={<UploadIcon className="w-5 h-5"/>} text="Upload Desain Unlimited" />
             <FeatureItem icon={<span className="text-lg">🎁</span>} text="Bonus Reward & Desain Eksklusif" />
          </div>
          
          {/* Launch Promo Banner */}
           <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 shadow-lg animate-pulse">
              🔥 PROMO LAUNCHING: Diskon 65% Bulan Pertama!
          </div>

          {/* Pricing Card */}
          <div className="w-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-[1px] rounded-2xl shadow-2xl mb-4">
              <div className="bg-gray-800 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl">BEST VALUE</div>
                  <p className="text-gray-400 text-xs">Langganan Bulanan</p>
                  <div className="flex items-baseline justify-center mt-1 mb-3 gap-1">
                      <span className="text-xs text-red-400 line-through decoration-red-400 mr-1">Rp 29.000</span>
                      <span className="text-xs text-gray-400 align-top">Rp</span>
                      <span className="text-3xl font-bold text-white">9.900</span>
                      <span className="text-[10px] text-gray-400">/bulan pertama</span>
                  </div>
                  
                  <button 
                    onClick={onSubscribeClick}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-transform active:scale-95 mb-3 text-sm"
                  >
                    Berlangganan Sekarang
                  </button>

                  <p className="text-[10px] text-gray-400">Perpanjangan otomatis Rp 29.000/bulan berikutnya.</p>
              </div>
          </div>

          {/* Trial Button */}
          <button 
              onClick={onTrialClick}
              className="text-white text-sm font-semibold underline decoration-white/50 hover:decoration-white"
          >
              Coba Gratis 3 Hari (Free Trial)
          </button>
          
          <p className="text-[10px] text-gray-500 mt-6">
              Aman & Terpercaya. Batalkan kapan saja.
          </p>
      </div>
    </div>
  );
};

export default PremiumScreen;