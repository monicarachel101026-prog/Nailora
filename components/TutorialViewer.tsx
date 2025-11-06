import React, { useState } from 'react';
import { Tutorial, Comment, User } from '../types';
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from './icons';

interface TutorialViewerProps {
    user: User;
    tutorial: Tutorial;
    onClose: () => void;
    onUpdateTutorial: (updatedTutorial: Tutorial) => void;
}

const TutorialViewer: React.FC<TutorialViewerProps> = ({ user, tutorial, onClose, onUpdateTutorial }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleLike = () => {
        const newLikeCount = isLiked ? tutorial.likes - 1 : tutorial.likes + 1;
        setIsLiked(!isLiked);
        onUpdateTutorial({ ...tutorial, likes: newLikeCount });
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            userName: user.name,
            userAvatar: user.avatar,
            text: commentText,
            timestamp: 'Baru saja',
        };

        onUpdateTutorial({ ...tutorial, comments: [...tutorial.comments, newComment] });
        setCommentText('');
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[90vh] mx-4 flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="relative">
                    <video className="w-full aspect-video bg-black" src={tutorial.videoUrl} controls autoPlay playsInline />
                    <button onClick={onClose} className="absolute top-2 right-2 bg-black/30 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-black/50 transition-colors">&times;</button>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-lg text-nailora-purple">{tutorial.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <img src={tutorial.uploaderAvatar} alt={tutorial.uploaderName} className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-semibold text-nailora-gray">{tutorial.uploaderName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-nailora-gray">
                                <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                                <span className="text-sm font-semibold">{tutorial.comments.length}</span>
                            </div>
                             <button onClick={handleLike} className="flex items-center gap-1.5 text-nailora-gray">
                                <HeartIcon className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
                                <span className="text-sm font-semibold">{tutorial.likes}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {tutorial.comments.length > 0 ? (
                        tutorial.comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3">
                                <img src={comment.userAvatar} alt={comment.userName} className="w-8 h-8 rounded-full" />
                                <div className="bg-gray-100 rounded-lg p-2 flex-grow">
                                    <p className="font-semibold text-nailora-purple text-sm">{comment.userName}</p>
                                    <p className="text-sm text-nailora-gray">{comment.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                         <div className="text-center py-8 text-nailora-gray">
                             <p>Belum ada komentar.</p>
                             <p className="text-sm">Jadilah yang pertama berkomentar!</p>
                         </div>
                    )}
                </div>

                <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                            placeholder="Tambahkan komentar..." 
                            className="w-full bg-gray-100 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nailora-pink-accent"
                        />
                        <button onClick={handleAddComment} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-nailora-pink-accent hover:bg-pink-100 rounded-full disabled:text-gray-400" disabled={!commentText.trim()}>
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialViewer;