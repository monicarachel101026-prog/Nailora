import React from 'react';
import { XIcon } from './icons';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, categories, activeCategory, onSelectCategory }) => {
  if (!isOpen) return null;

  const handleSelect = (category: string) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-nailora-purple">Filter Berdasarkan Warna</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={`px-2 py-4 rounded-lg text-sm font-semibold text-center transition-all duration-200 shadow-sm ${
                activeCategory === cat
                  ? 'bg-nailora-pink-accent text-white shadow-md'
                  : 'bg-gray-100 text-nailora-gray hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
