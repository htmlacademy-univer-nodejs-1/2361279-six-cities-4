import { IsMongoId, IsString, Length, Min, Max, IsNumber } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({message: CreateCommentMessages.comment.invalidFormat})
  @Length(5, 1024, {message: CreateCommentMessages.comment.lengthField})
  public comment: string;

  @Min(1, {message: CreateCommentMessages.rating.minValue})
  @Max(5, {message: CreateCommentMessages.rating.maxValue})
  @IsNumber({}, {message: CreateCommentMessages.rating.invalidFormat})
  public rating: string;

  @IsMongoId({message: CreateCommentMessages.offer.invalidFormat})
  public offer: string;

  @IsMongoId({ message: CreateCommentMessages.user.invalidFormat })
  public user: string;
}
