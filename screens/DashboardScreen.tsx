import React, { useState, useEffect } from 'react';
import { Page, Design, Tutorial, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { SearchIcon, HeartIcon, ChevronRightIcon, UploadIcon, ChatBubbleOvalLeftIcon, TrashIcon, DocumentTextIcon, LockIcon, WalletIcon } from '../components/icons';
import TutorialViewer from '../components/TutorialViewer';
import UploadTutorialModal from '../components/UploadTutorialModal';
import TextTutorialViewer from '../components/TextTutorialViewer';


interface DashboardScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
  onSelectDesign: (design: Design) => void;
}

const CategoryButton = ({ icon, label, onClick }: { icon: string, label: string, onClick?: () => void }) => (
    <div className="flex flex-col items-center text-center gap-2">
        <button onClick={onClick} className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl transition-transform transform hover:scale-110 active:scale-95">
            {icon}
        </button>
        <p className="text-xs text-nailora-purple font-medium">{label}</p>
    </div>
);

interface TutorialCardProps {
    tutorial: Tutorial;
    onClick: () => void;
    onDelete: (id: number) => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, onClick, onDelete }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(true);
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(tutorial.id);
    };

    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(false);
    };

    return (
        <div onClick={!showConfirmDelete ? onClick : undefined} className="bg-white rounded-2xl shadow-xl overflow-hidden w-48 flex-shrink-0 group cursor-pointer">
            <div className="relative">
                <img src={tutorial.imgSrc} alt={tutorial.title} className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        {tutorial.videoUrl ? (
                            <svg className="w-6 h-6 text-nailora-pink-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                        ) : (
                            <DocumentTextIcon className="w-6 h-6 text-nailora-pink-accent" />
                        )}
                    </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-semibold px-1.5 py-0.5 rounded">{tutorial.duration}</span>
            </div>
            <div className="p-3 relative">
                <h4 className="font-bold text-sm text-nailora-purple truncate">{tutorial.title}</h4>
                <div className="flex justify-between items-center mt-2 text-xs text-nailora-gray">
                    <div className="flex items-center gap-1.5">
                        <HeartIcon className="w-4 h-4" />
                        <span>{tutorial.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                        <span>{tutorial.comments.length}</span>
                    </div>
                </div>
                {showConfirmDelete ? (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-sm rounded-lg">
                        <button
                            onClick={handleCancelDelete}
                            className="bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                        >
                            OK
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleDeleteClick}
                        className="absolute bottom-2 right-2 bg-red-500/50 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Hapus Tutorial"
                    >
                        <TrashIcon className="w-4 h-4"/>
                    </button>
                )}
            </div>
        </div>
    );
};

const UploadCard = ({ onClick }: { onClick: () => void }) => (
    <div onClick={onClick} className="bg-white rounded-2xl shadow-xl w-48 h-[162px] flex-shrink-0 cursor-pointer group flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-300 hover:border-nailora-pink-accent transition-colors">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-nailora-pink-accent transition-transform group-hover:scale-110">
            <UploadIcon className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm text-nailora-purple mt-3">Unggah Tutorial</h4>
        <p className="text-xs text-nailora-gray">Bagikan kreasimu!</p>
    </div>
);

const eWalletTutorialContent = (
    <>
        <p className="mb-4">Membayar nail art favoritmu kini lebih mudah dengan e-wallet! Ikuti langkah-langkah simpel berikut ini:</p>
        
        <div className="space-y-5">
            <div>
                <h3 className="font-bold text-nailora-purple mb-2">1. Buka Aplikasi E-Wallet Kamu</h3>
                <p>Siapkan aplikasi e-wallet andalanmu (Gopay, OVO, Dana, dll).</p>
            </div>

            <div>
                <h3 className="font-bold text-nailora-purple mb-2">2. Pilih Menu Pembayaran</h3>
                <p>Cari tombol dengan tulisan seperti <span className="font-semibold bg-gray-100 px-1.5 py-0.5 rounded-md">“Bayar”</span>, <span className="font-semibold bg-gray-100 px-1.5 py-0.5 rounded-md">“Transfer”</span>, atau <span className="font-semibold bg-gray-100 px-1.5 py-0.5 rounded-md">“Scan QR”</span>.</p>
            </div>
            
            <div className="flex items-start gap-3 bg-pink-50 p-4 rounded-lg">
                <WalletIcon className="w-8 h-8 text-nailora-pink-accent flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-nailora-purple mb-2">3. Pilih Metode Pembayaran</h3>
                    <p className="mb-2">Ada dua cara utama:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-semibold">Scan QR Code:</span> Arahkan kamera ke kode QR yang diberikan oleh nail artist.</li>
                        <li><span className="font-semibold">Kirim ke Nomor:</span> Jika tanpa QR, masukkan nomor HP atau akun e-wallet tujuan.</li>
                    </ul>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-nailora-purple mb-2">4. Masukkan Nominal Pembayaran</h3>
                <p>Ketik jumlah uang yang harus dibayar sesuai dengan total tagihanmu.</p>
            </div>

            <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                <LockIcon className="w-8 h-8 text-nailora-purple flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-nailora-purple mb-2">5. Konfirmasi dan Masukkan PIN</h3>
                    <p className="mb-2">Periksa kembali detail transaksi sebelum melanjutkan:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Nama penerima sudah benar.</li>
                        <li>Jumlah uang sesuai.</li>
                    </ul>
                    <p className="mt-2">Terakhir, masukkan PIN rahasia e-wallet kamu untuk menyelesaikan pembayaran. Selesai!</p>
                </div>
            </div>
        </div>
    </>
);

const initialTutorials: Tutorial[] = [
    { id: 1, imgSrc: "https://picsum.photos/seed/tip1/300/200", title: "Cara merawat kuku", duration: "5:30", videoUrl: "https://videos.pexels.com/video-files/7578541/7578541-sd_640_360_25fps.mp4", uploaderName: "Nailora Official", uploaderAvatar: 'https://picsum.photos/seed/nailora/100/100', likes: 254, comments: [] },
    { id: 2, imgSrc: "https://picsum.photos/seed/tip2/300/200", title: "DIY French Manicure", duration: "8:15", videoUrl: "https://videos.pexels.com/video-files/8051949/8051949-sd_640_360_25fps.mp4", uploaderName: "Jane Doe", uploaderAvatar: 'https://picsum.photos/seed/user2/100/100', likes: 481, comments: [] },
    { id: 3, imgSrc: "https://picsum.photos/seed/tip3/300/200", title: "Memilih Warna Nude", duration: "3:45", videoUrl: "https://videos.pexels.com/video-files/7650154/7650154-sd_640_360_25fps.mp4", uploaderName: "Alya Putri", uploaderAvatar: 'https://picsum.photos/seed/user1/100/100', likes: 198, comments: [] },
    { id: 4, imgSrc: "https://picsum.photos/seed/ewallet/300/200", title: "Cara Bayar Pakai E-Wallet", duration: "2 min read", content: eWalletTutorialContent, uploaderName: "Nailora Official", uploaderAvatar: 'https://picsum.photos/seed/nailora/100/100', likes: 152, comments: [] },
];

const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, setCurrentPage, onSelectDesign }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [tutorials, setTutorials] = useState<Tutorial[]>(() => {
    const savedTutorials = localStorage.getItem('nailora_tutorials');
    try {
        if (savedTutorials) {
            const parsed = JSON.parse(savedTutorials);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch(e) { console.error("Failed to load tutorials", e); }
    localStorage.setItem('nailora_tutorials', JSON.stringify(initialTutorials));
    return initialTutorials;
  });

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

  const handleUpdateTutorial = (updatedTutorial: Tutorial) => {
    setTutorials(prev => prev.map(t => t.id === updatedTutorial.id ? updatedTutorial : t));
    setSelectedTutorial(updatedTutorial); // Keep viewer updated
  };

  const handleAddTutorial = (newTutorial: Tutorial) => {
    setTutorials(prev => {
        const updated = [newTutorial, ...prev];
        localStorage.setItem('nailora_tutorials', JSON.stringify(updated));
        return updated;
    });
  };

  const handleDeleteTutorial = (id: number) => {
    setTutorials(prev => {
        const updated = prev.filter(t => t.id !== id);
        localStorage.setItem('nailora_tutorials', JSON.stringify(updated));
        return updated;
    });
  };
  
  return (
    <div className="bg-transparent min-h-full pb-24 relative">
      {selectedTutorial && selectedTutorial.videoUrl && (
        <TutorialViewer 
            user={user}
            tutorial={selectedTutorial} 
            onClose={() => setSelectedTutorial(null)}
            onUpdateTutorial={handleUpdateTutorial}
        />
      )}
      {selectedTutorial && selectedTutorial.content && (
        <TextTutorialViewer 
            tutorial={selectedTutorial} 
            onClose={() => setSelectedTutorial(null)}
        />
      )}
      {showUploadModal && <UploadTutorialModal user={user} onClose={() => setShowUploadModal(false)} onAddTutorial={handleAddTutorial} />}

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
        <div className="relative mt-4">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari desain, tutorial, atau jadwal"
            className="w-full bg-white pl-12 pr-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-nailora-purple mb-4">Kategori Utama</h3>
        <div className="grid grid-cols-4 gap-4">
            <CategoryButton icon="💅" label="Katalog Desain" onClick={() => setCurrentPage(Page.Catalog)}/>
            <CategoryButton icon="🗓️" label="Booking Jadwal" onClick={() => setCurrentPage(Page.Booking)}/>
            <CategoryButton icon="💡" label="Tutorial" onClick={() => alert('Halaman Tutorial akan segera hadir!')}/>
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

      <div className="bg-nailora-pink-light">
          <div className="px-6 flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-nailora-purple">Tutorial & Tips</h3>
              <button onClick={() => alert('Halaman tutorial akan datang!')} className="text-sm font-semibold text-nailora-pink-accent hover:underline">Lihat Semua</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
               <UploadCard onClick={() => setShowUploadModal(true)} />
               {tutorials.map(tutorial => (
                   <TutorialCard 
                       key={tutorial.id}
                       tutorial={tutorial}
                       onClick={() => setSelectedTutorial(tutorial)}
                       onDelete={handleDeleteTutorial}
                   />
               ))}
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