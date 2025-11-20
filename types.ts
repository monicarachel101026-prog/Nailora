
import React from 'react';

export enum Page {
  Splash,
  Login,
  Register,
  CompleteProfile,
  Dashboard,
  Profile,
  EditProfile,
  Booking,
  Catalog,
  Community,
  Payment,
  DesignDetail,
  About,
  BookingHistory,
  PartnerRegistration,
  Search,
  Premium,
  AIStylist,
  SubscriptionCheckout,
  SubscriptionManagement,
  PremiumHelpCenter,
  GiftPremium,
  AdminDashboard,
}

export type SubscriptionTier = 'Gold' | 'Platinum' | 'Diamond';

export type SubscriptionDetails = {
    startDate: string;
    nextBillingDate: string;
    plan: 'Monthly' | 'Yearly' | 'Trial';
    status: 'Active' | 'Canceled' | 'Expired';
    method: string;
    autoRenew: boolean;
    tier: SubscriptionTier;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string; 
  profileComplete: boolean;
  avatar: string;
  isPremium?: boolean;
  subscription?: SubscriptionDetails;
};

export type Artist = {
  initial: string;
  name: string;
  rating: number;
  reviews: number;
  services: string[];
  salon: string;
  distance: number;
  price: string;
  available: boolean;
};

export type BookingDetails = {
    artist: {
        name: string;
        price: string;
    };
    service: string;
    date: string;
    time: string;
};

export type Design = {
    imgSrc: string;
    title: string;
    dominantColor: string; 
    style: string; 
    length: string; 
    tags: string[]; 
    likes?: number;
    artist?: string;
    description?: string;
    price?: string; 
    isPremium?: boolean;
    isArchived?: boolean;
};

export type Comment = {
  id: number;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
};

export type TutorialCategory = 'Basic Step' | 'Tools & Preparation' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Nail Care Tips' | 'Do & Don\'ts' | 'Troubleshooting';

export type DifficultyLevel = 'Pemula' | 'Menengah' | 'Pro';

export type TutorialStep = {
    order: number;
    title: string; 
    description: string; 
};

export type Tutorial = {
    id: number;
    title: string;
    description: string; 
    category: TutorialCategory;
    difficulty: DifficultyLevel;
    duration: string; 
    tools?: string[]; 
    imgSrc: string; 
    steps: TutorialStep[]; 
    notes?: string[]; 
    uploaderName: string;
    uploaderAvatar: string;
    likes: number;
    comments: Comment[];
    content?: string;
    isPremium?: boolean; 
};
