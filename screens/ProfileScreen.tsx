
import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { ChevronRightIcon, PencilIcon, InstagramIcon, TikTokIcon, CrownIcon } from '../components/icons';

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
  
  // Badge Color Logic based on Tier (Simulated for now based on generic premium)
  const getBadgeColor = () => {
      if (!user.isPremium) return 'border-white';
      // In a real app, check user.subscription.tier
      return 'border-yellow-400'; 
  };

  return (
    <div className="bg-gray-50 min-h-full pb-24">
      {/* Header */}
      <div className={`p-6 rounded-b-3xl relative ${user.isPremium ? 'bg-gradient-to-br from-purple-900 to-purple-600' : 'bg-gradient-to-b from-pink-300 to-pink-200'}`}>
          <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <img src={user.avatar} alt="User Avatar" className={`w-20 h-20 rounded-full border-4 shadow-lg ${getBadgeColor()}`}/>
                {user.isPremium && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1.5 border-2 border-purple-800 shadow-md">
                        <CrownIcon className="w-4 h-4 text-purple-900" />
                    </div>
                )}
              </div>
              <div className="text-white flex-grow">
                  <h2 className="text-2xl font-bold font-quicksand">{user.name}</h2>
                  <p className="text-sm opacity-90">{user.email}</p>
                  {user.isPremium && <p className="text-xs font-bold text-yellow-300 mt-1 uppercase tracking-wider">Gold Member</p>}
              </div>
               <button onClick={() => setCurrentPage(Page.EditProfile)} className="bg-white/30 p-2.5 rounded-full self-start hover:bg-white/50 transition-colors">
                    <PencilIcon className="w-5 h-5 text-white" />
                </button>
          </div>
          {user.isPremium && (
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          )}
      </div>

      <div className="p-4">
        {/* Premium Banner / Upsell */}
        {!user.isPremium && (
             <button onClick={() => setCurrentPage(Page.Premium)} className="w-full bg-gray-900 text-white p-4 rounded-xl shadow-lg mb-4 flex items-center justify-between overflow-hidden relative">
                <div className="z-10">
                    <h3 className="font-bold flex items-center gap-2 text-yellow-400"><CrownIcon className="w-5 h-5"/> Upgrade ke Plus</h3>
                    <p className="text-xs text-gray-300">Diskon 65% Bulan Pertama!</p>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-bold z-10">
                    Rp 9.900
                </div>
                <div className="absolute right-[-20px] top-[-20px] w-20 h-20 bg-yellow-500 rounded-full blur-xl opacity-30"></div>
            </button>
        )}

        {/* Account Menu */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-nailora-purple mb-2 px-1">Akun</h3>
            <div className="divide-y divide-gray-100">
                {user.isPremium && (
                    <>
                        <ProfileMenuItem icon="✨" text="AI Stylist" subtext="Gunakan asisten pribadimu" onClick={() => setCurrentPage(Page.AIStylist)} />
                        <ProfileMenuItem icon="💳" text="Langganan Saya" subtext="Atur paket dan tagihan" onClick={() => setCurrentPage(Page.SubscriptionManagement)} />
                    </>
                )}
                <ProfileMenuItem icon="🎁" text="Kirim Hadiah Premium" subtext="Berikan Nailora Plus ke teman" onClick={() => setCurrentPage(Page.GiftPremium)} />
                <ProfileMenuItem icon="🗓️" text="Riwayat Booking" subtext="Lihat semua transaksi Anda" onClick={() => setCurrentPage(Page.BookingHistory)} />
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
                <ProfileMenuItem icon="☁️" text="Cloud Sync" subtext={user.isPremium ? "Aktif" : "Terkunci (Premium)"} rightContent={!user.isPremium && <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">PRO</span>} onClick={!user.isPremium ? () => setCurrentPage(Page.Premium) : undefined}/>
                <ProfileMenuItem icon="❓" text="Pusat Bantuan" onClick={() => setCurrentPage(Page.PremiumHelpCenter)} />
                <ProfileMenuItem icon="🔒" text="Privasi & Keamanan" />
             </div>
        </div>
        
        {/* Developer Tools (Simulated) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mt-4 border border-gray-200">
             <h3 className="font-semibold text-nailora-purple mb-2 px-1">Developer Area</h3>
             <ProfileMenuItem icon="📈" text="Dashboard Admin" subtext="Pantau statistik aplikasi" onClick={() => setCurrentPage(Page.AdminDashboard)} />
        </div>

         {/* About Menu */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mt-4">
             <div className="divide-y divide-gray-100">
                <ProfileMenuItem icon="ℹ️" text="Tentang Nailora" onClick={() => setCurrentPage(Page.About)}/>
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