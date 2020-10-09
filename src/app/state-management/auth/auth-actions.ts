import {UserModel} from '../../models/Auth/user.model';
import {AuthCredentialsDto} from '../../commons/public-dto/auth-credentials.dto';

export interface AuthStateModel {
  token: string;
  user: UserModel;
}

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: AuthCredentialsDto) {
  }
}

export class UpdateToken {
  static readonly type = '[Auth] Update Token';

  constructor(public token: string) {
  }
}

export class UpdateUser {
  static readonly type = '[Auth] Update User';

  constructor(public user: UserModel) {
  }
}




export class Register {
  static readonly type = '[Auth] Register';

  constructor(public payload: any) {
  }
}


export class Logout {
  static readonly type = '[Auth] Logout';
}


// For User Data

export class SetUserProfile {
  static readonly type = '[Auth] Set User Profile';

  constructor(public profileId: number) {
  }
}

export class SetUserCart {
  static readonly type = '[Auth] Set User Cart';

  constructor(public cartId: number) {
  }
}
