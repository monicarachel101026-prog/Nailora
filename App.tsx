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
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [artistToBook, setArtistToBook] = useState<Artist | null>(null);

  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = () => {
      try {
        // Prioritize localStorage for persistent sessions
        let userJson = localStorage.getItem('nailora_currentUser');
        if (!userJson) {
          // Fallback to sessionStorage for non-persistent sessions
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

    const timer = setTimeout(checkAuth, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (currentPage === Page.Splash) {
        const splashTimer = setTimeout(() => {
          if (currentUser) {
            if (currentUser.profileComplete) {
              navigate(Page.Dashboard);
            } else {
              navigate(Page.CompleteProfile);
            }
          } else {
            navigate(Page.Login);
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
    // Automatically log in and remember the new user
    localStorage.setItem('nailora_currentUser', JSON.stringify(userWithId));
    setCurrentUser(userWithId);
    navigate(Page.CompleteProfile);
    return { success: true, message: 'Registrasi berhasil!' };
  };

  const handleLogin = (credentials: Pick<User, 'email' | 'password'>, rememberMe: boolean): { success: boolean, message: string } => {
    const usersJson = localStorage.getItem('nailora_users');
    const users = usersJson ? JSON.parse(usersJson) : [];

    const user = users.find((u: User) => u.email === credentials.email);
    if (!user || user.password !== credentials.password) {
      return { success: false, message: 'Email atau password salah.' };
    }
    
    // Use localStorage for "Remember Me", otherwise use sessionStorage
    if (rememberMe) {
      localStorage.setItem('nailora_currentUser', JSON.stringify(user));
    } else {
      sessionStorage.setItem('nailora_currentUser', JSON.stringify(user));
    }
    
    setCurrentUser(user);
    
    if (user.profileComplete) {
      navigate(Page.Dashboard);
    } else {
      navigate(Page.CompleteProfile);
    }
    return { success: true, message: 'Login berhasil!' };
  };


  const handleProfileComplete = (updatedUser: Pick<User, 'name'>) => {
    if (!currentUser) return;

    const updatedCurrentUser = { ...currentUser, name: updatedUser.name, profileComplete: true };
    setCurrentUser(updatedCurrentUser);
    
    // Update the correct storage
    if (localStorage.getItem('nailora_currentUser')) {
      localStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    } else if (sessionStorage.getItem('nailora_currentUser')) {
      sessionStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    }

    // Update user in the main user list
    const usersJson = localStorage.getItem('nailora_users');
    let users = usersJson ? JSON.parse(usersJson) : [];
    users = users.map((u: User) => u.id === currentUser.id ? updatedCurrentUser : u);
    localStorage.setItem('nailora_users', JSON.stringify(users));

    navigate(Page.Dashboard);
  };

  const handleUpdateProfile = (updatedData: Pick<User, 'name' | 'avatar'>) => {
    if (!currentUser) return;

    const updatedCurrentUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedCurrentUser);

    // Update the correct storage
    if (localStorage.getItem('nailora_currentUser')) {
      localStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    } else if (sessionStorage.getItem('nailora_currentUser')) {
      sessionStorage.setItem('nailora_currentUser', JSON.stringify(updatedCurrentUser));
    }

    // Update user in the main user list as well
    const usersJson = localStorage.getItem('nailora_users');
    let users = usersJson ? JSON.parse(usersJson) : [];
    users = users.map((u: User) => u.id === currentUser.id ? updatedCurrentUser : u);
    localStorage.setItem('nailora_users', JSON.stringify(users));

    navigate(Page.Profile);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('nailora_currentUser');
    sessionStorage.removeItem('nailora_currentUser'); // Also clear session storage
    setCurrentUser(null);
    navigate(Page.Login);
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

  const navigate = (page: Page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 250); // Animation duration
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

    // User is logged in, but profile is not complete
    if (!currentUser.profileComplete) {
        return <CompleteProfileScreen user={currentUser} onComplete={handleProfileComplete} onBack={handleLogout} />;
    }

    // User is logged in and profile is complete
    switch (currentPage) {
      case Page.Dashboard:
        return <DashboardScreen user={currentUser} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} onSearch={handleSearch} />;
      case Page.Catalog:
        return <CatalogScreen user={currentUser} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} />;
      case Page.Booking:
        return <BookingScreen setCurrentPage={navigate} setBookingDetails={setBookingDetails} initialArtist={artistToBook} onClearInitialArtist={() => setArtistToBook(null)} />;
      case Page.Profile:
        return <ProfileScreen user={currentUser} setCurrentPage={navigate} onLogout={handleLogout} />;
      case Page.EditProfile:
        return <EditProfileScreen user={currentUser} onUpdateProfile={handleUpdateProfile} onBack={() => navigate(Page.Profile)} />;
      case Page.Premium:
        return <PremiumScreen setCurrentPage={navigate} />;
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
            return <CatalogScreen user={currentUser} setCurrentPage={navigate} onSelectDesign={handleSelectDesign} />;
        }
        return <DesignDetailScreen design={selectedDesign} setCurrentPage={navigate} />;
      case Page.Payment:
        if (!bookingDetails) {
            return <BookingScreen setCurrentPage={navigate} setBookingDetails={setBookingDetails} onClearInitialArtist={() => setArtistToBook(null)} />;
        }
        return <PaymentScreen setCurrentPage={navigate} bookingDetails={bookingDetails} />;
      default:
        // Fallback for any other page when profile is complete is Dashboard
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