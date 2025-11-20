import React, { useState, useRef } from 'react';
import { Page, User } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import { HeartIcon, UploadIcon, TrashIcon } from '../components/icons';

interface CommunityScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
}

type Post = {
    id: number;
    userAvatar: string;
    userName: string;
    time: string;
    caption: string;
    image: string;
    likes: number;
};

const initialPosts: Post[] = [
    { id: 1, userAvatar: 'https://picsum.photos/seed/user1/100/100', userName: 'Alya Putri', time: '2 jam lalu', caption: 'Suka banget sama desain kuku sakura ini! 🌸', image: 'https://picsum.photos/seed/cat3/400/500', likes: 128 },
    { id: 2, userAvatar: 'https://picsum.photos/seed/user2/100/100', userName: 'Jane Doe', time: '5 jam lalu', caption: 'Glitter gold untuk party besok! ✨', image: 'https://picsum.photos/seed/glitter/400/500', likes: 97 },
];

interface CommunityPostProps {
    post: Post;
    currentUser: User;
    onDelete: (id: number) => void;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post, currentUser, onDelete }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const isOwner = post.userName === currentUser.name;

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(true);
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(post.id);
    };

    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmDelete(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
            <div className="p-4 flex items-center gap-3">
                <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-bold text-nailora-purple">{post.userName}</p>
                    <p className="text-xs text-nailora-gray">{post.time}</p>
                </div>
            </div>
            {post.image && <img src={post.image} alt="Nail art design" className="w-full object-cover" />}
            <div className="p-4 relative">
                <p className="text-sm text-nailora-purple mb-3">{post.caption}</p>
                <div className="flex items-center gap-2 text-nailora-gray">
                    <HeartIcon className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-semibold">{post.likes} suka</span>
                </div>
                 {isOwner && (
                     <div className="absolute bottom-4 right-4">
                        {showConfirmDelete ? (
                             <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-sm rounded-lg shadow-md z-10">
                                 <button
                                     onClick={handleCancelDelete}
                                     className="bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                                 >
                                     Batal
                                 </button>
                                 <button
                                     onClick={handleConfirmDelete}
                                     className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                                 >
                                     Hapus
                                 </button>
                             </div>
                        ) : (
                             <button
                                 onClick={handleDeleteClick}
                                 className="bg-red-500/50 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
                                 aria-label="Hapus Postingan"
                             >
                                 <TrashIcon className="w-4 h-4"/>
                             </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


const CommunityScreen: React.FC<CommunityScreenProps> = ({ user, setCurrentPage }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('nailora_community_posts');
    try {
        if(savedPosts) {
            const parsed = JSON.parse(savedPosts);
            if(Array.isArray(parsed)) return parsed;
        }
    } catch(e) { console.error("Failed to load community posts", e); }
    return initialPosts;
  });
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newPostCaption, setNewPostCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!newPostImage && !newPostCaption) return;
    const newPost: Post = {
        id: Date.now(),
        userAvatar: user.avatar,
        userName: user.name,
        time: 'Baru saja',
        caption: newPostCaption,
        image: newPostImage || '',
        likes: 0,
    };
    
    const updatedPosts = [newPost, ...posts];
    
    try {
        localStorage.setItem('nailora_community_posts', JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
        setNewPostImage(null);
        setNewPostCaption('');
    } catch (e) {
        alert("Gagal mengunggah postingan: Penyimpanan browser penuh. Mohon gunakan gambar dengan resolusi lebih kecil.");
        console.error("Storage quota exceeded", e);
    }
  };
  
  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    try {
        localStorage.setItem('nailora_community_posts', JSON.stringify(updatedPosts));
    } catch (e) {
        console.error("Failed to update storage after delete", e);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-full pb-24">
      <div className="p-4 sticky top-0 bg-gray-50 z-10 border-b border-gray-100">
        <h2 className="text-xl font-bold text-center text-nailora-purple">Komunitas</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-4">
            <textarea
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
                placeholder="Bagikan inspirasi nail art Anda..."
                className="w-full border-gray-200 border rounded-lg p-2 text-sm focus:ring-nailora-pink-accent focus:outline-none"
                rows={2}
            />
            {newPostImage && (
                <div className="mt-2 relative">
                    <img src={newPostImage} alt="Preview" className="rounded-lg max-h-48 w-auto" />
                    <button onClick={() => setNewPostImage(null)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✕</button>
                </div>
            )}
            <div className="flex justify-between items-center mt-3">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-sm font-semibold text-nailora-purple p-2 rounded-lg hover:bg-gray-100">
                    <UploadIcon className="w-5 h-5"/>
                    <span>Unggah Foto</span>
                </button>
                <button onClick={handlePost} className="bg-nailora-pink-accent text-white font-bold px-4 py-2 text-sm rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50" disabled={!newPostCaption && !newPostImage}>
                    Kirim
                </button>
            </div>
        </div>

        {/* Posts Feed */}
        {posts.map(post => <CommunityPost key={post.id} post={post} currentUser={user} onDelete={handleDeletePost} />)}
      </div>

      <BottomNavBar activePage={Page.Community} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default CommunityScreen;