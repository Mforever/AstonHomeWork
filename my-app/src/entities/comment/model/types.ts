/**
 * Типы для сущности "Комментарий" (Comment)
 */

export interface Comment {
  /** Уникальный идентификатор комментария */
  id: number;
  /** ID поста, к которому относится комментарий */
  postId: number;
  /** Имя автора */
  name: string;
  /** Email автора */
  email: string;
  /** Текст комментария */
  body: string;
}

/**
 * Тип для создания нового комментария
 */
export type CreateCommentDto = Omit<Comment, 'id'>;

/**
 * Тип для обновления комментария
 */
export type UpdateCommentDto = Partial<Omit<Comment, 'id'>> & Pick<Comment, 'id'>;

/**
 * Тип для свернутого/развернутого состояния комментария
 */
export interface CommentExpandable {
  id: number;
  isExpanded: boolean;
}

/**
 * Тип для состояния комментариев в компоненте
 */
export interface CommentState {
  comments: Comment[];
  expandedIds: Set<number>;
  loading: boolean;
  error: string | null;
}