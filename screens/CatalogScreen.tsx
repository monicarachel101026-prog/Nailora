import React, { useState, useEffect, useMemo } from 'react';
import { Page, Design, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { HeartIcon, StarIcon, UploadIcon, TrashIcon, ChevronLeftIcon } from '../components/icons';
import AddDesignModal from '../components/AddDesignModal';
import ColorCategoryFolder from '../components/ColorCategoryFolder';
import { initialDesigns } from '../data/designs';

interface CatalogScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
  onSelectDesign: (design: Design) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

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

const CatalogScreen: React.FC<CatalogScreenProps> = ({ user, setCurrentPage, onSelectDesign, selectedCategory, setSelectedCategory }) => {
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
    localStorage.setItem('nailora_designs', JSON.stringify(initialDesigns));
    return initialDesigns;
  });

  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('nailora_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
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
    if (favorites.includes(title)) {
      const newFavorites = favorites.filter(t => t !== title);
      setFavorites(newFavorites);
      localStorage.setItem('nailora_favorites', JSON.stringify(newFavorites));
    }
  };

  const designsByCategory = useMemo(() => {
    return designs.reduce((acc, design) => {
        const category = design.category || 'Lainnya';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(design);
        return acc;
    }, {} as Record<string, Design[]>);
  }, [designs]);

  // Tampilan untuk kategori warna tertentu
  if (selectedCategory) {
    const filteredDesigns = designsByCategory[selectedCategory] || [];
    return (
      <div className="bg-gray-50 min-h-full pb-24">
        {isAddModalOpen && <AddDesignModal onClose={() => setIsAddModalOpen(false)} onAddDesign={handleAddDesign} categories={categories} initialCategory={selectedCategory} />}
        
        <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center">
            <button onClick={() => setSelectedCategory(null)} className="p-2">
                <ChevronLeftIcon className="w-6 h-6 text-nailora-purple"/>
            </button>
            <h2 className="text-xl font-bold text-center text-nailora-purple flex-grow -ml-8">{selectedCategory}</h2>
        </div>
        
        <p className="text-sm text-nailora-gray px-4 pt-4 pb-2">{filteredDesigns.length} desain ditemukan</p>

        <div className="px-4 pt-2">
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
                        <p className="text-nailora-gray">Belum ada desain untuk kategori ini.</p>
                        <p className="text-sm mt-1">Jadilah yang pertama mengunggah!</p>
                    </div>
                )}
             </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-24 right-6 bg-nailora-pink-accent text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform transform hover:scale-110 active:scale-95 z-20"
          aria-label={`Tambah Desain ${selectedCategory}`}
        >
          <UploadIcon className="w-7 h-7" />
        </button>

        <BottomNavBar activePage={Page.Catalog} setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  // Tampilan utama untuk semua kategori warna (folder)
  return (
    <div className="bg-gray-50 min-h-full pb-24">
        <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100">
            <h2 className="text-xl font-bold text-center text-nailora-purple">Katalog Warna</h2>
        </div>

        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.filter(c => c !== 'Semua').map(category => {
                const categoryDesigns = designsByCategory[category] || [];
                if (categoryDesigns.length === 0) return null; // Jangan tampilkan folder jika kosong
                return (
                    <ColorCategoryFolder 
                        key={category}
                        categoryName={category}
                        designCount={categoryDesigns.length}
                        previewImage={categoryDesigns[0].imgSrc}
                        onClick={() => setSelectedCategory(category)}
                    />
                );
            })}
        </div>

        <BottomNavBar activePage={Page.Catalog} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default CatalogScreen;