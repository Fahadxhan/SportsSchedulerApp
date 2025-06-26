export interface Arena {
  id: string;
  name: string;
  sport: 'cricket' | 'football' | 'tennis';
  location: string;
  rating: number;
  price: number;
  imageUrl: string;
  description: string;
  facilities: string[];
  availability: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
}

export interface Team {
  id: string;
  name: string;
  sport: 'cricket' | 'football' | 'tennis';
  members: number;
  maxMembers: number;
  wins: number;
  losses: number;
  description: string;
  imageUrl: string;
  captain: string;
}

export interface Coach {
  id: string;
  name: string;
  sport: 'cricket' | 'football' | 'tennis';
  rating: number;
  experience: number;
  price: number;
  imageUrl: string;
  description: string;
  certifications: string[];
  availability: string[];
}

export interface Booking {
  id: string;
  arenaId: string;
  arenaName: string;
  date: string;
  timeSlot: TimeSlot;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  sport: 'cricket' | 'football' | 'tennis';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'vendor' | 'coach';
  profileImage?: string;
}

export type SportType = 'cricket' | 'football' | 'tennis';