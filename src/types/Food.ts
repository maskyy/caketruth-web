export interface Food {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  ethanol?: number;
  is_public: boolean;
  is_verified: boolean;
  user: number;
}
