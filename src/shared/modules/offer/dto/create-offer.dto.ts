import {
  IsArray,
  IsBoolean,
  IsEnum,
  MaxLength,
  MinLength,
  IsInt,
  Min,
  Max,
  IsString,
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
  IsMongoId
} from 'class-validator';
import { City, Good, HousingType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsString({ message: CreateOfferValidationMessage.title.required })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsString({ message: CreateOfferValidationMessage.description.required })
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsString({ message: CreateOfferValidationMessage.previewImage.required })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.images.length})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.images.length})
  @IsOptional()
  public images?: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsEnum(HousingType, { message: CreateOfferValidationMessage.type.invalid })
  public type: HousingType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Good, { each: true, message: CreateOfferValidationMessage.type.invalid })
  public goods: Good[];

  @IsOptional()
  @IsMongoId({ message: CreateOfferValidationMessage.host.invalidId })
  public host: string;

  @IsArray({ message: CreateOfferValidationMessage.location.invalidFormat })
  @ArrayMaxSize(2, {message: CreateOfferValidationMessage.location.length})
  @ArrayMinSize(2, {message: CreateOfferValidationMessage.location.length})
  public location: [number, number];
}
