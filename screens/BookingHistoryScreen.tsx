import React from 'react';
import { Page } from '../types';
import { ChevronLeftIcon } from '../components/icons';

interface BookingHistoryScreenProps {
  setCurrentPage: (page: Page) => void;
}

type BookingStatus = 'Selesai' | 'Menunggu' | 'Dibatalkan';

interface BookingHistory {
  id: number;
  date: string;
  artist: string;
  service: string;
  status: BookingStatus;
}

const bookingData: BookingHistory[] = [
  { id: 1, date: '25 Juli 2024, 14:00', artist: 'Sarah Martinez', service: 'Gel Extensions', status: 'Selesai' },
  { id: 2, date: '12 Juli 2024, 11:00', artist: 'Alya Putri', service: 'French Manicure', status: 'Selesai' },
  { id: 3, date: '30 Juni 2024, 16:30', artist: 'Luna Chen', service: 'Minimalist Art', status: 'Dibatalkan' },
  { id: 4, date: 'Besok, 10:00', artist: 'Emma Rodriguez', service: 'Custom Designs', status: 'Menunggu' },
  { id: 5, date: '15 Mei 2024, 13:00', artist: 'Sarah Martinez', service: 'Nail Art', status: 'Selesai' },
];

const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const baseClasses = "text-xs font-semibold px-2.5 py-1 rounded-full";
  const statusClasses = {
    Selesai: "bg-green-100 text-green-700",
    Menunggu: "bg-yellow-100 text-yellow-700",
    Dibatalkan: "bg-red-100 text-red-700",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const BookingHistoryCard: React.FC<{ booking: BookingHistory }> = ({ booking }) => (
  <div className="bg-white p-4 rounded-xl shadow-md">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold text-nailora-purple">{booking.service}</p>
        <p className="text-sm text-nailora-gray">oleh {booking.artist}</p>
      </div>
      <StatusBadge status={booking.status} />
    </div>
    <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-nailora-gray">
      <p>🗓️ {booking.date}</p>
    </div>
  </div>
);


const BookingHistoryScreen: React.FC<BookingHistoryScreenProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center">
        <button onClick={() => setCurrentPage(Page.Profile)} className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-nailora-purple" />
        </button>
        <h2 className="text-xl font-bold text-center text-nailora-purple flex-grow -ml-8">Riwayat Booking</h2>
      </div>

      <div className="p-4 space-y-4">
        {bookingData.length > 0 ? (
          bookingData.map(booking => <BookingHistoryCard key={booking.id} booking={booking} />)
        ) : (
          <div className="text-center py-10">
            <p className="text-nailora-gray">Anda belum memiliki riwayat booking.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryScreen;