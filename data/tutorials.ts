
import { Tutorial } from '../types';

export const initialTutorials: Tutorial[] = [
    { 
        id: 1, 
        title: "Cara Membuat Nail Art Simple & Rapi",
        description: "Tips ini membantu kamu membuat nail art basic dengan hasil rapi walaupun pemula.",
        category: 'Beginner',
        difficulty: 'Pemula',
        duration: '3 Menit Baca',
        tools: ['Base Coat', 'Dua Warna Kutek', 'Dotting Tool / Kuas Kecil', 'Remover & Cotton Bud', 'Top Coat', 'Cuticle Oil'],
        imgSrc: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300&h=200",
        uploaderName: "Nailora Official", 
        uploaderAvatar: 'https://picsum.photos/seed/nailora/100/100', 
        likes: 342, 
        comments: [],
        notes: [
            "Gunakan lapisan tipis agar tidak mudah retak.",
            "Jika tangan bergetar, lakukan garis perlahan dari arah tengah."
        ],
        steps: [
            {
                order: 1,
                title: "Bersihkan kuku",
                description: "Cuci tangan lalu bersihkan permukaan kuku dari minyak atau debu agar kutek menempel sempurna."
            },
            {
                order: 2,
                title: "Gunakan base coat tipis",
                description: "Oleskan satu lapis tipis base coat untuk melindungi kuku dan membuat warna lebih rata."
            },
            {
                order: 3,
                title: "Pilih warna dasar",
                description: "Aplikasikan warna dasar pilihanmu sebanyak dua kali lapis agar hasilnya solid dan tidak menerawang."
            },
            {
                order: 4,
                title: "Mulai gambar pola",
                description: "Gunakan dotting tool atau kuas kecil untuk membuat garis atau pola sederhana sesuai keinginan."
            },
            {
                order: 5,
                title: "Perbaiki bagian yang meleset",
                description: "Jika ada coretan di kulit, gunakan cotton bud kecil yang dicelup remover untuk merapikan tepiannya."
            },
            {
                order: 6,
                title: "Tunggu kering 1–2 menit",
                description: "Bersabarlah dan jangan sentuh apa pun sampai warna setengah kering untuk menghindari smudging."
            },
            {
                order: 7,
                title: "Oleskan top coat",
                description: "Tutup dengan top coat bening untuk hasil glossy dan agar nail art lebih tahan lama."
            },
            {
                order: 8,
                title: "Gunakan cuticle oil",
                description: "Setelah benar-benar kering, oleskan cuticle oil di sekitar kuku agar terlihat sehat dan bersih."
            }
        ],
        isPremium: false
    },
    { 
        id: 2, 
        title: "Tips Merawat Kuku Sehat",
        description: "Rutin lakukan ini agar kuku kuat, tidak mudah patah, dan berkilau alami.",
        category: 'Nail Care Tips',
        difficulty: 'Pemula',
        duration: '2 Menit Baca',
        tools: ['Air Hangat', 'Cuticle Oil', 'Nail Buffer', 'Hand Cream', 'Gunting Kuku'],
        imgSrc: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=300&h=200",
        uploaderName: "Dr. Nail", 
        uploaderAvatar: 'https://picsum.photos/seed/drnail/100/100', 
        likes: 890, 
        comments: [],
        notes: [
            "Jangan memotong kutikula terlalu dalam, bisa menyebabkan infeksi.",
            "Hindari menggunakan kuku sebagai alat untuk membuka kaleng."
        ],
        steps: [
            {
                order: 1,
                title: "Rendam kuku",
                description: "Rendam kuku di air hangat selama 3 menit untuk melunakkan kuku dan kulit sekitar."
            },
            {
                order: 2,
                title: "Keringkan dengan lembut",
                description: "Tepuk-tepuk tangan dengan handuk bersih hingga kering."
            },
            {
                order: 3,
                title: "Oles cuticle oil",
                description: "Aplikasikan vitamin atau minyak kutikula di pangkal kuku."
            },
            {
                order: 4,
                title: "Potong kuku",
                description: "Potong kuku sesuai bentuk yang diinginkan (kotak atau oval), hindari memotong terlalu pendek."
            },
            {
                order: 5,
                title: "Haluskan tepi",
                description: "Gunakan buffer atau kikir kuku satu arah untuk menghaluskan bagian tepi yang tajam."
            },
            {
                order: 6,
                title: "Gunakan hand cream",
                description: "Akhiri dengan hand cream 2x sehari untuk menjaga kelembapan tangan dan kuku."
            }
        ],
        isPremium: false
    },
    { 
        id: 3, 
        title: "Tips Membuat Warna Tidak Bergaris",
        description: "Rahasia aplikasi kutek yang mulus (streak-free) seperti hasil salon.",
        category: 'Troubleshooting',
        difficulty: 'Menengah',
        duration: '1 Menit Baca',
        tools: ['Base Coat', 'Kutek Berkualitas', 'Top Coat'],
        imgSrc: "https://images.unsplash.com/photo-1632932687016-d7d98f493022?auto=format&fit=crop&q=80&w=400",
        uploaderName: "Alya Putri", 
        uploaderAvatar: 'https://picsum.photos/seed/user1/100/100', 
        likes: 520, 
        comments: [],
        notes: [
            "Kocok botol kutek dengan cara diputar di telapak tangan, jangan dikocok naik turun agar tidak ada gelembung udara."
        ],
        steps: [
            {
                order: 1,
                title: "Wajib Base Coat",
                description: "Jangan skip base coat. Ini meratakan permukaan kuku yang tidak rata (ridges)."
            },
            {
                order: 2,
                title: "Lapisan Pertama Tipis",
                description: "Oleskan warna pertama setipis mungkin. Jangan khawatir jika belum menutup sempurna."
            },
            {
                order: 3,
                title: "Tunggu 30 Detik",
                description: "Biarkan lapisan pertama agak kering sebelum menimpa lapisan kedua."
            },
            {
                order: 4,
                title: "Lapisan Kedua",
                description: "Oleskan lapisan kedua dengan teknik 'mengambang' (jangan tekan kuas terlalu keras)."
            },
            {
                order: 5,
                title: "Hindari Kuas Penuh",
                description: "Pastikan hanya ada cat di satu sisi kuas agar tidak meluber ke kutikula."
            },
            {
                order: 6,
                title: "Kunci dengan Top Coat",
                description: "Top coat akan menyatukan kedua lapisan warna dan menghilangkan tekstur garis halus."
            }
        ],
        isPremium: true
    }
];
