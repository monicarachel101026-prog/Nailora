
import React, { useState } from 'react';
import { Page, BookingDetails } from '../types';
import { ChevronLeftIcon, CheckCircleIcon, WalletIcon, ChevronRightIcon, CalendarDaysIcon, ShareIcon } from '../components/icons';

interface PaymentScreenProps {
  setCurrentPage: (page: Page) => void;
  bookingDetails: BookingDetails;
}

const eWallets = [
  { name: 'OVO' },
  { name: 'DANA' },
  { name: 'ShopeePay' },
  { name: 'GoPay' },
  { name: 'LinkAja' },
  { name: 'DOKU' },
];

type TransactionDetails = {
    id: string;
    paymentDate: Date;
    method: string;
}

interface PaymentReceiptProps {
    bookingDetails: BookingDetails;
    transactionDetails: TransactionDetails;
    onDone: () => void;
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ bookingDetails, transactionDetails, onDone }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50 p-4 pt-6">
            <div className="text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
                <h2 className="text-2xl font-bold text-nailora-purple mt-3">Pembayaran Berhasil!</h2>
                <p className="text-nailora-gray mt-1">Booking Anda telah dikonfirmasi.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 my-6 space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-nailora-gray">Total Bayar:</span>
                    <span className="font-bold text-lg text-nailora-purple">Rp {bookingDetails.artist.price}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-nailora-gray">ID Transaksi:</span>
                        <span className="font-semibold text-nailora-purple">{transactionDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-nailora-gray">Tanggal Pembayaran:</span>
                        <span className="font-semibold text-nailora-purple">{transactionDetails.paymentDate.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-nailora-gray">Metode Pembayaran:</span>
                        <span className="font-semibold text-nailora-purple">{transactionDetails.method}</span>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="font-semibold text-nailora-purple mb-2">Detail Booking</h4>
                    <div className="flex justify-between"><p>Artis:</p><p className="font-medium text-right">{bookingDetails.artist.name}</p></div>
                    <div className="flex justify-between"><p>Layanan:</p><p className="font-medium text-right">{bookingDetails.service}</p></div>
                    <div className="flex justify-between"><p>Jadwal:</p><p className="font-medium text-right">{bookingDetails.date}, {bookingDetails.time}</p></div>
                </div>
            </div>

            <div className="mt-auto space-y-3">
                 <button 
                    onClick={() => alert('Fitur Bagikan akan segera hadir!')}
                    className="w-full bg-gray-200 text-nailora-purple font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                    <ShareIcon className="w-5 h-5" />
                    Bagikan
                </button>
                <button 
                    onClick={onDone}
                    className="w-full bg-nailora-pink-accent text-white font-bold py-3 rounded-lg shadow-lg hover:bg-opacity-90"
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
};


const PaymentScreen: React.FC<PaymentScreenProps> = ({ setCurrentPage, bookingDetails }) => {
  const [selectedEWallet, setSelectedEWallet] = useState<string | null>(null);
  const [eWalletExpanded, setEWalletExpanded] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);

  const toggleEWalletSection = () => {
    setEWalletExpanded(prev => !prev);
  };

  const handleSelectEWallet = (ewalletName: string) => {
    setSelectedEWallet(ewalletName);
  };

  const handlePayment = () => {
    if (!selectedEWallet) return;
    setIsProcessing(true);
    setTimeout(() => {
        setTransactionDetails({
            id: `TRX-${Date.now()}`,
            paymentDate: new Date(),
            method: selectedEWallet,
        });
        setIsProcessing(false);
        setIsPaid(true);
    }, 1500);
  };
  
  if (isPaid && transactionDetails) {
      return (
          <PaymentReceipt 
            bookingDetails={bookingDetails}
            transactionDetails={transactionDetails}
            onDone={() => setCurrentPage(Page.Dashboard)}
          />
      );
  }

  const isPaymentReady = selectedEWallet !== null;

  return (
    <div className="bg-gray-50 min-h-full pb-32">
      <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center">
        <button onClick={() => setCurrentPage(Page.Booking)} className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-nailora-purple"/>
        </button>
        <h2 className="text-xl font-bold text-center text-nailora-purple flex-grow -ml-8">Pembayaran</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-nailora-purple mb-3">Ringkasan Booking</h3>
            <div className="space-y-2 text-sm text-nailora-gray">
                <div className="flex justify-between"><p>Artis:</p><p className="font-semibold text-nailora-purple">{bookingDetails.artist.name}</p></div>
                <div className="flex justify-between"><p>Layanan:</p><p className="font-semibold text-nailora-purple">{bookingDetails.service}</p></div>
                <div className="flex justify-between"><p>Tanggal:</p><p className="font-semibold text-nailora-purple">{bookingDetails.date}</p></div>
                <div className="flex justify-between"><p>Waktu:</p><p className="font-semibold text-nailora-purple">{bookingDetails.time}</p></div>
                <div className="flex justify-between pt-2 border-t mt-2"><p>Harga:</p><p className="font-semibold text-nailora-purple">Rp {bookingDetails.artist.price}</p></div>
            </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-bold text-nailora-purple mb-3">Pilih Metode Pembayaran</h3>
          <div className="space-y-3">
            <div>
                 <button 
                    onClick={toggleEWalletSection} 
                    className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-all ${selectedEWallet || eWalletExpanded ? 'border-nailora-pink-accent bg-pink-50' : 'border-gray-200 bg-white'} ${eWalletExpanded ? 'rounded-b-none' : ''}`}
                >
                    <WalletIcon className="w-6 h-6 text-nailora-pink-accent"/>
                    <span className="font-semibold text-nailora-purple text-left flex-grow">E-Wallet</span>
                    {selectedEWallet ? 
                        <span className="text-sm font-semibold text-nailora-purple">{selectedEWallet}</span>
                        :
                        <ChevronRightIcon className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${eWalletExpanded ? 'rotate-90' : ''}`} />
                    }
                </button>
                {eWalletExpanded && (
                    <div className="mt-[-2px] pt-5 p-4 bg-pink-50 rounded-b-lg animate-fade-in border-x-2 border-b-2 border-nailora-pink-accent">
                        <p className="text-sm font-semibold text-nailora-purple mb-3">Pilih salah satu e-wallet</p>
                        <div className="grid grid-cols-3 gap-3">
                            {eWallets.map(wallet => (
                                <button 
                                    key={wallet.name}
                                    onClick={() => handleSelectEWallet(wallet.name)}
                                    className={`flex items-center justify-center p-2 h-12 rounded-lg border-2 transition-all ${selectedEWallet === wallet.name ? 'border-nailora-pink-accent bg-white shadow-md' : 'border-transparent bg-white/50 hover:bg-white hover:border-gray-200'}`}
                                >
                                    <span className="text-sm font-medium text-nailora-purple">{wallet.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white p-4 border-t border-gray-200 md:max-w-md lg:max-w-lg">
        <div className="flex justify-between items-center mb-3">
            <p className="text-nailora-gray">Total Bayar</p>
            <p className="text-xl font-bold text-nailora-purple">Rp {bookingDetails.artist.price}</p>
        </div>
        <button 
            onClick={handlePayment} 
            className="w-full bg-nailora-pink-accent text-white font-bold py-3 rounded-lg shadow-lg hover:bg-opacity-90 disabled:bg-opacity-50 flex items-center justify-center"
            disabled={isProcessing || !isPaymentReady}
        >
          {isProcessing ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
            </>
          ) : 'Bayar Sekarang'}
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
