
import React, { useState, useMemo } from 'react';
import { Page, BookingDetails } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { FilterIcon, StarIcon } from '../components/icons';

interface BookingScreenProps {
  setCurrentPage: (page: Page) => void;
  setBookingDetails: (details: BookingDetails) => void;
}

type Artist = {
    initial: string, name: string, rating: number, reviews: number, services: string[], salon: string, distance: number, price: string, available: boolean
};

interface ArtistCardProps extends Artist {
    onBook: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ initial, name, rating, reviews, services, salon, distance, price, available, onBook }) => (
    <div className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-start">
        <div className="w-12 h-12 bg-pink-100 text-nailora-pink-accent font-bold text-xl rounded-full flex items-center justify-center flex-shrink-0">
            {initial}
        </div>
        <div className="flex-grow">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-nailora-purple">{name}</h4>
                    <div className="flex items-center gap-1 text-sm text-nailora-gray">
                        <StarIcon className="w-4 h-4 text-yellow-400"/>
                        <span className="font-semibold">{rating}</span>
                        <span>({reviews} ulasan)</span>
                    </div>
                </div>
                {available ? 
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Tersedia</span> :
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Penuh</span>
                }
            </div>
            <p className="text-xs text-nailora-gray mt-1">{services.join(' · ')}</p>
            <div className="flex justify-between items-end mt-2">
                <div>
                    <p className="text-xs font-medium text-nailora-purple">{salon}</p>
                    <p className="text-xs text-nailora-gray">{distance} km · Rp {price}</p>
                </div>
                <button onClick={onBook} className="text-xs font-bold bg-nailora-pink-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                    Booking
                </button>
            </div>
        </div>
    </div>
)

const FilterButton = ({ label, active, onClick }: { label: string, active?: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${active ? 'bg-nailora-pink-accent text-white' : 'bg-white text-nailora-purple'}`}>
        {label}
    </button>
)

const BookingForm = ({ artist, onBack, onConfirmBooking }: { artist: Artist, onBack: () => void, onConfirmBooking: (details: Omit<BookingDetails, 'artist'>) => void }) => {
    const [service, setService] = useState(artist.services[0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('10:00');

    const handleConfirm = () => {
        onConfirmBooking({ service, date, time });
    };
    
    return (
      <div className="p-4">
        <button onClick={onBack} className="text-sm font-semibold text-nailora-purple mb-4">← Kembali ke daftar</button>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-nailora-purple text-center">Booking Jadwal</h3>
          <p className="text-sm text-nailora-gray text-center mb-4">dengan <span className="font-bold">{artist.name}</span></p>

          <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-nailora-purple">Pilih Layanan</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none">
                    {artist.services.map(s => <option key={s}>{s}</option>)}
                    <option>Classic Nail</option>
                    <option>Gel Polish</option>
                    <option>Art Design</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-medium text-nailora-purple">Pilih Tanggal</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" />
            </div>
            <div>
                <label className="text-sm font-medium text-nailora-purple">Pilih Waktu</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" />
            </div>
          </div>
          
          <button onClick={handleConfirm} className="w-full mt-6 bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90">
            Bayar Sekarang
          </button>
        </div>
      </div>
    );
};

const BookingScreen: React.FC<BookingScreenProps> = ({ setCurrentPage, setBookingDetails }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [activeFilter, setActiveFilter] = useState('Terdekat');

  const artists: Artist[] = [
    { initial: 'SM', name: 'Sarah Martinez', rating: 4.9, reviews: 156, services: ['Gel Extensions', 'Nail Art', '+1'], salon: 'Salon Cantik', distance: 0.8, price: '100K-200K', available: true },
    { initial: 'LC', name: 'Luna Chen', rating: 4.7, reviews: 203, services: ['Minimalist Art', 'Gel Polish', '+1'], salon: 'Zen Nails Spa', distance: 3.2, price: '80K-150K', available: false },
    { initial: 'AP', name: 'Alya Putri', rating: 4.9, reviews: 178, services: ['Gel Polish', 'French Manicure', '+1'], salon: 'Nailora Studio', distance: 2.5, price: '120K-180K', available: true },
    { initial: 'ER', name: 'Emma Rodriguez', rating: 4.8, reviews: 89, services: ['Acrylic Nails', 'Custom Designs', '+1'], salon: 'Beauty Studio Plus', distance: 1.9, price: '150K-250K', available: true },
  ];
  
  const handleConfirmBooking = (details: Omit<BookingDetails, 'artist'>) => {
      if (selectedArtist) {
          setBookingDetails({
              ...details,
              artist: {
                  name: selectedArtist.name,
                  price: selectedArtist.price
              }
          });
          setCurrentPage(Page.Payment);
      }
  };

  const sortedArtists = useMemo(() => {
    const parsePrice = (price: string): number => {
        const priceString = price.split('K')[0];
        return parseInt(priceString, 10);
    };

    const artistsToSort = [...artists];

    switch (activeFilter) {
        case 'Termurah':
            return artistsToSort.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        case '⭐ Terpopuler':
            return artistsToSort.sort((a, b) => b.reviews - a.reviews);
        case 'Terdekat':
        default:
            return artistsToSort.sort((a, b) => a.distance - b.distance);
    }
  }, [activeFilter]);


  return (
    <div className="bg-nailora-pink-light min-h-full pb-24">
      <div className="bg-gradient-to-b from-pink-400 to-pink-300 p-6 rounded-b-3xl text-white sticky top-0 z-10">
        <h2 className="text-xl font-bold text-center mb-1">Booking Nail Artist</h2>
        <p className="text-center text-sm opacity-90 mb-4">Temukan artist terbaik di dekat Anda</p>
        <div className="bg-white/30 text-center text-xs py-1 rounded-full">
            Jakarta Selatan • 4 nail artist tersedia
        </div>
      </div>
      
      {selectedArtist ? (
        <BookingForm artist={selectedArtist} onBack={() => setSelectedArtist(null)} onConfirmBooking={handleConfirmBooking} />
      ) : (
        <>
          <div className="p-4 sticky top-[138px] z-10 bg-nailora-pink-light">
            <div className="flex gap-2 items-center">
                <button className="p-3 bg-white rounded-full shadow-sm"><FilterIcon className="w-5 h-5 text-nailora-purple"/></button>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    <FilterButton label="Terdekat" active={activeFilter === 'Terdekat'} onClick={() => setActiveFilter('Terdekat')} />
                    <FilterButton label="Termurah" active={activeFilter === 'Termurah'} onClick={() => setActiveFilter('Termurah')} />
                    <FilterButton label="⭐ Terpopuler" active={activeFilter === '⭐ Terpopuler'} onClick={() => setActiveFilter('⭐ Terpopuler')} />
                </div>
            </div>
          </div>

          <div className="px-4 space-y-4">
            {sortedArtists.map(artist => <ArtistCard key={artist.name} {...artist} onBook={() => setSelectedArtist(artist)}/>)}
          </div>
        </>
      )}


      <BottomNavBar activePage={Page.Booking} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default BookingScreen;