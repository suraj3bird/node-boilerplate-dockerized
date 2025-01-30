export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  username?: string;
  phone: string;
  username: string;
  avatar?: string;
  status: string;
  occupation?: string;
}

export interface IManagementApiToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}
