import { City } from './city.enum.js';
import { HousingType } from './houstingType.enum.js';
import { Good } from './good.enum.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Good[];
  host: User;
  countComments: number;
  location: [number, number];
}
