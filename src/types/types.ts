export type Coordinates = {
  longitude: number;
  latitude: number;
};

export enum Facilities {
  Breakfast = 'Breakfast',
  Air_conditioning = 'Air conditioning',
  Laptop_friendly_workspace = 'Laptop friendly workspace',
  Baby_seat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export enum OfferType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel'
}

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export type Offer = {
  name: string;
  description: string;
  publicationDate: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  roomCount: number;
  guestCount: number;
  cost: number;
  facilities: Facilities[];
  author: string;
  commentsCount: number;
  coordinates: Coordinates;
};


