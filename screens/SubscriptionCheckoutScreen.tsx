
import React, { useState } from 'react';
import { User } from '../types';
import { ChevronLeftIcon, CreditCardIcon, QRIcon, BankIcon, WalletIcon, CrownIcon, CheckCircleIcon, ChevronRightIcon, LockClosedIcon } from '../components/icons';

interface SubscriptionCheckoutScreenProps {
    user: User;
    onBack: () => void;
    onSuccess: () => void;
}

const SubscriptionCheckoutScreen: React.FC<SubscriptionCheckoutScreenProps> = ({ user, onBack, onSuccess }) => {
    const [step, setStep] = useState<'checkout' | 'otp' | 'processing' | 'success'>('checkout');
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [email, setEmail] = useState(user.email);
    const [autoRenew, setAutoRenew] = useState(true);
    const [openAccordion, setOpenAccordion] = useState<string>('E-Wallet'); 
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleAccordionClick = (section: string) => {
        setOpenAccordion(openAccordion === section ? '' : section);
    };

    const handlePay = () => {
        if (!selectedMethod || !email) return;
        setStep('otp');
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Auto focus next
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyOtp = () => {
        setStep('processing');
        setTimeout(() => {
            setStep('success');
        }, 2000);
    };

    if (step === 'otp') {
        return (
             <div className="min-h-full bg-white flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xs">
                    <div className="text-center mb-6">
                         <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                             <LockClosedIcon className="w-8 h-8 text-blue-600" />
                         </div>
                         <h2 className="text-xl font-bold text-nailora-purple">Verifikasi Pembayaran</h2>
                         <p className="text-gray-500 text-sm mt-2">Masukkan 4 digit kode OTP yang dikirim ke {email}</p>
                    </div>

                    <div className="flex justify-between gap-2 mb-6">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                className="w-14 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-nailora-pink-accent focus:outline-none"
                            />
                        ))}
                    </div>

                    <button 
                        onClick={handleVerifyOtp}
                        disabled={otp.some(d => !d)}
                        className="w-full bg-nailora-pink-accent text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-50"
                    >
                        Verifikasi
                    </button>
                    
                    <button onClick={() => setStep('checkout')} className="w-full mt-4 text-sm text-gray-500 hover:text-nailora-purple">
                        Batal
                    </button>
                </div>
             </div>
        );
    }

    if (step === 'processing') {
        return (
            <div className="min-h-full bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 border-4 border-nailora-pink border-t-nailora-pink-accent rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-bold text-nailora-purple">Memproses Pembayaran...</h2>
                <p className="text-gray-500 mt-2">Mohon jangan tutup halaman ini.</p>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="min-h-full bg-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute top-20 right-20 w-4 h-4 bg-pink-400 transform rotate-45 animate-pulse"></div>
                    <div className="absolute bottom-40 left-1/2 w-2 h-2 bg-purple-400"></div>
                </div>

                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-fade-in">
                     <CheckCircleIcon className="w-12 h-12 text-green-500" />
                </div>
                
                <h1 className="text-2xl font-bold text-nailora-purple font-quicksand mb-2">Selamat! Nailora Plus Aktif 🎉</h1>
                <p className="text-gray-500 mb-8">Email bukti pembayaran telah dikirim.</p>

                <div className="bg-gradient-to-r from-yellow-50 to-pink-50 p-4 rounded-xl border border-yellow-100 w-full mb-8">
                    <div className="flex items-center gap-3 mb-2">
                         <CrownIcon className="w-6 h-6 text-yellow-500" />
                         <span className="font-bold text-nailora-purple">Member Premium: Gold Tier</span>
                    </div>
                    <p className="text-xs text-gray-600 text-left">Berlaku hingga: <span className="font-semibold">{new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                </div>

                <button 
                    onClick={onSuccess}
                    className="w-full bg-nailora-pink-accent text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
                >
                    Mulai Menggunakan
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-full pb-32">
            {/* Header */}
            <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center">
                <button onClick={onBack} className="p-2 -ml-2">
                    <ChevronLeftIcon className="w-6 h-6 text-nailora-purple" />
                </button>
                <h2 className="text-lg font-bold text-nailora-purple ml-2">Checkout Premium</h2>
            </div>

            <div className="p-4 space-y-4">
                {/* Summary Card */}
                <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                     <div className="flex justify-between items-start relative z-10">
                         <div>
                             <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">Paket Langganan</p>
                             <h3 className="text-2xl font-bold font-quicksand">Nailora Plus</h3>
                             <p className="text-xs text-gray-300 mt-1">Promo Launching</p>
                         </div>
                         <div className="text-right">
                             <p className="text-2xl font-bold">Rp 9.900</p>
                             <p className="text-xs opacity-80 line-through">Rp 29.000</p>
                         </div>
                     </div>
                </div>

                {/* Email Confirmation */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <label className="text-sm font-bold text-nailora-purple mb-2 block">Kirim bukti pembayaran ke:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none"
                        placeholder="contoh@email.com"
                    />
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-nailora-purple">Pilih Metode Pembayaran</h3>
                    </div>
                    
                    {/* E-Wallets */}
                    <div className="border-b border-gray-100">
                        <button onClick={() => handleAccordionClick('E-Wallet')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <WalletIcon className="w-5 h-5 text-blue-500" />
                                <span className="font-medium text-gray-800">E-Wallet</span>
                            </div>
                            <ChevronRightIcon className={`w-4 h-4 text-gray-400 transition-transform ${openAccordion === 'E-Wallet' ? 'rotate-90' : ''}`} />
                        </button>
                        {openAccordion === 'E-Wallet' && (
                            <div className="p-4 bg-gray-50 grid grid-cols-2 gap-3 animate-fade-in">
                                {['DANA', 'OVO', 'GoPay', 'ShopeePay'].map(wallet => (
                                    <button 
                                        key={wallet}
                                        onClick={() => setSelectedMethod(wallet)}
                                        className={`p-3 rounded-lg border-2 font-semibold text-sm transition-all ${selectedMethod === wallet ? 'border-nailora-pink-accent bg-white text-nailora-pink-accent shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                                    >
                                        {wallet}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Virtual Accounts */}
                    <div className="border-b border-gray-100">
                        <button onClick={() => handleAccordionClick('VA')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <BankIcon className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-gray-800">Virtual Account</span>
                            </div>
                            <ChevronRightIcon className={`w-4 h-4 text-gray-400 transition-transform ${openAccordion === 'VA' ? 'rotate-90' : ''}`} />
                        </button>
                         {openAccordion === 'VA' && (
                            <div className="p-4 bg-gray-50 space-y-2 animate-fade-in">
                                {['BCA Virtual Account', 'BRI Virtual Account', 'Mandiri Virtual Account', 'BNI Virtual Account'].map(bank => (
                                    <button 
                                        key={bank}
                                        onClick={() => setSelectedMethod(bank)}
                                        className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${selectedMethod === bank ? 'border-nailora-pink-accent bg-white text-nailora-pink-accent font-bold shadow-sm' : 'border-gray-200 bg-white text-gray-600'}`}
                                    >
                                        {bank}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* QRIS */}
                    <div className="border-b border-gray-100">
                         <button onClick={() => handleAccordionClick('QRIS')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <QRIcon className="w-5 h-5 text-gray-800" />
                                <span className="font-medium text-gray-800">QRIS</span>
                            </div>
                            <ChevronRightIcon className={`w-4 h-4 text-gray-400 transition-transform ${openAccordion === 'QRIS' ? 'rotate-90' : ''}`} />
                        </button>
                         {openAccordion === 'QRIS' && (
                             <div className="p-4 bg-gray-50 animate-fade-in">
                                <button 
                                    onClick={() => setSelectedMethod('QRIS')}
                                    className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${selectedMethod === 'QRIS' ? 'border-nailora-pink-accent bg-white shadow-sm' : 'border-gray-200 bg-white'}`}
                                >
                                    <span className={`text-sm ${selectedMethod === 'QRIS' ? 'font-bold text-nailora-pink-accent' : 'text-gray-600'}`}>Scan QR Code</span>
                                    <QRIcon className="w-6 h-6 text-gray-800"/>
                                </button>
                             </div>
                         )}
                    </div>

                    {/* Credit Card */}
                    <div>
                         <button onClick={() => handleAccordionClick('CC')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <CreditCardIcon className="w-5 h-5 text-purple-600" />
                                <span className="font-medium text-gray-800">Kartu Kredit / Debit</span>
                            </div>
                            <ChevronRightIcon className={`w-4 h-4 text-gray-400 transition-transform ${openAccordion === 'CC' ? 'rotate-90' : ''}`} />
                        </button>
                        {openAccordion === 'CC' && (
                             <div className="p-4 bg-gray-50 animate-fade-in">
                                <button 
                                    onClick={() => setSelectedMethod('Visa/Mastercard')}
                                    className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${selectedMethod === 'Visa/Mastercard' ? 'border-nailora-pink-accent bg-white text-nailora-pink-accent font-bold shadow-sm' : 'border-gray-200 bg-white text-gray-600'}`}
                                >
                                    Visa / Mastercard
                                </button>
                             </div>
                         )}
                    </div>
                </div>

                {/* Auto Renewal */}
                <div className="flex items-start gap-3 p-2">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            checked={autoRenew}
                            onChange={(e) => setAutoRenew(e.target.checked)}
                            className="h-5 w-5 text-nailora-pink-accent focus:ring-nailora-pink-accent border-gray-300 rounded"
                        />
                    </div>
                    <div className="text-sm">
                        <label className="font-medium text-gray-700">Perpanjangan Otomatis</label>
                        <p className="text-xs text-gray-500">Langganan akan diperbarui setiap bulan. Batalkan kapan saja.</p>
                    </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-100 p-2 rounded-lg">
                     <LockClosedIcon className="w-3 h-3" />
                     <span>Pembayaran aman dengan enkripsi SSL</span>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white p-4 border-t border-gray-200 md:max-w-md lg:max-w-lg">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-xs text-gray-500">Total Tagihan</p>
                        <p className="text-xl font-bold text-nailora-purple">Rp 9.900</p>
                    </div>
                    {selectedMethod && (
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Metode</p>
                            <p className="text-sm font-semibold text-nailora-purple truncate max-w-[120px]">{selectedMethod}</p>
                        </div>
                    )}
                </div>
                <button 
                    onClick={handlePay}
                    disabled={!selectedMethod || !email}
                    className="w-full bg-nailora-pink-accent text-white font-bold py-3 rounded-xl shadow-lg hover:bg-opacity-90 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none transition-colors"
                >
                    Bayar Sekarang
                </button>
            </div>
        </div>
    );
};

export default SubscriptionCheckoutScreen;