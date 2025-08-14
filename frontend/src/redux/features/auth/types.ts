export interface SignUpData {
  fullname: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  provider: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
