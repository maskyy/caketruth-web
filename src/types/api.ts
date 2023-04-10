export interface ServerErrors {
  errors?: {
    [key: string]: string | string[];
  };
  detail?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
