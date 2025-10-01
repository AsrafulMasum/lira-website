// Types for Organize Contests components
export interface Contest {
  _id: string;
  id: string;
  name: string;
  price: string;
  date: string;
  status: string;
  endTime: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  isExpanded: boolean;
  contests: Contest[];
}
