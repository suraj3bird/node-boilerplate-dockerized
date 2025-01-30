export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  // password: string
  role: string;
  status: string;
}

export interface IAddress {
  id?: number;
  userId?: number;
  country: string;
  state: string;
  city: string;
  district: string;
  street: string;
  addressType: string;
}

export interface IGuardian {
  id?: number;
  userId?: number;
  fullName: string;
  relation: string;
  phone: string;
  email?: string;
}

export interface IEducation {
  id?: number;
  userId?: number;
  university: string;
  degree: string;
  startDate: string;
  endDate: string;
}