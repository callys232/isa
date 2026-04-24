export type ListingCategory = 'crops' | 'livestock' | 'seeds' | 'fertilizer' | 'equipment';
export type ListingStatus = 'active' | 'sold' | 'pending';

export interface Seller {
  id: string;
  name: string;
  rating: number;
  totalSales: number;
  verified: boolean;
  location: string;
  state: string;
  memberSince: string;
  phone: string;
}

export interface Listing {
  id: string;
  title: string;
  category: ListingCategory;
  price: number;
  unit: string;
  minOrder: number;
  availableQty: number;
  location: string;
  state: string;
  seller: Seller;
  description: string;
  tags: string[];
  postedAt: string;
  escrow: boolean;
  verified: boolean;
  rating: number;
  reviews: number;
  status: ListingStatus;
  gradient: string;
  emoji: string;
}
