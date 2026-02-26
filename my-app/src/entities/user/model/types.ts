/**
 * Типы для сущности "Пользователь" (User)
 */

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  /** Уникальный идентификатор пользователя */
  id: number;
  /** Имя пользователя */
  name: string;
  /** Никнейм */
  username: string;
  /** Email */
  email: string;
  /** Адрес */
  address: Address;
  /** Телефон */
  phone: string;
  /** Сайт */
  website: string;
  /** Компания */
  company: Company;
}

/**
 * Тип для краткой информации о пользователе (для списков)
 */
export type UserSummary = Pick<User, 'id' | 'name' | 'username' | 'email'>;

/**
 * Тип для состояния пользователей в Redux slice
 */
export interface UserState {
  data: Record<number, User>;
  ids: number[];
  loading: boolean;
  error: string | null;
  selectedId: number | null;
}