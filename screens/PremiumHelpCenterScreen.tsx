
import React, { useState } from 'react';
import { Page } from '../types';
import { ChevronLeftIcon, MailIcon } from '../components/icons';

interface PremiumHelpCenterScreenProps {
    setCurrentPage: (page: Page) => void;
}

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 last:border-none">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 text-left">
                <span className="font-semibold text-nailora-purple text-sm">{question}</span>
                <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <p className="text-sm text-gray-500 pb-4 animate-fade-in">{answer}</p>
            )}
        </div>
    );
}

const PremiumHelpCenterScreen: React.FC<PremiumHelpCenterScreenProps> = ({ setCurrentPage }) => {
    return (
        <div className="bg-gray-50 min-h-full pb-10">
             <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center">
                <button onClick={() => setCurrentPage(Page.Profile)} className="p-2 -ml-2">
                    <ChevronLeftIcon className="w-6 h-6 text-nailora-purple" />
                </button>
                <h2 className="text-lg font-bold text-nailora-purple ml-2">Pusat Bantuan Premium</h2>
            </div>

            <div className="p-4 space-y-6">
                <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                    <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">👋</span>
                    </div>
                    <h3 className="font-bold text-nailora-purple">Halo, ada yang bisa dibantu?</h3>
                    <p className="text-xs text-gray-500 mt-1">Temukan jawaban seputar langganan Nailora Plus.</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold text-nailora-purple mb-2">FAQ Pembayaran</h3>
                    <FaqItem 
                        question="Mengapa pembayaran saya gagal?" 
                        answer="Pembayaran gagal biasanya disebabkan oleh saldo tidak mencukupi, koneksi internet terputus, atau gangguan pada penyedia layanan pembayaran. Silakan coba lagi atau gunakan metode lain." 
                    />
                    <FaqItem 
                        question="Bagaimana cara meminta refund?" 
                        answer="Refund dapat diajukan dalam waktu 24 jam setelah pembayaran jika fitur premium belum digunakan sama sekali. Hubungi support kami untuk bantuan lebih lanjut." 
                    />
                    <FaqItem 
                        question="Apakah aman menyimpan kartu?" 
                        answer="Ya, kami menggunakan enkripsi SSL dan tidak menyimpan nomor CVV kartu Anda. Semua transaksi diproses oleh payment gateway terpercaya." 
                    />
                </div>

                 <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold text-nailora-purple mb-2">Langganan & Akun</h3>
                    <FaqItem 
                        question="Bagaimana cara membatalkan langganan?" 
                        answer="Pergi ke menu Profil > Langganan Saya > Pengaturan, lalu klik tombol 'Batalkan Langganan'." 
                    />
                    <FaqItem 
                        question="Apa itu fitur Gift Premium?" 
                        answer="Anda bisa membelikan paket berlangganan untuk teman. Cukup masukkan email teman Anda di menu Gift Premium dan lakukan pembayaran." 
                    />
                </div>
                
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500 mb-3">Masih butuh bantuan?</p>
                    <button onClick={() => alert("Menghubungi CS...")} className="bg-nailora-pink-accent text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 mx-auto">
                        <MailIcon className="w-5 h-5" />
                        Hubungi Customer Service
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumHelpCenterScreen;