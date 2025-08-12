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
  message: string;
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
