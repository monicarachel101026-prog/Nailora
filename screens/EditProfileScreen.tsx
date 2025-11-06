import React, { useState, useRef } from 'react';
import { User } from '../types';
import { ChevronLeftIcon, ProfileIcon, UploadIcon } from '../components/icons';

interface EditProfileScreenProps {
  user: User;
  onUpdateProfile: (updatedData: Pick<User, 'name' | 'avatar'>) => void;
  onBack: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onUpdateProfile, onBack }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [feedback, setFeedback] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = () => {
    // Trigger the hidden file input click
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    if (!name.trim()) {
        setFeedback('Nama tidak boleh kosong.');
        return;
    }
    onUpdateProfile({ name, avatar });
    setFeedback('Profil berhasil diperbarui!');
    // The navigation will be handled by onUpdateProfile in App.tsx
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-nailora-purple"/>
        </button>
        <h2 className="text-xl font-bold text-center text-nailora-purple flex-grow -ml-8">Edit Profil</h2>
      </div>

      <div className="p-6 space-y-6">
        <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
        />
        <div className="relative w-28 h-28 mx-auto group">
            <img src={avatar} alt="User Avatar" className="w-full h-full object-cover rounded-full shadow-lg" />
            <button 
                onClick={handleAvatarChange}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Ubah foto profil"
            >
                <UploadIcon className="w-8 h-8"/>
            </button>
        </div>
        
        {feedback && <p className="bg-green-100 text-green-700 text-sm p-3 rounded-lg text-center">{feedback}</p>}

        <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-nailora-purple">Nama Lengkap</label>
                    <div className="relative mt-1">
                      <ProfileIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Nama Lengkap Anda" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
                      />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-nailora-purple">Email (tidak dapat diubah)</label>
                     <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500" 
                    />
                </div>
            </div>
        </div>

        <button
            onClick={handleSave}
            className="w-full bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
            Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default EditProfileScreen;
