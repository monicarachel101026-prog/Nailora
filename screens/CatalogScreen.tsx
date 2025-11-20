
import React, { useState, useEffect, useMemo } from 'react';
import { Page, Design, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { SearchIcon, HeartIcon, StarIcon, UploadIcon, TrashIcon, FilterIcon, LockIcon, CrownIcon, CheckCircleIcon, ArchiveBoxIcon, XCircleIcon } from '../components/icons';
import AddDesignModal from '../components/AddDesignModal';
import { initialDesigns } from '../data/designs';

interface CatalogScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
  onSelectDesign: (design: Design) => void;
}

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-sm border ${
      active
        ? 'bg-nailora-pink-accent text-white border-nailora-pink-accent shadow-md'
        : 'bg-white text-nailora-gray border-gray-200 hover:border-nailora-pink-accent/50'
    }`}
  >
    {label}
  </button>
);

interface CatalogItemProps {
  design: Design;
  onPress: (design: Design) => void;
  isFavorite: boolean;
  onToggleFavorite: (title: string) => void;
  onDelete: (title: string) => void;
  isPremiumUser: boolean;
  isSelectionMode: boolean;
  isSelected: boolean;
  onToggleSelect: (title: string) => void;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ 
    design, onPress, isFavorite, onToggleFavorite, onDelete, isPremiumUser,
    isSelectionMode, isSelected, onToggleSelect
}) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const isLocked = design.isPremium && !isPremiumUser;

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(true);
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(design.title);
        setShowConfirmDelete(false); // Reset state
    };

    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(false);
    };
    
    const handleCardClick = () => {
        if (isSelectionMode) {
            onToggleSelect(design.title);
        } else {
            onPress(design);
        }
    }
    
    return (
        <div className={`relative rounded-2xl overflow-hidden group shadow-lg bg-white ${isLocked ? 'opacity-90' : ''} ${isSelected ? 'ring-4 ring-nailora-pink-accent' : ''}`}>
            <div onClick={handleCardClick} className="w-full h-full cursor-pointer aspect-[4/5] relative">
              <img src={design.imgSrc} alt={design.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              {isLocked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                          <LockIcon className="w-8 h-8 text-yellow-400" />
                      </div>
                  </div>
              )}
              {design.isPremium && !isLocked && (
                   <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md p-1 rounded-full">
                       <CrownIcon className="w-4 h-4 text-yellow-400" />
                   </div>
              )}
              {/* Selection Overlay */}
              {isSelectionMode && (
                  <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 hover:opacity-50'}`}>
                      {isSelected ? (
                           <div className="bg-nailora-pink-accent rounded-full p-1">
                                <CheckCircleIcon className="w-8 h-8 text-white" />
                           </div>
                      ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-white"></div>
                      )}
                  </div>
              )}
            </div>
            
            {!isSelectionMode && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 p-3 text-white w-full pointer-events-none">
                        <div className="flex flex-wrap gap-1 mb-1">
                            <span className="bg-white/20 backdrop-blur-md text-[10px] px-2 py-0.5 rounded-full">{design.dominantColor}</span>
                            <span className="bg-white/20 backdrop-blur-md text-[10px] px-2 py-0.5 rounded-full">{design.style}</span>
                        </div>
                        <h4 className="font-semibold text-sm leading-tight">{design.title}</h4>
                    </div>

                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(design.title);
                        }} 
                        className="absolute top-2 right-2 bg-black/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-black/40 transition-colors"
                    >
                        <HeartIcon className={`w-5 h-5 transition-all ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-white'}`} />
                    </button>

                    {/* Single Delete Logic - Available for ALL Users */}
                    {showConfirmDelete ? (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-2 z-20 text-center animate-fade-in">
                            <p className="text-white text-xs font-bold mb-2">Hapus desain ini?</p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleCancelDelete}
                                    className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleConfirmDelete}
                                    className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ) : (
                         <button 
                            onClick={handleDeleteClick}
                            className="absolute bottom-2 right-2 bg-red-500/60 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100 pointer-events-auto"
                            aria-label="Hapus Desain"
                        >
                            <TrashIcon className="w-4 h-4"/>
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

const CatalogScreen: React.FC<CatalogScreenProps> = ({ user, setCurrentPage, onSelectDesign }) => {
  // Filter States
  const [selectedColor, setSelectedColor] = useState('Semua');
  const [selectedStyle, setSelectedStyle] = useState('Semua');
  const [selectedLength, setSelectedLength] = useState('Semua');
  const [showArchived, setShowArchived] = useState(false);

  // Filter Options
  const colors = ['Semua', 'Nude', 'Putih', 'Abu-abu', 'Hitam', 'Merah', 'Pink', 'Kuning', 'Oranye', 'Biru', 'Hijau', 'Ungu', 'Biru Tua', 'Cokelat', 'Emas', 'Perak', 'Rose Gold', 'Glitter & Efek'];
  const styles = ['Semua', 'Simple', 'Elegant', 'Bold', 'Cute', 'Premium', 'Luxury'];
  const lengths = ['Semua', 'Short', 'Medium', 'Long'];
  
  const [designs, setDesigns] = useState<Design[]>(() => {
    const savedDesigns = localStorage.getItem('nailora_designs');
    try {
      if (savedDesigns) {
        const parsedDesigns = JSON.parse(savedDesigns);
        if (Array.isArray(parsedDesigns)) {
            return parsedDesigns;
        }
      }
    } catch (error) {
        console.error("Gagal memuat desain dari penyimpanan lokal", error);
    }
    return initialDesigns;
  });

  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Selection Mode States
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedDesigns, setSelectedDesigns] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('nailora_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddDesign = (newDesign: Design) => {
    const newDesigns = [newDesign, ...designs];
    try {
        localStorage.setItem('nailora_designs', JSON.stringify(newDesigns));
        setDesigns(newDesigns);
        setIsAddModalOpen(false);
        showToast("Desain berhasil ditambahkan!");
    } catch (e) {
        alert("Gagal menyimpan desain: Penyimpanan browser penuh. Mohon gunakan gambar dengan resolusi lebih kecil.");
        console.error("Storage full", e);
    }
  };

  const toggleFavorite = (title: string) => {
    const newFavorites = favorites.includes(title) 
      ? favorites.filter(t => t !== title) 
      : [...favorites, title];
    setFavorites(newFavorites);
    localStorage.setItem('nailora_favorites', JSON.stringify(newFavorites));
  };

  const handleItemClick = (design: Design) => {
    if (design.isPremium && !user.isPremium) {
        setCurrentPage(Page.Premium);
        return;
    }
    onSelectDesign(design);
  };

  const handleDeleteDesign = (title: string) => {
    const newDesigns = designs.filter(d => d.title !== title);
    setDesigns(newDesigns);
    try {
        localStorage.setItem('nailora_designs', JSON.stringify(newDesigns));
    } catch (e) {
        console.error("Failed to save designs after delete", e);
    }

    if (favorites.includes(title)) {
      const newFavorites = favorites.filter(t => t !== title);
      setFavorites(newFavorites);
      localStorage.setItem('nailora_favorites', JSON.stringify(newFavorites));
    }
    showToast("✔ Desain berhasil dihapus");
  };

  // Selection Logic
  const toggleSelectDesign = (title: string) => {
      const newSelected = new Set(selectedDesigns);
      if (newSelected.has(title)) {
          newSelected.delete(title);
      } else {
          newSelected.add(title);
      }
      setSelectedDesigns(newSelected);
  };

  const toggleSelectionMode = () => {
      if (isSelectionMode) {
          setIsSelectionMode(false);
          setSelectedDesigns(new Set());
      } else {
          setIsSelectionMode(true);
      }
  };

  // Premium Action: Bulk Delete
  const handleBulkDelete = () => {
      if (!user.isPremium) {
          setCurrentPage(Page.Premium);
          return;
      }
      
      if (selectedDesigns.size === 0) return;

      if (window.confirm(`Hapus ${selectedDesigns.size} desain terpilih?`)) {
          const newDesigns = designs.filter(d => !selectedDesigns.has(d.title));
          setDesigns(newDesigns);
          localStorage.setItem('nailora_designs', JSON.stringify(newDesigns));
          
          setIsSelectionMode(false);
          setSelectedDesigns(new Set());
          showToast(`✔ ${selectedDesigns.size} Desain berhasil dihapus`);
      }
  };

  // Premium Action: Archive
  const handleBulkArchive = () => {
      if (!user.isPremium) {
           setCurrentPage(Page.Premium);
           return;
      }
      
      if (selectedDesigns.size === 0) return;

      const newDesigns = designs.map(d => {
          if (selectedDesigns.has(d.title)) {
              return { ...d, isArchived: !showArchived }; // Toggle based on current view
          }
          return d;
      });
      
      setDesigns(newDesigns);
      localStorage.setItem('nailora_designs', JSON.stringify(newDesigns));
      
      setIsSelectionMode(false);
      setSelectedDesigns(new Set());
      showToast(showArchived ? "✔ Desain dikembalikan ke katalog" : "✔ Desain berhasil diarsipkan");
  };

  const filteredDesigns = useMemo(() => {
      return designs.filter(design => {
          const isArchivedState = design.isArchived || false;
          // If showing archived, only show archived. Else show unarchived.
          if (showArchived !== isArchivedState) return false;

          const matchesColor = selectedColor === 'Semua' || design.dominantColor === selectedColor;
          const matchesStyle = selectedStyle === 'Semua' || design.style === selectedStyle;
          const matchesLength = selectedLength === 'Semua' || design.length === selectedLength;
          return matchesColor && matchesStyle && matchesLength;
      });
  }, [designs, selectedColor, selectedStyle, selectedLength, showArchived]);

  return (
    <div className="bg-gray-50 min-h-full pb-24 flex flex-col relative">
      {/* Toast Notification */}
      {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl z-50 animate-fade-in flex items-center gap-2">
              <span>{toastMessage}</span>
          </div>
      )}

      {isAddModalOpen && (
          <AddDesignModal 
            onClose={() => setIsAddModalOpen(false)} 
            onAddDesign={handleAddDesign} 
            colors={colors}
            styles={styles}
            lengths={lengths}
          />
      )}

      {/* Header & Search */}
      <div className="bg-white sticky top-0 z-20 shadow-sm pb-2 transition-all">
          {isSelectionMode ? (
              <div className="p-4 bg-nailora-pink-light flex justify-between items-center h-[74px]">
                  <div className="flex items-center gap-2">
                      <button onClick={toggleSelectionMode}>
                          <XCircleIcon className="w-6 h-6 text-nailora-purple"/>
                      </button>
                      <span className="font-bold text-nailora-purple">{selectedDesigns.size} Dipilih</span>
                  </div>
                  <button 
                    onClick={() => {
                        const allTitles = new Set(filteredDesigns.map(d => d.title));
                        setSelectedDesigns(allTitles.size === selectedDesigns.size ? new Set() : allTitles);
                    }}
                    className="text-xs font-bold text-nailora-pink-accent uppercase"
                  >
                      {filteredDesigns.length === selectedDesigns.size && filteredDesigns.length > 0 ? 'Batal Semua' : 'Pilih Semua'}
                  </button>
              </div>
          ) : (
            <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <div className="w-6"></div>
                    <h2 className="text-xl font-bold text-center text-nailora-purple font-quicksand">Katalog Desain</h2>
                    <button onClick={toggleSelectionMode} className="text-xs font-bold text-nailora-pink-accent bg-pink-50 px-3 py-1.5 rounded-lg hover:bg-pink-100">
                        Pilih
                    </button>
                </div>
                <div className="relative mt-4">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari nama desain, tag..."
                    className="w-full bg-gray-100 pl-12 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-nailora-pink-accent focus:bg-white transition-colors"
                />
                </div>
            </div>
          )}
        
        {/* Main Color Filter & Archive Toggle */}
        <div className="pt-3 px-4 flex gap-2 overflow-x-auto no-scrollbar">
            <FilterChip 
                label={showArchived ? "📂 Arsip" : "📂 Katalog Utama"}
                active={showArchived}
                onClick={() => setShowArchived(!showArchived)} 
            />
            {!showArchived && colors.map((cat) => (
              <FilterChip 
                key={cat} 
                label={cat} 
                active={cat === selectedColor} 
                onClick={() => setSelectedColor(cat)} 
              />
            ))}
        </div>

        {/* Secondary Filters (Dropdown-like Row) - Only if not archive view for simplicity */}
        {!showArchived && (
            <div className="pt-3 px-4 flex gap-3 overflow-x-auto no-scrollbar pb-1">
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-nailora-gray uppercase tracking-wider">Gaya:</span>
                    <select 
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        className="bg-gray-100 text-sm rounded-lg px-3 py-1.5 border-none focus:ring-1 focus:ring-nailora-pink-accent text-nailora-purple font-medium"
                    >
                        {styles.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
                 <div className="w-[1px] h-6 bg-gray-200"></div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-nailora-gray uppercase tracking-wider">Panjang:</span>
                    <select 
                        value={selectedLength}
                        onChange={(e) => setSelectedLength(e.target.value)}
                        className="bg-gray-100 text-sm rounded-lg px-3 py-1.5 border-none focus:ring-1 focus:ring-nailora-pink-accent text-nailora-purple font-medium"
                    >
                        {lengths.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                 </div>
            </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="p-4 flex-grow">
         <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-nailora-gray font-medium">{filteredDesigns.length} {showArchived ? 'diarsipkan' : 'inspirasi ditemukan'}</p>
            {(selectedColor !== 'Semua' || selectedStyle !== 'Semua' || selectedLength !== 'Semua') && !showArchived && (
                <button 
                    onClick={() => {
                        setSelectedColor('Semua');
                        setSelectedStyle('Semua');
                        setSelectedLength('Semua');
                    }}
                    className="text-xs text-nailora-pink-accent font-semibold hover:underline"
                >
                    Reset Filter
                </button>
            )}
         </div>
         
         <div className="grid grid-cols-2 gap-4">
            {filteredDesigns.length > 0 ? (
                filteredDesigns.map(design => (
                    <CatalogItem 
                        key={design.title} 
                        design={design} 
                        onPress={handleItemClick}
                        isFavorite={favorites.includes(design.title)}
                        onToggleFavorite={toggleFavorite}
                        onDelete={handleDeleteDesign}
                        isPremiumUser={user.isPremium || false}
                        isSelectionMode={isSelectionMode}
                        isSelected={selectedDesigns.has(design.title)}
                        onToggleSelect={toggleSelectDesign}
                    />
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <SearchIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="font-bold text-nailora-purple">Tidak ada desain {showArchived ? 'diarsipkan' : 'ditemukan'}</h3>
                    <p className="text-sm text-nailora-gray mt-1 max-w-[200px]">
                        {showArchived ? "Arsipkan desain untuk melihatnya di sini." : "Coba ubah filter warna atau gaya untuk melihat hasil lainnya."}
                    </p>
                </div>
            )}
         </div>
      </div>

      {/* Bulk Actions Bar */}
      {isSelectionMode && (
          <div className="fixed bottom-[84px] left-0 right-0 max-w-lg mx-auto px-4 animate-slide-up">
              <div className="bg-white rounded-xl shadow-2xl p-3 flex gap-3 border border-gray-200">
                  <button 
                    onClick={handleBulkArchive}
                    className="flex-1 flex flex-col items-center justify-center py-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-nailora-purple"
                  >
                      <ArchiveBoxIcon className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-bold flex items-center gap-1">
                          {showArchived ? "Kembalikan" : "Arsipkan"}
                          {!user.isPremium && <CrownIcon className="w-3 h-3 text-yellow-400" />}
                      </span>
                  </button>
                  <button 
                    onClick={handleBulkDelete}
                    className="flex-1 flex flex-col items-center justify-center py-2 bg-red-50 rounded-lg hover:bg-red-100 text-red-600"
                  >
                      <TrashIcon className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-bold flex items-center gap-1">
                          Hapus ({selectedDesigns.size})
                          {!user.isPremium && <CrownIcon className="w-3 h-3 text-yellow-400" />}
                      </span>
                  </button>
              </div>
          </div>
      )}

      {/* Floating Upload Button */}
      {!isSelectionMode && (
          <button
            onClick={() => {
                if (!user.isPremium && designs.length >= 20) { // Example limit for free
                    alert("User Gratis terbatas 20 upload. Upgrade ke Premium untuk Unlimited Upload!");
                    setCurrentPage(Page.Premium);
                } else {
                    setIsAddModalOpen(true);
                }
            }}
            className="fixed bottom-24 right-6 bg-nailora-pink-accent text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform transform hover:scale-110 active:scale-95 z-20"
            aria-label="Upload Desain Baru"
        >
            <UploadIcon className="w-7 h-7" />
        </button>
      )}

      <BottomNavBar activePage={Page.Catalog} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default CatalogScreen;
