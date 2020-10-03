import {UserModel} from '../../models/Auth/user.model';

export class LoginResponse {
  user: UserModel;
  token: string;
}
