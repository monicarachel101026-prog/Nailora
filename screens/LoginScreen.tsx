import React, { useState } from 'react';
import { NailoraLogo, EyeOpenIcon, EyeClosedIcon, MailIcon, LockIcon } from '../components/icons';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (credentials: Pick<User, 'email' | 'password'>) => { success: boolean, message: string };
  onGoToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLoginClick = () => {
    setError('');
    if (!email || !password) {
      setError('Email dan password tidak boleh kosong.');
      return;
    }
    const result = onLogin({ email, password });
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
        <h2 className="text-xl font-bold text-nailora-purple text-center font-quicksand">Selamat datang kembali!</h2>
        <p className="text-sm text-nailora-gray text-center mb-6">Masuk untuk melanjutkan</p>

        {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4 text-center">{error}</p>}

        <form onSubmit={(e) => { e.preventDefault(); handleLoginClick(); }}>
          <div className="space-y-4">
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="Alamat Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
              />
            </div>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
              />
              <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {passwordVisible ? <EyeClosedIcon className="w-5 h-5" /> : <EyeOpenIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </form>

        <div className="text-right mt-2">
          <a href="#" className="text-xs font-medium text-nailora-pink-accent hover:underline">Lupa Password?</a>
        </div>

        <button
          onClick={handleLoginClick}
          className="w-full mt-6 bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
          Masuk
        </button>

        <p className="text-center text-sm text-nailora-gray mt-6">
          Belum punya akun? <button onClick={onGoToRegister} className="font-semibold text-nailora-pink-accent hover:underline">Daftar</button>
        </p>
      </div>
      
       <div className="text-center mt-8 text-xs text-nailora-gray/80">
            <p className="font-semibold">✓ Fitur Keamanan</p>
            <p>Sesi Anda aman dan terenkripsi.</p>
        </div>
    </div>
  );
};

export default LoginScreen;