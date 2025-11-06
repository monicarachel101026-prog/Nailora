import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
// FIX: Import InstagramIcon and TikTokIcon
import { ChevronRightIcon, PencilIcon, InstagramIcon, TikTokIcon } from '../components/icons';

interface ProfileScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
}

const ProfileMenuItem = ({ icon, text, subtext, hasArrow = true, rightContent, onClick }: { icon: string, text: string, subtext?: string, hasArrow?: boolean, rightContent?: React.ReactNode, onClick?: () => void }) => (
    <button onClick={onClick} className="flex items-center py-3 w-full text-left disabled:opacity-70 group" disabled={!onClick}>
        <div className="text-2xl mr-4">{icon}</div>
        <div className="flex-grow">
            <p className="font-semibold text-nailora-purple">{text}</p>
            {subtext && <p className="text-xs text-nailora-gray">{subtext}</p>}
        </div>
        {rightContent}
        {hasArrow && <ChevronRightIcon className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-1" />}
    </button>
)

const ToggleMenuItem = ({ icon, text, subtext, enabled, onToggle }: { icon: string, text: string, subtext?: string, enabled: boolean, onToggle: () => void }) => (
    <div className="flex items-center py-3 w-full text-left">
        <div className="text-2xl mr-4">{icon}</div>
        <div className="flex-grow">
            <p className="font-semibold text-nailora-purple">{text}</p>
            {subtext && <p className="text-xs text-nailora-gray">{subtext}</p>}
        </div>
        <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-nailora-pink-accent' : 'bg-gray-200'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, setCurrentPage, onLogout }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('nailora_notifications_enabled') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('nailora_notifications_enabled', String(notificationsEnabled));
  }, [notificationsEnabled]);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
  };

  return (
    <div className="bg-gray-50 min-h-full pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-pink-300 to-pink-200 p-6 rounded-b-3xl">
          <div className="flex items-center gap-4">
              <img src={user.avatar} alt="User Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-lg"/>
              <div className="text-white flex-grow">
                  <h2 className="text-2xl font-bold font-quicksand">{user.name}</h2>
                  <p className="text-sm opacity-90">{user.email}</p>
              </div>
               <button onClick={() => setCurrentPage(Page.EditProfile)} className="bg-white/30 p-2.5 rounded-full self-start hover:bg-white/50 transition-colors">
                    <PencilIcon className="w-5 h-5 text-white" />
                </button>
          </div>
      </div>

      <div className="p-4">
        {/* Account Menu */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-nailora-purple mb-2 px-1">Akun</h3>
            <div className="divide-y divide-gray-100">
                <ProfileMenuItem icon="🗓️" text="Riwayat Booking" subtext="Lihat semua transaksi Anda" onClick={() => setCurrentPage(Page.BookingHistory)} />
                <ProfileMenuItem icon="💎" text="Nailora Plus" subtext="Upgrade untuk keuntungan lebih" rightContent={<span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full mr-2">Eksklusif</span>} onClick={() => setCurrentPage(Page.Premium)}/>
            </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mt-4">
            <h3 className="font-semibold text-nailora-purple mb-2 px-1">Pengaturan</h3>
             <div className="divide-y divide-gray-100">
                <ToggleMenuItem 
                    icon="🔔" 
                    text="Notifikasi" 
                    subtext={notificationsEnabled ? "Aktif" : "Tidak Aktif"}
                    enabled={notificationsEnabled} 
                    onToggle={handleToggleNotifications}
                />
                <ProfileMenuItem icon="❓" text="Bantuan & Dukungan" />
                <ProfileMenuItem icon="🔒" text="Privasi & Keamanan" />
             </div>
        </div>

         {/* About Menu */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mt-4">
             <div className="divide-y divide-gray-100">
                <ProfileMenuItem icon="ℹ️" text="Tentang Nailora" onClick={() => setCurrentPage(Page.About)}/>
                <ProfileMenuItem icon="📜" text="Syarat & Ketentuan" />
                <ProfileMenuItem 
                  icon="⭐" 
                  text="Beri Rating Aplikasi" 
                  onClick={() => alert("Terima kasih atas dukungan Anda!")} 
                />
             </div>
        </div>
        
        {/* Logout Button */}
        <div className="mt-6">
            <button 
                onClick={onLogout} 
                className="w-full bg-gray-200 text-nailora-gray font-bold py-3 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
            >
                Keluar
            </button>
        </div>

        {/* Social Media Footer */}
        <div className="text-center mt-8">
            <p className="text-sm font-semibold text-nailora-gray mb-3">Ikuti Kami</p>
            <div className="flex justify-center gap-4">
                <a href="#" className="p-2 bg-white rounded-full shadow-md text-nailora-purple hover:text-pink-500"><InstagramIcon className="w-6 h-6" /></a>
                <a href="#" className="p-2 bg-white rounded-full shadow-md text-nailora-purple hover:text-black"><TikTokIcon className="w-6 h-6" /></a>
            </div>
        </div>
      </div>

      <BottomNavBar activePage={Page.Profile} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProfileScreen;