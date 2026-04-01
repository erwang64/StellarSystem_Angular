import { UserProfile } from './user-profile';

export class User {
  id!: number;
  login!: string;
  password!: string;
  profile!: UserProfile;
}
