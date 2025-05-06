import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { OfferRdo } from '../../offer/rdo/offer.rdo.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose({ name: 'createdAt'})
  public postDate: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  @Type(() => OfferRdo)
  public offer: OfferRdo;
}
