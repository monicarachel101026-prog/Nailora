import React, { useState, useEffect } from 'react';
import { Page, Design, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { SearchIcon, ChevronRightIcon } from '../components/icons';


interface DashboardScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
  onSelectDesign: (design: Design) => void;
  onSearch: (query: string) => void;
}

const CategoryButton = ({ icon, label, onClick }: { icon: string, label: string, onClick?: () => void }) => (
    <div className="flex flex-col items-center text-center gap-2">
        <button onClick={onClick} className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl transition-transform transform hover:scale-110 active:scale-95">
            {icon}
        </button>
        <p className="text-xs text-nailora-purple font-medium">{label}</p>
    </div>
);


const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, setCurrentPage, onSelectDesign, onSearch }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const notificationsEnabled = localStorage.getItem('nailora_notifications_enabled') === 'true';
    if (notificationsEnabled) {
      const hasSeenNotification = sessionStorage.getItem('nailora_notif_seen');
      if (!hasSeenNotification) {
          const timer = setTimeout(() => {
            setShowNotification(true);
            sessionStorage.setItem('nailora_notif_seen', 'true');
          }, 1000);
          return () => clearTimeout(timer);
      }
    }
  }, []);
  
  return (
    <div className="bg-transparent min-h-full pb-24 relative">
      
      {showNotification && (
        <div className="absolute top-6 left-4 right-4 z-20 bg-white p-3 rounded-xl shadow-2xl flex items-center justify-between transition-all duration-300 animate-fade-in">
            <div className="flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <p className="text-sm font-semibold text-nailora-purple">Booking kamu hari ini jam 14:00!</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="font-bold text-lg leading-none text-nailora-gray hover:text-nailora-purple">&times;</button>
        </div>
      )}
      <div className="bg-gradient-to-b from-pink-300 to-pink-200 p-6 rounded-b-3xl">
        <div className="text-white">
          <h1 className="text-2xl font-bold font-quicksand">Selamat Datang,</h1>
          <p className="text-sm opacity-90">{user.name}</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSearch(searchTerm); }}>
            <div className="relative mt-4">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="search"
                placeholder="Cari desain, atau jadwal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-12 pr-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            </div>
        </form>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-nailora-purple mb-4">Kategori Utama</h3>
        <div className="grid grid-cols-3 gap-4">
            <CategoryButton icon="💅" label="Katalog Desain" onClick={() => setCurrentPage(Page.Catalog)}/>
            <CategoryButton icon="🗓️" label="Booking Jadwal" onClick={() => setCurrentPage(Page.Booking)}/>
            <CategoryButton icon="💬" label="Komunitas" onClick={() => setCurrentPage(Page.Community)}/>
        </div>
      </div>
      
      <div className="p-6 bg-nailora-pink-light rounded-t-3xl">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-nailora-purple mb-3">🔥 Promo & Voucher</h3>
          <div className="bg-gradient-to-r from-pink-400 to-red-400 p-4 rounded-xl text-white shadow-md">
            <p className="font-bold text-md">Diskon 20% Booking Pertama!</p>
            <p className="text-xs mt-1">Gunakan kode: <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded">NAILORANEW</span></p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4 bg-nailora-pink-light">
          <div className="mt-6 bg-gradient-to-r from-purple-400 via-nailora-purple to-pink-400 p-5 rounded-2xl text-white shadow-lg flex flex-col items-start gap-3 transition-transform transform hover:scale-[1.02] active:scale-100">
            <div>
              <h3 className="font-bold text-lg">🤝 Jadi Partner Nailora?</h3>
              <p className="text-sm mt-1">Dapatkan lebih banyak pelanggan & komisi menarik dengan bergabung bersama kami.</p>
            </div>
            <button 
              onClick={() => setCurrentPage(Page.PartnerRegistration)}
              className="bg-white/90 text-nailora-purple font-bold py-2 px-5 rounded-lg text-sm hover:bg-white transition-colors"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      
      <div className="p-6 bg-nailora-pink-light">
        <div 
          onClick={() => setCurrentPage(Page.Premium)}
          className="bg-gradient-to-r from-purple-400 to-pink-400 p-5 rounded-2xl text-white shadow-lg flex justify-between items-center cursor-pointer transition-transform transform hover:scale-105 active:scale-100"
        >
          <div>
            <h3 className="font-bold text-lg">💎 Nailora Plus</h3>
            <p className="text-sm">Akses desain & artist eksklusif!</p>
          </div>
          <ChevronRightIcon className="w-6 h-6" />
        </div>
      </div>
      
      <BottomNavBar activePage={Page.Dashboard} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default DashboardScreen;
