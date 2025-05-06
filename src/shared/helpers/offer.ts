import { Offer, HousingType, UserType, Good, City } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    name,
    email,
    avatarUrl,
    password,
    userType,
    location
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarUrl,
    password,
    type: userType as UserType
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium.toLowerCase() === 'true',
    isFavorite: isFavorite.toLowerCase() === 'true',
    rating: Number.parseInt(rating, 10),
    type: type as HousingType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods
      .split(';')
      .map((good) => good as Good),
    host: user,
    countComments: 0,
    location: [Number.parseFloat(location.split(';')[0]),Number.parseFloat(location.split(';')[1])]
  };
}
