import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-black rounded-lg shadow-2xl w-full max-w-lg mx-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the video player itself
      >
        <video
          className="w-full aspect-video"
          src={videoUrl}
          controls
          autoPlay
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white/20 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-white/40 transition-colors"
          aria-label="Close video player"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
