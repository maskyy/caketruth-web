export interface User {
  id: number;
  email: string;
  username: string;
  blocked_until: string | null;
  role: {
    name: "user" | "moderator" | "admin";
    title: "Пользователь" | "Модератор" | "Администратор";
  };
}

export type UserSignup = Pick<User, 'email' | 'username'> & {
  password: string;
  password_confirm: string;
};
export type UserAuth = Pick<User, 'email'> & { password: string };
export type UserUpdate = Partial<User> & {
  password?: string;
  password_confirm?: string;
};
