import React, { useState, useRef } from 'react';
import { Design } from '../types';
import { UploadIcon } from './icons';

interface AddDesignModalProps {
    onClose: () => void;
    onAddDesign: (newDesign: Design) => void;
    categories: string[];
    initialCategory?: string;
}

const AddDesignModal: React.FC<AddDesignModalProps> = ({ onClose, onAddDesign, categories, initialCategory }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const availableCategories = categories.filter(c => c !== 'Semua');
    const [category, setCategory] = useState(initialCategory || availableCategories[0] || 'Nude');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [isPremium, setIsPremium] = useState(false);
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
        const newDesign: Design = {
            imgSrc: imagePreview,
            title,
            category,
            isPremium,
            artist,
            description,
            likes: Math.floor(Math.random() * 100), // Add some random likes
        };
        onAddDesign(newDesign);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 flex flex-col h-[90vh]" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-nailora-purple text-center mb-4">Tambah Desain Baru</h2>
                
                <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Gambar Desain</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden"/>
                        <button 
                            onClick={() => fileInputRef.current?.click()} 
                            className="w-full mt-1 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-nailora-gray hover:border-nailora-pink-accent hover:text-nailora-pink-accent transition-colors aspect-square"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <>
                                    <UploadIcon className="w-10 h-10 mb-2"/>
                                    <span className="text-sm font-semibold">Pilih Gambar</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Judul Desain</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Contoh: Glazed Donut" 
                            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Kategori Warna</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none bg-white"
                        >
                            {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                     <div>
                        <label className="text-sm font-medium text-nailora-purple">Artis (Opsional)</label>
                        <input 
                            type="text" 
                            value={artist} 
                            onChange={e => setArtist(e.target.value)}
                            placeholder="Contoh: Sarah M." 
                            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Deskripsi (Opsional)</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            placeholder="Jelaskan tentang desain ini..."
                            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none"
                        />
                    </div>
                    
                     <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="font-semibold text-nailora-purple">Desain Premium?</p>
                            <p className="text-xs text-nailora-gray">Hanya untuk pelanggan Nailora Plus.</p>
                        </div>
                        <button onClick={() => setIsPremium(!isPremium)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isPremium ? 'bg-nailora-pink-accent' : 'bg-gray-200'}`}>
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isPremium ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                </div>

                <div className="flex-shrink-0 flex gap-3 mt-4 pt-4 border-t border-gray-200">
                    <button onClick={onClose} className="w-full bg-gray-200 text-nailora-gray font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                    <button onClick={handleSubmit} className="w-full bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 disabled:bg-opacity-50" disabled={!title || !imagePreview}>Simpan</button>
                </div>
            </div>
        </div>
    );
};

export default AddDesignModal;
