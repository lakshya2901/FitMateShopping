export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'protein' | 'creatine' | 'equipment' | 'supplements' 
    | 'accessories' | 'clothing' | "recovery";
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}