import React from 'react';
import { Page } from '../types';
import { ChevronLeftIcon } from '../components/icons';
import { NailoraLogo } from '../components/icons';

interface AboutScreenProps {
  setCurrentPage: (page: Page) => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-gray-50 min-h-full pb-12">
       <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 border-b border-gray-100 flex items-center">
        <button onClick={() => setCurrentPage(Page.Profile)} className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-nailora-purple"/>
        </button>
        <h2 className="text-xl font-bold text-center text-nailora-purple flex-grow -ml-8">Tentang Nailora</h2>
      </div>

      <div className="p-6 text-center">
        <NailoraLogo className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-nailora-pink-accent font-quicksand">Nailora</h1>
        <p className="text-nailora-gray mt-2">Inspirasi & Booking Nail Art dalam Genggaman Anda.</p>
      </div>

      <div className="px-6 space-y-6">
        <div className="bg-white p-5 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-nailora-purple mb-2">Visi Kami 🚀</h3>
            <p className="text-sm text-nailora-gray">Menjadi platform nail art terdepan di Asia Tenggara yang memberdayakan para nail artist dan memudahkan jutaan orang untuk mengekspresikan diri melalui seni kuku yang indah.</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-nailora-purple mb-2">Misi Kami 🎯</h3>
            <ul className="list-disc list-inside text-sm text-nailora-gray space-y-1">
                <li>Menyediakan katalog desain nail art terlengkap dan terkini.</li>
                <li>Menghubungkan pengguna dengan nail artist profesional terdekat.</li>
                <li>Membangun komunitas yang positif dan inspiratif bagi pecinta nail art.</li>
                <li>Memberikan pengalaman booking yang mudah, aman, dan terpercaya.</li>
            </ul>
        </div>
         <div className="bg-white p-5 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-nailora-purple mb-2">Tim Kami 👩‍💻👨‍🎨</h3>
            <p className="text-sm text-nailora-gray">Nailora dibangun oleh tim yang terdiri dari para pengembang, desainer, dan tentu saja, para pecinta nail art. Kami berdedikasi untuk menciptakan aplikasi yang tidak hanya fungsional tetapi juga indah dan menyenangkan untuk digunakan.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
