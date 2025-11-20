
import React, { useState, useEffect } from 'react';
import { Page, Design, Tutorial, Artist } from '../types';
import { ChevronLeftIcon, SearchIcon } from '../components/icons';
import { initialDesigns } from '../data/designs';
import { initialTutorials } from '../data/tutorials';
import { artists as artistsData } from '../data/artists';

interface SearchScreenProps {
  query: string;
  setCurrentPage: (page: Page) => void;
  onSelectDesign: (design: Design) => void;
  onSelectArtist: (artist: Artist) => void;
  onBack: () => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ query, setCurrentPage, onSelectDesign, onSelectArtist, onBack }) => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    // In a real app, this data would come from a shared context or a fetch call.
    // For this demo, we load it from localStorage or initial data.
    const savedDesigns = localStorage.getItem('nailora_designs');
    const allDesigns = savedDesigns ? JSON.parse(savedDesigns) : initialDesigns;
    
    const savedTutorials = localStorage.getItem('nailora_tutorials');
    const allTutorials = savedTutorials ? JSON.parse(savedTutorials) : initialTutorials;

    if (!query) return;

    const lowerCaseQuery = query.toLowerCase();

    const filteredDesigns = allDesigns.filter((d: Design) => 
        d.title.toLowerCase().includes(lowerCaseQuery) ||
        d.dominantColor.toLowerCase().includes(lowerCaseQuery) ||
        d.style.toLowerCase().includes(lowerCaseQuery) ||
        d.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
        d.artist?.toLowerCase().includes(lowerCaseQuery) ||
        d.description?.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredTutorials = allTutorials.filter((t: Tutorial) => 
        t.title.toLowerCase().includes(lowerCaseQuery) ||
        t.uploaderName.toLowerCase().includes(lowerCaseQuery) ||
        t.category.toLowerCase().includes(lowerCaseQuery)
    );
    
    const filteredArtists = artistsData.filter((a: Artist) => 
        a.name.toLowerCase().includes(lowerCaseQuery) ||
        a.salon.toLowerCase().includes(lowerCaseQuery) ||
        a.services.some(s => s.toLowerCase().includes(lowerCaseQuery))
    );

    setDesigns(filteredDesigns);
    setTutorials(filteredTutorials);
    setArtists(filteredArtists);
  }, [query]);

  const totalResults = designs.length + tutorials.length + artists.length;

  return (
    <div className="bg-gray-50 min-h-full pb-8">
      <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center gap-2">
        <button onClick={onBack} className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-nailora-purple"/>
        </button>
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            defaultValue={query}
            readOnly // This component just displays results, searching happens on dashboard
            className="w-full bg-white pl-12 pr-4 py-3 rounded-full text-sm border border-gray-200"
          />
        </div>
      </div>
      
      <div className="p-4">
        {totalResults > 0 ? (
          <p className="text-sm text-nailora-gray mb-4">Menampilkan {totalResults} hasil untuk <span className="font-semibold text-nailora-purple">"{query}"</span></p>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-nailora-purple">Tidak ada hasil ditemukan</p>
            <p className="text-nailora-gray mt-1">Coba gunakan kata kunci lain.</p>
          </div>
        )}

        {/* Designs Results */}
        {designs.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-nailora-purple mb-3">Desain</h3>
            <div className="grid grid-cols-2 gap-4">
              {designs.map(design => (
                <div key={design.title} onClick={() => onSelectDesign(design)} className="relative rounded-lg overflow-hidden group shadow cursor-pointer">
                  <img src={design.imgSrc} alt={design.title} className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <p className="absolute bottom-2 left-2 text-white text-xs font-semibold">{design.title}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tutorials Results */}
        {tutorials.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-nailora-purple mb-3">Tutorial</h3>
            <div className="space-y-3">
              {tutorials.map(tutorial => (
                <div key={tutorial.id} onClick={() => alert(`Silakan buka dashboard untuk melihat modul: ${tutorial.title}`)} className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                   <div className="relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={tutorial.imgSrc} alt={tutorial.title} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-xs font-bold">
                        {tutorial.steps.length} Step
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-nailora-purple leading-tight">{tutorial.title}</p>
                    <p className="text-xs text-nailora-gray mt-1">{tutorial.category} • {tutorial.difficulty}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Artists Results */}
        {artists.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-nailora-purple mb-3">Nail Artist</h3>
            <div className="space-y-3">
              {artists.map(artist => (
                <div key={artist.name} onClick={() => onSelectArtist(artist)} className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-pink-100 text-nailora-pink-accent font-bold text-xl rounded-full flex items-center justify-center flex-shrink-0">{artist.initial}</div>
                  <div>
                    <p className="font-semibold text-sm text-nailora-purple">{artist.name}</p>
                    <p className="text-xs text-nailora-gray mt-1">{artist.salon}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
