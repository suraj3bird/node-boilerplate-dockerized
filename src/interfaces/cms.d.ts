export interface IEbook {
  id?: number;
  name: string;
  price: string;
  description: string;
  image: string;
  slug?: string;
}

export interface IDestination {
  id?: number;
  title: string;
  image: string;
  slug?: string;
  description: string;
}

export interface IEnquiry {
  id?: number;
  enquireyId?: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  destinationId?: number;
  studyLevel?: string;
  subject: string;
  intake?: string;
}

export interface IBlog {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  description: string;
  image: string;
  slug?: string;
  userId: number;
}