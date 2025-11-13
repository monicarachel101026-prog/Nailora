
import React, { useState, useEffect } from 'react';
import { Page, BookingDetails, Design, User, Artist } from './types';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import CatalogScreen from './screens/CatalogScreen';
import PremiumScreen from './screens/PremiumScreen';
import CommunityScreen from './screens/CommunityScreen';
import PaymentScreen from './screens/PaymentScreen';
import DesignDetailScreen from './screens/DesignDetailScreen';
import AboutScreen from './screens/AboutScreen';
import LoadingScreen from './screens/LoadingScreen';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import CompleteProfileScreen from './screens/CompleteProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import PartnerRegistrationScreen from './screens/PartnerRegistrationScreen';
import SearchScreen from './screens/SearchScreen';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Splash);
  const [history, setHistory] = useState<Page[]>([Page.Splash]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [artistToBook, setArtistToBook] = useState<Artist | null>(null);
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string | null>(null);


  const navigate = (page: Page, options?: { history: 'push' | 'reset' }) => {
    const { history: historyAction = 'push' } = options || {};

    if (page === currentPage && historyAction !== 'reset') return;

    if (page === Page.Catalog && currentPage !== Page.DesignDetail) {
      setSelectedCatalogCategory(null);
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      if (historyAction === 'reset') {
        setHistory([page]);
      } else { // push
        setHistory(prev => [...prev, page]);
      }
      setIsTransitioning(false);
    }, 250);
  };

  const goBack = () => {
    if (history.length <= 1) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current page
    const prevPage = newHistory[newHistory.length - 1];

    setIsTransitioning(true);
    setTimeout(() => {
        setCurrentPage(prevPage);
        setHistory(newHistory);
        setIsTransitioning(false);
    }, 250);
  };

  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = () => {
      try {
        let userJson = localStorage.getItem('nailora_currentUser');
        if (!userJson) {
          userJson = sessionStorage.getItem('nailora_currentUser');
        }

        if (userJson) {
          const user = JSON.parse(userJson);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Failed to parse user from storage", error);
        localStorage.removeItem('nailora_currentUser');
        sessionStorage.removeItem('nailora_currentUser');
      }
      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (currentPage === Page.Splash) {
        const splashTimer = setTimeout(() => {
          if (currentUser) {
            if (currentUser.profileComplete) {
              navigate(Page.Dashboard, { history: 'reset' });
            } else {
              navigate(Page.CompleteProfile, { history: 'reset' });
            }
          } else {
            navigate(Page.Login, { history: 'reset' });
          }
        }, 3000);
        return () => clearTimeout(splashTimer);
      }
    }
  }, [isLoading, currentUser, currentPage]);

  const handleRegister = (newUser: Omit<User, 'id' | 'profileComplete' | 'avatar'>): { success: boolean, message: string } => {
    const usersJson = localStorage.getItem('nailora_users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    if (users.find((u: User) => u.email === newUser.email)) {
      return { success: false, message: 'Email sudah terdaftar.' };
    }
    
    const userWithId: User = { 
      ...newUser, 
      id: Date.now(), 
      profileComplete: false,
      avatar: `https://picsum.photos/seed/${newUser.name}/100/100`
    };
    
    users.push(userWithId);
    localStorage.setItem('nailora_users', JSON.stringify(users));
    localStorage.setItem('nailora_currentUser', JSON.stringify(userWithId));
    setCurrentUser(userWithId);
    navigate(Page.CompleteProfile, { history: 'reset' });
    return { success: true, message: 'Registrasi berhasil!' };
  };

  const handleLogin = (credentials: Pick<User, 'email' | 'password'>, rememberMe: boolean): { success: boolean, message: string } => {
    const usersJson = localStorage.getItem('nailora_users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    const user = users.find((u: User) => u.email === credentials.email);
    if (!user || user.password !== credentials.password) {
      return { success: false, message: 'Email atau password salah.' };
    }
    
    if (rememberMe) {
      localStorage.setItem('nailora_currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('nailora_currentUser', JSON.stringify(user));
    }
    
    setCurrentUser(user);
    
    if (user.profileComplete) {
      navigate(Page.Dashboard, { history: 'reset' });
    } else {
      navigate(Page.CompleteProfile, { history: 'reset' });
    }
    return { success: true, message: 'Login berhasil!' };
  };

  const handleProfileComplete = (updatedUser: Pick<User, 'name'>) => {
    if (!currentUser) return;

    const updatedCurrentUser = { ...currentUser, name: updatedUser.name, profileComplete: true };
    setCurrentUser(updatedCurrentUser);
    
    if (localStorage.getItem('nailora_currentUser')) {
      localStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    } else if (sessionStorage.getItem('nailora_currentUser')) {
      sessionStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    }

    const usersJson = localStorage.getItem('nailora_users');
    let users = usersJson ? JSON.parse(usersJson) : [];
    users = users.map((u: User) => u.id === currentUser.id ? updatedCurrentUser : u);
    localStorage.setItem('nailora_users', JSON.stringify(users));

    navigate(Page.Dashboard, { history: 'reset' });
  };

  const handleUpdateProfile = (updatedData: Pick<User, 'name' | 'avatar'>) => {
    if (!currentUser) return;

    const updatedCurrentUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedCurrentUser);

    if (localStorage.getItem('nailora_currentUser')) {
      localStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    } else if (sessionStorage.getItem('nailora_currentUser')) {
      sessionStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    }

    const usersJson = localStorage.getItem('nailora_users');
    let users = usersJson ? JSON.parse(usersJson) : [];
    users = users.map((u: User) => u.id === currentUser.id ? updatedCurrentUser : u);
    localStorage.setItem('nailora_users', JSON.stringify(users));

    goBack();
  };
  
  const handleLogout = () => {
    localStorage.removeItem('nailora_currentUser');
    sessionStorage.removeItem('nailora_currentUser');
    setCurrentUser(null);
    navigate(Page.Login, { history: 'reset' });
  };

  const handleSelectDesign = (design: Design) => {
    setSelectedDesign(design);
    navigate(Page.DesignDetail);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(Page.Search);
  };

  const handleSelectArtist = (artist: Artist) => {
    setArtistToBook(artist);
    navigate(Page.Booking);
  };

  const renderPage = () => {
    if (isLoading) {
        return <LoadingScreen />;
    }
    
    if (!currentUser) {
        switch (currentPage) {
            case Page.Splash:
                return <SplashScreen />;
            case Page.Register:
                return <RegisterScreen onRegister={handleRegister} onGoToLogin={() => navigate(Page.Login)} />;
            case Page.Login:
            default:
                return <LoginScreen onLogin={handleLogin} onGoToRegister={() => navigate(Page.Register)} />;
        }
    }

    if (!currentUser.profileComplete) {
        return <CompleteProfileScreen user={currentUser} onComplete={handleProfileComplete} onBack={handleLogout} />;
    }

    switch (currentPage) {
      case Page.Dashboard:
        return <DashboardScreen user={currentUser} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} onSearch={handleSearch} />;
      case Page.Catalog:
        return <CatalogScreen user={currentUser} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} selectedCategory={selectedCatalogCategory} setSelectedCategory={setSelectedCatalogCategory} />;
      case Page.Booking:
        return <BookingScreen setCurrentPage={navigate} setBookingDetails={setBookingDetails} initialArtist={artistToBook} onClearInitialArtist={() => setArtistToBook(null)} />;
      case Page.Profile:
        return <ProfileScreen user={currentUser} setCurrentPage={navigate} onLogout={handleLogout} />;
      case Page.EditProfile:
        return <EditProfileScreen user={currentUser} onUpdateProfile={handleUpdateProfile} onBack={goBack} />;
      case Page.Premium:
        return <PremiumScreen setCurrentPage={navigate} onBack={goBack} />;
      case Page.Community:
        return <CommunityScreen user={currentUser} setCurrentPage={navigate} />;
      case Page.About:
        return <AboutScreen setCurrentPage={navigate} />;
      case Page.BookingHistory:
        return <BookingHistoryScreen setCurrentPage={navigate} />;
      case Page.PartnerRegistration:
        return <PartnerRegistrationScreen setCurrentPage={navigate} />;
       case Page.Search:
        return <SearchScreen query={searchQuery} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} onSelectArtist={handleSelectArtist} onBack={() => navigate(Page.Dashboard)} />;
      case Page.DesignDetail:
        if (!selectedDesign) {
            return <CatalogScreen user={currentUser} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} selectedCategory={selectedCatalogCategory} setSelectedCategory={setSelectedCatalogCategory} />;
        }
        return <DesignDetailScreen design={selectedDesign} setCurrentPage={navigate} />;
      case Page.Payment:
        if (!bookingDetails) {
            return <BookingScreen setCurrentPage={navigate} setBookingDetails={setBookingDetails} onClearInitialArtist={() => setArtistToBook(null)} />;
        }
        return <PaymentScreen setCurrentPage={navigate} bookingDetails={bookingDetails} />;
      default:
        return <DashboardScreen user={currentUser} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} onSearch={handleSearch} />;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto h-screen font-sans bg-transparent shadow-2xl overflow-hidden md:max-w-md lg:max-w-lg relative">
      <div className={`h-full w-full overflow-y-auto transition-opacity duration-250 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
