import React from 'react';
import { Tutorial } from '../types';

interface TextTutorialViewerProps {
    tutorial: Tutorial;
    onClose: () => void;
}

const TextTutorialViewer: React.FC<TextTutorialViewerProps> = ({ tutorial, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[90vh] mx-4 flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="relative p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-center text-nailora-purple pr-8 pl-8">{tutorial.title}</h2>
                    <button onClick={onClose} className="absolute top-3 right-3 bg-gray-100 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition-colors">&times;</button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 space-y-6 text-nailora-gray">
                    {tutorial.content}
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <img src={tutorial.uploaderAvatar} alt={tutorial.uploaderName} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-nailora-purple text-sm">Ditulis oleh</p>
                            <p className="text-sm text-nailora-gray">{tutorial.uploaderName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextTutorialViewer;
