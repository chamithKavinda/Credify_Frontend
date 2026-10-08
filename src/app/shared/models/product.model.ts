export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    imageUrl?: string;
    averageRating: number;
    credibilityScore: number;
    reviewCount: number;
  }
  
  export interface ProductSearchParams {
    query?: string;
    category?: string;
    minCredibility?: number;
    minRating?: number;
    page?: number;
    size?: number;
  }