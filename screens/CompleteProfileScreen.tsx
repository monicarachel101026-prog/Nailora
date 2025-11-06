import React, { useState } from 'react';
import { NailoraLogo, ProfileIcon, BookingIcon, GlobeIcon, ChevronLeftIcon } from '../components/icons';
import { User } from '../types';

interface CompleteProfileScreenProps {
  user: User;
  onComplete: (updatedUser: Pick<User, 'name'>) => void;
  onBack: () => void;
}

const CompleteProfileScreen: React.FC<CompleteProfileScreenProps> = ({ user, onComplete, onBack }) => {
  const [name, setName] = useState(user.name);

  const handleSave = () => {
    // In a real app, you would save user data to a backend.
    // For this demo, we just trigger the onComplete callback.
    if(name.trim()) {
        onComplete({ name });
    } else {
        alert("Nama tidak boleh kosong.");
    }
  };

  return (
    <div className="min-h-full bg-transparent p-6 flex flex-col items-center justify-center relative">
      <button 
        onClick={onBack} 
        className="absolute top-6 left-4 p-2 text-nailora-gray hover:text-nailora-purple transition-colors"
        aria-label="Kembali dan keluar"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <div className="text-center mb-4">
        <NailoraLogo className="w-20 h-20 mx-auto" />
      </div>

      <div className="w-full bg-white p-6 rounded-2xl shadow-lg mt-8">
        <h2 className="text-xl font-bold text-nailora-purple text-center font-quicksand">Lengkapi Profil Anda</h2>
        <p className="text-sm text-nailora-gray text-center mb-6">Bantu kami mengenal Anda lebih baik.</p>
        
        <div className="w-24 h-24 rounded-full mx-auto bg-gray-100 mb-6 flex items-center justify-center text-gray-400 border-4 border-white shadow-inner">
            <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <ProfileIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative">
            <BookingIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="date" placeholder="Tanggal Lahir" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" />
          </div>
          <div className="relative">
            <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none bg-white appearance-none">
                <option>Indonesia</option>
                <option>Malaysia</option>
                <option>Singapura</option>
                <option>Lainnya</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-6 bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
          Simpan & Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default CompleteProfileScreen;