import { Category } from "./types";

// Sample contest data organized by categories
export const initialCategories: Category[] = [
  {
    id: "crypto-market",
    name: "Crypto Market",
    count: 8,
    isExpanded: true,
    contests: [
      {
        id: "contest-1",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-2",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-3",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "weather",
    name: "Weather",
    count: 3,
    isExpanded: false,
    contests: [
      {
        id: "contest-4",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-5",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "stock-market",
    name: "Stock Market",
    count: 2,
    isExpanded: false,
    contests: [
      {
        id: "contest-6",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "category-4",
    name: "Category name",
    count: 5,
    isExpanded: false,
    contests: [
      {
        id: "contest-7",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
      {
        id: "contest-8",
        name: "Rolex Daytona",
        price: "BTC Price",
        date: "Jul 1, 2025, 3:00 PM GMT -3",
      },
    ],
  },
  {
    id: "category-5",
    name: "Category name",
    count: 0,
    isExpanded: false,
    contests: [],
  },
];