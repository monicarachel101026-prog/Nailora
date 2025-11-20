
import React, { useState, useRef } from 'react';
import { Tutorial, User, TutorialCategory, DifficultyLevel, TutorialStep } from '../types';
import { UploadIcon, TrashIcon } from './icons';

interface UploadTutorialModalProps {
    user: User;
    onClose: () => void;
    onAddTutorial: (newTutorial: Tutorial) => void;
}

const UploadTutorialModal: React.FC<UploadTutorialModalProps> = ({ user, onClose, onAddTutorial }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<TutorialCategory>('Beginner');
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('Pemula');
    const [duration, setDuration] = useState('');
    
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Steps State
    const [steps, setSteps] = useState<TutorialStep[]>([
        { order: 1, title: '', description: '' }
    ]);

    // Notes State
    const [notes, setNotes] = useState<string>('');

    const categories: TutorialCategory[] = ['Basic Step', 'Tools & Preparation', 'Beginner', 'Intermediate', 'Advanced', 'Nail Care Tips', 'Do & Don\'ts', 'Troubleshooting'];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCoverImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddStep = () => {
        setSteps([...steps, { order: steps.length + 1, title: '', description: '' }]);
    };

    const handleStepChange = (index: number, field: 'title' | 'description', value: string) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setSteps(newSteps);
    };

    const handleRemoveStep = (index: number) => {
        if (steps.length > 1) {
            const newSteps = steps.filter((_, i) => i !== index).map((step, i) => ({ ...step, order: i + 1 }));
            setSteps(newSteps);
        }
    };
    
    const handleSubmit = () => {
        if (!title || !coverImage || !duration || !description) {
            alert('Mohon lengkapi judul, deskripsi, durasi, dan foto cover.');
            return;
        }

        // Basic validation for steps
        if (steps.some(s => !s.title || !s.description)) {
            alert('Mohon lengkapi semua langkah.');
            return;
        }

        const notesArray = notes.split('\n').filter(n => n.trim() !== '');

        const newTutorial: Tutorial = {
            id: Date.now(),
            title,
            description,
            category,
            difficulty,
            duration: duration.endsWith('Baca') ? duration : `${duration} Menit Baca`,
            tools: ['Basic Tools'], // Default for MVP
            imgSrc: coverImage,
            steps: steps,
            notes: notesArray,
            uploaderName: user.name,
            uploaderAvatar: user.avatar,
            likes: 0,
            comments: [],
        };

        onAddTutorial(newTutorial);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-bold text-nailora-purple text-center">Buat Tips / Tutorial</h2>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 space-y-5">
                    {/* Cover Image */}
                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Foto Cover (Thumbnail Dashboard)</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
                        <button 
                            onClick={() => fileInputRef.current?.click()} 
                            className="w-full mt-1 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-nailora-gray hover:border-nailora-pink-accent hover:text-nailora-pink-accent transition-colors overflow-hidden relative"
                        >
                            {coverImage ? (
                                <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <UploadIcon className="w-8 h-8 mb-1"/>
                                    <span className="text-sm font-semibold">Pilih Foto</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-nailora-purple">Judul Tips</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Contoh: Cara Merawat Kuku Rapuh" 
                                className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm" 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-nailora-purple">Deskripsi Singkat</label>
                            <textarea 
                                value={description} 
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Jelaskan secara singkat isi tips ini..." 
                                rows={2}
                                className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm" 
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="flex-1">
                             <label className="text-sm font-medium text-nailora-purple">Kategori</label>
                             <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value as TutorialCategory)}
                                className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm bg-white"
                             >
                                 {categories.map(c => <option key={c} value={c}>{c}</option>)}
                             </select>
                        </div>
                         <div className="flex-1">
                             <label className="text-sm font-medium text-nailora-purple">Level</label>
                             <select 
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                                className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm bg-white"
                             >
                                 <option value="Pemula">Pemula</option>
                                 <option value="Menengah">Menengah</option>
                                 <option value="Pro">Pro</option>
                             </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Estimasi Waktu Baca (Menit)</label>
                        <input 
                            type="number" 
                            value={duration} 
                            onChange={e => setDuration(e.target.value)}
                            placeholder="Contoh: 3" 
                            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm" 
                        />
                    </div>

                    {/* Steps Input */}
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-bold text-nailora-purple mb-3">Langkah-Langkah (Teks)</h3>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-xl border border-gray-200 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="bg-nailora-pink-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                                        {steps.length > 1 && (
                                            <button onClick={() => handleRemoveStep(index)} className="text-red-400 hover:text-red-600">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Judul Langkah (misal: Bersihkan Kuku)"
                                        value={step.title}
                                        onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                        className="w-full mb-2 p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-nailora-pink-accent"
                                    />
                                    <textarea 
                                        placeholder="Penjelasan detail..."
                                        value={step.description}
                                        onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                        rows={2}
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-nailora-pink-accent"
                                    />
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={handleAddStep}
                            className="w-full mt-3 py-2 border-2 border-dashed border-nailora-pink-accent text-nailora-pink-accent rounded-lg text-sm font-bold hover:bg-pink-50"
                        >
                            + Tambah Langkah
                        </button>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Catatan Penting (Opsional)</label>
                        <textarea 
                            value={notes} 
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Tulis catatan per baris..." 
                            rows={3}
                            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none text-sm" 
                        />
                    </div>
                </div>

                <div className="flex-shrink-0 flex gap-3 p-4 border-t border-gray-100 bg-gray-50">
                    <button onClick={onClose} className="w-1/3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">Batal</button>
                    <button onClick={handleSubmit} className="w-2/3 bg-nailora-pink-accent text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-opacity-90 disabled:bg-opacity-50" disabled={!title || !coverImage}>Terbitkan</button>
                </div>
            </div>
        </div>
    );
};

export default UploadTutorialModal;
