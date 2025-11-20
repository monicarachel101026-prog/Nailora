
import React, { useState, useRef, useEffect } from 'react';
import { Page, User } from '../types';
import { ChevronLeftIcon, SparklesIcon, PaperAirplaneIcon } from '../components/icons';

interface AIStylistScreenProps {
  user: User;
  setCurrentPage: (page: Page) => void;
}

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    image?: string;
};

const AIStylistScreen: React.FC<AIStylistScreenProps> = ({ user, setCurrentPage }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
      { id: 1, text: `Halo ${user.name}! Saya AI Nail Stylist pribadi Anda. ✨ Ada acara spesial apa atau gaya apa yang ingin Anda coba hari ini?`, sender: 'ai' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
      if (!input.trim()) return;

      const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      // Simulate AI Logic
      setTimeout(() => {
          let aiResponseText = '';
          let aiResponseImage = '';

          const lowerInput = userMsg.text.toLowerCase();
          
          if (lowerInput.includes('pesta') || lowerInput.includes('party') || lowerInput.includes('mewah')) {
              aiResponseText = "Untuk acara pesta, saya merekomendasikan sesuatu yang berkilau dan elegan. Bagaimana dengan 'Glitter Bomb' atau 'Velvet Nails'? Ini akan membuat Anda menjadi pusat perhatian! ✨";
              aiResponseImage = "https://i.ibb.co/F8q1f60/glitter-bomb.png";
          } else if (lowerInput.includes('kerja') || lowerInput.includes('kantor') || lowerInput.includes('formal')) {
              aiResponseText = "Untuk suasana profesional, 'Nude Glazed Donut' atau 'Micro French Tips' adalah pilihan sempurna. Bersih, rapi, namun tetap stylish.";
              aiResponseImage = "https://i.ibb.co/7g7Z0V8/new-glazed-donut.jpg";
          } else if (lowerInput.includes('liburan') || lowerInput.includes('pantai') || lowerInput.includes('summer')) {
              aiResponseText = "Liburan musim panas? Coba warna-warna cerah! 'Aura Nails' dengan warna oranye atau pink akan sangat cocok dengan suasana pantai.";
              aiResponseImage = "https://i.ibb.co/dGt0Mwg/aura.png";
          } else {
              aiResponseText = "Pilihan yang menarik! Saya rasa gaya 'Marble Nails' atau 'Coquette' akan sangat cocok dengan mood tersebut. Terlihat artistik dan unik.";
              aiResponseImage = "https://i.ibb.co/MnvkS1z/coquette.png";
          }

          const aiMsg: Message = { id: Date.now() + 1, text: aiResponseText, sender: 'ai', image: aiResponseImage };
          setMessages(prev => [...prev, aiMsg]);
          setIsTyping(false);
      }, 2000);
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white shadow-lg z-10 flex items-center gap-2">
        <button onClick={() => setCurrentPage(Page.Dashboard)} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
             <div className="bg-white/20 p-1.5 rounded-full">
                <SparklesIcon className="w-5 h-5" />
             </div>
             <div>
                 <h2 className="font-bold text-lg leading-none">AI Stylist</h2>
                 <p className="text-[10px] opacity-80">Powered by Nailora Intelligence</p>
             </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user' ? 'bg-nailora-pink-accent text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                      <p className="text-sm">{msg.text}</p>
                      {msg.image && (
                          <div className="mt-2 rounded-lg overflow-hidden border border-gray-100">
                              <img src={msg.image} alt="Recommendation" className="w-full h-24 object-cover" />
                              <div className="bg-gray-50 p-1 text-center">
                                  <p className="text-[10px] text-nailora-purple font-bold">Rekomendasi Gaya</p>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          ))}
          {isTyping && (
              <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Contoh: Aku mau ke pesta pernikahan tema garden party..."
                className="flex-grow bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-full shadow-lg disabled:opacity-50 hover:scale-105 transition-transform"
              >
                  <PaperAirplaneIcon className="w-5 h-5 transform rotate-90 relative left-[-1px]" />
              </button>
          </div>
      </div>
    </div>
  );
};

export default AIStylistScreen;
