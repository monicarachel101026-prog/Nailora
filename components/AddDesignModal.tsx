
import React, { useState, useRef } from 'react';
import { Design } from '../types';
import { UploadIcon } from './icons';

interface AddDesignModalProps {
    onClose: () => void;
    onAddDesign: (newDesign: Design) => void;
    colors: string[];
    styles: string[];
    lengths: string[];
}

const AddDesignModal: React.FC<AddDesignModalProps> = ({ onClose, onAddDesign, colors, styles, lengths }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    
    // Form States
    const [dominantColor, setDominantColor] = useState(colors.find(c => c !== 'Semua') || 'Nude');
    const [style, setStyle] = useState(styles.find(s => s !== 'Semua') || 'Simple');
    const [length, setLength] = useState(lengths.find(l => l !== 'Semua') || 'Short');
    const [tagsInput, setTagsInput] = useState('');
    
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!title || !imagePreview) {
            alert('Judul dan gambar desain wajib diisi.');
            return;
        }

        // Parse tags
        const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t !== '');

        const newDesign: Design = {
            imgSrc: imagePreview,
            title,
            dominantColor,
            style,
            length,
            tags,
            artist: artist || 'Unknown Artist',
            description,
            likes: 0,
        };
        onAddDesign(newDesign);
    };

    // Filter out "Semua" from dropdown options
    const availableColors = colors.filter(c => c !== 'Semua');
    const availableStyles = styles.filter(s => s !== 'Semua');
    const availableLengths = lengths.filter(l => l !== 'Semua');

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 flex flex-col h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-bold text-nailora-purple text-center">Upload Desain Baru</h2>
                    <p className="text-xs text-center text-nailora-gray mt-1">Isi detail agar desainmu mudah ditemukan.</p>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 space-y-5">
                    {/* Image Upload */}
                    <div>
                        <label className="text-sm font-bold text-nailora-purple mb-2 block">Foto Nail Art 📸</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden"/>
                        <button 
                            onClick={() => fileInputRef.current?.click()} 
                            className={`w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors aspect-[4/3] overflow-hidden relative ${imagePreview ? 'border-nailora-pink-accent' : 'border-gray-300 hover:border-nailora-pink-accent bg-gray-50'}`}
                        >
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white font-semibold text-sm">Ganti Foto</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <UploadIcon className="w-8 h-8 text-nailora-gray mb-2"/>
                                    <span className="text-sm font-medium text-nailora-gray">Ketuk untuk upload</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-sm font-bold text-nailora-purple block mb-1">Nama Desain</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Contoh: Red Velvet Glitter" 
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm" 
                        />
                    </div>

                    {/* Specification Grid */}
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-xs font-bold text-nailora-gray uppercase block mb-1">Warna Dominan</label>
                            <select
                                value={dominantColor}
                                onChange={e => setDominantColor(e.target.value)}
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent bg-white text-sm"
                            >
                                {availableColors.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-nailora-gray uppercase block mb-1">Gaya</label>
                            <select
                                value={style}
                                onChange={e => setStyle(e.target.value)}
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent bg-white text-sm"
                            >
                                {availableStyles.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-nailora-gray uppercase block mb-1">Panjang Kuku</label>
                            <select
                                value={length}
                                onChange={e => setLength(e.target.value)}
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent bg-white text-sm"
                            >
                                {availableLengths.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="text-sm font-bold text-nailora-purple block mb-1">Tag Tambahan (Opsional)</label>
                        <input 
                            type="text" 
                            value={tagsInput} 
                            onChange={e => setTagsInput(e.target.value)}
                            placeholder="glitter, ombre, musim panas (pisahkan koma)" 
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm" 
                        />
                        <p className="text-[10px] text-nailora-gray mt-1">Tag membantu pengguna menemukan desainmu.</p>
                    </div>

                     {/* Artist Info */}
                     <div>
                        <label className="text-sm font-bold text-nailora-purple block mb-1">Dibuat Oleh</label>
                        <input 
                            type="text" 
                            value={artist} 
                            onChange={e => setArtist(e.target.value)}
                            placeholder="Nama Anda atau Salon" 
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm" 
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-bold text-nailora-purple block mb-1">Deskripsi</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            placeholder="Jelaskan detail desain..."
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex-shrink-0 flex gap-3 p-4 border-t border-gray-100 bg-gray-50">
                    <button onClick={onClose} className="w-1/3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">Batal</button>
                    <button onClick={handleSubmit} className="w-2/3 bg-nailora-pink-accent text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed" disabled={!title || !imagePreview}>
                        Upload Desain
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDesignModal;
