import React, { useState } from 'react';
import { NailoraLogo, EyeOpenIcon, EyeClosedIcon, MailIcon, LockIcon, ProfileIcon } from '../components/icons';
import { User } from '../types';

interface RegisterScreenProps {
  onRegister: (newUser: Omit<User, 'id' | 'profileComplete' | 'avatar'>) => { success: boolean, message: string };
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegisterClick = () => {
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Semua kolom wajib diisi.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Format email tidak valid.');
      return;
    }
    if (password.length < 6) {
        setError('Password harus minimal 6 karakter.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    
    const result = onRegister({ name, email, password });
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-full bg-transparent p-6 flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <NailoraLogo className="w-20 h-20 mx-auto" />
      </div>

      <div className="w-full bg-white p-6 rounded-2xl shadow-lg mt-8">
        <h2 className="text-xl font-bold text-nailora-purple text-center font-quicksand">Buat Akun Baru</h2>
        <p className="text-sm text-nailora-gray text-center mb-6">Gabung dan temukan inspirasimu</p>
        
        {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4 text-center">{error}</p>}

        <form onSubmit={(e) => { e.preventDefault(); handleRegisterClick(); }}>
          <div className="space-y-4">
            <div className="relative">
              <ProfileIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Nama Lengkap" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" />
            </div>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Alamat Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" />
            </div>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" />
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {passwordVisible ? <EyeClosedIcon className="w-5 h-5" /> : <EyeOpenIcon className="w-5 h-5" />}
              </button>
            </div>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type={confirmPasswordVisible ? 'text' : 'password'} 
                placeholder="Konfirmasi Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" />
              <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {confirmPasswordVisible ? <EyeClosedIcon className="w-5 h-5" /> : <EyeOpenIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </form>

        <button
          onClick={handleRegisterClick}
          className="w-full mt-6 bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
          Daftar
        </button>

        <p className="text-center text-sm text-nailora-gray mt-6">
          Sudah punya akun? <button onClick={onGoToLogin} className="font-semibold text-nailora-pink-accent hover:underline">Masuk</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;