
import React, { useState, useEffect } from 'react';
import { Page, Design, Tutorial, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { SearchIcon, HeartIcon, ChevronRightIcon, UploadIcon, ChatBubbleOvalLeftIcon, TrashIcon, DocumentTextIcon, LockIcon, WalletIcon, SparklesIcon, CrownIcon } from '../components/icons';
import TutorialViewer from '../components/TutorialViewer';
import UploadTutorialModal from '../components/UploadTutorialModal';
import { initialTutorials } from '../data/tutorials';


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

interface TutorialCardProps {
    tutorial: Tutorial;
    onClick: () => void;
    onDelete?: (id: number) => void;
    isPremiumUser: boolean;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, onClick, onDelete, isPremiumUser }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const isLocked = tutorial.isPremium && !isPremiumUser;

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(true);
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.(tutorial.id);
    };

    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(false);
    };
    
    // Helper for difficulty badge color
    const getDifficultyColor = (diff: string) => {
        switch(diff) {
            case 'Pemula': return 'bg-green-100 text-green-700';
            case 'Menengah': return 'bg-yellow-100 text-yellow-700';
            case 'Pro': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div onClick={!showConfirmDelete ? onClick : undefined} className={`bg-white rounded-2xl shadow-xl overflow-hidden w-56 flex-shrink-0 group cursor-pointer relative ${isLocked ? 'opacity-90' : ''}`}>
            <div className="relative h-32">
                <img src={tutorial.imgSrc} alt={tutorial.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-nailora-purple text-[10px] font-bold px-2 py-1 rounded-full">
                    {tutorial.category}
                </div>
                 <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-[10px] opacity-90 flex items-center gap-1 font-medium">
                        <DocumentTextIcon className="w-3 h-3" />
                        {tutorial.duration} • {tutorial.steps.length} Langkah
                    </p>
                </div>
                {isLocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                            <LockIcon className="w-8 h-8 text-yellow-400" />
                        </div>
                    </div>
                )}
            </div>
            <div className="p-3 relative">
                <h4 className="font-bold text-sm text-nailora-purple line-clamp-2 h-10 leading-tight flex gap-1">
                    {tutorial.isPremium && !isLocked && <CrownIcon className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5" />}
                    {tutorial.title}
                </h4>
                
                <div className="flex items-center gap-2 mt-1 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                    </span>
                </div>

                <div className="flex justify-between items-center mt-2 text-xs text-nailora-gray border-t border-gray-100 pt-2">
                    <div className="flex items-center gap-1.5">
                        <HeartIcon className="w-3.5 h-3.5" />
                        <span>{tutorial.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                         <span className="text-[10px]">by {tutorial.uploaderName.split(' ')[0]}</span>
                    </div>
                </div>

                {onDelete && (
                    <>
                        {showConfirmDelete ? (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center gap-2 z-20">
                                <button
                                    onClick={handleCancelDelete}
                                    className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-md hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleDeleteClick}
                                className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Hapus Tutorial"
                            >
                                <TrashIcon className="w-4 h-4"/>
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const UploadCard = ({ onClick }: { onClick: () => void }) => (
    <div onClick={onClick} className="bg-white rounded-2xl shadow-xl w-40 h-[220px] flex-shrink-0 cursor-pointer group flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-300 hover:border-nailora-pink-accent transition-colors">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-nailora-pink-accent transition-transform group-hover:scale-110">
            <UploadIcon className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm text-nailora-purple mt-3">Buat Tips</h4>
        <p className="text-xs text-nailora-gray mt-1">Bagikan ilmu nail art kamu!</p>
    </div>
);

const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, setCurrentPage, onSelectDesign, onSearch }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [tutorials, setTutorials] = useState<Tutorial[]>(() => {
    const savedTutorials = localStorage.getItem('nailora_tutorials');
    try {
        if (savedTutorials) {
            const parsed = JSON.parse(savedTutorials);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch(e) { console.error("Failed to load tutorials", e); }
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
  
  const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateTutorial = (updatedTutorial: Tutorial) => {
    const updatedList = tutorials.map(t => t.id === updatedTutorial.id ? updatedTutorial : t);
    setTutorials(updatedList);
    try {
        localStorage.setItem('nailora_tutorials', JSON.stringify(updatedList));
    } catch (e) {
        console.error("Failed to save tutorial update", e);
    }
    setSelectedTutorial(updatedTutorial);
  };

  const handleAddTutorial = (newTutorial: Tutorial) => {
    const updatedList = [newTutorial, ...tutorials];
    try {
        localStorage.setItem('nailora_tutorials', JSON.stringify(updatedList));
        setTutorials(updatedList);
        showToast("Tutorial berhasil ditambahkan!");
    } catch (e) {
        alert("Gagal menyimpan tutorial: Penyimpanan browser penuh.");
        console.error("Storage quota exceeded", e);
    }
  };

  const handleDeleteTutorial = (id: number) => {
    const updatedList = tutorials.filter(t => t.id !== id);
    setTutorials(updatedList);
    try {
        localStorage.setItem('nailora_tutorials', JSON.stringify(updatedList));
    } catch (e) {
        console.error("Failed to save after deletion", e);
    }
    showToast("✔ Tutorial berhasil dihapus");
  };
  
  const handleTutorialClick = (tutorial: Tutorial) => {
      if (tutorial.isPremium && !user.isPremium) {
          setCurrentPage(Page.Premium);
          return;
      }
      setSelectedTutorial(tutorial);
  }
  
  return (
    <div className="bg-transparent min-h-full pb-24 relative">
        {toastMessage && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl z-50 animate-fade-in">
                {toastMessage}
            </div>
        )}

      {selectedTutorial && (
        <TutorialViewer 
            user={user}
            tutorial={selectedTutorial} 
            onClose={() => setSelectedTutorial(null)}
            onUpdateTutorial={handleUpdateTutorial}
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
      <div className={`p-6 rounded-b-3xl ${user.isPremium ? 'bg-gradient-to-b from-purple-800 to-purple-600' : 'bg-gradient-to-b from-pink-300 to-pink-200'}`}>
        <div className="text-white flex justify-between items-start">
          <div>
              <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold font-quicksand">Selamat Datang,</h1>
                  {user.isPremium && <CrownIcon className="w-6 h-6 text-yellow-400" />}
              </div>
              <p className="text-sm opacity-90">{user.name}</p>
          </div>
          {user.isPremium && (
              <span className="bg-yellow-400/20 border border-yellow-400/50 text-yellow-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Premium
              </span>
          )}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSearch(searchTerm); }}>
            <div className="relative mt-4">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="search"
                placeholder="Cari desain, tutorial, atau jadwal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-12 pr-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            />
            </div>
        </form>
      </div>

      {/* AI Stylist Banner - Compact Version */}
      <div className="px-6 mt-6">
         <button 
            onClick={() => setCurrentPage(user.isPremium ? Page.AIStylist : Page.Premium)}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 rounded-2xl shadow-lg group relative overflow-hidden"
         >
             <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors"></div>
             <div className="bg-white rounded-[14px] p-3 flex items-center justify-between relative z-10 h-full">
                 <div className="flex items-center gap-3">
                     <div className="bg-purple-100 p-2 rounded-full">
                         <SparklesIcon className="w-6 h-6 text-purple-600" />
                     </div>
                     <div className="text-left">
                         <h3 className="font-bold text-nailora-purple text-sm">AI Personal Stylist</h3>
                         <p className="text-xs text-gray-500">Rekomendasi gaya instan</p>
                     </div>
                 </div>
                 <ChevronRightIcon className="w-5 h-5 text-gray-400" />
             </div>
         </button>
      </div>

      {!user.isPremium && (
         <div className="px-6 mt-4">
            <div onClick={() => setCurrentPage(Page.Premium)} className="bg-gray-900 rounded-2xl p-4 text-white flex items-center justify-between cursor-pointer shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-20 translate-x-8 -translate-y-8"></div>
                <div>
                    <h3 className="font-bold text-yellow-400 flex items-center gap-1"><CrownIcon className="w-4 h-4"/> Nailora Plus</h3>
                    <p className="text-xs text-gray-300 mt-1">Akses desain premium & fitur unlimited.</p>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold">
                    Coba
                </div>
            </div>
         </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold text-nailora-purple mb-4">Kategori Utama</h3>
        <div className="grid grid-cols-4 gap-4">
            <CategoryButton icon="💅" label="Katalog Desain" onClick={() => setCurrentPage(Page.Catalog)}/>
            <CategoryButton icon="🗓️" label="Booking Jadwal" onClick={() => setCurrentPage(Page.Booking)}/>
            <CategoryButton icon="💡" label="Tutorial" onClick={() => {
                const el = document.getElementById('tutorial-section');
                el?.scrollIntoView({ behavior: 'smooth' });
            }}/>
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

      <div id="tutorial-section" className="bg-nailora-pink-light">
          <div className="px-6 flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-nailora-purple">Tutorial & Tips</h3>
              <button className="text-sm font-semibold text-nailora-pink-accent hover:underline">Lihat Semua</button>
          </div>
          <div className="px-6 mb-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
               {['Semua', 'Beginner', 'Nail Care', 'Troubleshooting'].map(cat => (
                   <button key={cat} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-nailora-purple border border-transparent hover:border-nailora-pink-accent whitespace-nowrap">{cat}</button>
               ))}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
               <UploadCard onClick={() => setShowUploadModal(true)} />
               {tutorials.map(tutorial => (
                   <TutorialCard 
                       key={tutorial.id}
                       tutorial={tutorial}
                       onClick={() => handleTutorialClick(tutorial)}
                       onDelete={handleDeleteTutorial}
                       isPremiumUser={user.isPremium || false}
                   />
               ))}
          </div>
      </div>
      
      <div className="px-6 py-4 bg-nailora-pink-light">
          <div className="bg-gradient-to-r from-purple-400 via-nailora-purple to-pink-400 p-5 rounded-2xl text-white shadow-lg flex flex-col items-start gap-3 transition-transform transform hover:scale-[1.02] active:scale-100">
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
      
      <BottomNavBar activePage={Page.Dashboard} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default DashboardScreen;
