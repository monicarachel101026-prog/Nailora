
import React, { useState } from 'react';
import { Page, User } from '../types';
import { ChevronLeftIcon, CrownIcon } from '../components/icons';

interface GiftPremiumScreenProps {
    user: User;
    setCurrentPage: (page: Page) => void;
}

const GiftPremiumScreen: React.FC<GiftPremiumScreenProps> = ({ user, setCurrentPage }) => {
    const [recipientEmail, setRecipientEmail] = useState('');
    const [message, setMessage] = useState('');
    const [selectedPack, setSelectedPack] = useState(1);

    const handleSendGift = () => {
        if(!recipientEmail) return;
        // Simulate sending gift
        setCurrentPage(Page.SubscriptionCheckout); // Redirect to payment
    };

    return (
        <div className="bg-gray-50 min-h-full pb-10">
             <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center">
                <button onClick={() => setCurrentPage(Page.Profile)} className="p-2 -ml-2">
                    <ChevronLeftIcon className="w-6 h-6 text-nailora-purple" />
                </button>
                <h2 className="text-lg font-bold text-nailora-purple ml-2">Gift Premium</h2>
            </div>

            <div className="p-6">
                 <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-6 text-center text-white mb-6 shadow-lg relative overflow-hidden">
                     <div className="absolute top-[-10px] left-[-10px] w-20 h-20 bg-white opacity-20 rounded-full"></div>
                     <div className="absolute bottom-[-10px] right-[-10px] w-20 h-20 bg-white opacity-20 rounded-full"></div>
                     <CrownIcon className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
                     <h3 className="font-bold text-xl">Berbagi Inspirasi</h3>
                     <p className="text-sm opacity-90 mt-1">Hadiahkan Nailora Plus ke teman tersayangmu.</p>
                 </div>

                 <div className="space-y-4">
                     <div>
                         <label className="font-bold text-nailora-purple text-sm mb-2 block">Email Penerima</label>
                         <input 
                            type="email" 
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            placeholder="email.teman@contoh.com"
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none"
                        />
                     </div>

                     <div>
                         <label className="font-bold text-nailora-purple text-sm mb-2 block">Pilih Durasi</label>
                         <div className="grid grid-cols-2 gap-3">
                             <button 
                                onClick={() => setSelectedPack(1)}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${selectedPack === 1 ? 'border-nailora-pink-accent bg-pink-50' : 'border-gray-200 bg-white'}`}
                             >
                                 <p className="font-bold text-nailora-purple">1 Bulan</p>
                                 <p className="text-xs text-gray-500">Rp 29.000</p>
                             </button>
                              <button 
                                onClick={() => setSelectedPack(3)}
                                className={`p-3 rounded-xl border-2 text-center transition-all relative overflow-hidden ${selectedPack === 3 ? 'border-nailora-pink-accent bg-pink-50' : 'border-gray-200 bg-white'}`}
                             >
                                 <div className="absolute top-0 right-0 bg-yellow-400 text-[8px] font-bold px-2 py-0.5 rounded-bl">HEMAT</div>
                                 <p className="font-bold text-nailora-purple">3 Bulan</p>
                                 <p className="text-xs text-gray-500">Rp 79.000</p>
                             </button>
                         </div>
                     </div>

                      <div>
                         <label className="font-bold text-nailora-purple text-sm mb-2 block">Pesan (Opsional)</label>
                         <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tulis pesan spesial..."
                            rows={3}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none"
                        />
                     </div>

                     <button 
                        onClick={handleSendGift}
                        disabled={!recipientEmail}
                        className="w-full bg-nailora-pink-accent text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50 mt-4"
                    >
                        Lanjut ke Pembayaran
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default GiftPremiumScreen;