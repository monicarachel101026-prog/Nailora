import React from 'react';
import { Tutorial } from '../types';
import { WalletIcon, LockIcon } from '../components/icons';

// FIX: Replaced JSX syntax with React.createElement to fix errors in .ts file.
const eWalletTutorialContent = React.createElement(React.Fragment, null, 
    React.createElement("p", { className: "mb-4" }, "Membayar nail art favoritmu kini lebih mudah dengan e-wallet! Ikuti langkah-langkah simpel berikut ini:"),
    React.createElement("div", { className: "space-y-5" },
        React.createElement("div", null,
            React.createElement("h3", { className: "font-bold text-nailora-purple mb-2" }, "1. Buka Aplikasi E-Wallet Kamu"),
            React.createElement("p", null, "Siapkan aplikasi e-wallet andalanmu (Gopay, OVO, Dana, dll).")
        ),
        React.createElement("div", null,
            React.createElement("h3", { className: "font-bold text-nailora-purple mb-2" }, "2. Pilih Menu Pembayaran"),
            React.createElement("p", null, 
                "Cari tombol dengan tulisan seperti ",
                React.createElement("span", { className: "font-semibold bg-gray-100 px-1.5 py-0.5 rounded-md" }, "“Bayar”"),
                ", ",
                React.createElement("span", { className: "font-semibold bg-gray-100 px-1.5 py-0.5 rounded-md" }, "“Transfer”"),
                ", atau ",
                React.createElement("span", { className: "font-semibold bg-gray-100 px-1.5 py-0.5 rounded-md" }, "“Scan QR”"),
                "."
            )
        ),
        React.createElement("div", { className: "flex items-start gap-3 bg-pink-50 p-4 rounded-lg" },
            React.createElement(WalletIcon, { className: "w-8 h-8 text-nailora-pink-accent flex-shrink-0 mt-1" }),
            React.createElement("div", null,
                React.createElement("h3", { className: "font-bold text-nailora-purple mb-2" }, "3. Pilih Metode Pembayaran"),
                React.createElement("p", { className: "mb-2" }, "Ada dua cara utama:"),
                React.createElement("ul", { className: "list-disc list-inside space-y-1" },
                    React.createElement("li", null, 
                        React.createElement("span", { className: "font-semibold" }, "Scan QR Code:"),
                        " Arahkan kamera ke kode QR yang diberikan oleh nail artist."
                    ),
                    React.createElement("li", null,
                        React.createElement("span", { className: "font-semibold" }, "Kirim ke Nomor:"),
                        " Jika tanpa QR, masukkan nomor HP atau akun e-wallet tujuan."
                    )
                )
            )
        ),
        React.createElement("div", null,
            React.createElement("h3", { className: "font-bold text-nailora-purple mb-2" }, "4. Masukkan Nominal Pembayaran"),
            React.createElement("p", null, "Ketik jumlah uang yang harus dibayar sesuai dengan total tagihanmu.")
        ),
        React.createElement("div", { className: "flex items-start gap-3 bg-purple-50 p-4 rounded-lg" },
            React.createElement(LockIcon, { className: "w-8 h-8 text-nailora-purple flex-shrink-0 mt-1" }),
            React.createElement("div", null,
                React.createElement("h3", { className: "font-bold text-nailora-purple mb-2" }, "5. Konfirmasi dan Masukkan PIN"),
                React.createElement("p", { className: "mb-2" }, "Periksa kembali detail transaksi sebelum melanjutkan:"),
                React.createElement("ul", { className: "list-disc list-inside space-y-1 text-sm" },
                    React.createElement("li", null, "Nama penerima sudah benar."),
                    React.createElement("li", null, "Jumlah uang sesuai.")
                ),
                React.createElement("p", { className: "mt-2" }, "Terakhir, masukkan PIN rahasia e-wallet kamu untuk menyelesaikan pembayaran. Selesai!")
            )
        )
    )
);

export const initialTutorials: Tutorial[] = [
    { id: 1, imgSrc: "https://picsum.photos/seed/tip1/300/200", title: "Cara merawat kuku", duration: "5:30", videoUrl: "https://videos.pexels.com/video-files/7578541/7578541-sd_640_360_25fps.mp4", uploaderName: "Nailora Official", uploaderAvatar: 'https://picsum.photos/seed/nailora/100/100', likes: 254, comments: [] },
    { id: 2, imgSrc: "https://picsum.photos/seed/tip2/300/200", title: "DIY French Manicure", duration: "8:15", videoUrl: "https://videos.pexels.com/video-files/8051949/8051949-sd_640_360_25fps.mp4", uploaderName: "Jane Doe", uploaderAvatar: 'https://picsum.photos/seed/user2/100/100', likes: 481, comments: [] },
    { id: 3, imgSrc: "https://picsum.photos/seed/tip3/300/200", title: "Memilih Warna Nude", duration: "3:45", videoUrl: "https://videos.pexels.com/video-files/7650154/7650154-sd_640_360_25fps.mp4", uploaderName: "Alya Putri", uploaderAvatar: 'https://picsum.photos/seed/user1/100/100', likes: 198, comments: [] },
    { id: 4, imgSrc: "https://picsum.photos/seed/ewallet/300/200", title: "Cara Bayar Pakai E-Wallet", duration: "2 min read", content: eWalletTutorialContent, uploaderName: "Nailora Official", uploaderAvatar: 'https://picsum.photos/seed/nailora/100/100', likes: 152, comments: [] },
];
