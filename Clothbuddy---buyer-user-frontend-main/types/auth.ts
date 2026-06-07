export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'buyer' | 'seller';
  // Add other user properties
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
