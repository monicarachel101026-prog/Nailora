
import React from 'react';
import { Page } from '../types';
import { HomeIcon, CatalogIcon, BookingIcon, CommunityIcon, ProfileIcon } from './icons';

interface BottomNavBarProps {
  activePage: Page;
  setCurrentPage: (page: Page) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePage, setCurrentPage }) => {
  const navItems = [
    { page: Page.Dashboard, icon: HomeIcon, label: 'Beranda' },
    { page: Page.Catalog, icon: CatalogIcon, label: 'Katalog' },
    { page: Page.Booking, icon: BookingIcon, label: 'Booking' },
    { page: Page.Community, icon: CommunityIcon, label: 'Komunitas' },
    { page: Page.Profile, icon: ProfileIcon, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-2xl px-4 pt-2 pb-4 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = activePage === item.page;
        return (
          <button
            key={item.label}
            onClick={() => setCurrentPage(item.page)}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-nailora-pink-accent' : 'text-nailora-gray'}`}
          >
            <item.icon className="w-6 h-6" />
            <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavBar;