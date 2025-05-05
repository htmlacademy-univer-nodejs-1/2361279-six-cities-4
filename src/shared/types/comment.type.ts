import { User } from './user.type.js';

export type Comment = {
  comment: string;
  date: string;
  rating: number;
  user: User;
}
