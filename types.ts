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
  Premium,
  Payment,
  DesignDetail,
  About,
  BookingHistory,
  PartnerRegistration,
  Search,
}

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string; // Password should not be passed around, but needed for creation
  profileComplete: boolean;
  avatar: string;
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
    category: string;
    isPremium?: boolean;
    likes?: number;
    artist?: string;
    description?: string;
};

export type Artist = {
    initial: string, name: string, rating: number, reviews: number, services: string[], salon: string, distance: number, price: string, available: boolean
};

// FIX: Add definitions for Comment and Tutorial types used in community features to resolve import errors.
export type Comment = {
  id: number;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
};

export type Tutorial = {
  id: number;
  imgSrc: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content?: React.ReactNode;
  uploaderName: string;
  uploaderAvatar: string;
  likes: number;
  comments: Comment[];
};
