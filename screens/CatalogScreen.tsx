import React, { useState, useEffect } from 'react';
import { Page, Design, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { SearchIcon, HeartIcon, StarIcon, UploadIcon, TrashIcon } from '../components/icons';
import AddDesignModal from '../components/AddDesignModal';
import { initialDesigns } from '../data/designs';

interface CatalogScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
  onSelectDesign: (design: Design) => void;
}

interface CategoryChipProps {
  name: string;
  active?: boolean;
  onClick: () => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ name, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-sm ${
      active
        ? 'bg-nailora-pink-accent text-white shadow-md'
        : 'bg-white text-nailora-gray'
    }`}
  >
    {name}
  </button>
);

interface CatalogItemProps {
  design: Design;
  onPress: (design: Design) => void;
  isFavorite: boolean;
  onToggleFavorite: (title: string) => void;
  onDelete?: (title: string) => void;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ design, onPress, isFavorite, onToggleFavorite, onDelete }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(true);
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.(design.title);
    };

    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(false);
    };
    
    return (
        <div className="relative rounded-2xl overflow-hidden group shadow-lg">
            <div onClick={() => onPress(design)} className="w-full h-full cursor-pointer">
              <img src={design.imgSrc} alt={design.title} className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-3 text-white w-full pointer-events-none">
                <h4 className="font-semibold text-sm">{design.title}</h4>
            </div>
            {design.isPremium && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 pointer-events-none">
                    <StarIcon className="w-3 h-3" />
                    <span>PLUS</span>
                </div>
            )}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(design.title);
                }} 
                className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-white/50 transition-colors"
            >
                <HeartIcon className={`w-5 h-5 transition-all ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-white'}`} />
            </button>
            {onDelete && (
                <>
                {showConfirmDelete ? (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1.5 p-1 bg-black/30 backdrop-blur-sm rounded-lg">
                        <button 
                            onClick={handleCancelDelete}
                            className="bg-gray-200/80 text-gray-800 text-xs font-bold px-3 py-1 rounded-md hover:bg-gray-300/80 transition-colors"
                        >
                            Batal
                        </button>
                        <button 
                            onClick={handleConfirmDelete}
                            className="bg-red-500/80 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-red-600/80 transition-colors"
                        >
                            OK
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={handleDeleteClick}
                        className="absolute bottom-2 right-2 bg-red-500/50 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Hapus Desain"
                    >
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                )}
                </>
            )}
        </div>
    );
};

const CatalogScreen: React.FC<CatalogScreenProps> = ({ user, setCurrentPage, onSelectDesign }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const categories = ['Semua', 'Nude', 'Putih', 'Abu-abu', 'Hitam', 'Merah', 'Pink', 'Kuning', 'Oranye', 'Biru', 'Hijau', 'Ungu', 'Biru Tua', 'Cokelat', 'Emas', 'Perak', 'Rose Gold', 'Glitter & Efek'];
  
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
    // If nothing in local storage, initialize with default data
    localStorage.setItem('nailora_designs', JSON.stringify(initialDesigns));
    return initialDesigns;
  });

  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDesignsCount, setNewDesignsCount] = useState(0);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('nailora_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const lastSeenCount = parseInt(localStorage.getItem('nailora_lastSeenDesignCount') || '0', 10);
      const currentCount = designs.length;

      if (currentCount > lastSeenCount) {
        setNewDesignsCount(currentCount - lastSeenCount);
        localStorage.setItem('nailora_lastSeenDesignCount', String(currentCount));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [designs.length]);

  const handleAddDesign = (newDesign: Design) => {
    const newDesigns = [newDesign, ...designs];
    setDesigns(newDesigns);
    localStorage.setItem('nailora_designs', JSON.stringify(newDesigns));
    setIsAddModalOpen(false);
  };

  const toggleFavorite = (title: string) => {
    const newFavorites = favorites.includes(title) 
      ? favorites.filter(t => t !== title) 
      : [...favorites, title];
    setFavorites(newFavorites);
    localStorage.setItem('nailora_favorites', JSON.stringify(newFavorites));
  };

  const handleItemClick = (design: Design) => {
    if (design.isPremium) {
      setCurrentPage(Page.Premium);
    } else {
      onSelectDesign(design);
    }
  };

  const handleDeleteDesign = (title: string) => {
    const newDesigns = designs.filter(d => d.title !== title);
    setDesigns(newDesigns);
    localStorage.setItem('nailora_designs', JSON.stringify(newDesigns));

    // Also remove from favorites if it exists there
    if (favorites.includes(title)) {
      const newFavorites = favorites.filter(t => t !== title);
      setFavorites(newFavorites);
      localStorage.setItem('nailora_favorites', JSON.stringify(newFavorites));
    }
  };

  const filteredDesigns = activeCategory === 'Semua'
    ? designs
    : designs.filter(design => design.category === activeCategory);


  return (
    <div className="bg-gray-50 min-h-full pb-24">
      {isAddModalOpen && <AddDesignModal onClose={() => setIsAddModalOpen(false)} onAddDesign={handleAddDesign} categories={categories} />}

      <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100">
        <h2 className="text-xl font-bold text-center text-nailora-purple">Katalog Desain</h2>
        <div className="relative mt-4">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari desain atau artis..."
            className="w-full bg-white pl-12 pr-4 py-3 rounded-full text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nailora-pink-accent"
          />
        </div>
      </div>
      
      <div className="py-3 sticky top-[120px] bg-gray-50/80 backdrop-blur-sm z-10">
        <div className="flex gap-2 overflow-x-auto px-4 pb-2">
            {categories.map((cat) => (
              <CategoryChip 
                key={cat} 
                name={cat} 
                active={cat === activeCategory} 
                onClick={() => setActiveCategory(cat)} 
              />
            ))}
        </div>
      </div>

      <div className="p-4">
         {newDesignsCount > 0 && (
            <div className="bg-gradient-to-r from-blue-400 to-teal-400 text-white p-4 rounded-xl shadow-lg flex justify-between items-center mb-4 transition-opacity duration-500">
                <div>
                    <p className="font-bold">✨ Desain Baru Ditemukan!</p>
                    <p className="text-sm opacity-90">Ada {newDesignsCount} inspirasi baru menantimu di katalog.</p>
                </div>
                <button onClick={() => setNewDesignsCount(0)} className="font-bold text-lg leading-none p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors">&times;</button>
            </div>
        )}
         <p className="text-sm text-nailora-gray mb-4">{filteredDesigns.length} desain ditemukan</p>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredDesigns.length > 0 ? (
                filteredDesigns.map(design => (
                    <CatalogItem 
                        key={design.title} 
                        design={design} 
                        onPress={handleItemClick}
                        isFavorite={favorites.includes(design.title)}
                        onToggleFavorite={toggleFavorite}
                        onDelete={handleDeleteDesign}
                    />
                ))
            ) : (
                <div className="col-span-full text-center py-10">
                    <p className="text-nailora-gray">Tidak ada desain untuk kategori ini.</p>
                </div>
            )}
         </div>
      </div>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-24 right-6 bg-nailora-pink-accent text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform transform hover:scale-110 active:scale-95 z-20"
        aria-label="Tambah Desain Baru"
      >
        <UploadIcon className="w-7 h-7" />
      </button>

      <BottomNavBar activePage={Page.Catalog} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default CatalogScreen;