import { Arena, Team, Coach, SportType } from '@/types';

export const arenas: Arena[] = [
  {
    id: '1',
    name: 'Lahore Cricket Center',
    sport: 'cricket',
    location: 'Gulberg III, Lahore',
    rating: 4.8,
    price: 3000,
    imageUrl: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium indoor cricket facility with professional-grade turf and lighting.',
    facilities: ['Professional Turf', 'LED Lighting', 'Air Conditioning', 'Changing Rooms', 'Parking'],
    availability: [
      { id: '1', startTime: '09:00', endTime: '11:00', isAvailable: true, price: 3000 },
      { id: '2', startTime: '11:00', endTime: '13:00', isAvailable: false, price: 3000 },
      { id: '3', startTime: '15:00', endTime: '17:00', isAvailable: true, price: 3500 },
    ],
  },
  {
    id: '2',
    name: 'Champions Football Arena',
    sport: 'football',
    location: 'Model Town, Lahore',
    rating: 4.6,
    price: 2500,
    imageUrl: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'State-of-the-art indoor football facility with FIFA-approved artificial turf.',
    facilities: ['FIFA Approved Turf', 'Goal Nets', 'Scoreboard', 'Seating Area', 'Refreshments'],
    availability: [
      { id: '4', startTime: '08:00', endTime: '10:00', isAvailable: true, price: 2500 },
      { id: '5', startTime: '18:00', endTime: '20:00', isAvailable: true, price: 3000 },
    ],
  },
  {
    id: '3',
    name: 'Elite Tennis Club',
    sport: 'tennis',
    location: 'DHA Phase 5, Lahore',
    rating: 4.9,
    price: 2000,
    imageUrl: 'https://images.pexels.com/photos/1619838/pexels-photo-1619838.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium indoor tennis courts with professional-grade synthetic surfaces.',
    facilities: ['Synthetic Courts', 'Ball Machine', 'Coaching Available', 'Pro Shop', 'Lounge'],
    availability: [
      { id: '6', startTime: '07:00', endTime: '08:00', isAvailable: true, price: 2000 },
      { id: '7', startTime: '16:00', endTime: '17:00', isAvailable: true, price: 2000 },
    ],
  },
  {
    id: '4',
    name: 'Royal Cricket Academy',
    sport: 'cricket',
    location: 'Johar Town, Lahore',
    rating: 4.7,
    price: 2800,
    imageUrl: 'https://images.pexels.com/photos/2277904/pexels-photo-2277904.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional cricket training facility with modern equipment and expert coaching.',
    facilities: ['Indoor Nets', 'Bowling Machine', 'Video Analysis', 'Fitness Area', 'Coaching'],
    availability: [
      { id: '8', startTime: '10:00', endTime: '12:00', isAvailable: true, price: 2800 },
      { id: '9', startTime: '14:00', endTime: '16:00', isAvailable: true, price: 2800 },
    ],
  },
];

export const teams: Team[] = [
  {
    id: '1',
    name: 'Royal Strikers',
    sport: 'cricket',
    members: 11,
    maxMembers: 15,
    wins: 8,
    losses: 2,
    description: 'Competitive cricket team looking for skilled batsmen and bowlers.',
    imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
    captain: 'Hassan Ali',
  },
  {
    id: '2',
    name: 'Lahore Lions',
    sport: 'football',
    members: 9,
    maxMembers: 11,
    wins: 12,
    losses: 4,
    description: 'Premier football team seeking talented midfielders and defenders.',
    imageUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
    captain: 'Muhammad Usman',
  },
  {
    id: '3',
    name: 'Tennis Masters',
    sport: 'tennis',
    members: 6,
    maxMembers: 8,
    wins: 15,
    losses: 3,
    description: 'Elite tennis team for tournaments and regular matches.',
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    captain: 'Sara Ahmed',
  },
];

export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Coach Tariq Ahmed',
    sport: 'cricket',
    rating: 4.9,
    experience: 12,
    price: 1500,
    imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Former first-class cricketer with 12 years of coaching experience. Specialized in batting techniques and match strategy.',
    certifications: ['PCB Level 3 Coach', 'ICC Coaching Certificate', 'Sports Psychology'],
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
  },
  {
    id: '2',
    name: 'Coach Maria Khan',
    sport: 'tennis',
    rating: 4.8,
    experience: 8,
    price: 2000,
    imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional tennis coach with international tournament experience. Focuses on technique and mental game.',
    certifications: ['ITF Coaching Level 2', 'Sports Science Degree', 'Mental Training'],
    availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
  },
  {
    id: '3',
    name: 'Coach Imran Malik',
    sport: 'football',
    rating: 4.7,
    experience: 10,
    price: 1200,
    imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Former professional footballer turned coach. Expert in tactical training and fitness conditioning.',
    certifications: ['AFC B License', 'Fitness Training Certificate', 'Youth Development'],
    availability: ['Monday', 'Tuesday', 'Thursday', 'Sunday'],
  },
];

export const getSportColor = (sport: SportType): string => {
  switch (sport) {
    case 'cricket':
      return '#4CAF50';
    case 'football':
      return '#2196F3';
    case 'tennis':
      return '#FF9800';
    default:
      return '#10B981';
  }
};