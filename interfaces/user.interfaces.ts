import { Types } from 'mongoose';

export interface IUser {
  id?: Types.ObjectId,
  username: string,
  password: string,
  score: number,
  language: string,
  theming: string,
  render: string,
}
