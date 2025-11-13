import React from 'react';

interface ColorCategoryFolderProps {
  categoryName: string;
  designCount: number;
  previewImage: string;
  onClick: () => void;
}

const ColorCategoryFolder: React.FC<ColorCategoryFolderProps> = ({ categoryName, designCount, previewImage, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden group shadow-lg cursor-pointer transition-transform transform hover:scale-105"
    >
      <img src={previewImage || 'https://placehold.co/400x500/F9DCE2/A64D79?text=Nailora'} alt={categoryName} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="font-bold text-lg">{categoryName}</h3>
        <p className="text-sm opacity-90">{designCount} desain</p>
      </div>
    </div>
  );
};

export default ColorCategoryFolder;
