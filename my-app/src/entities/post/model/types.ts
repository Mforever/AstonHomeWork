/**
 * Типы для сущности "Пост" (Post)
 */

export interface Post {
  /** Уникальный идентификатор поста */
  id: number;
  /** ID пользователя, создавшего пост */
  userId: number;
  /** Заголовок поста */
  title: string;
  /** Содержание поста */
  body: string;
}

/**
 * Тип для создания нового поста (без id, так как он генерируется сервером)
 */
export type CreatePostDto = Omit<Post, 'id'>;

/**
 * Тип для обновления поста (все поля опциональны, кроме id)
 */
export type UpdatePostDto = Partial<Omit<Post, 'id'>> & Pick<Post, 'id'>;

/**
 * Тип для фильтрации постов
 */
export interface PostFilters {
  /** Фильтр по пользователю */
  userId?: number;
  /** Поиск по заголовку */
  title?: string;
  /** Минимальная длина заголовка */
  minTitleLength?: number;
  /** Максимальная длина заголовка */
  maxTitleLength?: number;
}

/**
 * Тип для состояния постов в Redux slice
 */
export interface PostState {
  data: Record<number, Post>;
  ids: number[];
  loading: boolean;
  error: string | null;
  selectedId: number | null;
  filters: PostFilters;
}