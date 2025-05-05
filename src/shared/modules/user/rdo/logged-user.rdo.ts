import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user-type.enum.js';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public name: string;

  @Expose()
  public type: UserType;
}
