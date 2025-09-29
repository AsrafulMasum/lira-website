// Types for Organize Contests components
export interface Contest {
  id: string;
  name: string;
  price: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  isExpanded: boolean;
  contests: Contest[];
}