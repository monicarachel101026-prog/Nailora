
import React, { useState } from 'react';
import { Tutorial, User } from '../types';
import { HeartIcon, ShareIcon, CheckCircleIcon } from './icons';

interface TutorialViewerProps {
    user: User;
    tutorial: Tutorial;
    onClose: () => void;
    onUpdateTutorial: (updatedTutorial: Tutorial) => void;
}

const TutorialViewer: React.FC<TutorialViewerProps> = ({ user, tutorial, onClose, onUpdateTutorial }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        const newLikeCount = isLiked ? tutorial.likes - 1 : tutorial.likes + 1;
        setIsLiked(!isLiked);
        onUpdateTutorial({ ...tutorial, likes: newLikeCount });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center animate-fade-in" onClick={onClose}>
            <div 
                className="bg-white w-full max-w-md h-[90vh] sm:h-[85vh] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center sticky top-0 z-10">
                    <div>
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${
                            tutorial.difficulty === 'Pemula' ? 'bg-green-100 text-green-700' : 
                            tutorial.difficulty === 'Menengah' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                        }`}>
                            {tutorial.category}
                        </span>
                        <p className="text-xs text-nailora-gray">Oleh {tutorial.uploaderName}</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 font-bold flex items-center justify-center">
                        &times;
                    </button>
                </div>

                {/* Content Scrollable Area */}
                <div className="flex-grow overflow-y-auto p-6">
                    {/* Title & Desc */}
                    <h1 className="text-2xl font-bold text-nailora-purple font-quicksand mb-2">{tutorial.title}</h1>
                    <p className="text-sm text-nailora-gray italic mb-6 border-l-4 border-nailora-pink-accent pl-3 bg-gray-50 py-2 rounded-r-lg">
                        "{tutorial.description}"
                    </p>

                    {/* Tools List */}
                    {tutorial.tools && tutorial.tools.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-nailora-purple uppercase tracking-wider mb-3">🛠️ Alat yang dibutuhkan</h3>
                            <div className="flex flex-wrap gap-2">
                                {tutorial.tools.map((tool, idx) => (
                                    <span key={idx} className="bg-pink-50 text-nailora-purple text-xs font-medium px-3 py-1.5 rounded-lg border border-pink-100">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Steps */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-nailora-purple uppercase tracking-wider mb-4">📝 Langkah-Langkah</h3>
                        <div className="space-y-6">
                            {tutorial.steps.map((step, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    {/* Timeline Line */}
                                    {idx !== tutorial.steps.length - 1 && (
                                        <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-gray-200"></div>
                                    )}
                                    
                                    {/* Number Badge */}
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nailora-pink-accent text-white flex items-center justify-center font-bold text-sm shadow-md z-10">
                                        {idx + 1}
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div>
                                        <h4 className="font-bold text-nailora-purple text-base mb-1">{step.title}</h4>
                                        <p className="text-sm text-nailora-gray leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Important Notes */}
                    {tutorial.notes && tutorial.notes.length > 0 && (
                         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                            <h3 className="text-sm font-bold text-yellow-800 flex items-center gap-2 mb-2">
                                <span>⚠️</span> Catatan Penting
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {tutorial.notes.map((note, idx) => (
                                    <li key={idx} className="text-sm text-yellow-900/80">{note}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center gap-3">
                    <button 
                        onClick={handleLike}
                        className={`p-3 rounded-xl border flex items-center gap-2 transition-colors ${isLiked ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-nailora-gray hover:bg-gray-50'}`}
                    >
                        <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs font-bold">{tutorial.likes}</span>
                    </button>
                    <button 
                        onClick={() => alert("Disimpan ke Favorit!")}
                        className="flex-grow bg-nailora-pink-accent text-white font-bold py-3 rounded-xl shadow-lg hover:bg-opacity-90 flex items-center justify-center gap-2 text-sm"
                    >
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Tandai Selesai</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialViewer;
