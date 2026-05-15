

export interface ProductOption {
  type: 'color' | 'size';
  label: string;   
  value: string;   
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  options?: ProductOption[];   
}

// alışveriş sepeti verileri

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>; 
}

// kullanıcı ve yetkilendirme

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

// yönetici paneli tipleri

export type OrderStatus = 'completed' | 'pending' | 'cancelled'; //wip

export interface Order { //wip
  id: string;
  product: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

export interface DailySales { //wip dashboard icin
  day: string;
  amount: number;
}

// admin panelinde local ürün kaydı
export interface DashboardProduct extends Product {
  createdAt: string;  
  updatedAt: string;  
}