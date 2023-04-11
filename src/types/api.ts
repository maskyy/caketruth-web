export interface ServerErrors {
  [key: string]: string | string[];
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
