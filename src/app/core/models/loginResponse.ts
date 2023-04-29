import {Role} from './role';
import {Tokens} from "./tokens";


export class LoginResponse {
  // token!: string;
  token!: string;
  user_details = new LoginUserDetails();
}

export class LoginUserDetails {
  tokens!: Tokens;
  token!: string;
  id!: number;
  img!: string;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role!: Role;
}
