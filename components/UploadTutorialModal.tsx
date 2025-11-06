import React, { useState, useRef } from 'react';
import { Tutorial, User } from '../types';
import { UploadIcon } from './icons';

interface UploadTutorialModalProps {
    user: User;
    onClose: () => void;
    onAddTutorial: (newTutorial: Tutorial) => void;
}

const UploadTutorialModal: React.FC<UploadTutorialModalProps> = ({ user, onClose, onAddTutorial }) => {
    const [title, setTitle] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setVideoPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = () => {
        if (!title || !videoFile || !videoPreview) {
            alert('Judul dan video tidak boleh kosong.');
            return;
        }

        const newTutorial: Tutorial = {
            id: Date.now(),
            title,
            videoUrl: videoPreview,
            imgSrc: 'https://picsum.photos/seed/newupload/300/200', // Placeholder thumbnail
            duration: 'N/A', // Would need logic to get video duration
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-nailora-purple text-center mb-4">Unggah Tutorial Baru</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-nailora-purple">Judul Tutorial</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Contoh: DIY French Manicure di Rumah" 
                            className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nailora-pink-accent focus:outline-none" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-nailora-purple">File Video</label>
                        <input type="file" accept="video/*" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
                        <button 
                            onClick={() => fileInputRef.current?.click()} 
                            className="w-full mt-1 p-3 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-nailora-gray hover:border-nailora-pink-accent hover:text-nailora-pink-accent transition-colors"
                        >
                            <UploadIcon className="w-8 h-8 mb-1"/>
                            <span className="text-sm font-semibold">{videoFile ? videoFile.name : 'Pilih Video'}</span>
                        </button>
                    </div>
                    {videoPreview && <video src={videoPreview} controls className="w-full rounded-lg max-h-40 object-cover"></video>}
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="w-full bg-gray-200 text-nailora-gray font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                    <button onClick={handleSubmit} className="w-full bg-nailora-pink-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-opacity-90 disabled:bg-opacity-50" disabled={!title || !videoFile}>Unggah</button>
                </div>
            </div>
        </div>
    );
};

export default UploadTutorialModal;