
import rider1 from '../assets/1@300x-100.jpg';
import rider2 from '../assets/2@300x-100.jpg';
import rider3 from '../assets/3@300x-100.jpg';
import rider4 from '../assets/4@300x-100.jpg';
import rider5 from '../assets/5@300x-100.jpg';

export interface Rider {
  id: number;
  name: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
  profileImage: string;
}

export const riders: Rider[] = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4.8,
    location: {
      lat: 40.76,
      lng: -73.985,
    },
    profileImage: rider1,
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4.9,
    location: {
      lat: 40.758,
      lng: -73.98,
    },
    profileImage: rider2,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 4.7,
    location: {
      lat: 40.755,
      lng: -73.99,
    },
    profileImage: rider3,
  },
  {
    id: 4,
    name: 'Emily Davis',
    rating: 5.0,
    location: {
      lat: 40.762,
      lng: -73.988,
    },
    profileImage: rider4,
  },
  {
    id: 5,
    name: 'Chris Brown',
    rating: 4.6,
    location: {
      lat: 40.759,
      lng: -73.982,
    },
    profileImage: rider5,
  },
];
