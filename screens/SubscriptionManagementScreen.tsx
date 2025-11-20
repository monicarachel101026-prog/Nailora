
import React, { useState } from 'react';
import { User, Page } from '../types';
import { ChevronLeftIcon, CrownIcon, CheckCircleIcon } from '../components/icons';

interface SubscriptionManagementScreenProps {
    user: User;
    setCurrentPage: (page: Page) => void;
}

const SubscriptionManagementScreen: React.FC<SubscriptionManagementScreenProps> = ({ user, setCurrentPage }) => {
    const [autoRenew, setAutoRenew] = useState(user.subscription?.autoRenew ?? false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    
    if (!user.isPremium || !user.subscription) {
        return (
            <div className="bg-gray-50 min-h-full p-6 flex flex-col items-center justify-center text-center">
                 <CrownIcon className="w-16 h-16 text-gray-300 mb-4" />
                 <h2 className="text-xl font-bold text-nailora-purple">Tidak Ada Langganan Aktif</h2>
                 <p className="text-gray-500 mt-2 mb-6">Anda saat ini menggunakan versi gratis.</p>
                 <button onClick={() => setCurrentPage(Page.Premium)} className="bg-nailora-pink-accent text-white font-bold py-2 px-6 rounded-full shadow-lg">
                     Upgrade Sekarang
                 </button>
                 <button onClick={() => setCurrentPage(Page.Profile)} className="mt-4 text-nailora-gray underline">
                     Kembali
                 </button>
            </div>
        );
    }

    const getTierColor = (tier: string) => {
        if (tier === 'Diamond') return 'from-blue-400 to-cyan-300';
        if (tier === 'Platinum') return 'from-gray-300 to-gray-100 text-gray-800';
        return 'from-yellow-300 to-yellow-500'; // Gold
    };

    const handleToggleAutoRenew = () => {
        setAutoRenew(!autoRenew);
        // In real app: API call
    };
    
    const handleCancelSubscription = () => {
        alert("Langganan berhasil dibatalkan. Anda masih bisa menikmati fitur premium hingga akhir periode tagihan.");
        // In real app: API call update user
        setCurrentPage(Page.Profile);
    };

    const nextBilling = new Date(user.subscription.nextBillingDate);
    const today = new Date();
    const daysRemaining = Math.ceil((nextBilling.getTime() - today.getTime()) / (1000 * 3600 * 24));

    return (
        <div className="bg-gray-50 min-h-full">
            <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center">
                <button onClick={() => setCurrentPage(Page.Profile)} className="p-2 -ml-2">
                    <ChevronLeftIcon className="w-6 h-6 text-nailora-purple" />
                </button>
                <h2 className="text-lg font-bold text-nailora-purple ml-2">Langganan Saya</h2>
            </div>

            <div className="p-4 space-y-4">
                {/* Tier Card */}
                <div className={`bg-gradient-to-br ${getTierColor(user.subscription.tier)} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white opacity-20 rounded-full"></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                             <CrownIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold drop-shadow-md">{user.subscription.tier} Member</h3>
                            <p className="text-xs opacity-90 font-medium">Nailora Plus</p>
                        </div>
                    </div>
                    <div className="bg-black/10 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Status</span>
                            <span className="font-bold bg-green-500/80 px-2 rounded text-xs flex items-center">Aktif</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span>Sisa Hari</span>
                            <span className="font-bold">{daysRemaining} Hari</span>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                    <h3 className="font-bold text-nailora-purple border-b pb-2">Rincian Paket</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Mulai Langganan</span>
                            <span className="font-semibold text-nailora-purple">{new Date(user.subscription.startDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tagihan Berikutnya</span>
                            <span className="font-semibold text-nailora-purple">{nextBilling.toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Metode Pembayaran</span>
                            <span className="font-semibold text-nailora-purple">{user.subscription.method}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Harga Perpanjangan</span>
                            <span className="font-semibold text-nailora-purple">Rp 29.000</span>
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <h3 className="font-bold text-nailora-purple border-b pb-2 mb-4">Pengaturan</h3>
                    
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="font-semibold text-gray-800">Perpanjangan Otomatis</p>
                            <p className="text-xs text-gray-500">Tagih otomatis setiap bulan</p>
                        </div>
                         <button onClick={handleToggleAutoRenew} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${autoRenew ? 'bg-nailora-pink-accent' : 'bg-gray-300'}`}>
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${autoRenew ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {showCancelConfirm ? (
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 animate-fade-in">
                            <p className="text-sm text-red-700 font-medium mb-2">Yakin ingin membatalkan?</p>
                            <div className="flex gap-2">
                                <button onClick={() => setShowCancelConfirm(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-1.5 rounded text-xs font-bold">Tidak</button>
                                <button onClick={handleCancelSubscription} className="flex-1 bg-red-500 text-white py-1.5 rounded text-xs font-bold">Ya, Batalkan</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setShowCancelConfirm(true)} className="w-full border border-red-200 text-red-500 font-bold py-2.5 rounded-lg hover:bg-red-50 text-sm">
                            Batalkan Langganan
                        </button>
                    )}
                </div>
                
                 <button onClick={() => setCurrentPage(Page.PremiumHelpCenter)} className="w-full text-center text-xs text-nailora-gray underline">
                    Butuh bantuan dengan tagihan? Hubungi CS
                </button>
            </div>
        </div>
    );
};

export default SubscriptionManagementScreen;